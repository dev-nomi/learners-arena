import React from "react";
import { Router, Route } from "react-router-dom";
import SignUp from "../components/auth/SignUp";
import SignIn from "../components/auth/SignIn";
import AddCourse from "../components/courses/AddCourse";
import Home from "../components/Home";

const routes = [
  <Route key="/" path="/" element={<Home />} />,
  <Route key="/sign_up" path="/sign_up" element={<SignUp />} />,
  <Route key="/sign_in" path="/sign_in" element={<SignIn />} />,
  <Route key="/add_course" path="/add_course" element={<AddCourse />} />,
];

export default routes;
