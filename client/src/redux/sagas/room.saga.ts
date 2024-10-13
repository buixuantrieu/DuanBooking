/* eslint-disable @typescript-eslint/no-unused-vars */
import { takeEvery, put, debounce } from "redux-saga/effects";

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
  getRoomRequest,
  getRoomSuccess,
  getRoomFail,
  getRoomDetailRequest,
  getRoomDetailSuccess,
  getRoomDetailFail,
  updateRoomRequest,
  updateRoomSuccess,
  updateRoomFail,
  getRoomByPartnerIdRequest,
  getRoomByPartnerIdSuccess,
  getRoomByPartnerIdFail,
  updateSubImageRequest,
  updateSubImageSuccess,
  updateSubImageFail,
  getRoomTypeDetailRequest,
  getRoomTypeDetailSuccess,
  getRoomTypeDetailFail,
  updateRoomTypeRequest,
  updateRoomTypeSuccess,
  updateRoomTypeFail,
  createRoomTypeRequest,
  createRoomTypeSuccess,
  createRoomTypeFail,
  getAmenityDetailRequest,
  getAmenityDetailSuccess,
  getAmenityDetailFail,
  updateAmenityRequest,
  updateAmenitySuccess,
  updateAmenityFail,
  createAmenityRequest,
  createAmenitySuccess,
  createAmenityFail,
} from "@slices/room.slice";
import { AnyAction } from "redux-saga";
import axios from "axios";
import apiClient from "./apiClient";
import { notification } from "antd";

function* getRoomSaga(action: AnyAction): Generator {
  try {
    const { data } = action.payload;
    const result = yield axios.get("http://localhost:3000/room", {
      params: { ...data },
    });
    yield put(getRoomSuccess({ data: result.data }));
  } catch (e) {
    yield put(getRoomFail({ error: "Lỗi" }));
  }
}
function* getRoomDetailSaga(action: AnyAction): Generator {
  try {
    const { id } = action.payload;
    const result = yield axios.get(`http://localhost:3000/room/${id}`);
    yield put(getRoomDetailSuccess({ data: result.data }));
  } catch (e) {
    yield put(getRoomDetailFail({ error: "Lỗi" }));
  }
}
function* getAmenityDetailSaga(action: AnyAction): Generator {
  try {
    const { id } = action.payload;
    const result = yield axios.get(`http://localhost:3000/room/amenity/${id}`);
    yield put(getAmenityDetailSuccess({ data: result.data }));
    yield put(getAmenityRequest());
  } catch (e) {
    yield put(getAmenityDetailFail({ error: "Lỗi" }));
  }
}

function* updateRoomSaga(action: AnyAction): Generator {
  try {
    const { id, data, callback } = action.payload;
    yield axios.put(`http://localhost:3000/room/${id}`, data);
    yield put(updateRoomSuccess());
    yield put(getRoomRequest({}));
    yield callback();
  } catch (e) {
    yield put(updateRoomFail({ error: "Lỗi" }));
  }
}

function* createAmenitySaga(action: AnyAction): Generator {
  try {
    const { data } = action.payload;
    yield axios.post(`http://localhost:3000/room/amenity`, data);
    yield put(createAmenitySuccess());
    yield put(getAmenityRequest());
    yield notification.success({ message: "Thêm tiện nghi thành công!" });
  } catch (e) {
    yield put(createAmenityFail({ error: "Lỗi" }));
  }
}

function* getRoomTypeSaga(_action: AnyAction): Generator {
  try {
    const result = yield axios.get("http://localhost:3000/room/type");

    yield put(getRoomTypeSuccess({ data: result.data }));
  } catch (e) {
    yield put(getRoomTypeFail({ error: "Lỗi" }));
  }
}
function* updateRoomTypeSaga(action: AnyAction): Generator {
  try {
    const { id, data } = action.payload;
    yield axios.put(`http://localhost:3000/room/type/${id}`, data);
    yield put(updateRoomTypeSuccess());
    yield put(getRoomTypeRequest());
    notification.success({ message: "Cập nhật thành công!!" });
  } catch (e) {
    yield put(updateRoomTypeFail({ error: "Lỗi" }));
  }
}

