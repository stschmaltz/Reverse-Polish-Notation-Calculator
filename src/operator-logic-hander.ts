export enum Operator {
  ADDITION = '+',
  SUBTRACTION = '-',
  MULTIPLICATION = '*',
  DIVISION = '/',
  EXPONENTIATION = '^',
  SINE = 'sin',
  COSINE = 'cos',
  TANGENT = 'tan',
}

class OperatorLogicHandler {
  // Using an enum as a key forces us to have a handler for every possible operator
  public operationMap: Record<
    Operator,
    {handler: Function; numberOfOperands: number}
  > = {
    [Operator.ADDITION]: {
      handler: this.addition,
      numberOfOperands: 2,
    },
    [Operator.SUBTRACTION]: {
      handler: this.subtraction,
      numberOfOperands: 2,
    },
    [Operator.MULTIPLICATION]: {
      handler: this.multiplication,
      numberOfOperands: 2,
    },
    [Operator.DIVISION]: {
      handler: this.division,
      numberOfOperands: 2,
    },
    [Operator.EXPONENTIATION]: {
      handler: this.exponentiation,
      numberOfOperands: 2,
    },
    [Operator.SINE]: {
      handler: this.sine,
      numberOfOperands: 1,
    },
    [Operator.COSINE]: {
      handler: this.cosine,
      numberOfOperands: 1,
    },
    [Operator.TANGENT]: {
      handler: this.tangent,
      numberOfOperands: 1,
    },
  };

  public performOperation(operator: Operator, ...operands: number[]): number {
    const operation = this.operationMap[operator];
    if (!operation) {
      throw new Error(`Invalid operator: ${operator}`);
    }

    if (operands.length !== this.getNumberOfOperands(operator)) {
      throw new Error(`Invalid number of operands for operator: ${operator}`);
    }

    return operation.handler(...operands);
  }

  public getNumberOfOperands(operator: Operator): number {
    const operation = this.operationMap[operator];
    if (!operation) {
      throw new Error(`Invalid operator: ${operator}`);
    }
    return operation.numberOfOperands;
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
