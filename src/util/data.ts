import useStore from "../state/store";
import Class from "../types/Class";
import Requirement from "../types/Requirement";

export function save() {
  const state = useStore.getState();
  const classes = state.classes;
  const requirements = state.requirements;

  const data = JSON.stringify({ classes, requirements });
  localStorage.setItem('data', data);
}

export function load() {
  const data = localStorage.getItem('data');

  if (!data) {
    return false;
  }

  const { classes, requirements } = JSON.parse(data) as {classes: Class[], requirements: Requirement[]};
  useStore.getState().setClasses(classes);
  useStore.getState().setRequirements(requirements);
}
