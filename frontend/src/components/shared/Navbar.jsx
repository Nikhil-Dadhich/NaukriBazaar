import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { LogOut, Menu, User, X } from "lucide-react";
import clsx from "clsx";
import { USER_API_ENDPOINT } from "@/utils/constant";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="bg-white border-b relative z-50">
      <div className="flex items-center justify-between mx-auto max-w-7xl px-4 h-16">
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          Naukri<span className="text-red-600">Bazaar</span>
        </h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          <ul className="flex font-medium gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex gap-3">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5B30A6] text-white">
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={
                      user?.profile?.profilePhoto ||
                      "https://github.com/shadcn.png"
                    }
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src={
                        user?.profile?.profilePhoto ||
                        "https://github.com/shadcn.png"
                      }
                    />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname || "User"}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio || "bio not available"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 mt-4 text-gray-600">
                  {
                    user  && (
                      <div className="flex items-center gap-2">
                        <User />
                        <Link to="/profile">
                          <Button variant="link">View Profile</Button>
                        </Link>
                      </div>
                    )
                  }
                  <div className="flex items-center gap-2">
                    <LogOut />
                    <Button variant="link" onClick={logoutHandler}>
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDrawerOpen(true)}
          >
            <Menu />
          </Button>
        </div>
      </div>

      {/* Overlay (click to close) */}
      <div
        className={clsx(
          "fixed inset-0 z-40 backdrop-blur-sm bg-white/30 transition-all duration-300",
          isDrawerOpen ? "block" : "hidden"
        )}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Mobile Drawer (Slide from right) */}
      <div
        className={clsx(
          "fixed top-0 right-0 h-full w-72 bg-white shadow-lg z-50 transform transition-transform duration-300",
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage
                src={
                  user?.profile?.profilePhoto || "https://github.com/shadcn.png"
                }
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-medium">{user?.fullname || "Guest"}</h4>
              {user && (
                <p className="text-sm text-muted-foreground">
                  {user?.profile?.bio}
                </p>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDrawerOpen(false)}
          >
            <X />
          </Button>
        </div>

        {/* Drawer Content */}
        <div className="px-4 py-4">
          <ul className="flex flex-col gap-3 font-medium">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link
                    to="/admin/companies"
                    className="block px-2 py-2 rounded hover:bg-gray-100"
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/jobs"
                    className="block px-2 py-2 rounded hover:bg-gray-100"
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    className="block px-2 py-2 rounded hover:bg-gray-100"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/jobs"
                    className="block px-2 py-2 rounded hover:bg-gray-100"
                  >
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/browse"
                    className="block px-2 py-2 rounded hover:bg-gray-100"
                  >
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>

          <div className="mt-6 flex flex-col gap-2">
            {!user ? (
              <>
                <Link to="/login">
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="w-full bg-[#6A38C2] text-white hover:bg-[#5B30A6]">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <>
              {
                user && user.role ==='student' && (
                <Link to="/profile">
                  <Button variant="outline" className="w-full">
                    View Profile
                  </Button>
                </Link>
                )
              }
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={logoutHandler}
                >
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
