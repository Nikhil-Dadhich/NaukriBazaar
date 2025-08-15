import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home  from "./components/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Jobs from "./components/Jobs";
import JobDescription from "./components/JobDescription";
import Profile from "./components/Profile";

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
    path: "/profile",
    element: <Profile />, 
  },

]);


function App() {
  return (
    <>
      <RouterProvider router={appRouter}/>
    </>
  )
}

export default App