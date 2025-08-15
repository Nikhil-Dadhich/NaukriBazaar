import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setSingleJob } from "@/redux/jobSlice";
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";

function JobDescription() {
  const { singleJob } = useSelector((state) => state.job);
  const { user } = useSelector((store) => store.auth);
  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      // console.log("Applying to job at:", `${JOB_API_ENDPOINT}/apply/${jobId}`);

      const res = await axios.post(
        `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log("Response from applying to job:", res.data);
      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success("Job applied successfully!");
      }
    } catch (error) {
      console.error("Error applying for job:", error);
      toast.error(error.response?.data?.message || "Failed to apply for job.");
    }
  };
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          console.log("Fetched single job:", res.data.job);
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        } else {
          console.log("API responded, but failed to fetch jobs", res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchSingleJob();
  }, [dispatch, jobId, user._id]);

  return (
    <div className="max-w-5xl mx-auto my-10 px-4">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            {singleJob?.title}
          </h1>
          <div className="flex flex-wrap gap-3 mt-3">
            <Badge className="bg-blue-100 text-blue-700 font-medium px-3 py-1 rounded-full">
              {singleJob?.postion} Position{singleJob?.postion > 1 && "s"}
            </Badge>
            <Badge className="bg-red-100 text-red-600 font-medium px-3 py-1 rounded-full">
              {singleJob?.jobType}
            </Badge>
            <Badge className="bg-purple-100 text-purple-700 font-medium px-3 py-1 rounded-full">
              ₹{singleJob?.salary} LPA
            </Badge>
          </div>
        </div>

        <div>
          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`rounded-lg transition-all duration-200 px-6 py-2 text-sm ${
              isApplied
                ? "bg-gray-500 cursor-not-allowed text-white"
                : "bg-[#7209b7] hover:bg-[#5f32ad] text-white"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-6 border-gray-300" />

      {/* Job description section */}
      <div className="space-y-4 text-gray-700 text-sm md:text-base">
        <div className="flex flex-col sm:flex-row">
          <strong className="w-40">Role:</strong>
          <span>{singleJob?.title}</span>
        </div>
        <div className="flex flex-col sm:flex-row">
          <strong className="w-40">Location:</strong>
          <span>{singleJob?.location}</span>
        </div>
        <div className="flex flex-col sm:flex-row">
          <strong className="w-40">Description:</strong>
          <span>{singleJob?.description}</span>
        </div>
        <div className="flex flex-col sm:flex-row">
          <strong className="w-40">Requirements:</strong>
          <ul className="list-disc pl-5 space-y-1">
            {singleJob?.requirements?.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row">
          <strong className="w-40">Experience:</strong>
          <span>{singleJob?.experienceLevel} yrs</span>
        </div>
        <div className="flex flex-col sm:flex-row">
          <strong className="w-40">Salary:</strong>
          <span>₹{singleJob?.salary} LPA</span>
        </div>
        <div className="flex flex-col sm:flex-row">
          <strong className="w-40">Total Applicants:</strong>
          <span>{singleJob?.applications?.length}</span>
        </div>
        <div className="flex flex-col sm:flex-row">
          <strong className="w-40">Posted Date:</strong>
          <span>{singleJob?.createdAt?.split("T")[0]}</span>
        </div>
      </div>
    </div>
  );
}

export default JobDescription;
