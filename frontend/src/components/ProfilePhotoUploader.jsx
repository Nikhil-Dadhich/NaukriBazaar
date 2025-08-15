import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pen } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/authSlice";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const ProfilePhotoUploader = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_ENDPOINT}/profile/photo`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success("Profile photo updated successfully!");
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Failed to update photo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-28 h-28">
      <Avatar className="w-full h-full">
        <AvatarImage src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} />
        <AvatarFallback className="bg-gray-300 text-gray-700">U</AvatarFallback>
      </Avatar>

      {/* Overlay on hover */}
      <label className={`absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-full cursor-pointer transition-opacity
        ${loading ? "opacity-100" : "opacity-0 hover:opacity-100"}`}>
        {loading ? (
          <Loader2 className="animate-spin text-white w-6 h-6" />
        ) : (
          <Pen className="text-white w-5 h-5" />
        )}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={loading}
        />
      </label>
    </div>
  );
};

export default ProfilePhotoUploader;
