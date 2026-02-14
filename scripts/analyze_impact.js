const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const baseSha = process.argv[2];
const headSha = process.argv[3];

if (!baseSha || !headSha) {
  console.error("Usage: node analyze_impact.js <base_sha> <head_sha>");
  process.exit(1);
}

try {
  const diffOutput = execSync(`git diff --name-only ${baseSha} ${headSha}`).toString().trim();
  const changedFiles = diffOutput ? diffOutput.split('\n') : [];

  const allTestFiles = fs.readdirSync('tests')
    .filter(f => f.endsWith('.test.ts'))
    .map(f => `tests/${f}`);

  const impactedTests = new Set();

  // High-impact files trigger all tests
  // We exclude .github/workflows from this list to avoid running all tests when modifying the workflow itself,
  // honoring the user's request to only run impacted tests based on code changes.
  const highImpactPatterns = [
    'package.json',
    'pnpm-lock.yaml',
    'yarn.lock',
    'tsconfig.json',
    'jest.config.js'
  ];

  const triggersAll = changedFiles.some(file =>
    highImpactPatterns.some(pattern => file.includes(pattern))
  );

  if (triggersAll) {
    console.log(JSON.stringify({ impactedTests: allTestFiles, triggersAll: true }));
    process.exit(0);
  }

  changedFiles.forEach(file => {
    if (file.startsWith('tests/') && file.endsWith('.test.ts')) {
      impactedTests.add(file);
    } else if (file.startsWith('lib/')) {
      const moduleName = path.basename(file, '.ts'); // e.g., todoFilter

      allTestFiles.forEach(testPath => {
        // Skip files already added
        if (impactedTests.has(testPath)) return;

        try {
          const content = fs.readFileSync(testPath, 'utf-8');
          // Check for imports from the modified lib file
          // Matches: import ... from "../lib/moduleName"
          const importRegex = new RegExp(`from\\s+['"]\\.\\./lib/${moduleName}(?:\\.ts)?['"]`);

          if (importRegex.test(content)) {
            impactedTests.add(testPath);
          }
        } catch (e) {
          console.warn(`Could not read test file: ${testPath}`, e);
        }
      });
    }
  });

  console.log(JSON.stringify({ impactedTests: Array.from(impactedTests) }));

} catch (err) {
  console.error("Error analyzing impact:", err);
  process.exit(1);
}
