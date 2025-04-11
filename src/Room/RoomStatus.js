// src/Room/RoomStatusViewer.jsx
import React, { useState, useEffect } from 'react';
import { API_URL } from '../api.config';
import './roomstatus.css';

const RoomStatusViewer = () => {
  const [status, setStatus] = useState('available');
  const [rooms, setRooms] = useState([]);

  const fetchRooms = async (selectedStatus) => {
    try {
      const response = await fetch(`${API_URL}/rooms/status/${selectedStatus}`);
      if (!response.ok) throw new Error('Failed to fetch rooms');
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  useEffect(() => {
    fetchRooms(status);
  }, [status]);

  return (
    <div className="status-viewer">
      <h2>View Rooms by Status</h2>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="available">Available</option>
        <option value="occupied">Occupied</option>
      </select>

      <div className="room-list">
        {rooms.length === 0 ? (
          <p>No rooms found.</p>
        ) : (
          rooms.map((room) => (
            <div className="room-card" key={room._id}>
              <h4>Room #{room.roomNo}</h4>
              <p>Floor: {room.floor}</p>
              <p>Beds: {room.beds}</p>
              <p>Sharing: {room.sharing}</p>
              <p>Amount: ₹{room.amount}</p>
              <p>Status: <strong>{room.status}</strong></p>
              <p>Facilities: {room.facilities.join(', ') || 'None'}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RoomStatusViewer;
