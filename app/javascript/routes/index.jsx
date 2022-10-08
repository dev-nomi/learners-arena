import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "../components/auth/SignUp";
import SignIn from "../components/auth/SignIn";
import Home from "../components/Home";
import PageNotFound from "../components/PageNotFound";
import Landing from "../components/Landing";
import { useSelector } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";
import AddCourse from "../components/teacher/AddCourse";
import Course from "../components/teacher/Course";

const AllRoutes = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Routes>
      <Route index element={<Landing />} />
      <Route path="landing" element={<Landing />} />
      <Route path="*" element={<PageNotFound />} />

      <Route element={<ProtectedRoute isAllowed={user} />}>
        <Route path="/home" element={<Home />} />
      </Route>

      <Route element={<ProtectedRoute isAllowed={user && user.role == "teacher"} />}>
        <Route path="/add_course" element={<AddCourse />} />
        <Route path="/course/:id" element={<Course />} />
      </Route>

      <Route element={<ProtectedRoute isAllowed={!user} />}>
        <Route path="/sign_up" element={<SignUp />} />
        <Route path="/sign_in" element={<SignIn />} />
      </Route>
    </Routes>
  );
};

export default AllRoutes;
