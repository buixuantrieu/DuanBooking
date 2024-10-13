/* eslint-disable @typescript-eslint/no-unused-vars */
import { takeEvery, put } from "redux-saga/effects";

import {
  getFavoriteByProductIdRequest,
  getFavoriteByProductIdSuccess,
  getFavoriteByProductIdFail,
  updateFavoriteRequest,
  updateFavoriteSuccess,
  updateFavoriteFail,
} from "@slices/favorite.slice";
import { AnyAction } from "redux-saga";
import axios from "axios";
import apiClient from "./apiClient";

function* getFavoriteByIdSaga(action: AnyAction): Generator {
  try {
    const { roomId } = action.payload;
    const result = yield axios.get("http://localhost:3000/room/favorite", {
      params: {
        roomId,
      },
    });
    yield put(getFavoriteByProductIdSuccess({ data: result.data }));
  } catch (e) {
    yield put(getFavoriteByProductIdFail({ error: "lỗi" }));
  }
}
function* updateFavoriteSaga(action: AnyAction): Generator {
  try {
    const { roomId } = action.payload;
    yield apiClient.put(`http://localhost:3000/room/favorite/${roomId}`);
    yield put(updateFavoriteSuccess());
    yield put(getFavoriteByProductIdRequest({ roomId }));
  } catch (e) {
    yield put(updateFavoriteFail({ error: "lỗi" }));
  }
}

export default function* userSaga() {
  yield takeEvery(getFavoriteByProductIdRequest, getFavoriteByIdSaga);
  yield takeEvery(updateFavoriteRequest, updateFavoriteSaga);
}
