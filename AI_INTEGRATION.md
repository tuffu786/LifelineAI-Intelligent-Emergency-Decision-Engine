# LifelineAI Emergency System - Hugging Face Integration

## Overview

This emergency response system now integrates with **Hugging Face's Mistral-7B-Instruct** model for real-time AI-powered emergency analysis. When users submit an emergency situation, the system sends it to Mistral for intelligent analysis, which provides:

- **Severity classification** (Critical/High/Medium/Low)
- **Step-by-step emergency instructions**
- **Critical warnings** (what NOT to do)
- **Required medical care** specialties
- **Confidence scores** for analysis accuracy

## Setup

### 1. Get a Hugging Face API Key

1. Go to [huggingface.co](https://huggingface.co)
2. Sign up or log in to your account
3. Navigate to **Settings → Access Tokens**
4. Click "New token"
5. Create a token with **Read** access
6. Copy the token

### 2. Add to Environment Variables

In your Vercel project settings:

1. Go to **Settings → Vars**
2. Add new variable:
   - **Key**: `HF_API_KEY`
   - **Value**: (paste your Hugging Face token)

## How It Works

### Request Flow

```
User Input (Emergency Description)
        ↓
Frontend Form Submission
        ↓
POST /api/analyze
        ↓
Backend (route.ts)
        ↓
Hugging Face Mistral API
        ↓
Parse AI Response
        ↓
Structure Data (severity, steps, warnings, care)
        ↓
Return to Frontend
        ↓
Display Analysis & Instructions
```

### Prompt Engineering

The system uses a carefully structured prompt that tells Mistral to:

1. **Analyze** the emergency situation
2. **Classify** severity (critical/high/medium/low)
3. **Generate** numbered emergency steps
4. **List** critical warnings (DO NOTs)
5. **Identify** required medical specialties

### Example Response

For input: "Patient unconscious, heavy bleeding from head"

```
SEVERITY: Critical
CONFIDENCE: 95%

STEPS:
1. Call 911 immediately
2. Check responsiveness
3. Ensure clear airway
4. Apply pressure to bleeding
5. Position in recovery position
...

WARNINGS:
- Do NOT move the patient (spinal injury)
- Do NOT give food or water
- Do NOT leave patient unattended
...

REQUIRED CARE:
- Emergency trauma center
- CT scan capability
- Neurosurgery availability
```

## Features

### Real-Time AI Analysis
- Uses Mistral-7B-Instruct for contextual understanding
- Adapts to different emergency types
- Provides confidence scores

### Fallback System
- If API is unavailable, system falls back to pre-trained emergency protocols
- Critical path always works (no single point of failure)

### Panic Mode
- Instantly analyzes "CRITICAL EMERGENCY" scenario
- Fastest possible response for unconscious/non-breathing patients

## Cost Optimization

The Hugging Face API offers:
- **Free tier**: Limited requests (inference API is free, some models are gated)
- **Pro tier**: $9/month for priority queue and increased limits

For emergency use cases, consider:
- Caching common emergency patterns
- Using shorter prompts
- Implementing rate limiting to prevent abuse

## Security

- API key is stored securely as environment variable
- Never exposed in frontend code
- All requests validated on backend
- Error handling prevents information leakage

## Troubleshooting

### "HF_API_KEY not configured"
- Check that the environment variable is set in Vercel Settings → Vars
- Verify the key is correct (not truncated)

### "API request failed"
- Check Hugging Face service status
- Verify your API key is still valid
- Check rate limits haven't been exceeded

### Slow responses
- Hugging Face free tier may have queue delays
- Consider upgrading to Pro for faster inference
- Response times typically 2-5 seconds

## Model Information

**Mistral-7B-Instruct-v0.2**
- Size: 7 billion parameters
- Training: Optimized for instruction-following
- Performance: Competitive with larger models
- Speed: Fast inference suitable for emergency scenarios
- Context: 32K token window (plenty for medical analysis)

## Customization

To modify the prompt, edit `/app/api/analyze/route.ts`:

```typescript
const systemPrompt = `You are an emergency medical AI assistant...`
const userPrompt = `EMERGENCY SITUATION: ${emergency}...`
```

Update the parsing logic in `parseAIResponse()` to extract different information if needed.

## References

- [Hugging Face API Docs](https://huggingface.co/docs/api-inference)
- [Mistral Model Card](https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.2)
- [Emergency Medical Guidelines](https://www.cdc.gov/niosh/topics/emres/training.html)
