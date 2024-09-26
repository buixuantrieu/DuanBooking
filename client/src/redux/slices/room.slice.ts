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
  roomList: {
    data: RoomType[];
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
  roomList: {
    data: [],
    loading: false,
    error: null,
  },
};

export const roleSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    getRoomRequest: (
      state,
      _action: PayloadAction<{
        data?: {
          [key: string]:
            | string
            | number
            | string[]
            | number[]
            | undefined
            | { [key: string]: string | undefined | number[] };
        };
      }>
    ) => {
      state.roomList.loading = true;
      state.roomList.error = null;
    },
    getRoomSuccess: (state, action) => {
      const { data } = action.payload;
      state.roomList.data = data;
      state.roomList.loading = false;
      state.roomList.error = null;
    },
    getRoomFail: (state, action) => {
      const { error } = action.payload;
      state.roomList.error = error;
      state.roomList.loading = false;
    },
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
    createRoomRequest: (state, _action: PayloadAction<{ data: RoomType; callback: () => void }>) => {
      state.amenityList.loading = true;
      state.roomList.error = null;
    },
    createRoomSuccess: (state) => {
      state.amenityList.loading = false;
      state.roomList.error = null;
    },
    createRoomFail: (state, action) => {
      const { error } = action.payload;
      state.roomList.error = error;
      state.amenityList.loading = false;
    },
  },
});

export const {
  getRoomRequest,
  getRoomSuccess,
  getRoomFail,
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
