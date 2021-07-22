import create from "zustand";
import p from "immer";
import Class from "../types/Class";
import Requirement from "../types/Requirement";

export interface Store {
  classes: Class[];
  requirements: Requirement[];
  classCounter: number;
  requirementCounter: number;

  addClasses: (cc: Class[]) => void;
  setClasses: (cc: Class[]) => void;
  addClass: (c: Class) => void;
  editClass: (id: number, updates: Partial<Class>) => void;
  deleteClass: (id: number) => void;
  incrementClassCounter: () => void;
  setClassCounter: (counter: number) => void;

  addRequirements: (reqs: Requirement[]) => void;
  setRequirements: (reqs: Requirement[]) => void;
  incrementRequirementCounter: () => void;
  setRequirementCounter: (counter: number) => void;
}

const useStore = create<Store>((set) => ({
  classes: [],
  requirements: [],
  classCounter: 0,
  requirementCounter: 0,

  addClasses: (cc) =>
    set(
      p((store: Store) => {
        store.classes.push(...cc);
      })
    ),

  addClass: (c) =>
    set(
      p((store: Store) => {
        store.classes.push(c);
      })
    ),

  setClasses: (cc) =>
    set(
      p((store: Store) => {
        store.classes = cc;
      })
    ),

  editClass: (id, updates) =>
    set(
      p((store: Store) => {
        const idx = store.classes.findIndex((cls) => cls.id === id);
        store.classes[idx] = { ...store.classes[idx], ...updates };
      })
    ),

  deleteClass: (id) =>
    set(
      p((store: Store) => {
        const idx = store.classes.findIndex((cls) => cls.id === id);
        store.classes.splice(idx, 1);
      })
    ),

  incrementClassCounter: () =>
    set(
      p((store: Store) => {
        store.classCounter += 1;
      })
    ),

  setClassCounter: (counter) =>
    set(
      p((store: Store) => {
        store.classCounter = counter;
      })
    ),

  addRequirements: (reqs) =>
    set(
      p((store: Store) => {
        store.requirements.push(...reqs);
      })
    ),

  setRequirements: (reqs) =>
    set(
      p((store: Store) => {
        store.requirements = reqs;
      })
    ),

  incrementRequirementCounter: () =>
    set(
      p((store: Store) => {
        store.requirementCounter += 1;
      })
    ),

  setRequirementCounter: (counter) =>
    set(
      p((store: Store) => {
        store.classCounter = counter;
      })
    ),
}));

export default useStore;
