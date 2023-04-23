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
  // Using an enum as the key forces us to have a handler for every possible operator
  public operationMap: Record<
    Operator,
    {handler: Function; requiredNumberOfOperands: number}
  > = {
    [Operator.ADDITION]: {
      handler: this.addition.bind(this),
      requiredNumberOfOperands: 2,
    },
    [Operator.SUBTRACTION]: {
      handler: this.subtraction.bind(this),
      requiredNumberOfOperands: 2,
    },
    [Operator.MULTIPLICATION]: {
      handler: this.multiplication.bind(this),
      requiredNumberOfOperands: 2,
    },
    [Operator.DIVISION]: {
      handler: this.division.bind(this),
      requiredNumberOfOperands: 2,
    },
    [Operator.EXPONENTIATION]: {
      handler: this.exponentiation.bind(this),
      requiredNumberOfOperands: 2,
    },
    [Operator.SINE]: {
      handler: this.sine.bind(this),
      requiredNumberOfOperands: 1,
    },
    [Operator.COSINE]: {
      handler: this.cosine.bind(this),
      requiredNumberOfOperands: 1,
    },
    [Operator.TANGENT]: {
      handler: this.tangent.bind(this),
      requiredNumberOfOperands: 1,
    },
  };

  /**
   * performOperation: Perform an operation on a set of operands, each operation has a handler function and a number of operands required.
   * Supported operators: +, -, *, /, ^, sin, cos, tan
   * The trigonometric functions expect the operand to be in degrees
   *
   * @param operator: Operator - the operation to perform
   * @param operands: number[] - the operands to perform the operation on
   * @returns number - the result of the operation
   * @throws If the operator is not supported or the number of operands is incorrect an error will be thrown.
   */
  public performOperation(operator: Operator, ...operands: number[]): number {
    const operation = this.operationMap[operator];
    if (!operation) {
      throw new Error(`Invalid operator: ${operator}`);
    }

    if (operands.length !== this.getRequiredNumberOfOperands(operator)) {
      throw new Error(`Invalid number of operands for operator: ${operator}`);
    }

    return operation.handler(...operands);
  }

  /**
   * getRequiredNumberOfOperands: Get the number of operands required for a given operator
   *
   * @param operator: Operator - the operator to get the number of operands for
   * @returns number - the number of operands required for the operator
   * @throws if the operator is not supported an error will be thrown
   */
  public getRequiredNumberOfOperands(operator: Operator): number {
    const operation = this.operationMap[operator];

    if (!operation) {
      throw new Error(`Invalid operator: ${operator}`);
    }

    return operation.requiredNumberOfOperands;
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
    if (operand2 === 0) {
      throw new Error('Division by 0 is not supported.');
    }

    return operand1 / operand2;
  }

  private exponentiation(operand1: number, operand2: number): number {
    return operand1 ** operand2;
  }

  private sine(operand: number): number {
    const radians = this.toRadians(operand);

    return Math.sin(radians);
  }

  private cosine(operand: number): number {
    const radians = this.toRadians(operand);

    return Math.cos(radians);
  }

  private tangent(operand: number): number {
    const radians = this.toRadians(operand);

    return Math.tan(radians);
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
}

export {OperatorLogicHandler};
