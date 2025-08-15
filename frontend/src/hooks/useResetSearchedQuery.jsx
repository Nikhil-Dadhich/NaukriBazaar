import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

export default function useResetSearchedQuery() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    // reset Redux state on every route change
    dispatch(setSearchedQuery(""));
  }, [location.pathname, dispatch]);
}
