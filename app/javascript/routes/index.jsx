import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "../components/auth/SignUp";
import SignIn from "../components/auth/SignIn";
import AddCourse from "../components/courses/AddCourse";
import Home from "../components/Home";
import PageNotFound from "../components/PageNotFound";
import { useSelector } from "react-redux";

const AllRoutes = () => {
  const auth_token = useSelector((state) => state.auth.auth_token);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Routes>
      <Route path="*" element={<PageNotFound />} />
      {isLoggedIn && auth_token ? (
        <Fragment>
          <Route path="/add_course" element={<AddCourse />} />
        </Fragment>
      ) : (
        <Fragment>
          <Route path="/" element={<Home />} />
          <Route path="/sign_up" element={<SignUp />} />
          <Route path="/sign_in" element={<SignIn />} />
        </Fragment>
      )}
    </Routes>
  );
};

export default AllRoutes;
