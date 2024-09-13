type SortOrder = "asc" | "desc";

export type IncludeParams = {
  [key: string]: boolean | IncludeParams;
};
export interface SortType {
  [key: string]: SortOrder;
}
