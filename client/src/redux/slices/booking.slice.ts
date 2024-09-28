/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InfoBookingTemporary } from "types/types";

export interface BookTypeList {
  infoBookingTemporary: {
    data: InfoBookingTemporary;
  };
}
const initialState: BookTypeList = {
  infoBookingTemporary: {
    data: {},
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
  },
});
export const { addInfoBookingTemporary } = bookingSlice.actions;

export default bookingSlice.reducer;
