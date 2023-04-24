# Reverse Polish Notation Calculator

This is a Reverse Polish Notation (RPN) calculator built using TypeScript. It supports the following operators: `+`, `-`, `*`, `/`, `^`, `cos`, `sin`, `tan`. The trigonometric functions expect the operand to be in degrees.

## Prerequisites

To run the project, you need to have Node.js installed. You can download Node.js from [https://nodejs.org/](https://nodejs.org/).

## Installation

1. Clone the repository:

```
git clone https://github.com/your-repo-url/rpn-calculator.git
```

2. Install the dependencies:

```
cd rpn-calculator
npm install
```

## Usage

To run the calculator, execute the following command:

```
npm run start
```

This will evaluate the test expressions provided in `src/index.ts` and print the results.

To use the calculator with custom expressions, you can modify the `testExpressions` array in `src/index.ts` and then run `npm run start`.

## Running tests

To run the test suite, execute the following command:

```
npm run test
```

## Linting and Code Formatting

To check for linting issues, run:

```
npm run lint
```

To automatically fix linting and formatting issues, run:

```
npm run fix
```

## Building

To compile the TypeScript files into JavaScript, run:

```
npm run compile
```

This will generate the compiled JavaScript files in the `build` directory.

## License

This project is licensed under the [MIT License](LICENSE).
