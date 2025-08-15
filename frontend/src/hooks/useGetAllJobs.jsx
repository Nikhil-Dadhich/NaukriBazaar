import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function useGetAllJobs() {
  const dispatch = useDispatch();
  const {searchedQuery} = useSelector((state)=>state.job);
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get?keyword=${searchedQuery}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        } else {
          console.log("API responded, but failed to fetch jobs", res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllJobs();
  }, [dispatch,searchedQuery]);
}

export default useGetAllJobs;
