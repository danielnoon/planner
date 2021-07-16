import Class from "./Class";

export interface AcceptableClasses {
  codes: string[];
  credits: number;
}

export default class Requirement {
  public id: number;
  public name: string;
  public acceptable: AcceptableClasses;
  public exclude: string[];

  constructor(init: Requirement) {
    [this.id, this.name, this.acceptable, this.exclude] = [
      init.id,
      init.name,
      init.acceptable,
      init.exclude,
    ];
  }

  checkClass(c: Class) {
    // const
  }
}

function codeMatches(code: string, pattern: string) {
  console.log("a");
}
