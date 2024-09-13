/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface AddressTypeList {
  wardList: {
    data: { [key: string]: string | number }[];
    loading: boolean;
    error: string | null;
  };
  districtList: {
    data: { [key: string]: string | number }[];
    loading: boolean;
    error: string | null;
  };
  provinceList: {
    data: { [key: string]: string | number }[];
    loading: boolean;
    error: string | null;
  };
}
const initialState: AddressTypeList = {
  wardList: {
    data: [],
    loading: false,
    error: null,
  },

  districtList: {
    data: [],
    loading: false,
    error: null,
  },
  provinceList: {
    data: [],
    loading: false,
    error: null,
  },
};

export const roleSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    getWardRequest: (state, _action: PayloadAction<{ district_id: number }>) => {
      state.wardList.loading = true;
      state.wardList.error = null;
    },
    getWardSuccess: (state, action) => {
      const { data } = action.payload;
      state.wardList.data = data;
      state.wardList.loading = false;
      state.wardList.error = null;
    },
    getWardFail: (state, action) => {
      const { error } = action.payload;
      state.wardList.error = error;
      state.wardList.loading = false;
    },
    getDistrictRequest: (state, _action: PayloadAction<{ province_id: number }>) => {
      state.districtList.loading = true;
      state.districtList.error = null;
    },
    getDistrictSuccess: (state, action) => {
      const { data } = action.payload;
      state.districtList.data = data;
      state.districtList.loading = false;
      state.districtList.error = null;
    },
    getDistrictFail: (state, action) => {
      const { error } = action.payload;
      state.districtList.error = error;
      state.districtList.loading = false;
    },
    getProvinceRequest: (state, _action: PayloadAction) => {
      state.provinceList.loading = true;
      state.provinceList.error = null;
    },
    getProvinceSuccess: (state, action) => {
      const { data } = action.payload;
      state.provinceList.data = data;
      state.provinceList.loading = false;
      state.provinceList.error = null;
    },
    getProvinceFail: (state, action) => {
      const { error } = action.payload;
      state.provinceList.error = error;
      state.provinceList.loading = false;
    },
  },
});

export const {
  getWardRequest,
  getWardSuccess,
  getWardFail,
  getDistrictRequest,
  getDistrictSuccess,
  getDistrictFail,
  getProvinceRequest,
  getProvinceSuccess,
  getProvinceFail,
} = roleSlice.actions;

export default roleSlice.reducer;
