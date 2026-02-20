/**
 * Tests the logic within scripts/analyze_impact.js
 * Since the script is a standalone CLI, we test the core logic patterns used.
 */

describe('Impact Analysis Script Logic', () => {
  const highImpactPatterns = [
    'package.json',
    'pnpm-lock.yaml',
    'yarn.lock',
    'tsconfig.json',
    'jest.config.js'
  ];

  const getImportRegex = (moduleName: string) => 
    new RegExp(`from\\s+['"]\\.\\./lib/${moduleName}(?:\\.ts)?['"]`);

  test('highImpactPatterns should match root configuration files', () => {
    const changedFiles = ['package.json', 'src/index.ts'];
    const triggersAll = changedFiles.some(file =>
      highImpactPatterns.some(pattern => file.includes(pattern))
    );
    expect(triggersAll).toBe(true);
  });

  test('highImpactPatterns should not match random lib files', () => {
    const changedFiles = ['lib/todoFilter.ts'];
    const triggersAll = changedFiles.some(file =>
      highImpactPatterns.some(pattern => file.includes(pattern))
    );
    expect(triggersAll).toBe(false);
  });

  describe('Import Regex Matching', () => {
    const todoFilterRegex = getImportRegex('todoFilter');

    test('should match standard relative imports', () => {
      const content = "import { filterTodos } from '../lib/todoFilter';";
      expect(todoFilterRegex.test(content)).toBe(true);
    });

    test('should match imports with double quotes', () => {
      const content = 'import { filterTodos } from "../lib/todoFilter";';
      expect(todoFilterRegex.test(content)).toBe(true);
    });

    test('should match imports with .ts extension', () => {
      const content = "import { filterTodos } from '../lib/todoFilter.ts';";
      expect(todoFilterRegex.test(content)).toBe(true);
    });

    test('should match multiline imports', () => {
      const content = `
        import {
          filterTodos
        } from '../lib/todoFilter';
      `;
      expect(todoFilterRegex.test(content)).toBe(true);
    });

    test('should not match unrelated lib imports', () => {
      const content = "import { validate } from '../lib/todoValidator';";
      expect(todoFilterRegex.test(content)).toBe(false);
    });
  });
});