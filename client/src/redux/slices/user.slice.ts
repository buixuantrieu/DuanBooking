/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotificationType, PartnerType, ProfileType, UserType } from "types/types";
export interface UserTypeList {
  userList: {
    data: UserType[];
    loading: boolean;
    error: string | null;
  };
  userLogin: {
    loading: boolean;
    error: string | null;
  };
  userInfo: {
    data: UserType;
    loading: boolean;
    error: string | null;
  };
  userRegister: {
    loading: boolean;
    error: string | null;
  };
  partner: {
    data: PartnerType[];
    loading: boolean;
    error: string | null;
  };
  notification: {
    data: NotificationType[];
    loading: boolean;
    error: string | null;
  };
}

const initialState: UserTypeList = {
  userList: {
    data: [],
    loading: false,
    error: null,
  },
  userInfo: {
    data: {},
    loading: false,
    error: null,
  },

  userLogin: {
    loading: false,
    error: null,
  },
  userRegister: {
    loading: false,
    error: null,
  },
  partner: {
    data: [],
    loading: false,
    error: null,
  },
  notification: {
    data: [],
    loading: false,
    error: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUserRequest: (state, _action: PayloadAction<{ data: UserType; callback?: () => void }>) => {
      state.userRegister.loading = true;
      state.userRegister.error = null;
    },
    registerUserSuccess: (state) => {
      state.userRegister.loading = false;
      state.userRegister.error = null;
    },
    registerUserFailure: (state, action) => {
      const { error } = action.payload;
      state.userRegister.error = error;
      state.userRegister.loading = false;
    },
    verifyAccountRequest: (
      state,
      _action: PayloadAction<{
        data: { id: string | undefined; activationCode: number | undefined };
        callback?: () => void;
      }>
    ) => {
      state.userRegister.loading = true;
      state.userRegister.error = null;
    },
    verifyAccountSuccess: (state) => {
      state.userRegister.loading = false;
      state.userRegister.error = null;
    },
    verifyAccountFailure: (state, action) => {
      const { error } = action.payload;
      state.userRegister.error = error;
      state.userRegister.loading = false;
    },
    loginUserRequest: (
      state,
      _action: PayloadAction<{
        data: UserType;
        callback: (roleId: number) => void;
      }>
    ) => {
      state.userLogin.loading = true;
      state.userLogin.error = null;
    },
    loginUserSuccess: (state) => {
      state.userLogin.loading = false;
      state.userLogin.error = null;
    },
    loginUserFailure: (state, action) => {
      const { error } = action.payload;
      state.userLogin.error = error;
      state.userLogin.loading = false;
    },
    deleteUserRequest: (
      state,
      _action: PayloadAction<{
        id: string;
      }>
    ) => {
      state.userRegister.loading = true;
      state.userRegister.error = null;
    },
    deleteUserSuccess: (state) => {
      state.userRegister.loading = false;
      state.userRegister.error = null;
    },
    deleteUserFailure: (state, action) => {
      const { error } = action.payload;
      state.userRegister.error = error;
      state.userRegister.loading = false;
    },
    loginWithGoogle: (state, _action: PayloadAction<{ code: string; callback?: (roleId: number) => void }>) => {
      state.userLogin.error = null;
      state.userLogin.loading = false;
    },
    getUserInfoRequest: (state) => {
      state.userInfo.loading = true;
      state.userInfo.error = null;
    },
    getUserInfoSuccess: (state, action) => {
      const { data } = action.payload;
      state.userInfo.data = data;
      state.userInfo.loading = false;
      state.userInfo.error = null;
    },
    getUserInfoFailure: (state, action) => {
      const { error } = action.payload;
      state.userInfo.error = error;
      state.userInfo.loading = false;
    },
    logoutRequest: (state) => {
      state.userInfo.data = {};
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
    registerPartnerRequest: (state, _action) => {
      state.userList.loading = true;
      state.userList.error = null;
    },
    registerPartnerSuccess: (state) => {
      state.userList.loading = false;
      state.userList.error = null;
    },
    registerPartnerFailure: (state, action) => {
      const { error } = action.payload;
      state.userList.loading = false;
      state.userList.error = error;
    },
    updateProfileRequest: (state, _action: PayloadAction<{ data: ProfileType }>) => {
      state.userList.loading = true;
      state.userList.error = null;
    },
    updateProfileSuccess: (state) => {
      state.userList.loading = false;
      state.userList.error = null;
    },
    updateProfileFailure: (state, action) => {
      const { error } = action.payload;
      state.userList.loading = false;
      state.userList.error = error;
    },
    changePasswordRequest: (
      state,
      _action: PayloadAction<{ data: { oldPassword: string; newPassword: string }; callback: () => void }>
    ) => {
      state.userInfo.loading = true;
      state.userInfo.error = null;
    },
    changePasswordSuccess: (state) => {
      state.userInfo.loading = false;
      state.userInfo.error = null;
    },
    changePasswordFailure: (state, action) => {
      const { error } = action.payload;
      state.userInfo.loading = false;
      state.userInfo.error = error;
    },
    getPartnerAllRequest: (state, _action: PayloadAction) => {
      state.partner.loading = true;
      state.partner.error = null;
    },
    getPartnerAllSuccess: (state, action) => {
      const { data } = action.payload;
      state.partner.data = data;
      state.partner.loading = false;
      state.partner.error = null;
    },
    getPartnerAllFailure: (state, action) => {
      const { error } = action.payload;
      state.partner.loading = false;
      state.partner.error = error;
    },
    updatePartnerRequest: (state, _action: PayloadAction<{ data: { isApproved?: boolean }; id: number }>) => {
      state.partner.loading = true;
      state.partner.error = null;
    },
    updatePartnerSuccess: (state) => {
      state.partner.loading = false;
      state.partner.error = null;
    },
    updatePartnerFailure: (state, action) => {
      const { error } = action.payload;
      state.partner.loading = false;
      state.partner.error = error;
    },
    getNotificationByUserIdRequest: (state, _action: PayloadAction) => {
      state.notification.loading = true;
      state.notification.error = null;
    },
    getNotificationByUserIdSuccess: (state, action) => {
      const { data } = action.payload;
      state.notification.data = data;
      state.notification.loading = false;
      state.notification.error = null;
    },
    getNotificationByUserIdFailure: (state, action) => {
      const { error } = action.payload;
      state.notification.loading = false;
      state.notification.error = error;
    },
    updateNotificationByUserIdRequest: (state, _action: PayloadAction) => {
      state.notification.loading = true;
      state.notification.error = null;
    },
    updateNotificationByUserIdSuccess: (state) => {
      state.notification.loading = false;
      state.notification.error = null;
    },
    updateNotificationByUserIdFailure: (state, action) => {
      const { error } = action.payload;
      state.notification.loading = false;
      state.notification.error = error;
    },
  },
});

export const {
  registerUserRequest,
  registerUserSuccess,
  registerUserFailure,
  verifyAccountRequest,
  verifyAccountSuccess,
  verifyAccountFailure,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
  loginUserRequest,
  loginUserSuccess,
  loginUserFailure,
  loginWithGoogle,
  getUserInfoRequest,
  getUserInfoSuccess,
  getUserInfoFailure,
  logoutRequest,
  registerPartnerRequest,
  registerPartnerSuccess,
  registerPartnerFailure,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure,
  changePasswordRequest,
  changePasswordSuccess,
  changePasswordFailure,
  getPartnerAllRequest,
  getPartnerAllSuccess,
  getPartnerAllFailure,
  updatePartnerRequest,
  updatePartnerSuccess,
  updatePartnerFailure,
  getNotificationByUserIdRequest,
  getNotificationByUserIdSuccess,
  getNotificationByUserIdFailure,
  updateNotificationByUserIdRequest,
  updateNotificationByUserIdSuccess,
  updateNotificationByUserIdFailure,
} = userSlice.actions;

export default userSlice.reducer;
