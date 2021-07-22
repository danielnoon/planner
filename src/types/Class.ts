import { immerable } from "immer";
import useStore from "../state/store";

export enum ClassStatus {
  NotStarted = "not started",
  InProgress = "in progress",
  Complete = "complete",
}

export interface PrerequisiteOptions {
  anyOf: number[];
  allOf: number[];
  noneOf: number[];
}

export default class Class {
  public id: number;
  public name: string;
  public code: string;
  public credits: number;
  public status: ClassStatus;
  public prereqs: PrerequisiteOptions;
  public term: number;
  public [immerable]? = true;

  static get empty() {
    const store = useStore.getState();
    const id = store.classCounter;
    store.incrementClassCounter();

    return new Class({
      id,
      code: "",
      credits: 0,
      name: "",
      prereqs: {
        anyOf: [],
        allOf: [],
        noneOf: [],
      },
      status: ClassStatus.NotStarted,
      term: 0,
    });
  }

  constructor(init: Class) {
    [
      this.id,
      this.name,
      this.code,
      this.credits,
      this.status,
      this.prereqs,
      this.term,
    ] = [
      init.id,
      init.name,
      init.code,
      init.credits,
      init.status,
      init.prereqs,
      init.term,
    ];
  }
}
