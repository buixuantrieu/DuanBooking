interface SortType {
  [key: string]: SortOrder;
}
type SortOrder = "asc" | "desc";
type IncludeParams = {
  [key: string]: boolean | IncludeParams;
};
export interface ProfileType {
  id?: number;
  userId?: number;
  firstName?: string;
  lastName?: string;
  phone?: string;
  dateOfBirth?: Date;
  gender?: number;
  avatar?: string;
  address?: string;
  updatedAt?: Date;
}
export interface UserType {
  id?: string;
  roleId?: number;
  statusUserId?: number;
  userName?: string;
  password?: string;
  email?: string;
  activationCode?: number;
  createdAt?: Date;
  updatedAt?: Date;
  includeUserNames?: string;
  includeEmails?: string;
  includeRoleIds?: string;
  includeStatusUserName?: string;
  excludeUserNames?: string;
  excludeEmails?: string;
  excludeRoleIds?: string;
  excludeStatusUserName?: string;
  orderBy?: SortType;
  take?: number;
  skip?: number;
  include?: IncludeParams;
  profile?: ProfileType;
}
export interface StatusUserType {
  id?: number;
  statusName?: string;
  description?: string;
  isDelete?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface RoleType {
  id?: number;
  roleName?: string;
  description?: string;
  isDelete?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserSettingType {
  id: number;
  userId: number;
  themeDark: boolean;
  isNotification: boolean;
  isReceiveEmail: boolean;
  updatedAt: Date;
}