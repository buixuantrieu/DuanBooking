import { fork } from "redux-saga/effects";
import userSaga from "./user.saga";
import roleSaga from "./role.saga";
import addressSaga from "./address.saga";
import roomSaga from "./room.saga";

export default function* rootSaga() {
  yield fork(userSaga);
  yield fork(roleSaga);
  yield fork(addressSaga);
  yield fork(roomSaga);
}
