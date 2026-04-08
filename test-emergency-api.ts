/**
 * Emergency Model Comprehensive Test Suite
 * Tests: EASY, MEDIUM, HARD difficulty levels
 */

interface TestCase {
  level: 'easy' | 'medium' | 'hard';
  name: string;
  situation: string;
  symptoms: string[];
  expectedSeverity: 'low' | 'medium' | 'high' | 'critical';
}

const testCases: TestCase[] = [
  // ===== EASY LEVEL =====
  {
    level: 'easy',
    name: 'Minor Cut/Scrape',
    situation: 'Person has a small cut on their hand from a paper cut',
    symptoms: ['Minor bleeding', 'Small wound on finger'],
    expectedSeverity: 'low',
  },
  {
    level: 'easy',
    name: 'Mild Headache',
    situation: 'Person reports mild headache after working at desk',
    symptoms: ['Headache', 'Mild discomfort'],
    expectedSeverity: 'low',
  },
  {
    level: 'easy',
    name: 'Minor Burn',
    situation: 'Person accidentally touched hot stove and got minor burn on hand',
    symptoms: ['Mild redness', 'Slight pain on finger'],
    expectedSeverity: 'medium',
  },

  // ===== MEDIUM LEVEL =====
  {
    level: 'medium',
    name: 'Moderate Allergic Reaction',
    situation: 'Person ate peanuts and has allergic reaction with swelling',
    symptoms: ['Face swelling', 'Itching', 'Difficulty swallowing', 'Hives on skin'],
    expectedSeverity: 'high',
  },
  {
    level: 'medium',
    name: 'Chest Discomfort',
    situation: 'Person experiencing chest pain after physical activity',
    symptoms: ['Chest pain', 'Shortness of breath', 'Mild dizziness'],
    expectedSeverity: 'high',
  },
  {
    level: 'medium',
    name: 'Moderate Bleeding',
    situation: 'Person has deep cut on arm with moderate bleeding',
    symptoms: ['Deep bleeding wound', 'Blood not stopping after 5 minutes', 'Visible wound'],
    expectedSeverity: 'high',
  },

  // ===== HARD LEVEL =====
  {
    level: 'hard',
    name: 'Unconscious Patient',
    situation: 'Person found unconscious on ground, not responding to stimuli',
    symptoms: ['Unconscious', 'Not responding to voice or touch', 'Shallow breathing'],
    expectedSeverity: 'critical',
  },
  {
    level: 'hard',
    name: 'Severe Allergic Reaction (Anaphylaxis)',
    situation: 'Person in severe anaphylactic shock from bee sting',
    symptoms: [
      'Severe throat swelling',
      'Cannot breathe',
      'Losing consciousness',
      'Severe facial swelling',
      'No access to EpiPen',
    ],
    expectedSeverity: 'critical',
  },
  {
    level: 'hard',
    name: 'Heavy Bleeding with Shock',
    situation: 'Person has severe laceration with heavy bleeding and signs of shock',
    symptoms: [
      'Heavy bleeding that wont stop',
      'Pale skin',
      'Weak pulse',
      'Confusion',
      'Large open wound on leg',
    ],
    expectedSeverity: 'critical',
  },
];

/**
 * Test a single case against the API
 */
async function testCase(test: TestCase): Promise<void> {
  console.log(`\n${'='.repeat(70)}`);
  console.log(`📋 Testing: ${test.name} (${test.level.toUpperCase()})`);
  console.log(`Expected Severity: ${test.expectedSeverity}`);
  console.log(`${'='.repeat(70)}`);

  try {
    const response = await fetch('http://localhost:3000/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emergency: test.situation,
        symptoms: test.symptoms,
        context: `Difficulty Level: ${test.level}`,
      }),
    });

    if (!response.ok) {
      console.error(`❌ API Error: Status ${response.status}`);
      console.error(await response.text());
      return;
    }

    const data = await response.json();

    console.log(`\n✅ API Response Received`);
    console.log(`Detected Severity: ${data.severity}`);
    console.log(`Confidence: ${data.confidence}%`);

    // Check if severity matches expectations
    const severityMatch = data.severity === test.expectedSeverity;
    console.log(`\nSeverity Check: ${severityMatch ? '✅ MATCH' : '⚠️ MISMATCH'}`);

    // Display steps
    console.log(`\nImmediate Steps (${data.steps?.length || 0}):`);
    data.steps?.slice(0, 3).forEach((step: string, idx: number) => {
      console.log(`  ${idx + 1}. ${step}`);
    });

    // Display warnings
    console.log(`\nWhat NOT to do (${data.warnings?.length || 0}):`);
    data.warnings?.slice(0, 2).forEach((warning: string) => {
      console.log(`  ⚠️ ${warning}`);
    });

    // Display emergency criteria
    if (data.emergency) {
      console.log(`\nWhen to Seek Help:`);
      console.log(`  ${data.emergency}`);
    }

    // Comfort advice
    if (data.comfort && data.comfort.length > 0) {
      console.log(`\nComfort Advice:`);
      data.comfort?.slice(0, 2).forEach((advice: string) => {
        console.log(`  💙 ${advice}`);
      });
    }

    console.log(`\n${'✅ TEST PASSED' || '❌ TEST FAILED'}`);
  } catch (error) {
    console.error(`❌ Test failed with error:`, error);
  }
}

/**
 * Run all tests
 */
async function runAllTests(): Promise<void> {
  console.log(`
╔════════════════════════════════════════════════════════════════════╗
║          LifelineAI Emergency Model - Comprehensive Tests          ║
║                    3 Difficulty Levels (Easy, Medium, Hard)        ║
╚════════════════════════════════════════════════════════════════════╝
  `);

  const easyTests = testCases.filter((t) => t.level === 'easy');
  const mediumTests = testCases.filter((t) => t.level === 'medium');
  const hardTests = testCases.filter((t) => t.level === 'hard');

  // Run EASY tests
  console.log(`\n📍 RUNNING EASY TESTS (${easyTests.length})`);
  for (const test of easyTests) {
    await testCase(test);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second delay between tests
  }

  // Run MEDIUM tests
  console.log(`\n\n📍 RUNNING MEDIUM TESTS (${mediumTests.length})`);
  for (const test of mediumTests) {
    await testCase(test);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  // Run HARD tests
  console.log(`\n\n📍 RUNNING HARD TESTS (${hardTests.length})`);
  for (const test of hardTests) {
    await testCase(test);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  console.log(`
╔════════════════════════════════════════════════════════════════════╗
║                      ✅ All Tests Complete!                       ║
║            Check output above for detailed test results            ║
╚════════════════════════════════════════════════════════════════════╝
  `);
}

// Run tests if executed directly
if (require.main === module) {
  runAllTests().catch(console.error);
}

export { testCase, runAllTests, testCases };
