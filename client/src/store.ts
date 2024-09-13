import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserTypeList } from "@slices/user.slice";
import roleReducer, { RoleTypeList } from "@slices/role.slice";
import statusUserReducer, { StatusUserTypeList } from "@slices/status-user.slice";
import addressReducer, { AddressTypeList } from "@slices/address.slice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "@sagas";

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    user: userReducer,
    role: roleReducer,
    statusUser: statusUserReducer,
    address: addressReducer,
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
  statusUser: StatusUserTypeList;
  address: AddressTypeList;
};
export type AppDispatch = typeof store.dispatch;
sagaMiddleware.run(rootSaga);
