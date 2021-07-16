export default class Class {
  public name: string;
  public code: string;
  public credits: number;

  constructor(init: Class) {
    [this.name, this.code, this.credits] = [init.name, init.code, init.credits];
  }
}
