export const ROUTES = {
  AUTH: "/auth",
  ACCOUNT_VERIFICATION: "/account-verification",
  USER: {
    HOME: "/",
    ABOUT: "/about",
    CONTACT: "/contact",
    ROOM_LIST: "/room",
    HOME_DETAIL: "/homes/:id",
    BOOKING: "/booking",
    PARTNER_REGISTRATION: "/partner-registration",
    PROFILE: "/profile",
    CREATE_POST: "/create-post",
    BOOKING_HISTORY: "/profile/booking-history",
    FAVORITE_HOMES: "/profile/favorite-homes",
    CHANGE_PASSWORD: "/profile/change-password",
  },
  ADMIN: {
    DASHBOARD: "/admin",
    HOME_LIST: "/admin/homes",
    ACCESS_CONTROL: "admin/access-control",
    ACCOUNT_MANAGEMENT: "/admin/account-management",
    USER_MANAGE: "/admin/users",
    BOOKING_MANAGE: "/admin/bookings",
    COMMENT_MANAGE: "/admin/comments",
    KING_OF_ROOM_MANAGE: "/admin/king-of-rooms",
  },
};
