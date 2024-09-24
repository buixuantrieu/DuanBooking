/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeRoomType, AmenityType, RoomType } from "types/types";
export interface RoomTypeList {
  roomTypeList: {
    data: TypeRoomType[];
    loading: boolean;
    error: string | null;
  };
  amenityList: {
    data: AmenityType[];
    loading: boolean;
    error: string | null;
  };
}
const initialState: RoomTypeList = {
  roomTypeList: {
    data: [],
    loading: false,
    error: null,
  },
  amenityList: {
    data: [],
    loading: false,
    error: null,
  },
};

export const roleSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getRoomTypeRequest: (state, _action: PayloadAction) => {
      state.roomTypeList.loading = true;
      state.roomTypeList.error = null;
    },
    getRoomTypeSuccess: (state, action) => {
      const { data } = action.payload;
      state.roomTypeList.data = data;
      state.roomTypeList.loading = false;
      state.roomTypeList.error = null;
    },
    getRoomTypeFail: (state, action) => {
      const { error } = action.payload;
      state.roomTypeList.error = error;
      state.roomTypeList.loading = false;
    },
    getAmenityRequest: (state, _action: PayloadAction) => {
      state.amenityList.loading = true;
      state.amenityList.error = null;
    },
    getAmenitySuccess: (state, action) => {
      const { data } = action.payload;
      state.amenityList.data = data;
      state.amenityList.loading = false;
      state.amenityList.error = null;
    },
    getAmenityFail: (state, action) => {
      const { error } = action.payload;
      state.amenityList.error = error;
      state.amenityList.loading = false;
    },
    createRoomRequest: (state, _action: PayloadAction<{ data: RoomType }>) => {
      state.amenityList.loading = true;
      state.amenityList.error = null;
    },
    createRoomSuccess: (state, action) => {
      const { data } = action.payload;
      state.amenityList.data = data;
      state.amenityList.loading = false;
      state.amenityList.error = null;
    },
    createRoomFail: (state, action) => {
      const { error } = action.payload;
      state.amenityList.error = error;
      state.amenityList.loading = false;
    },
  },
});

export const {
  getRoomTypeRequest,
  getRoomTypeSuccess,
  getRoomTypeFail,
  getAmenityRequest,
  getAmenitySuccess,
  getAmenityFail,
  createRoomRequest,
  createRoomSuccess,
  createRoomFail,
} = roleSlice.actions;

export default roleSlice.reducer;
