# LifelineAI Emergency Model - Comprehensive Test Suite

## Overview

This test suite validates the emergency AI model across **3 difficulty levels** with **9 total test cases**:
- **🟢 EASY** (3 tests) - Low severity situations
- **🟡 MEDIUM** (3 tests) - High severity situations  
- **🔴 HARD** (3 tests) - Critical/life-threatening situations

## Test Scenarios

### 🟢 EASY Level Tests

#### Test 1: Minor Cut/Scrape
- **Situation**: Person has a small cut on their hand from a paper cut
- **Symptoms**: Minor bleeding, Small wound on finger
- **Expected Severity**: `low`
- **Expected Steps**: How to clean wound, apply bandage, when to monitor
- **Expected Warnings**: Do not apply excessive pressure, do not use dirty materials

#### Test 2: Mild Headache
- **Situation**: Person reports mild headache after working at desk
- **Symptoms**: Headache, Mild discomfort
- **Expected Severity**: `low`
- **Expected Steps**: Rest, hydration, pain management
- **Expected Warnings**: Do not ignore if symptoms worsen

#### Test 3: Minor Burn
- **Situation**: Person accidentally touched hot stove and got minor burn on hand
- **Symptoms**: Mild redness, Slight pain on finger
- **Expected Severity**: `medium`
- **Expected Steps**: Cool with water, apply topical treatment, monitor
- **Expected Warnings**: Do not apply ice directly, do not pop blisters if formed

---

### 🟡 MEDIUM Level Tests

#### Test 4: Moderate Allergic Reaction
- **Situation**: Person ate peanuts and has allergic reaction with swelling
- **Symptoms**: Face swelling, Itching, Difficulty swallowing, Hives on skin
- **Expected Severity**: `high`
- **Expected Steps**: Get antihistamine, call doctor, monitor airway
- **Expected Warnings**: Do NOT ignore swelling, do NOT eat more allergens, watch for breathing difficulty

#### Test 5: Chest Discomfort
- **Situation**: Person experiencing chest pain after physical activity
- **Symptoms**: Chest pain, Shortness of breath, Mild dizziness
- **Expected Severity**: `high`
- **Expected Steps**: Stop activity, sit/lie down, rest, monitor, call doctor if continues
- **Expected Warnings**: Do NOT dismiss as nothing, do NOT continue exercising, watch for worsening

#### Test 6: Moderate Bleeding
- **Situation**: Person has deep cut on arm with moderate bleeding
- **Symptoms**: Deep bleeding wound, Blood not stopping after 5 minutes, Visible wound
- **Expected Severity**: `high`
- **Expected Steps**: Apply direct pressure, elevate limb, apply clean bandage, seek medical attention
- **Expected Warnings**: Do NOT remove dressings to check, do NOT apply tourniquet without training

---

### 🔴 HARD Level Tests

#### Test 7: Unconscious Patient
- **Situation**: Person found unconscious on ground, not responding to stimuli
- **Symptoms**: Unconscious, Not responding to voice or touch, Shallow breathing
- **Expected Severity**: `critical`
- **Expected Steps**: Call 911 immediately, check breathing, position in recovery position, monitor vitals
- **Expected Warnings**: Do NOT move spine unnecessarily, do NOT leave unattended, do NOT give fluids

#### Test 8: Severe Allergic Reaction (Anaphylaxis)
- **Situation**: Person in severe anaphylactic shock from bee sting
- **Symptoms**: Severe throat swelling, Cannot breathe, Losing consciousness, Severe facial swelling
- **Expected Severity**: `critical`
- **Expected Steps**: Use EpiPen if available, call 911 immediately, position lying down with legs elevated, prepare for airway support
- **Expected Warnings**: Do NOT delay calling 911, do NOT delay using EpiPen, do NOT place in upright position

#### Test 9: Heavy Bleeding with Shock
- **Situation**: Person has severe laceration with heavy bleeding and signs of shock
- **Symptoms**: Heavy bleeding that won't stop, Pale skin, Weak pulse, Confusion
- **Expected Severity**: `critical`
- **Expected Steps**: Call 911 immediately, apply direct pressure, elevate legs if possible, keep warm, monitor consciousness
- **Expected Warnings**: Do NOT remove bandages, do NOT apply tourniquet without severe need, do NOT move patient unnecessarily

---

## How to Run Tests

### Option 1: Browser Interface (Recommended)
1. Go to `http://localhost:3000/test`
2. Click "Run All Tests"
3. Watch real-time results appear
4. See success/failure status for each test

**Advantages**:
- Visual, easy to understand
- Real-time progress
- Detailed response inspection
- No command line needed

### Option 2: Node.js CLI
1. Open terminal in project directory
2. Run: `node scripts/test-emergency.mjs`
3. Wait for all 9 tests to complete
4. Review console output with detailed results

