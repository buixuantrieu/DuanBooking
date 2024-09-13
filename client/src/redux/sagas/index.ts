import { fork } from "redux-saga/effects";
import userSaga from "./user.saga";
import roleSaga from "./role.saga";
import statusUser from "./status-user.saga";
import addressSaga from "./address.saga";

export default function* rootSaga() {
  yield fork(userSaga);
  yield fork(roleSaga);
  yield fork(statusUser);
  yield fork(addressSaga);
}
