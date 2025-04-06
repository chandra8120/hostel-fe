import React, { useState } from "react";
import './room.css'

const AddRoomForm = () => {
  const [formData, setFormData] = useState({
    roomNo: "",
    floor: "",
    beds: "",
    sharing: "",
    amount: "",
    status: "available",
    facilities: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // Store your JWT in localStorage

    try {
      const res = await fetch("https://hostel-be-0dx6.onrender.com/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          roomNo: parseInt(formData.roomNo),
          floor: parseInt(formData.floor),
          beds: parseInt(formData.beds),
          sharing: parseInt(formData.sharing),
          amount: parseInt(formData.amount),
          facilities: formData.facilities.split(",").map(f => f.trim()),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Room added successfully!");
        setFormData({
          roomNo: "",
          floor: "",
          beds: "",
          sharing: "",
          amount: "",
          status: "available",
          facilities: "",
        });
      } else {
        setMessage(data.message || "Failed to add room.");
      }
    } catch (error) {
      setMessage("Error submitting form.");
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Room</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input name="roomNo" type="number" placeholder="Room No" value={formData.roomNo} onChange={handleChange} required />
        <input name="floor" type="number" placeholder="Floor" value={formData.floor} onChange={handleChange} required />
        <input name="beds" type="number" placeholder="Total Beds" value={formData.beds} onChange={handleChange} required />
        <input name="sharing" type="number" placeholder="Sharing Type" value={formData.sharing} onChange={handleChange} required />
        <input name="amount" type="number" placeholder="Rent Amount" value={formData.amount} onChange={handleChange} required />
        
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="available">Available</option>
          <option value="occupied">Occupied</option>
        </select>
        
        <input name="facilities" type="text" placeholder="Facilities (comma separated)" value={formData.facilities} onChange={handleChange} />

        <button type="submit">Add Room</button>
      </form>
    </div>
  );
};

export default AddRoomForm;
