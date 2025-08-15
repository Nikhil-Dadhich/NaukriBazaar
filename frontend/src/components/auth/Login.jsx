import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const {loading} = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    const formData = new FormData(e.target);

    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user)); 
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error(
        error.response?.data?.message || "Something went wrong. Please try again."  
      );
    }
    finally{
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
          <h1 className="font-bold text-xl mb-5">Login</h1>

          <div className="my-2">
            <Label htmlFor="email" className="block mb-1">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="nikhil@gmail.com"
              name="email"
              value={input.email}
              onChange={changeHandler}
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
              value={input.password}
              onChange={changeHandler}
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
                  onChange={changeHandler}
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
                  onChange={changeHandler}
                  id="role-recruiter"
                  className="cursor-pointer accent-black"
                  required
                />
                Recruiter
              </Label>
            </RadioGroup>
          </div>
          {
            loading ?(
              <Button className="w-full my-2"><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please Wait</Button>
            ):(
              <Button type="submit" className="w-full my-2">Login</Button>
            )
          }
          <span className="text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;
