/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReviewType, CommentType } from "types/types";
export interface RateTypeList {
  reviewList: {
    data: ReviewType[];
    loading: boolean;
    error: string | null;
  };
  commentList: {
    data: CommentType[];
    loading: boolean;
    error: string | null;
  };
}
const initialState: RateTypeList = {
  reviewList: {
    data: [],
    loading: false,
    error: null,
  },
  commentList: {
    data: [],
    loading: false,
    error: null,
  },
};

export const rateSlice = createSlice({
  name: "rate",
  initialState,
  reducers: {
    getCommentRequest: (state, _action: PayloadAction<{ id: number | undefined | string }>) => {
      state.commentList.loading = true;
      state.commentList.error = null;
    },
    getCommentSuccess: (state, action) => {
      const { data } = action.payload;
      state.commentList.data = data;
      state.commentList.loading = false;
      state.commentList.error = null;
    },
    getCommentFail: (state, action) => {
      const { error } = action.payload;
      state.commentList.error = error;
      state.commentList.loading = false;
    },
    createCommentRequest: (
      state,
      _action: PayloadAction<{
        data: { [key: string]: string | number | undefined };
        id?: number | undefined | string;
        callback: () => void;
      }>
    ) => {
      state.commentList.loading = true;
      state.commentList.error = null;
    },
    createCommentSuccess: (state) => {
      state.commentList.loading = false;
      state.commentList.error = null;
    },
    createCommentFail: (state, action) => {
      const { error } = action.payload;
      state.commentList.error = error;
      state.commentList.loading = false;
    },
    getReviewRequest: (state, _action: PayloadAction<{ id: number | undefined | string }>) => {
      state.reviewList.loading = true;
      state.reviewList.error = null;
    },
    getReviewSuccess: (state, action) => {
      const { data } = action.payload;
      state.reviewList.data = data;
      state.reviewList.loading = false;
      state.reviewList.error = null;
    },
    getReviewFail: (state, action) => {
      const { error } = action.payload;
      state.reviewList.error = error;
      state.reviewList.loading = false;
    },
    createReviewRequest: (
      state,
      _action: PayloadAction<{
        data: { [key: string]: string | number | undefined };
        id?: number | undefined | string;
        callback?: () => void;
      }>
    ) => {
      state.reviewList.loading = true;
      state.reviewList.error = null;
    },
    createReviewSuccess: (state) => {
      state.reviewList.loading = false;
      state.reviewList.error = null;
    },
    createReviewFail: (state, action) => {
      const { error } = action.payload;
      state.reviewList.error = error;
      state.reviewList.loading = false;
    },
  },
});
export const {
  getCommentRequest,
  getCommentSuccess,
  getCommentFail,
  createCommentFail,
  createCommentSuccess,
  createCommentRequest,
  getReviewRequest,
  getReviewSuccess,
  getReviewFail,
  createReviewRequest,
  createReviewSuccess,
  createReviewFail,
} = rateSlice.actions;

export default rateSlice.reducer;
