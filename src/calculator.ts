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

  private performOperation(
    operator: string,
    operand1: number,
    operand2: number
  ): number {
    const operationMap: Record<string, Function> = {
      '+': (operand1: number, operand2: number) => operand1 + operand2,
      '-': (operand1: number, operand2: number) => operand1 - operand2,
      '*': (operand1: number, operand2: number) => operand1 * operand2,
      '/': (operand1: number, operand2: number) => operand1 / operand2,
      '^': (operand1: number, operand2: number) => operand1 ** operand2,
    };

    const operation = operationMap[operator];
    if (!operation) {
      throw new Error(`Invalid operator: ${operator}`);
    }

    return operation(operand1, operand2);
  }

  public evaluateReversePolishNotationExpression(expression: string): number {
    console.log('expression', expression);

    const stack: number[] = [];
    const elements: string[] = expression.split(' ');

    for (const element of elements) {
      console.log('element', element);

      const elementType = this.parser.determineElementType(element);
      console.log('elementType', elementType);

      if (elementType === ElementType.OPERAND) {
        stack.push(Number(element));
      } else if (elementType === ElementType.OPERATOR) {
        const operand2 = stack.pop();
        const operand1 = stack.pop();

        console.log('operand1, operand2', operand1, operand2);

        if (operand1 === undefined || operand2 === undefined) {
          throw new Error('Invalid RPN expression');
        }

        const result = this.performOperation(element, operand1, operand2);

        console.log(result);

        return result;
      }
    }

    return 0;
  }
}

export {Calculator};
