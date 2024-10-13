import { fork } from "redux-saga/effects";
import userSaga from "./user.saga";
import addressSaga from "./address.saga";
import roomSaga from "./room.saga";
import rateSaga from "./rate.saga";
import bookingSaga from "./booking.saga";
import favoriteSaga from "./favorite.saga";

export default function* rootSaga() {
  yield fork(userSaga);
  yield fork(addressSaga);
  yield fork(roomSaga);
  yield fork(rateSaga);
  yield fork(bookingSaga);
  yield fork(favoriteSaga);
}
