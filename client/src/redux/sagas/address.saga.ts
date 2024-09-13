/* eslint-disable @typescript-eslint/no-unused-vars */
import { takeEvery, put } from "redux-saga/effects";

import {
  getDistrictRequest,
  getDistrictSuccess,
  getDistrictFail,
  getProvinceRequest,
  getProvinceSuccess,
  getProvinceFail,
  getWardRequest,
  getWardSuccess,
  getWardFail,
} from "@slices/address.slice";
import { AnyAction } from "redux-saga";
import axios from "axios";

function* getWardSaga(action: AnyAction): Generator {
  try {
    const { district_id } = action.payload;
    const result = yield axios.get("http://localhost:3000/address/wards", {
      params: {
        district_id,
      },
    });
    yield put(getWardSuccess({ data: result.data }));
  } catch (e) {
    yield put(getWardFail({ error: "Lỗi" }));
  }
}
function* getDistrictSaga(action: AnyAction): Generator {
  try {
    const { province_id } = action.payload;
    const result = yield axios.get("http://localhost:3000/address/districts", {
      params: {
        province_id,
      },
    });
    yield put(getDistrictSuccess({ data: result.data }));
  } catch (e) {
    yield put(getDistrictFail({ error: "Lỗi" }));
  }
}
function* getProvinceSaga(_action: AnyAction): Generator {
  try {
    const result = yield axios.get("http://localhost:3000/address/provinces");
    yield put(getProvinceSuccess({ data: result.data }));
  } catch (e) {
    yield put(getProvinceFail({ error: "Lỗi" }));
  }
}

export default function* userSaga() {
  yield takeEvery(getWardRequest, getWardSaga);
  yield takeEvery(getDistrictRequest, getDistrictSaga);
  yield takeEvery(getProvinceRequest, getProvinceSaga);
}
