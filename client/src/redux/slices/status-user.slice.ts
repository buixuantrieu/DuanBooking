/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StatusUserType } from "types/types";
export interface StatusUserTypeList {
  statusDetail: {
    data: { [key: string]: StatusUserType };
    loading: boolean;
    error: string | null;
  };
  statusList: {
    data: StatusUserType[];
    loading: boolean;
    error: string | null;
  };
}
const initialState: StatusUserTypeList = {
  statusDetail: {
    data: {},
    loading: false,
    error: null,
  },

  statusList: {
    data: [],
    loading: false,
    error: null,
  },
};

export const statusUserSlice = createSlice({
  name: "statusUser",
  initialState,
  reducers: {
    getStatusUserRequest: (state, _action: PayloadAction) => {
      state.statusList.loading = true;
      state.statusList.error = null;
    },
    getStatusUserSuccess: (state, action) => {
      const { data } = action.payload;
      state.statusList.data = data;
      state.statusList.loading = false;
      state.statusList.error = null;
    },
    getStatusUserFail: (state, action) => {
      const { error } = action.payload;
      state.statusList.error = error;
      state.statusList.loading = false;
    },
    getStatusUserDetailRequest: (state, _action: PayloadAction<{ id: number }>) => {
      state.statusDetail.loading = true;
      state.statusDetail.error = null;
    },
    getStatusUserDetailSuccess: (state, action) => {
      const { data } = action.payload;
      state.statusDetail.data = data;
      state.statusDetail.loading = false;
      state.statusDetail.error = null;
    },
    getStatusUserDetailFail: (state, action) => {
      const { error } = action.payload;
      state.statusDetail.error = error;
      state.statusDetail.loading = false;
    },
    updateStatusUserRequest: (
      state,
      _action: PayloadAction<{ id: number; data: StatusUserType; callback: () => void }>
    ) => {
      state.statusList.loading = true;
      state.statusList.error = null;
    },
    updateStatusUserSuccess: (state) => {
      state.statusList.loading = false;
      state.statusList.error = null;
    },
    updateStatusUserFail: (state, action) => {
      const { error } = action.payload;
      state.statusList.error = error;
      state.statusList.loading = false;
    },
    createStatusUserRequest: (state, _action: PayloadAction<{ data: StatusUserType; callback: () => void }>) => {
      state.statusDetail.loading = true;
      state.statusDetail.error = null;
    },
    createStatusUserSuccess: (state) => {
      state.statusDetail.loading = false;
      state.statusDetail.error = null;
    },
    createStatusUserFail: (state, action) => {
      const { error } = action.payload;
      state.statusDetail.error = error;
      state.statusDetail.loading = false;
    },
  },
});

export const {
  getStatusUserRequest,
  getStatusUserSuccess,
  getStatusUserFail,
  getStatusUserDetailRequest,
  getStatusUserDetailSuccess,
  getStatusUserDetailFail,
  updateStatusUserRequest,
  updateStatusUserSuccess,
  updateStatusUserFail,
  createStatusUserRequest,
  createStatusUserSuccess,
  createStatusUserFail,
} = statusUserSlice.actions;

export default statusUserSlice.reducer;
