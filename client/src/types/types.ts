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
  fullName?: string;
  phone?: string;
  dateOfBirth?: Date;
  gender?: number;
  avatar?: string;
  address?: string;
  updatedAt?: Date;
}
export interface RoomImageType {
  id?: number;
  image?: string;
  roomId?: number;
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
  UserRole?: UserRole[] | undefined;
  Partner?: PartnerType;
  Booking?: BookingType[];
}

export interface PartnerType {
  id?: number;
  isApproved?: boolean;
  paymentAccountMethod?: string;
  paymentAccountType?: string;
  paymentAccountInfo?: string;
  createdAt?: Date;
  updatedAt?: Date;
  userId?: string;
  user?: UserType;
  isActive?: boolean;
}
export interface UserRole {
  id?: number;
  userId?: number;
  roleId?: number;
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
export interface TypeRoomType {
  id?: number;
  typeName?: string;
  description?: string;
  imageUrl?: string;
  isDelete?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface AmenityType {
  id?: number;
  amenityName?: string;
  description?: string;
  imageUrl?: string;
  isDelete?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RoomType {
  id?: number;
  isApproved?: boolean;
  image?: string;
  title?: string;
  roomName?: string;
  description?: string;
  location?: string;
  status?: number;
  pricePerNight?: number;
  isDelete?: boolean;
  createAt?: Date;
  view?: number;
  roomType?: TypeRoomType;
  roomTypeId?: number;
  partnerId?: number;
  provinceId?: number;
  districtId?: number;
  wardId?: number;
  RoomAmenity?: RoomAmenityType[];
  amenities?: number;
  imageList?: string[];
  user?: UserType;
  Favorite?: FavoriteType[];
  RoomImage?: RoomImageType[] | undefined;
  Review?: ReviewType[];
  Booking?: BookingType[];
}

export interface RoomAmenityType {
  id?: number;
  amenityId?: number;
  roomId?: number;
}
export interface UserSettingType {
  id: number;
  userId: number;
  themeDark: boolean;
  isNotification: boolean;
  isReceiveEmail: boolean;
  updatedAt: Date;
}
export interface FavoriteType {
  id: number;
  userId: string;
  roomId: number;
}
export interface ReviewType {
  id?: number;
  roomId?: number;
  userId?: string;
  rate?: number;
  content?: string;
  createdAt?: Date;
  updatedAt?: Date;
  user?: UserType;
}
export interface CommentType {
  id?: number;
  roomId?: number;
  userId?: string;
  content?: string;
  createdAt?: Date;
  updatedAt?: Date;
  user?: UserType;
}
export interface InfoBookingTemporary {
  roomId?: number | undefined;
  image?: string | undefined;
  total?: number | undefined;
  price?: number | undefined;
  countDay?: number | undefined;
  checkIn?: string | undefined;
  checkOut?: string | undefined;
  roomName?: string | undefined;
}
export interface BookingType {
  id?: number;
  checkIn?: string;
  checkOut?: string;
  customerName?: string;
  email?: string;
  phone?: string;
  createdAt?: Date;
  customerId?: string;
  roomId?: number;
  paymentMethod?: string;
  amount?: number;
  room?: RoomType;
  totalPrice?: number;
  Payment?: Payment;
}
export interface RoomImageType {
  id?: number;
  image?: string;
  roomId?: number;
}
export interface Payment {
  id?: number;
  amount?: number;
  paymentMethod?: string;
  paymentDate?: Date;
  status?: number;
  bookingId?: number;
}

export interface NotificationType {
  id?: number;
  userId?: string;
  message?: string;
  isWatched?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
