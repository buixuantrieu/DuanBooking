/* eslint-disable @typescript-eslint/no-unused-vars */
import { takeEvery, put } from "redux-saga/effects";

import {
  getRoleRequest,
  getRoleSuccess,
  getRoleFail,
  getRoleDetailRequest,
  getRoleDetailSuccess,
  getRoleDetailFail,
  updateRoleRequest,
  updateRoleSuccess,
  updateRoleFail,
  createRoleRequest,
  createRoleSuccess,
  createRoleFail,
} from "@slices/role.slice";
import { AnyAction } from "redux-saga";
import axios from "axios";
import { notification } from "antd";

function* getRoleSaga(_action: AnyAction): Generator {
  try {
    const result = yield axios.get("http://localhost:3000/roles", {
      params: {
        isDelete: false,
        orderBy: [
          {
            id: "desc",
          },
        ],
      },
    });
    yield put(getRoleSuccess({ data: result.data }));
  } catch (e) {
    yield put(getRoleFail({ error: "Lỗi" }));
  }
}
function* getRoleDetailSaga(action: AnyAction): Generator {
  try {
    const { id } = action.payload;
    const result = yield axios.get(`http://localhost:3000/roles/${id}`);
    yield put(getRoleDetailSuccess({ data: result.data }));
  } catch (e) {
    yield put(getRoleDetailFail({ error: "Lỗi" }));
  }
}
function* updateRoleSaga(action: AnyAction): Generator {
  try {
    const { id, data, callback } = action.payload;
    yield axios.put(`http://localhost:3000/roles/${id}`, { data });
    yield put(updateRoleSuccess());
    yield put(getRoleRequest());
    yield callback();
  } catch (e) {
    yield put(updateRoleFail({ error: "Lỗi" }));
  }
}
function* createRoleSaga(action: AnyAction): Generator {
  try {
    const { data, callback } = action.payload;
    yield axios.post("http://localhost:3000/roles", { data });
    yield put(createRoleSuccess());
    yield put(getRoleRequest());
    yield callback();
    yield notification.success({ message: "Role created successfully!" });
  } catch (e) {
    yield put(createRoleFail({ error: "Lỗi" }));
  }
}

export default function* userSaga() {
  yield takeEvery(getRoleRequest, getRoleSaga);
  yield takeEvery(getRoleDetailRequest, getRoleDetailSaga);
  yield takeEvery(updateRoleRequest, updateRoleSaga);
  yield takeEvery(createRoleRequest, createRoleSaga);
}
