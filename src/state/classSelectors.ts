import Class, { ClassStatus } from "../types/Class";
import Requirement, { classFulfills } from "../types/Requirement";
import zip from "../util/zip";
import { Store } from "./store";

export enum ClassSort {
  Id = "ID",
  Term = "Term",
  Credits = "Credits",
  Code = "Code",
  Status = "Status",
}

export const _compareClasses = (o: Class[], n: Class[]) =>
  zip(o, n).every(([o, n]) => o.id === n.id);

export const $classes = (options?: { sort?: ClassSort }) => (store: Store) => {
  if (options) {
    if (options.sort) {
      if (options.sort === ClassSort.Term) {
        return store.classes.slice().sort((a, b) => a.term - b.term);
      }
      if (options.sort === ClassSort.Credits) {
        return store.classes.slice().sort((a, b) => a.credits - b.credits);
      }
      if (options.sort === ClassSort.Id) {
        return store.classes.slice().sort((a, b) => a.credits - b.credits);
      }
      if (options.sort === ClassSort.Status) {
        const statusMapping = new Map<ClassStatus, number>([
          [ClassStatus.NotStarted, 0],
          [ClassStatus.InProgress, 1],
          [ClassStatus.Complete, 2],
        ]);
        return store.classes
          .slice()
          .sort(
            (a, b) =>
              statusMapping.get(a.status)! - statusMapping.get(b.status)!
          );
      }
    }
  }
  return store.classes;
};

export const $classById = (id: number) => (store: Store) =>
  store.classes.find((c) => c.id === id);

export const $classByCode = (code: string) => (store: Store) =>
  store.classes.find((c) => c.code === code);

// export const $classesByTerm = (term: number) => (store: Store) =>
//   store.classes.filter((c) => c.term === term);

export const $classesThatFulfill =
  (requirement: Requirement) => (store: Store) =>
    store.classes.filter((c) =>
      classFulfills(c, requirement, store.requirements)
    );
