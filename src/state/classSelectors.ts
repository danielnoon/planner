import Requirement from "../types/Requirement";
import { Store } from "./store";

export const classes = () => (store: Store) => store.classes;
// export const classesThatFulfill = (requirement: Requirement) => (store: Store) => store.classes.filter(c => c.
