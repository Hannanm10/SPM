# Quick Setup Guide

## Step 1: Install Python Dependencies

```bash
cd Backend
pip install -r requirements.txt
```

## Step 2: Get Gemini API Key

1. Go to https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Create a new API key
4. Copy the API key

## Step 3: Create .env File

Create a file named `.env` in the `Backend` folder with the following content:

```
GEMINI_API_KEY=your_actual_api_key_here
GEMINI_MODEL=gemini-1.5-pro
```

Replace `your_actual_api_key_here` with the API key you copied in Step 2.

**Model Options:**
- `gemini-1.5-pro` - Most capable (default)
- `gemini-1.5-flash` - Faster responses
- `gemini-pro` - Older model (still works)

See `GEMINI_MODEL_GUIDE.md` for more details on finding the correct model name.

## Step 4: Run the Server

```bash
python app.py
```

The server will start on `http://localhost:5000`

## Step 5: Test the API (Optional)

In a new terminal, run:

```bash
python test_api.py
```

This will test all endpoints to make sure everything is working.

## Troubleshooting

### "GEMINI_API_KEY not found"
- Make sure you created the `.env` file in the `Backend` folder
- Check that the file is named exactly `.env` (not `.env.txt`)
- Verify the API key is correct

### "Module not found" errors
- Make sure you installed all dependencies: `pip install -r requirements.txt`
- Check that you're using Python 3.x

### Connection errors from frontend
- Make sure the Flask server is running
- Check that CORS is configured correctly in `app.py`
- Verify the frontend is using the correct backend URL

### Gemini API errors
- Verify your API key is valid
- Check your API quota/limits
- The model name might need to be updated (currently using `gemini-pro`)

