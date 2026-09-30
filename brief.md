# CSC13008 IA#1 — cartTotal Task Brief

Complete the assignment task in the `wad-cart-starter` repository.

## Objective

Implement `cartTotal(items, options)` according to the repository specification, add specification-focused tests, add a dependency-free lint gate, and add CI that runs the required quality gates on every push.

## Allowed files

For this task, only modify or create these implementation/verification files:

- `src/cart.js`
- `test/cart.test.js`
- `package.json`
- `scripts/lint.mjs`
- `.github/workflows/ci.yml`

Do not modify unrelated source files.

Do not modify `AI-LOG.md` or `SELF_ASSESSMENT_REPORT.md` as part of the coding task.

## Contract

Implement:

```js
cartTotal(items, options)
```

with:

```js
items: [{ name, price, qty }]
options: { vatRate, freeShipFrom, shipFee }
```

Required behavior:

1. `subtotal` is the sum of `price * qty` for all items.
2. VAT is `vatRate * subtotal`.
3. Shipping is `0` when `subtotal >= freeShipFrom`.
4. Otherwise, shipping is `shipFee`.
5. Return `subtotal + VAT + shipping` as a **number**, rounded to the nearest whole đồng.
6. An empty cart returns `0`; it has no VAT and no shipping.
7. A negative `price` throws `RangeError`.
8. A `qty` that is not a positive integer throws `RangeError`.

Do not invent additional business rules that are not required by the repository specification.

## Worked example

Use:

```js
const items = [
  { name: 'Áo thun', price: 180000, qty: 2 },
  { name: 'Sổ tay', price: 45000, qty: 1 },
]

const options = {
  vatRate: 0.08,
  freeShipFrom: 500000,
  shipFee: 30000,
}
```

Expected result:

```js
467400
```

Breakdown:

```text
subtotal = 405000
VAT      = 32400
shipping = 30000
total    = 467400
```

## Required tests

Update `test/cart.test.js` so the test suite covers at least:

- the worked example returning `467400`
- an empty cart returning `0`
- the exact free-shipping threshold (`subtotal === freeShipFrom`) producing `0` shipping
- a negative price throwing `RangeError`
- an invalid quantity that is not a positive integer throwing `RangeError`

Prefer focused tests where each test has one clear reason to fail.

Tests must check the specification's observable result, not the implementation's internal structure.

## No-dependency constraint

Do not install or add third-party packages for this task.

Do not add ESLint, Prettier, Jest, or another third-party test/lint dependency.

Use the existing Node.js test setup and Node.js built-ins.

Do not return a formatted string such as the result of `toFixed()`; the function must return a number.

## Lint gate

Add a real executable lint gate:

```json
"lint": "node scripts/lint.mjs"
```

Create `scripts/lint.mjs`.

The lint script must inspect JavaScript files under `src/` and `test/` and fail with a non-zero exit code when it finds any of:

- JavaScript syntax errors
- trailing whitespace
- tab characters
- `console.log(...)`
- `debugger`
- `var` declarations

It should exit with code `0` when all inspected files pass.

## CI gate

Create `.github/workflows/ci.yml`.

The workflow must run on every `push` and execute both:

```bash
npm test
npm run lint
```

Keep the workflow minimal and use the repository's existing package setup.

## Validation

Before finishing, run:

```bash
npm test
npm run lint
```

Then inspect the final diff and verify that only the intended files changed.

Report:

- files changed
- implemented behavior
- tests added or updated
- result of `npm test`
- result of `npm run lint`
- CI workflow added or updated

Do not claim a command passed unless you actually ran it.
