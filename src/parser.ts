import {ElementType} from './calculator';

class Parser {
  constructor() {}

  public determineElementType(element: string): string {
    // TODO typeguards for operators and operands and throw error if neither
    if (isNaN(Number(element))) {
      return ElementType.OPERATOR;
    } else {
      return ElementType.OPERAND;
    }
  }
}

export {Parser};
