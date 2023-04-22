import {Calculator} from './calculator';

const calculator = Calculator.getInstance();

const testExpressions: {expression: string; expectedAnswer: number}[] = [
  {expression: '10 3 +', expectedAnswer: 13},
  {expression: '10 3 2 + -', expectedAnswer: 5},
  {expression: '10 3 * 2 ^', expectedAnswer: 900},
  {expression: '2 4 * 8 +', expectedAnswer: 16},
  {expression: '2 4 8 + *', expectedAnswer: 24},
  {expression: '3 2 * 11 -', expectedAnswer: -5},
  {expression: '2 5 * 4 + 3 2 * 1 + /', expectedAnswer: 2},
  {expression: '3 4 - 5 +', expectedAnswer: 4},
];

for (const testExpression of testExpressions) {
  const {expression, expectedAnswer} = testExpression;
  const result = calculator.evaluateReversePolishNotationExpression(expression);

  console.log(`Result of Expression '${expression}' is `, result);
  console.log(
    `${
      expectedAnswer === result
        ? 'CORRECT'
        : 'INCORRECT, expected ${expectedAnswer}, real ${result}'
    }`
  );
}

// 10 3 +
// 13

// 10 3 2 + -
// 5

// 10 3 * 2 ^
// 900
