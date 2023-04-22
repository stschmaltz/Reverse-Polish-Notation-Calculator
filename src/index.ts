import {Calculator} from './calculator';

const calculator = Calculator.getInstance();

const testExpressions = ['10 3 +'];

for (const expression of testExpressions) {
  const result = calculator.evaluateReversePolishNotationExpression(expression);

  console.log(`Result of Expression '${expression}' is `, result);
}

// 10 3 +
// 13

// 10 3 2 + -
// 5

// 10 3 * 2 ^
// 900
