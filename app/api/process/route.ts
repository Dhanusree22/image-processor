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
      console.log("[v0] Calling Google Gemini Vision API for text extraction and simplification...")
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
                    text: "Extract all the text from this handwritten image. Then simplify, fix OCR errors, improve punctuation, and correct spelling mistakes. Format as clear, readable notes. Return the output in this exact format:\n\nRAW TEXT:\n[extracted text here]\n\nSIMPLIFIED TEXT:\n[simplified text here]",
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

      let responseText = ""
      if (
        visionData.candidates &&
        visionData.candidates[0] &&
        visionData.candidates[0].content &&
        visionData.candidates[0].content.parts
      ) {
        responseText = visionData.candidates[0].content.parts.map((part: any) => part.text || "").join("")
      }

      if (!responseText) {
        throw new Error("Could not extract text from image")
      }

      // Parse the response to extract raw and simplified text
      const rawMatch = responseText.match(/RAW TEXT:\n([\s\S]*?)(?=\n\nSIMPLIFIED TEXT:|$)/i)
      const simplifiedMatch = responseText.match(/SIMPLIFIED TEXT:\n([\s\S]*?)$/i)

      const raw_text = rawMatch ? rawMatch[1].trim() : responseText
      const simplified_text = simplifiedMatch ? simplifiedMatch[1].trim() : raw_text

      if (!raw_text) {
        throw new Error("Could not extract text from image")
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
