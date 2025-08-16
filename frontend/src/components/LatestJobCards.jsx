import React from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer max-w-xl w-full mx-auto transition hover:shadow-2xl"
    >
      {/* Company Info */}
      <div className="mb-3">
        <h1 className="text-lg font-semibold">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">India</p>
      </div>

      {/* Job Title and Description */}
      <div>
        <h2 className="font-bold text-xl sm:text-2xl my-2">{job?.title}</h2>
        <p className="text-sm sm:text-base text-gray-600 line-clamp-3">
          {job?.description}
        </p>
      </div>

      {/* Job Badges */}
      <div className="flex flex-wrap gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.position} Positions 
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">
          ₹{job?.salary}
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
