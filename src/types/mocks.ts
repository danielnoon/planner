import useStore from "../state/store";
import Class from "./Class";
import Requirement from "./Requirement";

export const classes = [
  // new Class({
  //   code: 'RAIK10',
  //   credits: 0,
  //   name: "Freshman Seminar",
  //   status: "complete",
  //   prereqs: {
  //     allOf: [],
  //     anyOf: [],
  //     noneOf: []
  //   },
  //   term: 0
  // }),
  // new Class({
  //   code: 'CSCE456',
  //   credits: 3,
  //   name: 'Parallel Programming',
  //   status: 'not started',
  //   prereqs: [] as string[],
  //   term: 
  // }),
  // new Class({
  //   code: 'CSCE322',
  //   credits: 3,
  //   name: 'Programming Language Concepts',
  //   status: 'complete'
  // }),
  // new Class({
  //   code: 'CSCE454',
  //   credits: 3,
  //   name: "Human-Robot Interactions",
  //   status: 'not started'
  // }),
  // new Class({
  //   code: 'CSCE231',
  //   credits: 4,
  //   name: 'Computer Systems Engineering',
  //   status: 'complete'
  // }),
  // new Class({
  //   code: 'ENGL150',
  //   credits: 3,
  //   name: 'AP Lang & Comp',
  //   status: 'complete'
  // })
]

export const requirements = [
  // new Requirement({
  //   id: 0,
  //   name: 'Tech Electives',
  //   requires: {
  //     anyOf: ['CSCE4**', "SOFT4**"],
  //     allOf: [],
  //     noneOf: ['CSCE451'],
  //     credits: 6,
  //     classes: 0,
  //   },
  // }),
  // new Requirement({
  //   id: 1,
  //   name: 'Computer Science Core',
  //   requires: {
  //     credits: 0,
  //     classes: 0,
  //     allOf: ['CSCE231', 'CSCE 322'],
  //     anyOf: [],
  //     noneOf: []
  //   },
  //   children: [4]
  // }),
  // new Requirement({
  //   id: 2,
  //   name: 'Software Engineering Major',
  //   children: [0, 1],
  // }),
  // new Requirement({
  //   id: 3,
  //   name: "University",
  //   children: [2]
  // }),
  // new Requirement({
  //   id: 4,
  //   name: "Intro",
  //   requires: {
  //     credits: 0,
  //     classes: 1,
  //     anyOf: ["CSCE10", "RAIK10"],
  //     allOf: [],
  //     noneOf: [],
  //   }
  // })
]

let registered = false;

export default function register() {
  if (!registered) {
    const store = useStore.getState();
    store.addClasses(classes);
    store.addRequirements(requirements);
  }

  registered = true;
}
