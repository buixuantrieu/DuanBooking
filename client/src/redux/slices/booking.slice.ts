/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookingType, InfoBookingTemporary } from "types/types";

export interface BookTypeList {
  infoBookingTemporary: {
    data: InfoBookingTemporary;
  };
  bookingList: {
    data: BookingType[];
    loading: boolean;
    error: string | null;
  };
}
const initialState: BookTypeList = {
  infoBookingTemporary: {
    data: {},
  },
  bookingList: {
    data: [],
    loading: false,
    error: null,
  },
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    addInfoBookingTemporary: (
      state,
      action: PayloadAction<{
        data: InfoBookingTemporary;
        callback: () => void;
      }>
    ) => {
      const { data, callback } = action.payload;
      state.infoBookingTemporary.data = data;
      callback();
    },

    getBookingByRoomIdRequest: (state, _action: PayloadAction<{ roomId: number }>) => {
      state.bookingList.loading = true;
      state.bookingList.error = null;
    },
    getBookingByRoomIdSuccess: (state, action) => {
      const { data } = action.payload;
      state.bookingList.data = data;
      state.bookingList.loading = false;
      state.bookingList.error = null;
    },
    getBookingByRoomIdFail: (state, action) => {
      const { error } = action.payload;
      state.bookingList.loading = false;
      state.bookingList.error = error;
    },

    createBookingRequest: (state, _action: PayloadAction<{ data: BookingType; callback?: () => void }>) => {
      state.bookingList.loading = true;
      state.bookingList.error = null;
    },
    createBookingSuccess: (state) => {
      state.bookingList.loading = false;
      state.bookingList.error = null;
    },
    createBookingFail: (state, action) => {
      const { error } = action.payload;
      state.bookingList.loading = false;
      state.bookingList.error = error;
    },
    updateCreateBookingRequest: (state, action: PayloadAction<{ data: BookingType; callback?: () => void }>) => {
      state.bookingList.loading = true;
      state.bookingList.error = null;
    },
    updateCreateBookingSuccess: (state) => {
      state.bookingList.loading = false;
      state.bookingList.error = null;
    },
    updateCreateBookingFail: (state, action) => {
      const { error } = action.payload;
      state.bookingList.loading = false;
      state.bookingList.error = error;
    },
    getBookingByUserIdRequest: (state, _action: PayloadAction) => {
      state.bookingList.loading = true;
      state.bookingList.error = null;
    },
    getBookingByUserIdSuccess: (state, action) => {
      const { data } = action.payload;
      state.bookingList.data = data;
      state.bookingList.loading = false;
      state.bookingList.error = null;
    },
    getBookingByUserIdFail: (state, action) => {
      const { error } = action.payload;
      state.bookingList.loading = false;
      state.bookingList.error = error;
    },
  },
});
export const {
  addInfoBookingTemporary,
  createBookingRequest,
  createBookingSuccess,
  createBookingFail,
  updateCreateBookingRequest,
  updateCreateBookingSuccess,
  updateCreateBookingFail,
  getBookingByRoomIdRequest,
  getBookingByRoomIdSuccess,
  getBookingByRoomIdFail,
  getBookingByUserIdRequest,
  getBookingByUserIdSuccess,
  getBookingByUserIdFail,
} = bookingSlice.actions;

export default bookingSlice.reducer;
