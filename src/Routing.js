import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import AdminLogin from './login/Login';
import AllRooms from './Room/GetRooms';
import PhonepayList from './phonepay/Phonepay';

// Lazy loaded pages
const Home = lazy(() => import('./Home/Home'));
const StudentList = lazy(() => import('./students/GetStudents'));
const AddStudent = lazy(() => import('./students/AddStudents'));
const AddRoomForm = lazy(() => import('./Room/AddRoom'));
const EditRoom = lazy(() => import('./Room/GetRooms'));
const RoomStatusViewer = lazy(() => import('./Room/RoomStatus'));
const Logout =lazy(() =>import('./login/Logout'))

function Routing() {
  return (
    <Router>
      <Suspense fallback={<div className="loader">Loading...</div>}>
      <Navbar />
        <Routes>
          <Route path="*" element={<div style={{ textAlign: 'center', padding: '50px' }}>404 - Page Not Found</div>} />
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/rooms" element={<AddRoomForm />} />
          <Route path="/login" element={<AdminLogin />} /> 
          <Route path="/getrooms" element={<AllRooms />} />
          <Route path="/phonepay" element={<PhonepayList />}/>
         <Route path="/edit-room/:id" element={<EditRoom />} />
         <Route path="/room-status" element={<RoomStatusViewer />} />
         <Route path="/logout" element={<Logout />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default Routing;
