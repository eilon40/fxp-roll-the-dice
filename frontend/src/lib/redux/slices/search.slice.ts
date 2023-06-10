import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type Search = {
  term: string;
  amount: string;
  loading: boolean;
};

const initialState: Search = {
  term: "",
  amount: "!",
  loading: false,
};

const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    setTerm(state, action: PayloadAction<string>) {
      state.term = action.payload;
    },
    setUsersAmount(state, action: PayloadAction<string>) {
      state.amount = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    resetTerm(state) {
      state.term = initialState.term;
    },
  },
});

export const { setTerm, resetTerm, setUsersAmount, setIsLoading } =
  searchSlice.actions;

export const currentSearch = (state: RootState) => state.search;

export default searchSlice.reducer;
