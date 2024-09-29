/* eslint-disable @typescript-eslint/no-unused-vars */
import { takeEvery, put } from "redux-saga/effects";

import {
  createBookingRequest,
  createBookingSuccess,
  createBookingFail,
  updateCreateBookingRequest,
  updateCreateBookingSuccess,
  updateCreateBookingFail,
  getBookingByRoomIdRequest,
  getBookingByRoomIdSuccess,
  getBookingByRoomIdFail,
  getBookingByUserIdRequest,
  getBookingByUserIdSuccess,
  getBookingByUserIdFail,
} from "@slices/booking.slice";
import { AnyAction } from "redux-saga";
import axios from "axios";
import apiClient from "./apiClient";

function* createBookingSaga(action: AnyAction): Generator {
  try {
    const { data } = action.payload;
    console.log(data);

    yield axios.post("http://localhost:3000/booking", data);
    yield put(createBookingSuccess());
  } catch (e) {
    yield put(createBookingFail({ error: "lỗi" }));
  }
}
function* updateCreateBookingSaga(action: AnyAction): Generator {
  try {
    const { data, callback } = action.payload;
    yield axios.post("http://localhost:3000/booking/update", data);
    yield put(updateCreateBookingSuccess());
    yield callback();
  } catch (e) {
    yield put(updateCreateBookingFail({ error: "lỗi" }));
  }
}
function* getBookingByRoomIdSaga(action: AnyAction): Generator {
  try {
    const { roomId } = action.payload;
    const result = yield axios.get("http://localhost:3000/booking/roomId", {
      params: {
        roomId,
      },
    });
    yield put(getBookingByRoomIdSuccess({ data: result.data }));
  } catch (e) {
    yield put(getBookingByRoomIdFail({ error: "lỗi" }));
  }
}
function* getBookingByUserIdSaga(_action: AnyAction): Generator {
  try {
    const result = yield apiClient.get("http://localhost:3000/booking/userId");
    yield put(getBookingByUserIdSuccess({ data: result.data }));
  } catch (e) {
    yield put(getBookingByUserIdFail({ error: "lỗi" }));
  }
}

export default function* userSaga() {
  yield takeEvery(createBookingRequest, createBookingSaga);
  yield takeEvery(updateCreateBookingRequest, updateCreateBookingSaga);
  yield takeEvery(getBookingByRoomIdRequest, getBookingByRoomIdSaga);
  yield takeEvery(getBookingByUserIdRequest, getBookingByUserIdSaga);
}
