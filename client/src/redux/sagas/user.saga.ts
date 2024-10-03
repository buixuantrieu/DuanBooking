/* eslint-disable @typescript-eslint/no-unused-vars */
import { takeEvery, put } from "redux-saga/effects";

import { loginWithGoogle } from "@slices/user.slice";
import { AnyAction } from "redux-saga";
import apiClient from "./apiClient";
import axios from "axios";
import {
  registerUserRequest,
  registerUserFailure,
  registerUserSuccess,
  verifyAccountRequest,
  verifyAccountSuccess,
  verifyAccountFailure,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
  loginUserRequest,
  loginUserSuccess,
  loginUserFailure,
  getUserInfoRequest,
  getUserInfoFailure,
  getUserInfoSuccess,
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
  getNotificationByUserIdFailure,
  getNotificationByUserIdRequest,
  getNotificationByUserIdSuccess,
  updateNotificationByUserIdRequest,
  updateNotificationByUserIdSuccess,
  updateNotificationByUserIdFailure,
} from "@slices/user.slice";
import { notification } from "antd";

function* registerUserSaga(action: AnyAction): Generator {
  try {
    const { data, callback } = action.payload;
    const result = yield axios.post("http://localhost:3000/register", data);
    yield localStorage.setItem("userId", result.data.id);
    yield put(registerUserSuccess());
    yield callback();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data.message);
      const errorMessage = error.response?.data.message || " Tài khoản hoặc email đã tồn tại!";
      yield put(registerUserFailure({ error: errorMessage }));
    } else {
      console.error = () => {};
      yield put(registerUserFailure({ error: "Internal Server Error" }));
    }
  }
}

function* verifyAccountSaga(action: AnyAction): Generator {
  try {
    const { data, callback } = action.payload;

    yield axios.put(`http://localhost:3000/register/${data.id}`, {
      activationCode: data.activationCode,
    });
    yield localStorage.removeItem("userId");
    yield put(verifyAccountSuccess());
    yield notification.success({ message: "Đăng kí tài khoản thành công!" });
    yield callback();
  } catch (e) {
    yield put(verifyAccountFailure({ error: " 1" }));
  }
}