function* updateAmenitySaga(action: AnyAction): Generator {
  try {
    const { id, data } = action.payload;
    yield axios.put(`http://localhost:3000/room/amenity/${id}`, data);
    yield put(updateAmenitySuccess());
    yield put(getAmenityRequest());
    yield notification.success({ message: "Cập nhật thành công!!" });
  } catch (e) {
    yield put(updateAmenityFail({ error: "Lỗi" }));
  }
}

function* createRoomTypeSaga(action: AnyAction): Generator {
  try {
    const { data, callback } = action.payload;
    yield axios.post(`http://localhost:3000/room/type`, data);
    yield put(createRoomTypeSuccess());
    yield put(getRoomTypeRequest());
    yield callback();
    yield notification.success({ message: "Thêm loại phòng thành công!!" });
  } catch (e) {
    yield put(createRoomTypeFail({ error: "Lỗi" }));
  }
}

function* getRoomTypeDetailSaga(action: AnyAction): Generator {
  try {
    const { id } = action.payload;
    const result = yield axios.get(`http://localhost:3000/room/type/${id}`);
    yield put(getRoomTypeDetailSuccess({ data: result.data }));
  } catch (e) {
    yield put(getRoomTypeDetailFail({ error: "Lỗi" }));
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

function* getRoomByPartnerIdSaga(_action: AnyAction): Generator {
  try {
    const result = yield apiClient.get("http://localhost:3000/room/partner");
    yield put(getRoomByPartnerIdSuccess({ data: result.data }));
  } catch (e) {
    yield put(getRoomByPartnerIdFail({ error: "Lỗi" }));
  }
}

function* updateSubImageSaga(action: AnyAction): Generator {
  try {
    const { id, productId, data } = action.payload;
    yield apiClient.put(`http://localhost:3000/room/image/${id}`, data);
    yield put(updateSubImageSuccess());
    yield put(getRoomDetailRequest({ id: productId }));
    yield notification.success({ message: "Cập nhật ảnh thành công!" });
  } catch (e) {
    yield put(updateSubImageFail({ error: "Lỗi" }));
  }
}

function* createRoomSaga(action: AnyAction): Generator {
  try {
    const { data, callback } = action.payload;
    yield apiClient.post("http://localhost:3000/room", data);
    yield put(createRoomSuccess());
    yield callback();
    yield notification.success({ message: "Tạo bài đăng thành công! Vui lòng đợi admin phê duyệt" });
  } catch (e) {
    yield put(createRoomFail({ error: "Lỗi" }));
  }
}
export default function* userSaga() {
  yield takeEvery(getRoomTypeRequest, getRoomTypeSaga);
  yield takeEvery(getAmenityRequest, getAmenitySaga);
  yield takeEvery(createRoomRequest, createRoomSaga);
  yield debounce(100, getRoomRequest, getRoomSaga);
  yield takeEvery(getRoomDetailRequest, getRoomDetailSaga);
  yield takeEvery(updateRoomRequest, updateRoomSaga);
  yield takeEvery(getRoomByPartnerIdRequest, getRoomByPartnerIdSaga);
  yield takeEvery(updateSubImageRequest, updateSubImageSaga);
  yield takeEvery(getRoomTypeDetailRequest, getRoomTypeDetailSaga);
  yield takeEvery(updateRoomTypeRequest, updateRoomTypeSaga);
  yield takeEvery(createRoomTypeRequest, createRoomTypeSaga);
  yield takeEvery(getAmenityDetailRequest, getAmenityDetailSaga);
  yield takeEvery(updateAmenityRequest, updateAmenitySaga);
  yield takeEvery(createAmenityRequest, createAmenitySaga);
}
