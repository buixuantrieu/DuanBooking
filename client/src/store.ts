import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserTypeList } from "@slices/user.slice";
import roleReducer, { RoleTypeList } from "@slices/role.slice";
import addressReducer, { AddressTypeList } from "@slices/address.slice";
import roomReducer, { RoomTypeList } from "@slices/room.slice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "@sagas";

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    user: userReducer,
    role: roleReducer,
    address: addressReducer,
    room: roomReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

export type RootState = {
  user: UserTypeList;
  role: RoleTypeList;
  address: AddressTypeList;
  room: RoomTypeList;
};
export type AppDispatch = typeof store.dispatch;
sagaMiddleware.run(rootSaga);
