export const ROUTES = {
  AUTH: "/auth",
  ACCOUNT_VERIFICATION: "/account-verification",
  USER: {
    HOME: "/",
    ABOUT: "/about",
    ROOM_MANAGER: "/room-manager",
    NOTIFICATION: "/notification",
    ROOM_LIST: "/room",
    ROOM_DETAIL: "/room/:id",
    BOOKING: "/booking",
    PARTNER_REGISTRATION: "/partner-registration",
    PROFILE: "/profile",
    CREATE_POST: "/create-post",
    BOOKING_HISTORY: "/profile/booking-history",
    FAVORITE_HOMES: "/profile/favorite-homes",
    CHANGE_PASSWORD: "/profile/change-password",
    NOTFOUND: "/notfound",
    EDIT_POST: "/edit-post/:id",
  },
  ADMIN: {
    DASHBOARD: "/admin",
    PARTNER: "/admin/partner",
    POST: "/admin/post",
    TYPE: "/admin/type",
    ACCOUNT_MANAGEMENT: "/admin/account-management",
    USER_MANAGE: "/admin/users",
    BOOKING_MANAGE: "/admin/bookings",
    COMMENT_MANAGE: "/admin/comments",
    POST_DETAIL: "/admin/post/:id",
    AMENITY: "/admin/amenity",
  },
};
