/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeRoomType, AmenityType, RoomType } from "types/types";
export interface RoomTypeList {
  roomTypeList: {
    data: TypeRoomType[];
    loading: boolean;
    error: string | null;
  };
  roomTypeDetail: {
    data: TypeRoomType;
    loading: boolean;
    error: string | null;
  };
  amenityList: {
    data: AmenityType[];
    loading: boolean;
    error: string | null;
  };
  amenityDetail: {
    data: AmenityType;
    loading: boolean;
    error: string | null;
  };
  roomList: {
    data: RoomType[];
    loading: boolean;
    error: string | null;
  };
  roomDetail: {
    data: RoomType;
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
  roomTypeDetail: {
    data: {},
    loading: false,
    error: null,
  },
  amenityList: {
    data: [],
    loading: false,
    error: null,
  },
  amenityDetail: {
    data: {},
    loading: false,
    error: null,
  },
  roomList: {
    data: [],
    loading: false,
    error: null,
  },
  roomDetail: {
    data: {},
    loading: false,
    error: null,
  },
};

export const roomSlice = createSlice({
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
            | boolean
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
    updateRoomTypeRequest: (
      state,
      _action: PayloadAction<{ id: number; data: TypeRoomType; callback?: () => void }>
    ) => {
      state.roomTypeList.loading = true;
      state.roomTypeList.error = null;
    },

    updateRoomTypeSuccess: (state) => {
      state.roomTypeList.loading = false;
      state.roomTypeList.error = null;
    },
    updateRoomTypeFail: (state, action) => {
      const { error } = action.payload;
      state.roomTypeList.error = error;
      state.roomTypeList.loading = false;
    },
    createRoomTypeRequest: (state, _action: PayloadAction<{ data: TypeRoomType; callback?: () => void }>) => {
      state.roomTypeList.loading = true;
      state.roomTypeList.error = null;
    },

    createRoomTypeSuccess: (state) => {
      state.roomTypeList.loading = false;
      state.roomTypeList.error = null;
    },
    createRoomTypeFail: (state, action) => {
      const { error } = action.payload;
      state.roomTypeList.error = error;
      state.roomTypeList.loading = false;
    },
    getRoomTypeDetailRequest: (state, _action: PayloadAction<{ id: number; callback?: () => void }>) => {
      state.roomTypeDetail.loading = true;
      state.roomTypeDetail.error = null;
    },

    getRoomTypeDetailSuccess: (state, action) => {
      const { data } = action.payload;
      state.roomTypeDetail.data = data;
      state.roomTypeDetail.loading = false;
      state.roomTypeDetail.error = null;
    },
    getRoomTypeDetailFail: (state, action) => {
      const { error } = action.payload;
      state.roomTypeDetail.error = error;
      state.roomTypeDetail.loading = false;
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
    createAmenityRequest: (state, _action: PayloadAction<{ data: AmenityType }>) => {
      state.amenityList.loading = true;
      state.amenityList.error = null;
    },
    createAmenitySuccess: (state) => {
      state.amenityList.loading = false;
      state.amenityList.error = null;
    },
    createAmenityFail: (state, action) => {
      const { error } = action.payload;
      state.amenityList.error = error;
      state.amenityList.loading = false;
    },

    updateAmenityRequest: (state, _action: PayloadAction<{ data: AmenityType; id: number }>) => {
      state.amenityList.loading = true;
      state.amenityList.error = null;
    },
    updateAmenitySuccess: (state) => {
      state.amenityList.loading = false;
      state.amenityList.error = null;
    },
    updateAmenityFail: (state, action) => {
      const { error } = action.payload;
      state.amenityList.error = error;
      state.amenityList.loading = false;
    },
    getAmenityDetailRequest: (state, _action: PayloadAction<{ id: number }>) => {
      state.amenityDetail.loading = true;
      state.amenityDetail.error = null;
    },
    getAmenityDetailSuccess: (state, action) => {
      const { data } = action.payload;
      state.amenityDetail.data = data;
      state.amenityDetail.loading = false;
      state.amenityDetail.error = null;
    },
    getAmenityDetailFail: (state, action) => {
      const { error } = action.payload;
      state.amenityDetail.error = error;
      state.amenityDetail.loading = false;
    },
    getRoomDetailRequest: (state, _action: PayloadAction<{ id: number }>) => {
      state.roomDetail.loading = true;
      state.roomDetail.error = null;
    },
    getRoomDetailSuccess: (state, action) => {
      const { data } = action.payload;
      state.roomDetail.data = data;
      state.roomDetail.loading = false;
      state.roomDetail.error = null;
    },
    getRoomDetailFail: (state, action) => {
      const { error } = action.payload;
      state.roomDetail.error = error;
      state.roomDetail.loading = false;
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
    updateRoomRequest: (state, _action: PayloadAction<{ id: number; data: RoomType; callback?: () => void }>) => {
      state.roomList.loading = true;
      state.roomList.error = null;
    },
    updateRoomSuccess: (state) => {
      state.roomList.loading = false;
      state.roomList.error = null;
    },
    updateRoomFail: (state, action) => {
      const { error } = action.payload;
      state.roomList.error = error;
      state.roomList.loading = false;
    },
    getRoomByPartnerIdRequest: (state) => {
      state.roomList.loading = true;
      state.roomList.error = null;
    },
    getRoomByPartnerIdSuccess: (state, action) => {
      const { data } = action.payload;
      state.roomList.data = data;
      state.roomList.loading = false;
      state.roomList.error = null;
    },
    getRoomByPartnerIdFail: (state, action) => {
      const { error } = action.payload;
      state.roomList.error = error;
      state.roomList.loading = false;
    },
    updateSubImageRequest: (
      state,
      _action: PayloadAction<{ data: { image: string }; id: number; productId: number }>
    ) => {
      state.roomDetail.loading = true;
      state.roomDetail.error = null;
    },
    updateSubImageSuccess: (state) => {
      state.roomDetail.loading = false;
      state.roomDetail.error = null;
    },
    updateSubImageFail: (state, action) => {
      const { error } = action.payload;
      state.roomDetail.error = error;
      state.roomDetail.loading = false;
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
  getRoomDetailRequest,
  getRoomDetailSuccess,
  getRoomDetailFail,
  updateRoomRequest,
  updateRoomSuccess,
  updateRoomFail,
  getRoomByPartnerIdRequest,
  getRoomByPartnerIdSuccess,
  getRoomByPartnerIdFail,
  updateSubImageRequest,
  updateSubImageSuccess,
  updateSubImageFail,
  getRoomTypeDetailRequest,
  getRoomTypeDetailSuccess,
  getRoomTypeDetailFail,
  updateRoomTypeRequest,
  updateRoomTypeSuccess,
  updateRoomTypeFail,
  createRoomTypeRequest,
  createRoomTypeSuccess,
  createRoomTypeFail,
  getAmenityDetailRequest,
  getAmenityDetailSuccess,
  getAmenityDetailFail,
  updateAmenityRequest,
  updateAmenitySuccess,
  updateAmenityFail,
  createAmenityRequest,
  createAmenitySuccess,
  createAmenityFail,
} = roomSlice.actions;

export default roomSlice.reducer;
