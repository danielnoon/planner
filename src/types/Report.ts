import Class from "./Class";

interface RequirementReport {
  id: number;
  name: string;
  classes: Class[];
  children: RequirementReport[];
}

export interface Report {
  fulfilled: number;
  total: number;
  requirements: RequirementReport[];
}

export function generateReport() {
  return {};
}
