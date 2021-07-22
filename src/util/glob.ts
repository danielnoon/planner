import zip from './zip';

export type GlobMatcher = (test: string) => boolean;

export default function glob(pattern: string): GlobMatcher {
  return function matcher(test: string) {
    return zip(pattern, test).every(([p, t]) => p === t || p === '*');
  }
}
