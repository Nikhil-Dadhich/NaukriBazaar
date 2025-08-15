import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import ProfilePhotoUploader from "./ProfilePhotoUploader"; // new import

function Profile() {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-6 md:p-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          
          {/* Avatar and Info */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <ProfilePhotoUploader /> {/* replaces old Avatar */}

            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p className="text-gray-600 text-sm">{user?.profile?.bio}</p>
            </div>
          </div>

          {/* Edit Button */}
          <div className="flex justify-end md:justify-start">
            <Button variant="outline" onClick={() => setOpen(true)}>
              <Pen />
            </Button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="my-5 space-y-2">
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4" />
            <span className="text-sm">{user?.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Contact className="w-4 h-4" />
            <span className="text-sm">{user?.phoneNumber}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="my-5">
          <h1 className="text-md font-bold mb-2">Skills</h1>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>)
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>

        {/* Resume */}
        <div className="grid w-full max-w-sm items-start gap-1.5">
          <span className="text-md font-bold">Resume</span>
          {user?.profile?.resume ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={user?.profile?.resume}
              className="text-blue-500 hover:underline text-sm"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span className="text-sm">NA</span>
          )}
        </div>
      </div>

      {/* Applied Jobs */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-4 md:p-6">
        <h1 className="font-bold text-lg mb-4">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
}

export default Profile;
