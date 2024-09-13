import { IncludeParams } from "src/types/types";

export function convertStringsToBooleans(obj: IncludeParams) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (typeof value === "string") {
        if (value === "true") {
          obj[key] = true;
        } else if (value === "false") {
          obj[key] = false;
        }
      } else if (typeof value === "object" && value !== null) {
        convertStringsToBooleans(value);
      }
    }
  }
  return obj;
}
