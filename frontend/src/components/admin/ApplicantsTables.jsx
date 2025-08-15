import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_ENDPOINT } from "@/utils/constant";
import { setAllApplicants } from "@/redux/applicationSlice";

const shortlistingStatus = ["accepted", "rejected"];

function ApplicantsTables() {
  const { applicants } = useSelector((state) => state.application);
  const dispatch = useDispatch();
  const statusHandler = async (status,id) =>{
    try {  
        const res = await axios.post(`${APPLICATION_API_ENDPOINT}/status/${id}/update`,
          {status},
          {withCredentials: true}
        );
        if(res.data.success){
          toast.success(res.data.message);
          const updatedApplications = applicants.applications.map((item) =>
            item._id === id ? { ...item, status } : item
          );
          dispatch(setAllApplicants({ ...applicants, applications: updatedApplications }));
        }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied user</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
  {applicants &&
    applicants?.applications?.map((item) => {
      const status = item?.status || "pending"; // default if missing

      return (
        <TableRow
          key={item._id}
          className={
            status === "accepted"
              ? "bg-green-100"
              : status === "rejected"
              ? "bg-red-100"
              : "bg-yellow-50" // pending highlight
          }
        >
          <TableCell>{item?.applicant?.fullname}</TableCell>
          <TableCell>{item?.applicant?.email}</TableCell>
          <TableCell>{item?.applicant?.phoneNumber}</TableCell>
          <TableCell>
            {item.applicant?.profile?.resume ? (
              <a
                className="text-blue-600 cursor-pointer"
                href={item?.applicant?.profile?.resume}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item?.applicant?.profile?.resumeOriginalName}
              </a>
            ) : (
              <span>NA</span>
            )}
          </TableCell>
          <TableCell>{item?.applicant.createdAt.split("T")[0]}</TableCell>
          <TableCell className="float-right cursor-pointer">
            <Popover>
              <PopoverTrigger>
                <MoreHorizontal />
              </PopoverTrigger>
              <PopoverContent className="w-32">
                {shortlistingStatus.map((stat, index) => (
                  <div
                    onClick={() => statusHandler(stat, item?._id)}
                    key={index}
                    className={`flex w-fit items-center my-2 cursor-pointer ${
                      stat === status
                        ? stat === "accepted"
                          ? "text-green-600 font-bold"
                          : "text-red-600 font-bold"
                        : ""
                    }`}
                  >
                    <span>{stat.toUpperCase()}</span>
                  </div>
                ))}
              </PopoverContent>
            </Popover>
          </TableCell>
        </TableRow>
      );
    })}
</TableBody>

      </Table>
    </div>
  );
}

export default ApplicantsTables;
