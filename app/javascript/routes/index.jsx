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
import AddHandout from "../components/teacher/handout/AddHandout";
import Handouts from "../components/teacher/handout/Handouts";
import Handout from "../components/teacher/handout/Handout";
import AddQuiz from "../components/teacher/quiz/AddQuiz";
import Quizzes from "../components/teacher/quiz/Quizzes";
import AddReferenceLink from "../components/teacher/reference_link/AddReferenceLink";
import ReferenceLinks from "../components/teacher/reference_link/ReferenceLinks";
import ReferenceLink from "../components/teacher/reference_link/ReferenceLink";

import ShowCourse from "../components/student/course/ShowCourse";

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

        <Route path="/add_handout" element={<AddHandout />} />
        <Route path="/handouts" element={<Handouts />} />
        <Route path="/handout/:id" element={<Handout />} />

        <Route path="/add_quiz" element={<AddQuiz />} />
        <Route path="/quizzes" element={<Quizzes />} />

        <Route path="/add_reference_link" element={<AddReferenceLink />} />
        <Route path="/reference_links" element={<ReferenceLinks />} />
        <Route path="/reference_link/:id" element={<ReferenceLink />} />
      </Route>

      <Route element={<ProtectedRoute isAllowed={user && user.role == "student"} />}>
        <Route path="/show_course/:id" element={<ShowCourse />} />
      </Route>

      <Route element={<ProtectedRoute isAllowed={!user} />}>
        <Route path="/sign_up" element={<SignUp />} />
        <Route path="/sign_in" element={<SignIn />} />
      </Route>
    </Routes>
  );
};

export default AllRoutes;
