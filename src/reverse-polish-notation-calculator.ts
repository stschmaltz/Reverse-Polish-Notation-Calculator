import {Operator, OperatorLogicHandler} from './operator-logic-hander';

class ReversePolishNotationCalculator {
  private static instance: ReversePolishNotationCalculator;

  constructor(
    private operatorLogicHandler: OperatorLogicHandler = new OperatorLogicHandler()
  ) {}

  public static getInstance(): ReversePolishNotationCalculator {
    if (!ReversePolishNotationCalculator.instance) {
      ReversePolishNotationCalculator.instance =
        new ReversePolishNotationCalculator();
    }
    return ReversePolishNotationCalculator.instance;
  }

  public evaluateExpression(expression: string): number {
    const stack: number[] = [];
    const elements: string[] = expression.split(' ');

    for (const element of elements) {
      if (this.isOperand(element)) {
        stack.push(Number(element));
      } else if (this.isOperator(element)) {
        const numberOfOperands =
          this.operatorLogicHandler.getNumberOfOperands(element);
        if (stack.length < numberOfOperands) {
          throw new Error(
            `Invalid RPN expression, not enough operands for operator: ${element}`
          );
        }

        const operands = stack.slice(-numberOfOperands);

        const result = this.operatorLogicHandler.performOperation(
          element,
          ...operands
        );
        stack.push(result);
      } else {
        throw new Error(`Invalid RPN expression, invalid element: ${element}`);
      }
    }

    if (stack.length !== 1) {
      throw new Error(
        `Invalid RPN expression, expected a single result: ${stack}`
      );
    }

    return stack[0];
  }

  private isOperand(element: string): boolean {
    return !isNaN(Number(element));
  }

  private isOperator(element: string): element is Operator {
    return Object.values(Operator).includes(element as Operator);
  }
}

export {ReversePolishNotationCalculator};
