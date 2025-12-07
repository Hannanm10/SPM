# How to Find the Correct Gemini Model Name

## Quick Answer

The most common working model names are:
- `gemini-1.5-pro` (Recommended - most capable)
- `gemini-1.5-flash` (Faster, good for most tasks)
- `gemini-pro` (Older, still works)
- `gemini-2.0-flash-exp` (Experimental)

## How to Find Available Models

### Method 1: Check Google AI Studio
1. Go to https://aistudio.google.com/
2. Sign in with your Google account
3. Look at the model selector dropdown
4. The model names shown there are the ones you can use

### Method 2: Use the Models API
You can call Google's API to list available models:

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models?key=YOUR_API_KEY"
```

This will return a list of all available models and their names.

### Method 3: Check Official Documentation
Visit: https://ai.google.dev/models/gemini

## How to Set the Model Name

### Option 1: Environment Variable (Recommended)
Add to your `.env` file:
```
GEMINI_MODEL=gemini-1.5-pro
```

### Option 2: Edit the Code
In `Backend/services/gemini_service.py`, change line 21:
```python
self.model_name = os.getenv('GEMINI_MODEL', 'gemini-1.5-pro')  # Change the default here
```

## Testing Your Model Name

1. Start your Flask server:
   ```bash
   python app.py
   ```

2. Check the logs - you should see:
   ```
   INFO: Initialized Gemini service with model: gemini-1.5-pro
   ```

3. Test an endpoint:
   ```bash
   curl -X POST http://localhost:5000/api/ask \
     -H "Content-Type: application/json" \
     -d '{"question": "Hello"}'
   ```

4. Check the server logs for any errors about the model name

## Common Errors

### "Model not found" or 404 Error
- The model name is incorrect
- Try: `gemini-1.5-pro` or `gemini-1.5-flash`
- Check your API key has access to the model

### "API key invalid"
- Your API key is wrong or expired
- Get a new key from: https://makersuite.google.com/app/apikey

### "Quota exceeded"
- You've hit your API rate limit
- Wait a bit or check your Google Cloud quota

## Current Default Model

The backend is currently set to use: **`gemini-1.5-pro`**

This is a good default that works for most use cases. If you want faster responses, use `gemini-1.5-flash`.

