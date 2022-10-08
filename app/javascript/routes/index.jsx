import React from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "../components/auth/SignUp";
import SignIn from "../components/auth/SignIn";
import Home from "../components/Home";
import PageNotFound from "../components/PageNotFound";
import Landing from "../components/Landing";
import { useSelector } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";

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

      <Route element={<ProtectedRoute isAllowed={!user} />}>
        <Route path="/sign_up" element={<SignUp />} />
        <Route path="/sign_in" element={<SignIn />} />
      </Route>
    </Routes>
  );
};

export default AllRoutes;
