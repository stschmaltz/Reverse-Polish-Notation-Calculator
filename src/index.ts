import {Calculator} from './calculator';

const calculator = Calculator.getInstance();

console.log(calculator.evaluateReversePolishNotationExpression('10 3 +'));

// 10 3 +
// 13

// 10 3 2 + -
// 5

// 10 3 * 2 ^
// 900
