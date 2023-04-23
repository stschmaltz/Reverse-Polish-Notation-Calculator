export enum Operator {
  ADDITION = '+',
  SUBTRACTION = '-',
  MULTIPLICATION = '*',
  DIVISION = '/',
  EXPONENTIATION = '^',
}

class OperatorLogicHandler {
  // Using an enum as a key forces us to have a handler for every possible operator
  public operationMap: Record<Operator, Function> = {
    [Operator.ADDITION]: this.addition,
    [Operator.SUBTRACTION]: this.subtraction,
    [Operator.MULTIPLICATION]: this.multiplication,
    [Operator.DIVISION]: this.division,
    [Operator.EXPONENTIATION]: this.exponentiation,
  };

  public performOperation(
    operator: Operator,
    operand1: number,
    operand2: number
  ): number {
    const operation = this.operationMap[operator];
    if (!operation) {
      throw new Error(`Invalid operator: ${operator}`);
    }

    return operation(operand1, operand2);
  }

  private addition(operand1: number, operand2: number): number {
    return operand1 + operand2;
  }

  private subtraction(operand1: number, operand2: number): number {
    return operand1 - operand2;
  }

  private multiplication(operand1: number, operand2: number): number {
    return operand1 * operand2;
  }

  private division(operand1: number, operand2: number): number {
    return operand1 / operand2;
  }

  private exponentiation(operand1: number, operand2: number): number {
    return operand1 ** operand2;
  }

  private sine(operand: number): number {
    return Math.sin(operand);
  }

  private cosine(operand: number): number {
    return Math.cos(operand);
  }

  private tangent(operand: number): number {
    return Math.tan(operand);
  }
}

export {OperatorLogicHandler};
