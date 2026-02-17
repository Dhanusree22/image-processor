import type { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Received image processing request")

    const formData = await request.formData()
    const file = formData.get("image") as File

    if (!file) {
      console.log("[v0] No image file provided")
      return Response.json({ error: "No image provided" }, { status: 400 })
    }

    console.log("[v0] Processing image:", file.name, "size:", file.size)

    const apiKey = process.env.GOOGLE_API_KEY
    if (!apiKey) {
      console.error("[v0] GOOGLE_API_KEY not found")
      return Response.json(
        {
          error:
            "API key not configured. Set up: 1) Get free key from https://ai.google.dev 2) Add GOOGLE_API_KEY in the Vars section (click 'Vars' in the sidebar) 3) Restart the app",
        },
        { status: 500 },
      )
    }

    const arrayBuffer = await file.arrayBuffer()
    const bytes = new Uint8Array(arrayBuffer)
    let base64 = ""
    for (let i = 0; i < bytes.byteLength; i++) {
      base64 += String.fromCharCode(bytes[i])
    }
    base64 = btoa(base64)

    console.log("[v0] Image converted to base64, length:", base64.length)

    const mediaType = file.type || "image/jpeg"
    console.log("[v0] Image media type:", mediaType)

    try {
      console.log("[v0] Calling Google Gemini Vision API for text extraction...")
      const visionResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: "Extract all the text from this handwritten image. Return ONLY the extracted text without any explanations.",
                  },
                  {
                    inlineData: {
                      mimeType: mediaType,
                      data: base64,
                    },
                  },
                ],
              },
            ],
          }),
        },
      )

      if (!visionResponse.ok) {
        const errorData = await visionResponse.json()
        console.error("[v0] Vision API error:", errorData)
        throw new Error(`Vision API failed: ${JSON.stringify(errorData)}`)
      }

      const visionData = await visionResponse.json()
      console.log("[v0] Vision response received")

      let raw_text = ""
      if (
        visionData.candidates &&
        visionData.candidates[0] &&
        visionData.candidates[0].content &&
        visionData.candidates[0].content.parts
      ) {
        raw_text = visionData.candidates[0].content.parts.map((part: any) => part.text || "").join("")
      }

      if (!raw_text) {
        throw new Error("Could not extract text from image")
      }

      console.log("[v0] Extracted text length:", raw_text.length)

      console.log("[v0] Calling Google Gemini API for text simplification...")
      const simplifyResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are a helpful assistant that simplifies and cleans up handwritten text. Fix OCR errors, improve punctuation, correct spelling mistakes, and format as clear, readable notes.\n\nSimplify this text:\n\n${raw_text}`,
                  },
                ],
              },
            ],
          }),
        },
      )

      if (!simplifyResponse.ok) {
        const errorData = await simplifyResponse.json()
        console.error("[v0] Simplify API error response:", errorData)
        throw new Error(`Simplification failed: ${JSON.stringify(errorData)}`)
      }

      const simplifyData = await simplifyResponse.json()
      console.log("[v0] Simplification complete")

      let simplified_text = ""
      if (
        simplifyData.candidates &&
        simplifyData.candidates[0] &&
        simplifyData.candidates[0].content &&
        simplifyData.candidates[0].content.parts
      ) {
        simplified_text = simplifyData.candidates[0].content.parts.map((part: any) => part.text || "").join("")
      }

      if (!simplified_text) {
        throw new Error("Could not simplify text")
      }

      console.log("[v0] Success: Returning results")
      return Response.json({
        raw_text,
        simplified_text,
      })
    } catch (apiError) {
      const errorMsg = apiError instanceof Error ? apiError.message : String(apiError)
      console.error("[v0] API Error:", errorMsg)
      throw new Error(errorMsg)
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to process image"
    console.error("[v0] Final error:", errorMessage)
    return Response.json({ error: errorMessage }, { status: 500 })
  }
}
