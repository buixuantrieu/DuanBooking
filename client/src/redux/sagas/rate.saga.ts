/* eslint-disable @typescript-eslint/no-unused-vars */
import { takeEvery, put } from "redux-saga/effects";

import {
  getCommentRequest,
  getCommentSuccess,
  getCommentFail,
  createCommentRequest,
  createCommentSuccess,
  createCommentFail,
  getReviewRequest,
  getReviewSuccess,
  getReviewFail,
  createReviewRequest,
  createReviewSuccess,
  createReviewFail,
} from "@slices/rate.slice";
import { AnyAction } from "redux-saga";
import axios from "axios";
import apiClient from "./apiClient";

function* getCommentSaga(action: AnyAction): Generator {
  try {
    const { id } = action.payload;
    const result = yield axios.get("http://localhost:3000/comment", {
      params: {
        id,
      },
    });
    yield put(getCommentSuccess({ data: result.data }));
  } catch (e) {
    yield put(getCommentFail({ error: "lỗi" }));
  }
}
function* createCommentSaga(action: AnyAction): Generator {
  try {
    const { data, id, callback } = action.payload;
    yield apiClient.post("http://localhost:3000/comment", data);
    yield put(createCommentSuccess());
    yield put(getCommentRequest({ id }));
    yield callback();
  } catch (e) {
    yield put(createCommentFail({ error: "lỗi" }));
  }
}
function* getReviewSaga(action: AnyAction): Generator {
  try {
    const { id } = action.payload;
    const result = yield axios.get("http://localhost:3000/review", {
      params: {
        id,
      },
    });
    yield put(getReviewSuccess({ data: result.data }));
  } catch (e) {
    yield put(getReviewFail({ error: "lỗi" }));
  }
}
function* createReviewSaga(action: AnyAction): Generator {
  try {
    const { data, id, callback } = action.payload;
    yield apiClient.post("http://localhost:3000/review", data);
    yield put(createReviewSuccess());
    yield put(getReviewRequest({ id }));
    yield callback();
  } catch (e) {
    yield put(createReviewFail({ error: "lỗi" }));
  }
}

export default function* userSaga() {
  yield takeEvery(getCommentRequest, getCommentSaga);
  yield takeEvery(createCommentRequest, createCommentSaga);
  yield takeEvery(getReviewRequest, getReviewSaga);
  yield takeEvery(createReviewRequest, createReviewSaga);
}
