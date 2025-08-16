import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home  from "./components/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from "./components/admin/PostJob";
import Applicants from "./components/admin/Applicants";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "./redux/authSlice";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <div>Route not found</div>
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/jobs",
    element: <Jobs />, 
  },
  {
    path: "/description/:id",
    element: <JobDescription />
  },
  {
    path: "/browse",
    element: <Browse />, 
  },
  {
    path: "/profile",
    element: <Profile />, 
  },

  {
    path: "/admin/companies",
    element: <ProtectedRoute><Companies /></ProtectedRoute>
  },

  {
    path: "/admin/companies/create",
    element: <ProtectedRoute><CompanyCreate/></ProtectedRoute>
  },

  {
    path: "/admin/companies/:id",
    element: <ProtectedRoute><CompanySetup/></ProtectedRoute>
  },

  {
    path: "/admin/jobs",
    element: <ProtectedRoute><AdminJobs/></ProtectedRoute>
  },
  
  {
    path: "/admin/jobs/create",
    element: <ProtectedRoute><PostJob /></ProtectedRoute>
  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<ProtectedRoute><Applicants /></ProtectedRoute>
  }
]);

const AuthChecker = ({ children }) => {
  const { expiresAt } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (expiresAt && new Date().getTime() > expiresAt) {
      dispatch(clearUser());
    }
  }, [expiresAt, dispatch]);

  return children;
};


function App() {
  return (
    <>
      <AuthChecker>
        <RouterProvider router={appRouter}/>
      </AuthChecker>
    </>
  )
}

export default App