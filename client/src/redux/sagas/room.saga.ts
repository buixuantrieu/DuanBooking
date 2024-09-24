/* eslint-disable @typescript-eslint/no-unused-vars */
import { takeEvery, put } from "redux-saga/effects";

import {
  getRoomTypeRequest,
  getRoomTypeSuccess,
  getRoomTypeFail,
  getAmenityRequest,
  getAmenitySuccess,
  getAmenityFail,
  createRoomRequest,
  createRoomSuccess,
  createRoomFail,
} from "@slices/room.slice";
import { AnyAction } from "redux-saga";
import axios from "axios";
import apiClient from "./apiClient";

function* getRoomTypeSaga(_action: AnyAction): Generator {
  try {
    const result = yield axios.get("http://localhost:3000/room/type");
    yield put(getRoomTypeSuccess({ data: result.data }));
  } catch (e) {
    yield put(getRoomTypeFail({ error: "Lỗi" }));
  }
}
function* getAmenitySaga(_action: AnyAction): Generator {
  try {
    const result = yield axios.get("http://localhost:3000/room/amenity");
    yield put(getAmenitySuccess({ data: result.data }));
  } catch (e) {
    yield put(getAmenityFail({ error: "Lỗi" }));
  }
}
function* createRoomSaga(action: AnyAction): Generator {
  try {
    const { data } = action.payload;
    const result = yield apiClient.post("http://localhost:3000/room", data);
    yield put(createRoomSuccess({ data: result.data }));
  } catch (e) {
    yield put(createRoomFail({ error: "Lỗi" }));
  }
}
export default function* userSaga() {
  yield takeEvery(getRoomTypeRequest, getRoomTypeSaga);
  yield takeEvery(getAmenityRequest, getAmenitySaga);
  yield takeEvery(createRoomRequest, createRoomSaga);
}
