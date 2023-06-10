import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Results,
  currentResults,
  reset,
  setResults,
} from "../redux/slices/results.slice";

const useResults = () => {
  const dispatch = useDispatch();
  const data = useSelector(currentResults);

  const resetResults = () => dispatch(reset());
  const set = (results: Results) => dispatch(setResults(results));

  return { current: data, set, reset: resetResults };
};

export default useResults;
