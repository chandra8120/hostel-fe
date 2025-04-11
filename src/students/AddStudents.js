import React, { useState, useEffect } from "react";
import { API_URL } from "../api.config";
import './addstudents.css';

const AddStudentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    adharCard: "",
    photo: "",
    phone:"",
    payType: "online",
    totalAmount: "",
    dueAmount: "",
    dateOfJoining: "",
    vacate: false,
    roomId: "",
  });

  const [message, setMessage] = useState("");
  const [rooms, setRooms] = useState([]);

  // Fetch room list
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch(`${API_URL}/rooms`);
        const data = await res.json();
        setRooms(data);
      } catch (err) {
        console.error("Failed to fetch rooms:", err);
      }
    };
    fetchRooms();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          totalAmount: parseFloat(formData.totalAmount),
          pendingAmount: parseFloat(formData.pendingAmount),
          dueAmount: parseFloat(formData.dueAmount),
        }),
      });

      const text = await res.text();
      console.log("Raw server response:", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error("Failed to parse JSON:", err);
        throw new Error("Server returned invalid JSON");
      }

      if (res.ok) {
        setMessage("Student added successfully!");
        setFormData({
          name: "",
          address: "",
          adharCard: "",
          photo: "",
          payType: "online",
          totalAmount: "",
          phone:"",
          dueAmount: "",
          dateOfJoining: "",
          vacate: false,
          roomId: "",
        });
      } else {
        console.error("Server returned an error:", data);
        setMessage(data.message || "Failed to add student.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setMessage("Error submitting form. Check console for details.");
    }
  };

  return (
    <div className="student-form-container">
      <h2>Register New Student</h2>
      {message && <p className="form-message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input name="name" type="text" placeholder="Student Name" value={formData.name} onChange={handleChange} required />
        <input name="phone" type="number" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
        <input name="address" type="text" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <input name="adharCard" type="text" placeholder="Adhar Card Number" value={formData.adharCard} onChange={handleChange} required />
        <input name="photo" type="url" placeholder="Photo URL" value={formData.photo} onChange={handleChange} required />

        <select name="payType" value={formData.payType} onChange={handleChange}>
          <option value="online">Online</option>
          <option value="cash">Cash</option>
        </select>

        <input name="totalAmount" type="number" placeholder="Total Amount" value={formData.totalAmount} onChange={handleChange} required />
         <input name="dueAmount" type="number" placeholder="Due Amount" value={formData.dueAmount} onChange={handleChange} required />
        <input name="dateOfJoining" type="date" value={formData.dateOfJoining.split("T")[0]} onChange={handleChange} required />

        {/* <label className="checkbox-label">
          <input type="checkbox" name="vacate" checked={formData.vacate} onChange={handleChange} />
          Has Vacated
        </label> */}

        <select name="roomId" value={formData.roomId} onChange={handleChange} required>
          <option value="">Select Room</option>
          {rooms.map((room) => (
            <option key={room._id} value={room._id}>
              Room {room.roomNo} - Floor {room.floor} ({room.sharing}-Sharing)
            </option>
          ))}
        </select>

        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudentForm;
