export interface UserFilter {
  id?: string | undefined;
  roleId?:
    | number
    | undefined
    | {
        in?: number[];
        notIn?: number[];
      };
  statusUserId?: number | undefined;
  userName?:
    | string
    | undefined
    | {
        in?: string[];
        notIn?: string[];
      };
  password?: string | undefined;
  email?:
    | string
    | undefined
    | {
        in?: string[];
        notIn?: string[];
      };
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  activationCode?: number | undefined;
  OR?: {
    [key: string]: string | undefined;
  }[];
}
