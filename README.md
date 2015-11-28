# map-coverage
Generate coverage files from your source maps.

Very useful for modules built with Typescript, JSX, or anything that uses
a transpiler such as Babel or Traceur.

## Usage

Simply, `npm i --save-dev map-coverage` and then in `package.json`:

*(Replace `istanbul` with whatever you use)*

```json
{
  "scripts": {
    "coverage": "istanbul cover _mocha",
    "postcoverage": "map-coverage"
  }
}
```

You'll end up with a file **coverage/lcov-mapped.info**, given that you
have **coverage/lcov.info**.