function* deleteUserSaga(action: AnyAction): Generator {
  try {
    const { id } = action.payload;
    yield axios.delete(`http://localhost:3000/users/${id}`);
    yield localStorage.removeItem("userId");
    yield put(deleteUserSuccess());
  } catch (e) {
    yield put(deleteUserFailure({ error: " 1" }));
  }
}
function* loginUserSaga(action: AnyAction): Generator {
  try {
    const { data, callback } = action.payload;
    const result = yield axios.post(`http://localhost:3000/login`, {
      userName: data.userNameLogin,
      password: data.passwordLogin,
    });

    yield localStorage.setItem("accessToken", result.data.accessToken);
    yield localStorage.setItem("refreshToken", result.data.refreshToken);

    const check = yield result.data.user.UserRole.filter((role: { roleId: number }) => Number(role.roleId) == 1);
    yield put(getUserInfoRequest());
    yield put(loginUserSuccess());
    if (check.length != 0) {
      yield callback(1);
    } else {
      yield callback(0);
    }
    yield notification.success({ message: "Đăng nhập thành công!" });
  } catch (e) {
    yield put(loginUserFailure({ error: "Sai tài khoản hoặc mật khẩu" }));
  }
}
function* loginWithGoogleSaga(action: AnyAction): Generator {
  try {
    const { code, callback } = action.payload;
    const result = yield axios.get("http://localhost:3000/login/google/callback", {
      params: { code },
    });

    yield localStorage.setItem("accessToken", result.data.accessToken);
    yield localStorage.setItem("refreshToken", result.data.refreshToken);

    const check = yield result.data.user.UserRole.filter((role: { roleId: number }) => Number(role.roleId) == 1);
    yield put(getUserInfoRequest());
    yield put(loginUserSuccess());
    if (check.length != 0) {
      yield callback(1);
    } else {
      yield callback(0);
    }
    yield notification.success({ message: "Đăng nhập thành công !" });
  } catch (e) {
    yield notification.error({ message: "Login with Google Failed!" });
    yield put(loginUserFailure({ error: "Lỗi" }));
  }
}
function* getUserInfoSaga(_action: AnyAction): Generator {
  try {
    const result = yield apiClient.get("http://localhost:3000/users/user-info");

    yield put(getUserInfoSuccess({ data: result.data }));
  } catch (e) {
    yield put(getUserInfoFailure({ error: "Lỗi" }));
  }
}
function* updateProfileSaga(action: AnyAction): Generator {
  try {
    const { data } = action.payload;
    yield apiClient.put("http://localhost:3000/users/profile", { data });
    yield put(getUserInfoRequest());
    yield put(updateProfileSuccess());
    yield notification.success({ message: "Cập nhật thành công!" });
  } catch (e) {
    yield put(updateProfileFailure({ error: "Lỗi" }));
  }
}
function* registerPartnerSaga(action: AnyAction): Generator {
  try {
    const { data, callback } = action.payload;
    yield apiClient.post("http://localhost:3000/users/register-partner", data);
    yield put(registerPartnerSuccess());
    yield callback();
  } catch (e) {
    yield put(registerPartnerFailure({ error: "Lỗi" }));
  }
}
function* changePasswordSaga(action: AnyAction): Generator {
  try {
    const { data, callback } = action.payload;
    yield apiClient.post("http://localhost:3000/users/change-password", data);
    yield put(changePasswordSuccess());
    yield callback();
    yield notification.success({ message: "Thay đổi mật khẩu thành công!" });
  } catch (e) {
    yield put(changePasswordFailure({ error: "Lỗi" }));
  }
}
function* getPartnerAllSaga(_action: AnyAction): Generator {
  try {
    const result = yield apiClient.get("http://localhost:3000/users/partner");
    yield put(getPartnerAllSuccess({ data: result.data }));
  } catch (e) {
    yield put(getPartnerAllFailure({ error: "Lỗi" }));
  }
}
function* updatePartnerSaga(action: AnyAction): Generator {
  try {
    const { data, id } = action.payload;
    yield apiClient.put(`http://localhost:3000/users/partner/${id}`, data);
    yield put(updatePartnerSuccess());
    yield put(getPartnerAllRequest());
  } catch (e) {
    yield put(updatePartnerFailure({ error: "Lỗi" }));
  }
}
function* getNotificationByUserIdSaga(_action: AnyAction): Generator {
  try {
    const result = yield apiClient.get(`http://localhost:3000/users/notification`);
    yield put(getNotificationByUserIdSuccess({ data: result.data }));
    yield put(getPartnerAllRequest());
  } catch (e) {
    yield put(getNotificationByUserIdFailure({ error: "Lỗi" }));
  }
}
function* updateNotificationByUserIdSaga(action: AnyAction): Generator {
  try {
    yield apiClient.put(`http://localhost:3000/users/notification`);
    yield put(updateNotificationByUserIdSuccess());
    yield put(getNotificationByUserIdRequest());
  } catch (e) {
    yield put(updateNotificationByUserIdFailure({ error: "Lỗi" }));
  }
}

export default function* userSaga() {
  yield takeEvery(registerUserRequest, registerUserSaga);
  yield takeEvery(verifyAccountRequest, verifyAccountSaga);
  yield takeEvery(deleteUserRequest, deleteUserSaga);
  yield takeEvery(loginUserRequest, loginUserSaga);
  yield takeEvery(loginWithGoogle, loginWithGoogleSaga);
  yield takeEvery(getUserInfoRequest, getUserInfoSaga);
  yield takeEvery(registerPartnerRequest, registerPartnerSaga);
  yield takeEvery(updateProfileRequest, updateProfileSaga);
  yield takeEvery(changePasswordRequest, changePasswordSaga);
  yield takeEvery(getPartnerAllRequest, getPartnerAllSaga);
  yield takeEvery(updatePartnerRequest, updatePartnerSaga);
  yield takeEvery(getNotificationByUserIdRequest, getNotificationByUserIdSaga);
  yield takeEvery(updateNotificationByUserIdRequest, updateNotificationByUserIdSaga);
}
