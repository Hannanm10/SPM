# Research Methodology & IP Compliance Assistant - Backend

Flask backend for the AI-powered Research Methodology & IP Compliance Assistant.

## Setup

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and add your Gemini API key:

```bash
cp .env.example .env
```

Edit `.env` and add your Google Gemini API key:

```
GEMINI_API_KEY=your_actual_api_key_here
```

Get your API key from: https://makersuite.google.com/app/apikey

### 3. Run the Server

```bash
python app.py
```

The server will start on `http://localhost:5000`

## API Endpoints

### 1. Health Check
```
GET /api/health
```

### 2. Get Methodology Recommendation
```
POST /api/get-methodology

Request Body:
{
  "research_gap": "text",
  "research_questions": ["q1", "q2"]
}

Response:
{
  "recommended_methodology": "Mixed-methods",
  "justification": "Reason...",
  "study_design": "Survey + interviews",
  "data_collection_tools": "Likert survey, semi-structured interviews"
}
```

### 3. Get Compliance Analysis
```
POST /api/get-compliance

Request Body:
{
  "project_title": "string",
  "data_sources": "string",
  "methods": "string"
}

Response:
{
  "ip_risks": "...",
  "copyright_concerns": "...",
  "patentability": "...",
  "ethical_considerations": "...",
  "data_privacy_requirements": "...",
  "compliance_recommendations": "..."
}
```

### 4. Ask General Question
```
POST /api/ask

Request Body:
{
  "question": "string"
}

Response:
{
  "answer": "string"
}
```

## Example Requests

### Using cURL

#### Get Methodology
```bash
curl -X POST http://localhost:5000/api/get-methodology \
  -H "Content-Type: application/json" \
  -d '{
    "research_gap": "Limited understanding of user behavior in mobile apps",
    "research_questions": [
      "How do users interact with mobile applications?",
      "What factors influence user engagement?"
    ]
  }'
```

#### Get Compliance
```bash
curl -X POST http://localhost:5000/api/get-compliance \
  -H "Content-Type: application/json" \
  -d '{
    "project_title": "AI-Powered Research Assistant",
    "data_sources": "User surveys and public datasets",
    "methods": "Mixed-methods: surveys and interviews"
  }'
```

#### Ask Question
```bash
curl -X POST http://localhost:5000/api/ask \
  -H "Content-Type: application/json" \
  -d '{
    "question": "What is the difference between quantitative and qualitative research?"
  }'
```

### Using Python requests

```python
import requests

# Get Methodology
response = requests.post('http://localhost:5000/api/get-methodology', json={
    "research_gap": "Limited understanding of user behavior",
    "research_questions": ["How do users interact?", "What factors influence engagement?"]
})
print(response.json())

# Get Compliance
response = requests.post('http://localhost:5000/api/get-compliance', json={
    "project_title": "AI Research Assistant",
    "data_sources": "User surveys",
    "methods": "Mixed-methods"
})
print(response.json())

# Ask Question
response = requests.post('http://localhost:5000/api/ask', json={
    "question": "What is mixed-methods research?"
})
print(response.json())
```

## Project Structure

```
Backend/
├── app.py                      # Main Flask application
├── services/
│   ├── gemini_service.py      # Gemini API service
│   └── prompt_templates.py    # Prompt templates
├── utils/
│   └── validator.py           # Input validation
├── .env                        # Environment variables (create from .env.example)
├── .env.example               # Example environment file
├── requirements.txt           # Python dependencies
└── README.md                  # This file
```

## Error Handling

All endpoints return JSON responses with appropriate HTTP status codes:

- `200`: Success
- `400`: Bad Request (validation errors)
- `500`: Internal Server Error

Error response format:
```json
{
  "error": "Error message",
  "message": "Detailed error message (optional)"
}
```

## CORS Configuration

The backend is configured to accept requests from:
- `http://localhost:5173` (Vite default)
- `http://localhost:3000` (React default)
- `http://127.0.0.1:5173`

To add more origins, edit `app.py` and update the `CORS` configuration.

## Notes

- The backend uses Google Gemini Pro model for AI responses
- All AI responses are expected to be in JSON format (except `/api/ask`)
- Input validation is performed on all endpoints
- Logging is configured for debugging

