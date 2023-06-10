import { useDispatch, useSelector } from "react-redux";
import {
  currentSearch,
  resetTerm,
  setIsLoading,
  setTerm,
  setUsersAmount,
} from "../redux/slices/search.slice";

const useSearch = () => {
  const dispatch = useDispatch();

  const data = useSelector(currentSearch);
  const set = (term: string) => dispatch(setTerm(term));
  const reset = () => dispatch(resetTerm());
  const setAmount = (amount: string) => dispatch(setUsersAmount(amount));
  const setStateLoading = (state: boolean) => dispatch(setIsLoading(state));

  return { current: data, set, setStateLoading, reset, setAmount };
};

export default useSearch;
