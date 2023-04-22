import {Calculator} from './calculator';

const calc = new Calculator();

console.log(calc.evaluateReversePolishNotationExpression('10 3 +'));

// 10 3 +
// 13

// 10 3 2 + -
// 5

// 10 3 * 2 ^
// 900
