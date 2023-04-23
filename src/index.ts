import {ReversePolishNotationCalculator} from './reverse-polish-notation-calculator';

const calculator = ReversePolishNotationCalculator.getInstance();

const testExpressions: {expression: string; expectedAnswer: number}[] = [
  {expression: '10 3 +', expectedAnswer: 13},
  {expression: '10 3 2 + -', expectedAnswer: 5},
  {expression: '10 3 * 2 ^', expectedAnswer: 900},
  {expression: '10     -3      +', expectedAnswer: 7},
  {expression: '2 4 * 8 +', expectedAnswer: 16},
  {expression: '2 4 * 8 + -1 *', expectedAnswer: -16},
  {expression: '2 4 8 + *', expectedAnswer: 24},
  {expression: '3 2 * 11 -', expectedAnswer: -5},
  {expression: '2 5 * 4 + 3 2 * 1 + /', expectedAnswer: 2},
  {expression: '3 4 - 5 +', expectedAnswer: 4},
  {expression: '5 1 2 + 4 * + 3 -', expectedAnswer: 14},
  {expression: '39 6 + tan', expectedAnswer: 1},
  {expression: ' 3 0.14 +  ', expectedAnswer: 3.14},
  {expression: '3 4 - 5 + 10 * cos', expectedAnswer: 0.77},
  {expression: '50 4 3 * 2 - + 7 8 * 4 / -', expectedAnswer: 46},
  {expression: '2 15 * sin 8 * 5 + 45 tan 2 + /', expectedAnswer: 3},
  {expression: '2 15 * sin 8 * 5 + 45 tan 2 + / 0 *', expectedAnswer: 0},
];

for (const testExpression of testExpressions) {
  const {expression, expectedAnswer} = testExpression;
  const result = calculator.evaluateExpression(expression);

  console.log(`Result of '${expression}' is `, result);
  console.log(
    `${
      expectedAnswer === result
        ? 'CORRECT \n'
        : `INCORRECT, expected ${expectedAnswer}, real ${result} \n`
    }`
  );
}
