import { configureStore } from "@reduxjs/toolkit";
import resultsSlice from "./slices/results.slice";
import searchSlice from "./slices/search.slice";

export const store = configureStore({
  reducer: {
    search: searchSlice,
    results: resultsSlice,
  },
  devTools: import.meta.env.PROD ? false : true,
});

export type RootState = ReturnType<typeof store.getState>;
