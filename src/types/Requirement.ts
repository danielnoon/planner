import glob from "../util/glob";
import Class from "./Class";

export interface AcceptableClasses {
  anyOf: string[];
  allOf: string[];
  noneOf: string[];
  credits: number;
  classes: number;
}

interface IRequirement {
  id: number;
  name: string;
  requires?: AcceptableClasses;
  children?: number[];
}

export default class Requirement {
  public id: number;
  public name: string;
  public requires: AcceptableClasses;
  public children: number[];

  constructor(init: IRequirement) {
    [this.id, this.name, this.requires, this.children] = [
      init.id,
      init.name,
      init.requires || {classes: 0, credits: 0, anyOf: [], allOf: [], noneOf: []},
      init.children || []
    ];
  }
}

export function classFulfills(c: Class, req: Requirement, requirements: Requirement[]): boolean {
  console.log(req);
  
  if (req.requires.noneOf.some(e => glob(e)(c.code))) {
    return false;
  }

  if ([...req.requires.anyOf, ...req.requires.allOf].some(a => glob(a)(c.code))) {
    return true;
  }

  if (req.children.length > 0) {
    return req.children.some(id => {
      const child = requirements.find(r => r.id === id);
      if (!child) {
        return false;
      }
      return classFulfills(c, child, requirements);
    });
  }

  return false;
}
