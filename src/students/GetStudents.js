import React, { useEffect, useState } from "react";
import { API_URL } from "../api.config";
import "./getstudents.css";


const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(`${API_URL}/students`);
        const data = await res.json();
        setStudents(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching students:", error);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) return <div className="loading">Loading students...</div>;

  return (
    <div className="student-list-container">
      <h2>All Registered Students</h2>
      <div className="student-grid">
        {students.map((student) => (
          <div className="student-card" key={student._id}>
            {/* <img src={profile} alt={student.name} /> */}
            <h3>{student.name}</h3>
            <p> <strong>Phone:</strong> {student.phone}</p>
            <p><strong>Address:</strong> {student.address}</p>
            <p><strong>AdharNo:</strong> {student.adharCard}</p>
            <p><strong>Payment Type:</strong> {student.payType}</p>
            <p><strong>Total:</strong> ₹{student.totalAmount}</p>
            <p><strong>Due:</strong> ₹{student.dueAmount}</p>
            <p><strong>Date Joined:</strong> {new Date(student.dateOfJoining).toLocaleDateString()}</p>
            <p><strong>Vacated:</strong> {student.vacate}</p>
            <p><strong>Room No:</strong> {student.roomId?.roomNo || "N/A"}</p>
            <p><strong>Floor:</strong> {student.roomId?.floor || "N/A"}</p>

          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentList;
