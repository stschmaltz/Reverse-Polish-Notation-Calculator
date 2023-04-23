import {reveal, stub} from 'jest-auto-stub';

import {OperatorLogicHandler} from '../../src/operator-logic-handler';
import {ReversePolishNotationCalculator} from '../../src/reverse-polish-notation-calculator';

describe('ReversePolishNotationCalculator', () => {
  const stubOperatorLogicHandler = stub<OperatorLogicHandler>();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  const calculator = new ReversePolishNotationCalculator(
    stubOperatorLogicHandler
  );

  describe('evaluateExpression', () => {
    describe('happy path', () => {
      test('should return 0 if the expression is empty', () => {
        const result = calculator.evaluateExpression('');

        expect(result).toEqual(0);
      });

      test('should return the operand if the expression is a single operand', () => {
        const result = calculator.evaluateExpression('1');

        expect(result).toEqual(1);
      });

      describe('when there is a single operator', () => {
        beforeEach(() => {
          reveal(stubOperatorLogicHandler).performOperation.mockReturnValueOnce(
            2
          );
          reveal(
            stubOperatorLogicHandler
          ).getRequiredNumberOfOperands.mockReturnValueOnce(2);
        });

        test('should return the result of the operation if the expression is a single operation', () => {
          const result = calculator.evaluateExpression('1 1 +');

          expect(result).toEqual(2);
        });

        test('should call the OperatorLogicHandler.getRequiredNumberOfOperands method with the correct arguments', () => {
          calculator.evaluateExpression('1 1 +');

          expect(
            stubOperatorLogicHandler.getRequiredNumberOfOperands
          ).toHaveBeenCalledTimes(1);
          expect(
            stubOperatorLogicHandler.getRequiredNumberOfOperands
          ).toHaveBeenCalledWith('+');
        });

        test('should call the OperatorLogicHandler.performOperation method with the correct arguments', () => {
          calculator.evaluateExpression('1 1 +');

          expect(
            stubOperatorLogicHandler.performOperation
          ).toHaveBeenCalledTimes(1);
          expect(
            stubOperatorLogicHandler.performOperation
          ).toHaveBeenCalledWith('+', 1, 1);
        });
      });

      describe('when there are multiple operators', () => {
        beforeEach(() => {
          reveal(stubOperatorLogicHandler).performOperation.mockReturnValueOnce(
            2
          );
          reveal(stubOperatorLogicHandler).performOperation.mockReturnValueOnce(
            6
          );
          reveal(
            stubOperatorLogicHandler
          ).getRequiredNumberOfOperands.mockReturnValueOnce(2);
          reveal(
            stubOperatorLogicHandler
          ).getRequiredNumberOfOperands.mockReturnValueOnce(2);
        });

        test('should return the result of the expression', () => {
          const result = calculator.evaluateExpression('1 1 + 2 *');

          expect(result).toEqual(6);
        });

        test('should call the OperatorLogicHandler.getRequiredNumberOfOperands method for each operator with the correct arguments', () => {
          calculator.evaluateExpression('1 1 + 2 *');

          expect(
            stubOperatorLogicHandler.getRequiredNumberOfOperands
          ).toHaveBeenCalledTimes(2);
          expect(
            stubOperatorLogicHandler.getRequiredNumberOfOperands
          ).toHaveBeenCalledWith('+');
          expect(
            stubOperatorLogicHandler.getRequiredNumberOfOperands
          ).toHaveBeenCalledWith('*');
        });

        test('should call the OperatorLogicHandler.performOperation method for each operator with the correct arguments', () => {
          calculator.evaluateExpression('1 1 + 2 *');

          expect(
            stubOperatorLogicHandler.performOperation
          ).toHaveBeenCalledTimes(2);
          expect(
            stubOperatorLogicHandler.performOperation
          ).toHaveBeenCalledWith('+', 1, 1);
          expect(
            stubOperatorLogicHandler.performOperation
          ).toHaveBeenCalledWith('*', 2, 2);
        });
      });

      test('should support operations that require one operand', () => {
        reveal(stubOperatorLogicHandler).performOperation.mockReturnValueOnce(
          1
        );
        reveal(
          stubOperatorLogicHandler
        ).getRequiredNumberOfOperands.mockReturnValueOnce(1);
        reveal(stubOperatorLogicHandler).performOperation.mockReturnValueOnce(
          3
        );
        reveal(
          stubOperatorLogicHandler
        ).getRequiredNumberOfOperands.mockReturnValueOnce(2);

        const result = calculator.evaluateExpression('45 tan 2 + ');

        expect(result).toEqual(3);
      });

      test('handles extra white space gracefully', () => {
        reveal(stubOperatorLogicHandler).performOperation.mockReturnValueOnce(
          2
        );
        reveal(
          stubOperatorLogicHandler
        ).getRequiredNumberOfOperands.mockReturnValueOnce(2);

        const result = calculator.evaluateExpression('  1   1 +       ');

        expect(result).toEqual(2);
      });
    });

    describe('error cases', () => {
      beforeEach(() => {
        reveal(stubOperatorLogicHandler).performOperation.mockReturnValueOnce(
          2
        );
        reveal(
          stubOperatorLogicHandler
        ).getRequiredNumberOfOperands.mockReturnValueOnce(2);
      });

      test('should throw an error if the expression is invalid (no operators)', () => {
        expect(() => calculator.evaluateExpression('1 1')).toThrowError(
          'Invalid RPN expression, expected a single result: 1,1'
        );
      });

      test('should throw an error if the expression contains letters', () => {
        expect(() => calculator.evaluateExpression('1 a +')).toThrowError(
          'Invalid RPN expression, invalid element: a'
        );
      });

      test('should throw an error if the expression contains invalid operators', () => {
        expect(() => calculator.evaluateExpression('1 1 %')).toThrowError(
          'Invalid RPN expression, invalid element: %'
        );
      });

      test('should throw an error if stack does not have enough operands for a required operation', () => {
        expect(() => calculator.evaluateExpression('1 +')).toThrowError(
          'Invalid RPN expression, not enough operands for operator: +'
        );
      });
    });
  });

  describe('getInstance', () => {
    test('should return the same instance of the calculator', () => {
      const instance1 = ReversePolishNotationCalculator.getInstance();
      const instance2 = ReversePolishNotationCalculator.getInstance();

      expect(instance1).toBe(instance2);
    });
  });
});
