import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

function Job({ job }) {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="border p-5 rounded-md shadow-xl bg-white border-gray-100 max-w-xl w-full mx-auto flex flex-col h-[400px]">
      {/* Top Row */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex flex-col sm:flex-row items-center gap-4 my-4">
        <div className="p-2 border rounded-full">
          <Avatar className="w-12 h-12">
            <AvatarImage
              src={job?.company?.logo}
              alt="Company Logo"
            />
          </Avatar>
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-lg font-semibold">
            {job?.company?.name || " "}
          </h2>
          <p className="text-gray-500 text-sm">India</p>
        </div>
      </div>

      {/* Title */}
      <h1 className="font-bold text-xl sm:text-2xl mb-2">
        {job?.title || " "}
      </h1>

      {/* Description fills remaining space above badges/buttons */}
      <div className="flex-1 overflow-hidden">
        <p
          className="text-sm sm:text-base text-gray-600 h-full"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 5, // controls how many lines before truncating
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {job?.description || " "}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Buttons stick to bottom */}
      <div className="flex flex-wrap gap-3 mt-4">
        <Button
          onClick={() => navigate(`/description/${job._id}`)}
          variant="outline"
          className="w-full sm:flex-1"
        >
          Details
        </Button>
        <Button className="bg-[#7209b7] text-white w-full sm:flex-1">
          Save For Later
        </Button>
      </div>
    </div>
  );
}

export default Job;
