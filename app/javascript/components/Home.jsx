import React from "react";
import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import StudentDashboard from "../components/student/StudentDashboard";
import TeacherDashboard from "../components/teacher/TeacherDashboard";
import AdminDashboard from "../components/admin/AdminDashboard";

const Home = () => {
  const role = useSelector((state) => state.auth.user.role);

  return (
    <Container>
      {role == "teacher" && <TeacherDashboard />}
      {role == "student" && <StudentDashboard />}
      {role == "admin" && <AdminDashboard />}
    </Container>
  );
};

export default Home;
