export enum ElementType {
  OPERATOR = 'operator',
  OPERAND = 'operand',
}

class Calculator {
  constructor() {}

  public evaluateReversePolishNotationExpression(expression: string): number {
    console.log('expression', expression);

    const elements: string[] = expression.split(' ');

    for (const element of elements) {
      console.log('element', element);
    }

    return 0;
  }
}

export {Calculator};
