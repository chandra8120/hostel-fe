import React, { useState } from "react";
import './students.css'

const AddStudentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    adharCard: "",
    photo: "",
    payType: "online",
    totalAmount: "",
    pendingAmount: "",
    dueAmount: "",
    dateOfJoining: "",
    vacate: false,
    roomId: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          totalAmount: parseFloat(formData.totalAmount),
          pendingAmount: parseFloat(formData.pendingAmount),
          dueAmount: parseFloat(formData.dueAmount),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Student added successfully!");
        setFormData({
          name: "",
          address: "",
          adharCard: "",
          photo: "",
          payType: "online",
          totalAmount: "",
          pendingAmount: "",
          dueAmount: "",
          dateOfJoining: "",
          vacate: false,
          roomId: "",
        });
      } else {
        setMessage(data.message || "Failed to add student.");
      }
    } catch (err) {
      setMessage("Error submitting form.");
    }
  };

  return (
    <div className="student-form-container">
      <h2>Register New Student</h2>
      {message && <p className="form-message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input name="name" type="text" placeholder="Student Name" value={formData.name} onChange={handleChange} required />
        <input name="address" type="text" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <input name="adharCard" type="text" placeholder="Adhar Card Number" value={formData.adharCard} onChange={handleChange} required />
        <input name="photo" type="url" placeholder="Photo URL" value={formData.photo} onChange={handleChange} required />
        
        <select name="payType" value={formData.payType} onChange={handleChange}>
          <option value="online">Online</option>
          <option value="cash">Cash</option>
        </select>

        <input name="totalAmount" type="number" placeholder="Total Amount" value={formData.totalAmount} onChange={handleChange} required />
        <input name="pendingAmount" type="number" placeholder="Pending Amount" value={formData.pendingAmount} onChange={handleChange} required />
        <input name="dueAmount" type="number" placeholder="Due Amount" value={formData.dueAmount} onChange={handleChange} required />
        <input name="dateOfJoining" type="date" value={formData.dateOfJoining.split("T")[0]} onChange={handleChange} required />

        <label className="checkbox-label">
          <input type="checkbox" name="vacate" checked={formData.vacate} onChange={handleChange} />
          Has Vacated
        </label>

        <input name="roomId" type="text" placeholder="Room ID" value={formData.roomId} onChange={handleChange} required />

        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudentForm;