**Advantages**:
- Scriptable/automatable
- Integration-friendly
- Detailed logging
- Perfect for CI/CD

### Option 3: TypeScript (Development)
1. Run: `npx ts-node test-emergency-api.ts`
2. Review detailed TypeScript-based output

---

## Expected Results

### Success Criteria

Each test is considered **PASSED** when:
1. API responds with status 200
2. Severity level matches expected value
3. Steps array contains actionable guidance
4. Warnings array contains safety information
5. Confidence score is > 0

### Success Thresholds

- **All Tests Passed**: 9/9 (100%) - Model is working perfectly
- **Most Tests Passed**: 7-8/9 (78-89%) - Model is working well
- **Some Tests Passed**: 5-6/9 (56-67%) - Model needs adjustment
- **Few Tests Passed**: <5/9 (<56%) - Model needs significant work

---

## What Each Response Should Include

### Response Fields

```json
{
  "severity": "critical|high|medium|low",
  "steps": ["step 1", "step 2", ...],
  "warnings": ["don't do this", "avoid that", ...],
  "comfort": ["advice to reduce pain", ...],
  "emergency": "when to call 911 or go to hospital",
  "confidence": 75
}
```

### Field Requirements

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `severity` | string | ✅ | Must be: critical, high, medium, or low |
| `steps` | array | ✅ | 3-8 actionable steps, specific to situation |
| `warnings` | array | ✅ | 2-5 clear "do NOT" instructions |
| `comfort` | array | ✅ | Pain/discomfort management advice |
| `emergency` | string | ✅ | When to seek professional medical help |
| `confidence` | number | ✅ | 0-100, how confident in diagnosis |

---

## Interpreting Results

### Red Flags 🚨

If you see these issues, the model may need adjustment:
- **Wrong Severity**: Test detects "high" when should be "critical"
- **Missing Steps**: Steps array is empty or has < 3 items
- **Vague Warnings**: Warnings are too generic or not helpful
- **Low Confidence**: Confidence < 50% on clear scenarios
- **API Errors**: 500 status or parsing errors

### Common Issues & Fixes

**Issue**: "Cannot read properties of undefined"
- **Cause**: API response missing expected fields
- **Fix**: Check API route response validation

**Issue**: Wrong severity detected
- **Cause**: Model not trained properly on scenarios
- **Fix**: May need fine-tuning with more examples

**Issue**: Steps are generic/unhelpful
- **Cause**: Model not being specific to situation
- **Fix**: Improve prompt, add more training data

---

## Test Execution Timeline

```
EASY Tests (3 tests × 1.5s each) → ~4.5 seconds
  ├─ Minor Cut/Scrape
  ├─ Mild Headache  
  └─ Minor Burn

MEDIUM Tests (3 tests × 1.5s each) → ~4.5 seconds
  ├─ Moderate Allergic Reaction
  ├─ Chest Discomfort
  └─ Moderate Bleeding

HARD Tests (3 tests × 1.5s each) → ~4.5 seconds
  ├─ Unconscious Patient
  ├─ Severe Allergic Reaction
  └─ Heavy Bleeding with Shock

TOTAL TIME: ~15 seconds (including delays)
```

---

## Troubleshooting

### "Connection refused" error
- **Cause**: App not running
- **Fix**: Start app with `npm run dev`

### "API Error: 404"
- **Cause**: Test route doesn't exist
- **Fix**: Ensure `/api/analyze` route is created

### All tests failing
- **Cause**: HF_API_KEY not set
- **Fix**: Add your Hugging Face API key to environment variables

### Inconsistent results
- **Cause**: Model responses vary between calls
- **Fix**: Normal - Mistral has some randomness. Run multiple times.

---

## Next Steps

After testing:

1. **If all tests pass**: Model is production-ready!
2. **If some fail**: Note which scenarios fail and why
3. **If many fail**: Consider:
   - Fine-tuning the model with more examples
   - Adjusting the system prompt
   - Using a more capable base model

---

## Integration with CI/CD

To run tests in GitHub Actions or similar:

```bash
#!/bin/bash

# Start server in background
npm run dev &
DEV_PID=$!

# Wait for server to be ready
sleep 5

# Run tests
node scripts/test-emergency.mjs

# Check exit code
TEST_RESULT=$?

# Kill dev server
kill $DEV_PID

exit $TEST_RESULT
```

---

## Test Data Reference

All test data is structured JSON with consistent format:

```typescript
{
  level: 'easy' | 'medium' | 'hard',
  name: string,
  situation: string,
  symptoms: string[],
  expectedSeverity: string,
}
```

Found in:
- `/app/test/page.tsx` - Browser tests
- `/scripts/test-emergency.mjs` - CLI tests
- `/test-emergency-api.ts` - TypeScript definitions
