export default function zip<X, Y>(left: Iterable<X>, right: Iterable<Y>): [X, Y][] {
  const a = left[Symbol.iterator]();
  const b = right[Symbol.iterator]();

  let A = a.next();
  let B = b.next();

  const result = [] as [X, Y][];

  while (!A.done && !B.done) {
    result.push([A.value, B.value]);

    A = a.next();
    B = b.next();
  }

  return result
}