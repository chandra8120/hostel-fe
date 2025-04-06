import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar';

// Lazy loaded pages
const Home = lazy(() => import('./Home/Home'));
const StudentList = lazy(() => import('./students/GetStudents'));
const AddStudent = lazy(() => import('./students/Students'));
const AddRoomForm = lazy(() => import('./Room/Room'));

function Routing() {
  return (
    <Router>
      <Suspense fallback={<div className="loader">Loading...</div>}>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/rooms" element={<AddRoomForm />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default Routing;
