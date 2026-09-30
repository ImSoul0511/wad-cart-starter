# AGENTS.md

## Repository Working Rules

This file defines the general rules for agents working in this repository. Assignment-specific task details belong in `brief.md`.

## Repository Stack

This repository uses a small, dependency-free Node.js setup:

- JavaScript source files under `src/`
- JavaScript tests under `test/`
- npm scripts as the command entry point
- Node.js built-in test runner for tests
- Node.js built-in tooling for the lint gate
- GitHub Actions for continuous integration

Do not introduce a framework, package manager migration, or third-party tooling unless the task explicitly requires it.

## Scope Discipline

- Keep changes minimal and focused.
- Do not modify unrelated files.
- Prefer the smallest implementation that satisfies the stated specification.
- Preserve the existing project structure and conventions unless the task explicitly requires a change.
- Inspect the final diff before finishing.

## Dependencies

- Do not add third-party dependencies unless the task explicitly requires them.
- Prefer built-in Node.js functionality when a dependency-free solution is sufficient.
- Do not add a third-party test runner, formatter, or linter when the existing Node.js setup is sufficient.

## Correctness

- Implement the stated specification, not assumptions about the implementation.
- Tests must verify observable behavior rather than private implementation details.
- Keep tests focused so each test has a clear reason to fail.
- Do not weaken, delete, or rewrite tests merely to make incorrect code pass.
- Do not introduce unrelated refactors.

## Repository Harness

The repository must have a simple, reproducible quality gate that a new contributor can follow without knowing the implementation details.

### Commands

The canonical local commands are:

```bash
npm test
npm run lint
```

Both commands must be executable from the repository root.

### Gate behavior

- `npm test` is the behavior/test gate.
- `npm run lint` is the static-quality gate.
- A failed command must exit with a non-zero status.
- A passing command must exit with status `0`.
- The same gates used locally must also run in CI.

### Continuous Integration

GitHub Actions must run the repository quality gates on every `push`.

The CI workflow must run:

```bash
npm test
npm run lint
```

Do not create a CI workflow that only checks one of the gates.

### Project-specific lint policy

The dependency-free lint gate checks JavaScript files under `src/` and `test/` for:

- syntax errors
- trailing whitespace
- tab characters
- `console.log(...)`
- `debugger`
- `var` declarations

The lint implementation should use Node.js built-ins rather than adding a lint dependency.

## Verification

Before finishing a coding task:

1. Run the required test gate.
2. Run the required lint gate.
3. Inspect the final diff.
4. Confirm only intended files changed.
5. Report the commands that actually ran and their results.

Never claim that a command, test, lint check, or CI workflow passed unless it was actually verified.

## Never

- Never add an unnecessary dependency.
- Never change an API or function signature unless the task requires it.
- Never alter unrelated files for convenience.
- Never fabricate requirements that are not present in the task specification.
- Never hide a failing test or lint error.
- Never change tests solely to accommodate a broken implementation.
- Never bypass the repository's quality gates.
- Never claim work was performed when it was not actually performed.

## AI-Generated Work

When a task involves an AI assistant, keep assignment process records separate from repository rules.

Do not fabricate or rewrite personal process documentation such as `AI-LOG.md` or `SELF_ASSESSMENT_REPORT.md` unless explicitly asked to do so.
