"""
Quick script to check if your backend setup is correct
Run this before starting the server to verify everything is configured
"""

import os
import sys
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

print("=" * 60)
print("Backend Setup Checker")
print("=" * 60)

# Check Python version
print(f"\n✓ Python version: {sys.version}")

# Check if .env file exists
env_path = os.path.join(os.path.dirname(__file__), '.env')
if os.path.exists(env_path):
    print("✓ .env file found")
else:
    print("✗ .env file NOT found")
    print("  Create a .env file with: GEMINI_API_KEY=your_key")

# Check API key
api_key = os.getenv('GEMINI_API_KEY')
if api_key:
    masked_key = api_key[:8] + "..." + api_key[-4:] if len(api_key) > 12 else "***"
    print(f"✓ GEMINI_API_KEY found: {masked_key}")
else:
    print("✗ GEMINI_API_KEY not found in environment")
    print("  Add it to your .env file: GEMINI_API_KEY=your_key")

# Check model name
model_name = os.getenv('GEMINI_MODEL', 'gemini-1.5-pro')
print(f"✓ Using model: {model_name}")
print("  (Change with GEMINI_MODEL in .env)")

# Check required packages
print("\nChecking required packages...")
required_packages = ['flask', 'flask_cors', 'requests', 'dotenv']
missing_packages = []

for package in required_packages:
    try:
        if package == 'dotenv':
            __import__('dotenv')
        elif package == 'flask_cors':
            __import__('flask_cors')
        else:
            __import__(package)
        print(f"  ✓ {package}")
    except ImportError:
        print(f"  ✗ {package} - NOT INSTALLED")
        missing_packages.append(package)

if missing_packages:
    print(f"\n✗ Missing packages. Install with:")
    print(f"  pip install {' '.join(missing_packages)}")
else:
    print("\n✓ All required packages installed")

# Check file structure
print("\nChecking file structure...")
required_files = [
    'app.py',
    'services/gemini_service.py',
    'services/prompt_templates.py',
    'utils/validator.py'
]

for file_path in required_files:
    full_path = os.path.join(os.path.dirname(__file__), file_path)
    if os.path.exists(full_path):
        print(f"  ✓ {file_path}")
    else:
        print(f"  ✗ {file_path} - MISSING")

# Summary
print("\n" + "=" * 60)
if api_key and not missing_packages:
    print("✓ Setup looks good! You can start the server with:")
    print("  python app.py")
else:
    print("✗ Setup incomplete. Fix the issues above first.")
print("=" * 60)

