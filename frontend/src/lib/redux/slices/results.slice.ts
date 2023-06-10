import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type Results = {
  count: number;
  unique: User[];
  all: User[];
  random: User[];
};

export type User = {
  nickname: string;
  href: string;
  order?: number;
};

const initialState: Results = {
  count: 0,
  unique: [],
  all: [],
  random: [],
};

const resultsSlice = createSlice({
  name: "resultsSlice",
  initialState,
  reducers: {
    setResults(state, action: PayloadAction<Results>) {
      state.count = action.payload.count;
      state.all = action.payload.all;
      state.unique = action.payload.unique;
      state.random = action.payload.random;
    },
    reset(state) {
      state.count = initialState.count;
      state.all = initialState.all;
      state.random = initialState.random;
      state.unique = initialState.unique;
    },
  },
});

export const { setResults, reset } = resultsSlice.actions;

export const currentResults = (state: RootState) => state.results;

export default resultsSlice.reducer;
