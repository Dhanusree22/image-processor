import os
import json
import base64
import tempfile
import subprocess
import sys
from pathlib import Path
from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
from PIL import Image
import pytesseract
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

api_key = os.environ.get('GROQ_API_KEY')
if not api_key:
    raise ValueError("GROQ_API_KEY environment variable not set. Please set it before running this script.")

client = Groq(api_key=api_key)

def setup_tesseract():
    """Setup Tesseract path based on OS."""
    try:
        if sys.platform == 'win32':
            # Common Windows Tesseract paths
            possible_paths = [
                r'C:\Program Files\Tesseract-OCR\tesseract.exe',
                r'C:\Program Files (x86)\Tesseract-OCR\tesseract.exe',
                r'C:\Users\{}\AppData\Local\Tesseract-OCR\tesseract.exe'.format(os.getenv('USERNAME'))
            ]
            
            for path in possible_paths:
                if os.path.exists(path):
                    pytesseract.pytesseract.pytesseract_path = path
                    print(f"Found Tesseract at: {path}")
                    return True
            
            print("WARNING: Tesseract not found. Install from: https://github.com/UB-Mannheim/tesseract/wiki")
            return False
        else:
            # Linux/Mac - should be in PATH
            return True
    except Exception as e:
        print(f"Error setting up Tesseract: {e}")
        return False

# Initialize Tesseract
setup_tesseract()

def process_image_opencv(image_path):
    """Extract text from image using OpenCV and Tesseract."""
    try:
        # Read image
        img = cv2.imread(image_path)
        if img is None:
            return None
        
        # Convert to grayscale
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        # Apply thresholding
        _, threshold = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY)
        
        # Denoise
        denoised = cv2.fastNlMeansDenoising(threshold, None, h=10, templateWindowSize=7, searchWindowSize=21)
        
        try:
            text = pytesseract.image_to_string(denoised)
        except Exception as e:
            print(f"Tesseract error: {e}")
            # Fallback: try original image
            text = pytesseract.image_to_string(gray)
        
        if not text or text.strip() == "":
            print("No text detected in image. Image might be too blurry or low contrast.")
            return None
        
        return text.strip()
    except Exception as e:
        print(f"Error processing image: {e}")
        return None

def simplify_text_with_gpt(raw_text):
    """Simplify extracted text using Groq API."""
    try:
        response = client.chat.completions.create(
            model="mixtral-8x7b-32768",
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert at condensing handwritten notes into clear, concise bullet points. Extract key information and organize it logically."
                },
                {
                    "role": "user",
                    "content": f"Please simplify the following handwritten text into clear, concise bullet points:\n\n{raw_text}"
                }
            ],
            max_tokens=500,
            temperature=0.7
        )
        
        simplified = response.choices[0].message.content.strip()
        return simplified
    except Exception as e:
        print(f"Error simplifying text with Groq: {e}")
        return raw_text

@app.route('/extract', methods=['POST'])
def extract():
    """Endpoint for OCR extraction only."""
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400
        
        image_file = request.files['image']
        
        if image_file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        with tempfile.NamedTemporaryFile(delete=False, suffix='.png') as tmp_file:
            image_file.save(tmp_file.name)
            temp_path = tmp_file.name
        
        try:
            raw_text = process_image_opencv(temp_path)
            
            if not raw_text:
                return jsonify({'error': 'Could not extract text from image. Make sure Tesseract is installed: https://github.com/UB-Mannheim/tesseract/wiki'}), 400
            
            return jsonify({'extracted_text': raw_text}), 200
        
        finally:
            if os.path.exists(temp_path):
                os.remove(temp_path)
    
    except Exception as e:
        print(f"Error in extract endpoint: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/simplify', methods=['POST'])
def simplify():
    """Endpoint for text simplification only."""
    try:
        data = request.get_json()
        
        if not data or 'text' not in data:
            return jsonify({'error': 'No text provided'}), 400
        
        raw_text = data['text']
        simplified_text = simplify_text_with_gpt(raw_text)
        
        return jsonify({'simplified_text': simplified_text}), 200
    
    except Exception as e:
        print(f"Error in simplify endpoint: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/process', methods=['POST'])
def process():
    """Main endpoint to process handwritten text from images."""
    try:
        # Check if image file is provided
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400
        
        image_file = request.files['image']
        
        if image_file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        # Save uploaded file temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix='.png') as tmp_file:
            image_file.save(tmp_file.name)
            temp_path = tmp_file.name
        
        try:
            # Extract text using OpenCV and Tesseract
            raw_text = process_image_opencv(temp_path)
            
            if not raw_text:
                return jsonify({'error': 'Could not extract text from image. Make sure Tesseract is installed: https://github.com/UB-Mannheim/tesseract/wiki'}), 400
            
            # Simplify text using Groq
            simplified_text = simplify_text_with_gpt(raw_text)
            
            return jsonify({
                'raw_text': raw_text,
                'simplified_text': simplified_text
            }), 200
        
        finally:
            # Clean up temporary file
            if os.path.exists(temp_path):
                os.remove(temp_path)
    
    except Exception as e:
        print(f"Error in process endpoint: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint."""
    return jsonify({'status': 'ok'}), 200

if __name__ == '__main__':
    print("Starting Flask server on http://127.0.0.1:5000")
    app.run(debug=True, host='127.0.0.1', port=5000)

# Export handler for Vercel
handler = app
