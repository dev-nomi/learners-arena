import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../Home'
import SignUp from '../auth/SignUp'
import SignIn from '../auth/SignIn'
import AddCourse from '../courses/AddCourse'

export default [
  <Route path="/" element={<Home />} />,
  <Route path="/sign_up" element={<SignUp />} />,
  <Route path="/sign_in" element={<SignIn />} />,
  <Route path="/add_course" element={<AddCourse />} />,
];