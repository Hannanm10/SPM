"""
Simple test script for the API endpoints
Run this after starting the Flask server
"""

import requests
import json

BASE_URL = "http://localhost:5000"

def test_health():
    """Test health check endpoint"""
    print("\n=== Testing Health Check ===")
    response = requests.get(f"{BASE_URL}/api/health")
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")

def test_get_methodology():
    """Test methodology endpoint"""
    print("\n=== Testing Get Methodology ===")
    data = {
        "research_gap": "Limited understanding of user behavior in mobile applications",
        "research_questions": [
            "How do users interact with mobile applications?",
            "What factors influence user engagement and retention?"
        ]
    }
    response = requests.post(f"{BASE_URL}/api/get-methodology", json=data)
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")

def test_get_compliance():
    """Test compliance endpoint"""
    print("\n=== Testing Get Compliance ===")
    data = {
        "project_title": "AI-Powered Research Methodology Assistant",
        "data_sources": "User surveys, public research datasets, and academic papers",
        "methods": "Mixed-methods: online surveys and semi-structured interviews"
    }
    response = requests.post(f"{BASE_URL}/api/get-compliance", json=data)
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")

def test_ask():
    """Test ask endpoint"""
    print("\n=== Testing Ask Question ===")
    data = {
        "question": "What is the difference between quantitative and qualitative research methods?"
    }
    response = requests.post(f"{BASE_URL}/api/ask", json=data)
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")

if __name__ == "__main__":
    print("Testing Flask Backend API")
    print("=" * 50)
    
    try:
        test_health()
        test_get_methodology()
        test_get_compliance()
        test_ask()
        print("\n" + "=" * 50)
        print("All tests completed!")
    except requests.exceptions.ConnectionError:
        print("\n❌ Error: Could not connect to the server.")
        print("Make sure the Flask server is running on http://localhost:5000")
    except Exception as e:
        print(f"\n❌ Error: {str(e)}")

