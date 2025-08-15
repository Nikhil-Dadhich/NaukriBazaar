import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

function Signup() {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    const formData = new FormData(e.target);

    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-300 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>

          <div className="my-2">
            <Label htmlFor="fullName" className="block mb-1">
              Full Name
            </Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Nikhil Dadhich"
              name="fullname"
              onChange={changeEventHandler}
              value={input.fullname}
              className="w-full"
              required
            />
          </div>

          <div className="my-2">
            <Label htmlFor="email" className="block mb-1">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="nikhil@gmail.com"
              name="email"
              onChange={changeEventHandler}
              value={input.email}
              className="w-full"
              required
            />
          </div>

          <div className="my-2">
            <Label htmlFor="phoneNumber" className="block mb-1">
              Phone Number
            </Label>
            <Input
              id="phoneNumber"
              type="text"
              placeholder="9898989898"
              name="phoneNumber"
              onChange={changeEventHandler}
              value={input.phoneNumber}
              className="w-full"
              required
            />
          </div>

          <div className="my-2">
            <Label htmlFor="password" className="block mb-1">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="password"
              name="password"
              onChange={changeEventHandler}
              value={input.password}
              className="w-full"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <RadioGroup className="flex flex-wrap items-center gap-4 my-1">
              <Label className="flex items-center gap-2 cursor-pointer">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  id="role-student"
                  className="cursor-pointer accent-black"
                  required
                />
                Student
              </Label>

              <Label className="flex items-center gap-2 cursor-pointer">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  id="role-recruiter"
                  className="cursor-pointer accent-black"
                  required
                />
                Recruiter
              </Label>
            </RadioGroup>
          </div>

          <div className="flex items-center gap-2 my-2">
            <Label htmlFor="profile" className="min-w-fit">
              Profile
            </Label>
            <Input
              id="profile"
              name="file"
              type="file"
              accept="image/*"
              onChange={changeFileHandler}
              className="cursor-pointer"
              required
            />
          </div>
          {loading ? (
            <Button className="w-full my-2">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-2">
              Sign Up
            </Button>
          )}
          <span className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Signup;
