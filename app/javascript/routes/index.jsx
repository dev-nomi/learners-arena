import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";
import LoadingScreen from "../components/LoadingScreen";

const timeout = () => {
  return new Promise((resolve) => setTimeout(resolve, 300));
};

const SignUp = lazy(async () => {
  await timeout();
  return import("../components/auth/SignUp");
});
const SignIn = lazy(async () => {
  await timeout();
  return import("../components/auth/SignIn");
});
const Home = lazy(async () => {
  await timeout();
  return import("../components/Home");
});
const PageNotFound = lazy(async () => {
  await timeout();
  return import("../components/PageNotFound");
});
const Landing = lazy(async () => {
  await timeout();
  return import("../components/Landing");
});

//teacher routes
const AddCourse = lazy(async () => {
  await timeout();
  return import("../components/teacher/AddCourse");
});
const Course = lazy(async () => {
  await timeout();
  return import("../components/teacher/Course");
});
const EditCourse = lazy(async () => {
  await timeout();
  return import("../components/teacher/EditCourse");
});

const AddHandout = lazy(async () => {
  await timeout();
  return import("../components/teacher/handout/AddHandout");
});
const Handouts = lazy(async () => {
  await timeout();
  return import("../components/teacher/handout/Handouts");
});
const Handout = lazy(async () => {
  await timeout();
  return import("../components/teacher/handout/Handout");
});
const EditHandout = lazy(async () => {
  await timeout();
  return import("../components/teacher/handout/EditHandout");
});

const AddQuiz = lazy(async () => {
  await timeout();
  return import("../components/teacher/quiz/AddQuiz");
});
const Quizzes = lazy(async () => {
  await timeout();
  return import("../components/teacher/quiz/Quizzes");
});

const AddReferenceLink = lazy(async () => {
  await timeout();
  return import("../components/teacher/reference_link/AddReferenceLink");
});
const ReferenceLinks = lazy(async () => {
  await timeout();
  return import("../components/teacher/reference_link/ReferenceLinks");
});
const ReferenceLink = lazy(async () => {
  await timeout();
  return import("../components/teacher/reference_link/ReferenceLink");
});
const EditReferenceLink = lazy(async () => {
  await timeout();
  return import("../components/teacher/reference_link/EditReferenceLink");
});

const AddVideo = lazy(async () => {
  await timeout();
  return import("../components/teacher/video/AddVideo");
});
const Videos = lazy(async () => {
  await timeout();
  return import("../components/teacher/video/Videos");
});
const Video = lazy(async () => {
  await timeout();
  return import("../components/teacher/video/Video");
});
const EditVideo = lazy(async () => {
  await timeout();
  return import("../components/teacher/video/EditVideo");
});

const AddAssignment = lazy(async () => {
  await timeout();
  return import("../components/teacher/assignment/AddAssignment");
});
const Assignments = lazy(async () => {
  await timeout();
  return import("../components/teacher/assignment/Assignments");
});
const ShowStudent = lazy(async () => {
  await timeout();
  return import("../components/teacher/student/ShowStudent");
});
const CheckAssignment = lazy(async () => {
  await timeout();
  return import("../components/teacher/student/CheckAssignment");
});

//student routes
const ShowCourse = lazy(async () => {
  await timeout();
  return import("../components/student/course/ShowCourse");
});
const ShowVideo = lazy(async () => {
  await timeout();
  return import("../components/student/video/ShowVideo");
});
const ShowQuiz = lazy(async () => {
  await timeout();
  return import("../components/student/quiz/ShowQuiz");
});
const ShowAssignment = lazy(async () => {
  await timeout();
  return import("../components/student/assignment/ShowAssignment");
});
const AllQuizzes = lazy(async () => {
  await timeout();
  return import("../components/student/quiz/AllQuizzes");
});
const AllAssignments = lazy(async () => {
  await timeout();
  return import("../components/student/assignment/AllAssignments");
});
const CourseContent = lazy(async () => {
  await timeout();
  return import("../components/student/course/CourseContent");
});

const AllRoutes = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Suspense fallback={<LoadingScreen />}>
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

          <Route path="/show_student/:id" element={<ShowStudent />} />
          <Route path="/check_assignment/:id" element={<CheckAssignment />} />
        </Route>

        <Route element={<ProtectedRoute isAllowed={user && user.role == "student"} />}>
          <Route path="/show_course/:id" element={<ShowCourse />} />
          <Route path="/show_video/:id" element={<ShowVideo />} />
          <Route path="/show_quiz/:id" element={<ShowQuiz />} />
          <Route path="/show_assignment/:id" element={<ShowAssignment />} />
          <Route path="/all_quizzes" element={<AllQuizzes />} />
          <Route path="/all_assignments" element={<AllAssignments />} />
          <Route path="/course/:course_id/week/:week_id" element={<CourseContent />} />
        </Route>

        <Route element={<ProtectedRoute isAllowed={!user || user.id === null} />}>
          <Route path="/sign_up" element={<SignUp />} />
          <Route path="/sign_in" element={<SignIn />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AllRoutes;
