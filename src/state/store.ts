import create from "zustand";
import p from "immer";
import Class from "../types/Class";

export interface Store {
  classes: Class[];
}

const useStore = create<Store>((set, get) => ({
  classes: [],

  addClass: (c: Class) =>
    set(
      p((store: Store) => {
        store.classes.push(c);
      })
    ),

  editClass: (code: string, updates: Partial<Class>) =>
    set(
      p((store: Store) => {
        const idx = store.classes.findIndex((cls) => cls.code === code);
        store.classes[idx] = { ...store.classes[idx], ...updates };
      })
    ),

  deleteClass: (code: string) =>
    set(
      p((store: Store) => {
        const idx = store.classes.findIndex((cls) => cls.code === code);
        store.classes.splice(idx, 1);
      })
    ),
}));

export default useStore;
