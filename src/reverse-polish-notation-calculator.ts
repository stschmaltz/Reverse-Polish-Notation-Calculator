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
    const expressionElements: string[] = expression.split(' ');

    const result = expressionElements.reduce(
      (stack: number[], element: string) => {
        if (this.isOperand(element)) {
          return this.processOperand(stack, Number(element));
        } else if (this.isOperator(element)) {
          return this.processOperator(stack, element);
        } else {
          throw new Error(
            `Invalid RPN expression, invalid element: ${element}`
          );
        }
      },
      []
    );

    if (result.length !== 1) {
      throw new Error(
        `Invalid RPN expression, expected a single result: ${result}`
      );
    }

    return result[0];
  }

  private isOperand(element: string): boolean {
    return !isNaN(Number(element));
  }

  private isOperator(element: string): element is Operator {
    return Object.values(Operator).includes(element as Operator);
  }

  private processOperand(stack: number[], operand: number): number[] {
    // push the operand onto the stack
    return [...stack, operand];
  }

  private processOperator(stack: number[], operator: Operator): number[] {
    const requiredNumberOfOperands =
      this.operatorLogicHandler.getRequiredNumberOfOperands(operator);
    if (stack.length < requiredNumberOfOperands) {
      throw new Error(
        `Invalid RPN expression, not enough operands for operator: ${operator}`
      );
    }

    const operands = stack.slice(-requiredNumberOfOperands);
    const result = this.operatorLogicHandler.performOperation(
      operator,
      ...operands
    );

    // pop operands off the stack and push the result
    return [...stack.slice(0, -requiredNumberOfOperands), result];
  }
}

export {ReversePolishNotationCalculator};
