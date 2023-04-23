import {Operator, OperatorLogicHandler} from './operator-logic-hander';

class ReversePolishNotationCalculator {
  private static instance: ReversePolishNotationCalculator;

  constructor(
    private operatorLogicHandler: OperatorLogicHandler = new OperatorLogicHandler()
  ) {}

  /**
   * getInstance: Get the singleton instance of the ReversePolishNotationCalculator
   * @returns ReversePolishNotationCalculator - the singleton instance of the ReversePolishNotationCalculator
   */
  public static getInstance(): ReversePolishNotationCalculator {
    if (!ReversePolishNotationCalculator.instance) {
      ReversePolishNotationCalculator.instance =
        new ReversePolishNotationCalculator();
    }
    return ReversePolishNotationCalculator.instance;
  }

  /**
   * evaluateExpression: Evaluate a reverse polish notation expression (https://en.wikipedia.org/wiki/Reverse_Polish_notation)
   * Supports the following operators: +, -, *, /, ^, cos, sin, tan
   *
   * @param expression: string - the expression to evaluate
   * @returns number - the result of the expression to max of 2 decimal places
   * @throws Error - if the expression is invalid or the result is invalid
   */
  public evaluateExpression(expression: string): number {
    const expressionElements: string[] = expression
      .trim()
      .split(' ')
      .filter(value => value !== '');

    if (expressionElements.length === 0) {
      return 0;
    }

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

    return Number(result[0].toFixed(2));
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
