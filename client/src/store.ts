import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserTypeList } from "@slices/user.slice";
import addressReducer, { AddressTypeList } from "@slices/address.slice";
import roomReducer, { RoomTypeList } from "@slices/room.slice";
import rateReducer, { RateTypeList } from "@slices/rate.slice";
import bookingReducer, { BookTypeList } from "@slices/booking.slice";
import favoriteReducer, { FavoriteTypeList } from "@slices/favorite.slice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "@sagas";

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    user: userReducer,
    address: addressReducer,
    room: roomReducer,
    rate: rateReducer,
    booking: bookingReducer,
    favorite: favoriteReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

export type RootState = {
  user: UserTypeList;
  address: AddressTypeList;
  room: RoomTypeList;
  rate: RateTypeList;
  booking: BookTypeList;
  favorite: FavoriteTypeList;
};
export type AppDispatch = typeof store.dispatch;
sagaMiddleware.run(rootSaga);
