/* eslint-disable @typescript-eslint/no-unused-vars */
import { takeEvery, put } from "redux-saga/effects";

import {
  getStatusUserRequest,
  getStatusUserSuccess,
  getStatusUserFail,
  getStatusUserDetailRequest,
  getStatusUserDetailSuccess,
  getStatusUserDetailFail,
  updateStatusUserRequest,
  updateStatusUserSuccess,
  updateStatusUserFail,
  createStatusUserRequest,
  createStatusUserSuccess,
  createStatusUserFail,
} from "@slices/status-user.slice";
import { AnyAction } from "redux-saga";
import axios from "axios";
import { notification } from "antd";

function* getStatusUserSaga(_action: AnyAction): Generator {
  try {
    const result = yield axios.get("http://localhost:3000/status-users", {
      params: {
        isDelete: false,
        orderBy: [
          {
            id: "desc",
          },
        ],
      },
    });
    yield put(getStatusUserSuccess({ data: result.data }));
  } catch (e) {
    yield put(getStatusUserFail({ error: "Lỗi" }));
  }
}
function* getStatusUserDetailSaga(action: AnyAction): Generator {
  try {
    const { id } = action.payload;
    const result = yield axios.get(`http://localhost:3000/status-users/${id}`);
    yield put(getStatusUserDetailSuccess({ data: result.data }));
  } catch (e) {
    yield put(getStatusUserDetailFail({ error: "Lỗi" }));
  }
}
function* updateStatusUserSaga(action: AnyAction): Generator {
  try {
    const { id, data, callback } = action.payload;
    yield axios.put(`http://localhost:3000/status-users/${id}`, { data });
    yield put(updateStatusUserSuccess());
    yield put(getStatusUserRequest());
    yield callback();
  } catch (e) {
    yield put(updateStatusUserFail({ error: "Lỗi" }));
  }
}
function* createStatusUserSaga(action: AnyAction): Generator {
  try {
    const { data, callback } = action.payload;
    yield axios.post("http://localhost:3000/status-users", { data });
    yield put(createStatusUserSuccess());
    yield put(getStatusUserRequest());
    yield callback();
    yield notification.success({ message: "Status created successfully!" });
  } catch (e) {
    yield put(createStatusUserFail({ error: "Lỗi" }));
  }
}

export default function* userSaga() {
  yield takeEvery(getStatusUserRequest, getStatusUserSaga);
  yield takeEvery(getStatusUserDetailRequest, getStatusUserDetailSaga);
  yield takeEvery(updateStatusUserRequest, updateStatusUserSaga);
  yield takeEvery(createStatusUserRequest, createStatusUserSaga);
}
