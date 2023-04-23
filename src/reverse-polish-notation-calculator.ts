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
        const operand2 = stack.pop();
        const operand1 = stack.pop();

        if (operand1 === undefined || operand2 === undefined) {
          throw new Error(
            `Invalid RPN expression, not enough operands for operator:${{
              operand1,
              operand2,
              element,
            }}`
          );
        }

        const result = this.operatorLogicHandler.performOperation(
          element,
          operand1,
          operand2
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
