# Common Tools for Laravel & PHP Projects

This workflow ensures your code is consistently formatted and free of type/static analysis errors before sharing with your team.

## How to Use These Tools

- **Pint** (PHP) and **Prettier** (JS/TS/CSS) should be set up to run automatically on file save (autosave) in your code editor for instant code formatting.
- **Before pushing code to git**, always run:
  - `tsc` (TypeScript compiler) to check for TypeScript errors
  - `./vendor/bin/phpstan` (PHPStan) to check for PHP static analysis errors

---

This document lists essential tools used for code quality, formatting, and static analysis in Laravel and PHP projects.

---

## PHP & Laravel Tools

### PHPStan

- **Description:** Static analysis tool for PHP. It finds bugs in your code without running it, enforcing type safety and best practices. Integrates well with Laravel via [Larastan](https://github.com/nunomaduro/larastan).

#### PHPStan Levels

- **PHPStan** supports levels from 0 (most permissive) to 9 (most strict). Each higher level adds more checks and enforces stricter type safety and code quality.

| Level | Description                                                                       |
| ----- | --------------------------------------------------------------------------------- |
| 0     | Basic checks, minimal type safety.                                                |
| 1     | Reports undefined variables, unknown classes, and basic type errors.              |
| 2     | Checks for unknown methods and properties.                                        |
| 3     | Checks for missing type hints and more strict property/method checks.             |
| 4     | Requires type hints for function parameters and properties.                       |
| 5     | Enforces return type hints and stricter type checks.                              |
| 6     | Checks for correct types in arrays and generics.                                  |
| 7     | Enforces strictest type safety and code correctness.                              |
| 8     | Adds even more strictness around generics, templates, and advanced type features. |
| 9     | Maximum strictness, all rules enabled.                                            |

> **Recommendation:** Start with a lower level and increase as your codebase improves. Aim for level 8 or 9 for maximum type safety in mature projects.

### Laravel Pint

- **Description:** Official Laravel code style fixer built on top of PHP-CS-Fixer. Automatically formats your PHP code to follow the Laravel coding standards.

#### Example: Laravel Pint Configuration with Laravel Preset

To use Laravel Pint with the default Laravel coding standards, add a `pint.json` file to your project root:

```json
{
  "preset": "laravel"
}
```

- The `preset` option specifies the coding standard to use. The `laravel` preset applies the official Laravel style guide.
- You can customize further by adding rules or paths to this file as needed.

---

## TypeScript & Frontend Tools

### Prettier

- **Description:** An opinionated code formatter for JavaScript, TypeScript, CSS, JSON, Markdown, and more. Ensures consistent code style by automatically formatting files on save or commit.

#### Example: Prettier Configuration

A sample `.prettierrc` configuration for a modern JavaScript/TypeScript project:

```json
{
  "singleQuote": true,
  "semi": false,
  "tabWidth": 2,
  "printWidth": 100,
  "trailingComma": "es5",
  "jsxSingleQuote": true,
  "bracketSpacing": true,
  "singleAttributePerLine": true,
  "plugins": ["prettier-plugin-organize-imports", "prettier-plugin-tailwindcss"]
}
```

- `singleQuote`: Use single quotes instead of double quotes.
- `semi`: Omit semicolons at the end of statements.
- `tabWidth`: Set indentation width to 2 spaces.
- `printWidth`: Wrap lines at 100 characters.
- `trailingComma`: Use trailing commas where valid in ES5 (objects, arrays, etc.).
- `plugins`: Add plugins for organizing imports and formatting Tailwind CSS classes.

### ESLint

- **Description:** A pluggable linter for JavaScript and TypeScript. Identifies problematic patterns, potential bugs, and enforces coding standards in your JS/TS codebase.

#### Example: ESLint Configuration

A sample `.eslintrc.json` configuration for a React + TypeScript project:

```json
{
  "env": {
    "browser": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/no-unescaped-entities": "off"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
```

- `env`: Defines the environments (browser, node) for global variables.
- `extends`: Inherits recommended rules from ESLint, TypeScript, React, React Hooks, and Prettier.
- `parser`: Uses the TypeScript parser for ESLint.
- `rules`: Customizes or disables specific linting rules.
- `settings`: Auto-detects the React version for linting.

---

## Usage

- Use these tools in your CI pipeline and configure your IDE/editor to run them automatically for best results.
- For Laravel projects, combine PHPStan (with Larastan) and Pint for PHP, and Prettier/ESLint for frontend assets.
- **Enable spell checking in your IDE/editor** to catch typos and improve documentation quality:
  - **VSCode**: Install the "Code Spell Checker" extension and enable it for your workspace.
  - **IntelliJ**: Go to Settings → Editor → Spelling → and check "Enable spelling inspection" option.
