export interface RowDetailType {
  critical: number;
  high: number;
  medium: number;
  low: number;
  total: number;
}

export interface ServerityColors {
  [severity: string] : string;
}
