import {Operator, OperatorLogicHandler} from '../../src/operator-logic-handler';

describe('OperatorLogicHandler', () => {
  const operatorLogicHandler = new OperatorLogicHandler();

  describe('performOperation', () => {
    describe('when the input is bad', () => {
      test('should throw an error if the operator is not supported', () => {
        expect(() =>
          operatorLogicHandler.performOperation('sqrt' as Operator, 1)
        ).toThrowError('Invalid operator: sqrt');
      });

      test('should throw an error if the number of operands is incorrect', () => {
        expect(() =>
          operatorLogicHandler.performOperation(Operator.ADDITION, 1)
        ).toThrowError('Invalid number of operands for operator: +');
      });
    });

    describe('when the operator is ADDITION', () => {
      test('should add two numbers', () => {
        expect(
          operatorLogicHandler.performOperation(Operator.ADDITION, 1, 2)
        ).toBe(3);
      });

      test('should support negative operands', () => {
        expect(
          operatorLogicHandler.performOperation(Operator.ADDITION, -1, 2)
        ).toBe(1);
      });
    });

    describe('when the operator is SUBTRACTION', () => {
      test('should subtract two numbers', () => {
        expect(
          operatorLogicHandler.performOperation(Operator.SUBTRACTION, 8, 2)
        ).toBe(6);
      });

      test('should support negative results', () => {
        expect(
          operatorLogicHandler.performOperation(Operator.SUBTRACTION, 8, 12)
        ).toBe(-4);
      });

      test('should support negative operands', () => {
        expect(
          operatorLogicHandler.performOperation(Operator.SUBTRACTION, -1, -2)
        ).toBe(1);
      });
    });

    describe('when the operator is MULTIPLICATION', () => {
      test('should multiply two numbers', () => {
        expect(
          operatorLogicHandler.performOperation(Operator.MULTIPLICATION, 22, 3)
        ).toBe(66);
      });

      test('should support negative operands', () => {
        expect(
          operatorLogicHandler.performOperation(Operator.MULTIPLICATION, -2, 12)
        ).toBe(-24);
      });
    });

    describe('when the operator is DIVISION', () => {
      test('should divide two numbers', () => {
        expect(
          operatorLogicHandler.performOperation(Operator.DIVISION, 22, 2)
        ).toBe(11);
      });

      test('should support negative operands', () => {
        expect(
          operatorLogicHandler.performOperation(Operator.DIVISION, -22, 2)
        ).toBe(-11);
      });

      test('should throw an error if the divisor is 0', () => {
        expect(() =>
          operatorLogicHandler.performOperation(Operator.DIVISION, 22, 0)
        ).toThrow('Division by 0 is not supported');
      });
    });

    describe('when the operator is EXPONENTIATION', () => {
      test('should exponentiate two numbers', () => {
        expect(
          operatorLogicHandler.performOperation(Operator.EXPONENTIATION, 2, 3)
        ).toBe(8);
      });

      test('should support negative operands', () => {
        expect(
          operatorLogicHandler.performOperation(Operator.EXPONENTIATION, -2, 3)
        ).toBe(-8);
      });
    });

    describe('when the operator is SINE', () => {
      test('should return the sine of the operand', () => {
        expect(operatorLogicHandler.performOperation(Operator.SINE, 90)).toBe(
          1
        );
      });

      test('should support negative operands', () => {
        expect(operatorLogicHandler.performOperation(Operator.SINE, -90)).toBe(
          -1
        );
      });
    });

    describe('when the operator is COSINE', () => {
      test('should return the cosine of the operand', () => {
        expect(
          operatorLogicHandler.performOperation(Operator.COSINE, 90)
        ).toBeCloseTo(0);
      });

      test('should support negative operands', () => {
        expect(
          operatorLogicHandler.performOperation(Operator.COSINE, -90)
        ).toBeCloseTo(0);
      });
    });

    describe('when the operator is TANGENT', () => {
      test('should return the tangent of the operand', () => {
        expect(
          operatorLogicHandler.performOperation(Operator.TANGENT, 45)
        ).toBeCloseTo(1);
      });

      test('should support negative operands', () => {
        expect(
          operatorLogicHandler.performOperation(Operator.TANGENT, -45)
        ).toBeCloseTo(-1);
      });
    });
  });

  describe('getRequiredNumberOfOperands', () => {
    test('should return 2 for addition', () => {
      expect(
        operatorLogicHandler.getRequiredNumberOfOperands(Operator.ADDITION)
      ).toBe(2);
    });

    test('should return 2 for subtraction', () => {
      expect(
        operatorLogicHandler.getRequiredNumberOfOperands(Operator.SUBTRACTION)
      ).toBe(2);
    });

    test('should return 2 for multiplication', () => {
      expect(
        operatorLogicHandler.getRequiredNumberOfOperands(
          Operator.MULTIPLICATION
        )
      ).toBe(2);
    });

    test('should return 2 for division', () => {
      expect(
        operatorLogicHandler.getRequiredNumberOfOperands(Operator.DIVISION)
      ).toBe(2);
    });

    test('should return 2 for exponentiation', () => {
      expect(
        operatorLogicHandler.getRequiredNumberOfOperands(
          Operator.EXPONENTIATION
        )
      ).toBe(2);
    });

    test('should return 1 for sine', () => {
      expect(
        operatorLogicHandler.getRequiredNumberOfOperands(Operator.SINE)
      ).toBe(1);
    });

    test('should return 1 for cosine', () => {
      expect(
        operatorLogicHandler.getRequiredNumberOfOperands(Operator.COSINE)
      ).toBe(1);
    });

    test('should return 1 for tangent', () => {
      expect(
        operatorLogicHandler.getRequiredNumberOfOperands(Operator.TANGENT)
      ).toBe(1);
    });
  });
});
