# rext

`rext` is a simple and convenient npm package for reversing strings. This package provides the following features:

- **Project Setup Command**: Easily initialize a project using `npx create-rext [project-name]`.
- **CLI Tool**: Perform string reversal operations directly from the command line.
- **Module Functionality**: Import the `reverseText` function for use in your programs.
- **TypeScript Support**: Includes type definitions for safe and efficient development.

## Installation

```shell
npx @yuu104/create-rext [project-name]
```

When executed, the following project structure will be automatically generated:

```text
<project-name>
├── node_modules/
├── reverse-output/           # Directory for storing reversed results
│   └── .gitkeep              # Keeps the folder under version control
├── texts/                    # Directory for input data
│   └── sample.json           # Sample input data
├── .gitignore
└── package.json
```

`texts/sample.json` contains the following:

```json
{
  "texts": ["hello", "world"]
}
```

## Usage

### 1. CLI Tool

The package provides a CLI tool that can be used within the project. Three commands are available:

#### **`rext reverse-console`**

Reverses the strings specified in a JSON file and displays the results in the console.

**Example:**

```shell
npx rext reverse-console texts/sample.json
```

**Output:**

```shell
hello -> olleh
world -> dlrow
typescript -> tpircsepyt
```

#### **`rext reverse-text`**

Saves the reversed results as a text file.

**Example:**

```shell
npx rext reverse-text texts/sample.json sample
```

**Generated File:** `reverse-output/sample.text`

```text
hello -> olleh
world -> dlrow
typescript -> tpircsepyt
```

#### **`rext reverse-json`**

Saves the reversed results as a JSON file.

**Example:**

```shell
npx rext reverse-json texts/sample.json sample
```

**Generated File:** `reverse-output/sample.json`

```json
{
  "hello": "olleh",
  "world": "dlrow",
  "typescript": "tpircsepyt"
}
```

### 2. Module Functionality

The `reverseText` function is provided as a module. TypeScript type definitions are included for safe and efficient usage.

```ts
/**
 * Reverses the given string.
 *
 * @param {string} text - The string to be reversed.
 * @returns {string} The reversed string.
 */
export declare function reverseText(text: string): string;
```

#### Example

```ts
import { reverseText } from "rext";

const original = "typescript";
const reversed = reverseText(original);
console.log(reversed); // => "tpircsepyt"
```

## For Developers

This package is built with TypeScript and includes type definitions. It is also a great resource for developers who want to learn how to create custom CLI tools or modules.

## License

ISC
