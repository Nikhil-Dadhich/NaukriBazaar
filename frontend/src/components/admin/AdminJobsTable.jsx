import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";
import { setAllAdminJobs } from "@/redux/jobSlice";

function AdminJobsTable() {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);

  const deleteJobHandler = async (id) => {
    try {
      const res = await axios.delete(`${JOB_API_ENDPOINT}/delete/${id}`, { withCredentials: true });
      if (res.data.success) {
        const updatedJobs = allAdminJobs.filter((job) => job._id !== id);
        dispatch(setAllAdminJobs(updatedJobs));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    const isSubsequence = (text, target) => {
      let i = 0,j = 0;
      while (i < text.length && j < target.length) {
        if (text[i] === target[j]) {
          j++;
        }
        i++;
      }
      return j === target.length;
    };

    const filteredCompanies = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;
      return isSubsequence(
        job?.title?.toLowerCase() || "",
        searchJobByText.toLowerCase()
      ) || isSubsequence(
        job?.company?.name?.toLowerCase() || "",
        searchJobByText.toLowerCase()
      );
    });

    setFilterJobs(filteredCompanies);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div>
      <Table>
        <TableCaption>
          A list of recent posted jobs on the platform.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.map((job) => (
            <TableRow key={job._id}>
              <TableCell>{job?.company?.name}</TableCell>
              <TableCell>{job?.title}</TableCell>
              <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div
                      onClick={() =>
                        navigate(`/admin/jobs/${job._id}/applicants`)
                      }
                      className="flex items-center w-fit gap-2 cursor-pointer"
                    >
                      <Eye className="w-4" />
                      <span>Applicants</span>
                    </div>
                    <div onClick={() => deleteJobHandler(job._id)} className='flex items-center gap-2 w-fit cursor-pointer mt-2'>
                        <Trash2 className='w-4'/>
                        <span>Delete</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminJobsTable;
