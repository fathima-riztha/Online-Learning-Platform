import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Navbar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
 import RoleRoute from './components/RoleRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import StudentCourses from './pages/StudentCourses';
import StudentEnrolled from './pages/StudentEnrolled';

import InstructorCourses from './pages/InstructorCourses';
import InstructorCourseForm from './pages/InstructorCourseForm';
import InstructorEnrolledStudents from './pages/InstructorEnrolledStudents';

import CourseDetails from './pages/CourseDetails';

import GptRecommendation from './pages/GptRecommendations';

function App() {
  return (
    <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
          {/* Student Routes */}
          <Route
            path="/courses"
            element={
              <RoleRoute role="student">
                <StudentCourses />
              </RoleRoute>
            }
          />
          <Route
            path="/my-courses"
            element={
              <RoleRoute role="student">
                <StudentEnrolled />
              </RoleRoute>
            }
          />
          {/* Instructor Routes */}
          <Route
            path="/instructor/courses"
            element={
              <RoleRoute role="instructor">
                <InstructorCourses />
              </RoleRoute>
            }
          />
          <Route
            path="/instructor/courses/new"
            element={
              <RoleRoute role="instructor">
                <InstructorCourseForm />
              </RoleRoute>
            }
          />
          <Route
            path="/instructor/courses/edit/:id"
            element={
              <RoleRoute role="instructor">
                <InstructorCourseForm />
              </RoleRoute>
            }
          />
          <Route
            path="/instructor/courses/:courseId/enrolled"
            element={
              <RoleRoute role="instructor">
                <InstructorEnrolledStudents />
              </RoleRoute>
            }
          />

          {/* Course Details for both roles */}
          <Route
            path="/courses/:id"
            element={
              <ProtectedRoute>
                <CourseDetails />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/gpt-recommendations" 
            element={
              <GptRecommendation />
            } 
          />


        </Routes>
    </AuthProvider>
  );
}

 export default App;
