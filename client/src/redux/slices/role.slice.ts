/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RoleType } from "types/types";
export interface RoleTypeList {
  roleDetail: {
    data: { [key: string]: RoleType };
    loading: boolean;
    error: string | null;
  };
  roleList: {
    data: RoleType[];
    loading: boolean;
    error: string | null;
  };
}
const initialState: RoleTypeList = {
  roleDetail: {
    data: {},
    loading: false,
    error: null,
  },

  roleList: {
    data: [],
    loading: false,
    error: null,
  },
};

export const roleSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getRoleRequest: (state, _action: PayloadAction) => {
      state.roleList.loading = true;
      state.roleList.error = null;
    },
    getRoleSuccess: (state, action) => {
      const { data } = action.payload;
      state.roleList.data = data;
      state.roleList.loading = false;
      state.roleList.error = null;
    },
    getRoleFail: (state, action) => {
      const { error } = action.payload;
      state.roleList.error = error;
      state.roleList.loading = false;
    },
    getRoleDetailRequest: (state, _action: PayloadAction<{ id: number }>) => {
      state.roleDetail.loading = true;
      state.roleDetail.error = null;
    },
    getRoleDetailSuccess: (state, action) => {
      const { data } = action.payload;
      state.roleDetail.data = data;
      state.roleDetail.loading = false;
      state.roleDetail.error = null;
    },
    getRoleDetailFail: (state, action) => {
      const { error } = action.payload;
      state.roleDetail.error = error;
      state.roleDetail.loading = false;
    },
    updateRoleRequest: (state, _action: PayloadAction<{ id: number; data: RoleType; callback: () => void }>) => {
      state.roleList.loading = true;
      state.roleList.error = null;
    },
    updateRoleSuccess: (state) => {
      state.roleList.loading = false;
      state.roleList.error = null;
    },
    updateRoleFail: (state, action) => {
      const { error } = action.payload;
      state.roleList.error = error;
      state.roleList.loading = false;
    },
    createRoleRequest: (state, _action: PayloadAction<{ data: RoleType; callback: () => void }>) => {
      state.roleDetail.loading = true;
      state.roleDetail.error = null;
    },
    createRoleSuccess: (state) => {
      state.roleDetail.loading = false;
      state.roleDetail.error = null;
    },
    createRoleFail: (state, action) => {
      const { error } = action.payload;
      state.roleDetail.error = error;
      state.roleDetail.loading = false;
    },
  },
});

export const {
  getRoleRequest,
  getRoleSuccess,
  getRoleFail,
  getRoleDetailRequest,
  getRoleDetailSuccess,
  getRoleDetailFail,
  updateRoleRequest,
  updateRoleSuccess,
  updateRoleFail,
  createRoleRequest,
  createRoleSuccess,
  createRoleFail,
} = roleSlice.actions;

export default roleSlice.reducer;
