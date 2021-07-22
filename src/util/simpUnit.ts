export default function simpUnit(unit: string | number) {
  if (typeof unit === 'string') {
    return unit;
  }

  return `${unit}px`;
}