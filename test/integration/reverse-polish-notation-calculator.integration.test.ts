import {ReversePolishNotationCalculator} from '../../src/reverse-polish-notation-calculator';

/**
 * Interviewer Notes:
 * These tests are pseudo-integration tests, as they are testing the integration of the ReversePolishNotationCalculator class with the OperatorLogicHandler class.
 * They serve as a running regression suite without any mocking.
 * I wanted to include these to show how I would write unit tests while understanding the importance of testing the integration as well.
 * Typically I would explore using a different test framework more suited to integration testing (jest-cucumber for example) but for this example jest itself is sufficient.
 * I'd also built up "scenarios" rather than just a list of tests, but for this calculator this seemed like the most useful form of regression tests
 */
describe('ReversePolishNotationCalculator', () => {
  const calculator = ReversePolishNotationCalculator.getInstance();

  test('should return 0 for an empty expression', () => {
    const result = calculator.evaluateExpression('');

    expect(result).toEqual(0);
  });

  test('should return 13 if the expression is 10 3 +', () => {
    const result = calculator.evaluateExpression('10 3 +');

    expect(result).toEqual(13);
  });

  test('should return 5 if the expression is 10 3 2 + -', () => {
    const result = calculator.evaluateExpression('10 3 2 + -');

    expect(result).toEqual(5);
  });

  test('should return 900 if the expression is 10 3 * 2 ^', () => {
    const result = calculator.evaluateExpression('10 3 * 2 ^');

    expect(result).toEqual(900);
  });

  test('should return 7 if the expression is 10 -3 +', () => {
    const result = calculator.evaluateExpression('10 -3 +');

    expect(result).toEqual(7);
  });

  test('should return 16 if the expression is 2 4 * 8 +', () => {
    const result = calculator.evaluateExpression('2 4 * 8 +');

    expect(result).toEqual(16);
  });

  test('should return -16 if the expression is 2 4 * 8 + -1 *', () => {
    const result = calculator.evaluateExpression('2 4 * 8 + -1 *');

    expect(result).toEqual(-16);
  });

  test('should return 24 if the expression is 2 4 8 + *', () => {
    const result = calculator.evaluateExpression('2 4 8 + *');

    expect(result).toEqual(24);
  });

  test('should return -5 if the expression is 3 2 * 11 -', () => {
    const result = calculator.evaluateExpression('3 2 * 11 -');

    expect(result).toEqual(-5);
  });

  test('should return 2 if the expression is 2 5 * 4 + 3 2 * 1 + /', () => {
    const result = calculator.evaluateExpression('2 5 * 4 + 3 2 * 1 + /');

    expect(result).toEqual(2);
  });

  test('should return 4 if the expression is 3 4 - 5 +', () => {
    const result = calculator.evaluateExpression('3 4 - 5 +');

    expect(result).toEqual(4);
  });

  test('should return 14 if the expression is 5 1 2 + 4 * + 3 -', () => {
    const result = calculator.evaluateExpression('5 1 2 + 4 * + 3 -');

    expect(result).toEqual(14);
  });

  test('should return 1 if the expression is 39 6 + tan', () => {
    const result = calculator.evaluateExpression('39 6 + tan');

    expect(result).toEqual(1);
  });

  test('should return 3.14 if the expression is 3 0.14 +', () => {
    const result = calculator.evaluateExpression('3 0.14 +');

    expect(result).toEqual(3.14);
  });

  test('should return 0.77 if the expression is 3 4 - 5 + 10 * cos', () => {
    const result = calculator.evaluateExpression('3 4 - 5 + 10 * cos');

    expect(result).toEqual(0.77);
  });

  test('should return 46 if the expression is 50 4 3 * 2 - + 7 8 * 4 / -', () => {
    const result = calculator.evaluateExpression('50 4 3 * 2 - + 7 8 * 4 / -');

    expect(result).toEqual(46);
  });

  test('should return 3 if the expression is 2 15 * sin 8 * 5 + 45 tan 2 + /', () => {
    const result = calculator.evaluateExpression(
      '2 15 * sin 8 * 5 + 45 tan 2 + /'
    );

    expect(result).toEqual(3);
  });

  test('should return 0 if the expression is 2 15 * sin 8 * 5 + 45 tan 2 + / 0 *', () => {
    const result = calculator.evaluateExpression(
      '2 15 * sin 8 * 5 + 45 tan 2 + / 0 *'
    );

    expect(result).toEqual(0);
  });
});
