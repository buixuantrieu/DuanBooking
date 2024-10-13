/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FavoriteType } from "types/types";
export interface FavoriteTypeList {
  favoriteList: {
    data: FavoriteType[];
    loading: boolean;
    error: string | null;
  };
}
const initialState: FavoriteTypeList = {
  favoriteList: {
    data: [],
    loading: false,
    error: null,
  },
};

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    getFavoriteByProductIdRequest: (state, _action: PayloadAction<{ roomId: number }>) => {
      state.favoriteList.loading = true;
      state.favoriteList.error = null;
    },
    getFavoriteByProductIdSuccess: (state, action) => {
      const { data } = action.payload;
      state.favoriteList.data = data;
      state.favoriteList.loading = false;
      state.favoriteList.error = null;
    },
    getFavoriteByProductIdFail: (state, action) => {
      const { error } = action.payload;
      state.favoriteList.error = error;
      state.favoriteList.loading = false;
    },
    updateFavoriteRequest: (state, _action: PayloadAction<{ roomId: number }>) => {
      state.favoriteList.loading = true;
      state.favoriteList.error = null;
    },
    updateFavoriteSuccess: (state) => {
      state.favoriteList.loading = false;
      state.favoriteList.error = null;
    },
    updateFavoriteFail: (state, action) => {
      const { error } = action.payload;
      state.favoriteList.error = error;
      state.favoriteList.loading = false;
    },
  },
});
export const {
  getFavoriteByProductIdRequest,
  getFavoriteByProductIdSuccess,
  getFavoriteByProductIdFail,
  updateFavoriteRequest,
  updateFavoriteSuccess,
  updateFavoriteFail,
} = favoriteSlice.actions;

export default favoriteSlice.reducer;
