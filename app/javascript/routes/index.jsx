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
import EditCourse from "../components/teacher/EditCourse";

import AddHandout from "../components/teacher/handout/AddHandout";
import Handouts from "../components/teacher/handout/Handouts";
import Handout from "../components/teacher/handout/Handout";
import EditHandout from "../components/teacher/handout/EditHandout";

import AddQuiz from "../components/teacher/quiz/AddQuiz";
import Quizzes from "../components/teacher/quiz/Quizzes";

import AddReferenceLink from "../components/teacher/reference_link/AddReferenceLink";
import ReferenceLinks from "../components/teacher/reference_link/ReferenceLinks";
import ReferenceLink from "../components/teacher/reference_link/ReferenceLink";
import EditReferenceLink from "../components/teacher/reference_link/EditReferenceLink";
import AddVideo from "../components/teacher/video/AddVideo";

import Videos from "../components/teacher/video/Videos";
import Video from "../components/teacher/video/Video";
import EditVideo from "../components/teacher/video/EditVideo";

import AddAssignment from "../components/teacher/assignment/AddAssignment";
import Assignments from "../components/teacher/assignment/Assignments";

import ShowCourse from "../components/student/course/ShowCourse";
import ShowVideo from "../components/student/video/ShowVideo";
import ShowQuiz from "../components/student/quiz/ShowQuiz";
import ShowAssignment from "../components/student/assignment/ShowAssignment";

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
        <Route path="/course/:id/edit" element={<EditCourse />} />

        <Route path="/add_handout" element={<AddHandout />} />
        <Route path="/handouts" element={<Handouts />} />
        <Route path="/handout/:id" element={<Handout />} />
        <Route path="/handout/:id/edit" element={<EditHandout />} />

        <Route path="/add_quiz" element={<AddQuiz />} />
        <Route path="/quizzes" element={<Quizzes />} />

        <Route path="/add_reference_link" element={<AddReferenceLink />} />
        <Route path="/reference_links" element={<ReferenceLinks />} />
        <Route path="/reference_link/:id" element={<ReferenceLink />} />
        <Route path="/reference_link/:id/edit" element={<EditReferenceLink />} />

        <Route path="/add_video" element={<AddVideo />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/video/:id" element={<Video />} />
        <Route path="/video/:id/edit" element={<EditVideo />} />

        <Route path="/add_assignment" element={<AddAssignment />} />
        <Route path="/assignments" element={<Assignments />} />
      </Route>

      <Route element={<ProtectedRoute isAllowed={user && user.role == "student"} />}>
        <Route path="/show_course/:id" element={<ShowCourse />} />
        <Route path="/show_video/:id" element={<ShowVideo />} />
        <Route path="/show_quiz/:id" element={<ShowQuiz />} />
        <Route path="/show_assignment/:id" element={<ShowAssignment />} />
      </Route>

      <Route element={<ProtectedRoute isAllowed={!user} />}>
        <Route path="/sign_up" element={<SignUp />} />
        <Route path="/sign_in" element={<SignIn />} />
      </Route>
    </Routes>
  );
};

export default AllRoutes;
