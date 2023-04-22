import {Parser} from './parser';

export enum ElementType {
  OPERATOR = 'operator',
  OPERAND = 'operand',
}

class Calculator {
  private static instance: Calculator;

  constructor(private parser: Parser = new Parser()) {
    parser = new Parser();
  }

  public static getInstance(): Calculator {
    if (!Calculator.instance) {
      Calculator.instance = new Calculator();
    }
    return Calculator.instance;
  }

  public evaluateReversePolishNotationExpression(expression: string): number {
    console.log('expression', expression);

    const elements: string[] = expression.split(' ');

    for (const element of elements) {
      console.log('element', element);

      const elementType = this.parser.determineElementType(element);
      console.log('elementType', elementType);
    }

    return 0;
  }
}

export {Calculator};
