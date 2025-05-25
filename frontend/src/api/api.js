import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const loginUser = (Data) => API.post("/auth/login", Data);
export const registerUser = (Data) => API.post("/auth/register", Data);

export const fetchCourses = () => API.get('/courses');
export const fetchCourseById = (id) => API.get(`/courses/${id}`);

export const fetchInstructorCourses = () => API.get('/courses/instructor');
export const createCourse = (data) => API.post('/courses', data);
export const updateCourse = (id, data) => API.put(`/courses/${id}`, data);
export const deleteCourse = (id) => API.delete(`/courses/${id}`);

export const enrollInCourse = (courseId) => API.post(`/enrollment/${courseId}`);
export const fetchMyEnrollments = () => API.get('/enrollment/my-courses');

export const fetchEnrolledStudents = (courseId) => API.get(`/enrollment/course/${courseId}`);

export const getGptRecommendations = (prompt) => API.post('/gpt/recommendations', { prompt });
