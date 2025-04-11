import React, { useEffect, useState } from "react";
import { API_URL } from "../api.config";
import "./getrooms.css";

const AllRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingRoom, setEditingRoom] = useState(null); // Modal target
  const [editData, setEditData] = useState({
    roomNo: "",
    floor: "",
    beds: "",
    sharing: "",
    amount: "",
    status: "available",
    facilities: ""
  });

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/rooms`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setRooms(data);
        } else {
          setError(data.message || "Failed to fetch rooms");
        }
      } catch (err) {
        setError("Error fetching rooms");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleEdit = (room) => {
    setEditingRoom(room);
    setEditData({
      roomNo: room.roomNo,
      floor: room.floor,
      beds: room.beds,
      sharing: room.sharing,
      amount: room.amount,
      status: room.status,
      facilities: room.facilities.join(", ")
    });
  };

  const handleInputChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleCloseModal = () => {
    setEditingRoom(null);
  };

  // const handleUpdate = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await fetch(`${API_URL}/${editingRoom._id}`, {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         ...editData,
  //         facilities: editData.facilities.split(",").map(f => f.trim())
  //       }),
  //     });

  //     if (response.ok) {
  //       const updated = await response.json();
  //       setRooms(rooms.map(room => room._id === updated._id ? updated : room));
  //       setEditingRoom(null);
  //     } else {
  //       console.error("Update failed");
  //     }
  //   } catch (err) {
  //     console.error("Update error", err);
  //   }
  // };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/rooms/${editingRoom._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...editData,
          facilities: editData.facilities.split(",").map(f => f.trim())
        }),
      });
  
      if (response.ok) {
        const updated = await response.json();
        setRooms(rooms.map(room => room._id === updated._id ? updated : room));
        setEditingRoom(null);
      } else {
        console.error("Update failed");
      }
    } catch (err) {
      console.error("Update error", err);
    }
  };

  
  if (loading) return <p className="loading">Loading rooms...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="room-container">
      <h2>🏠 Hostel Room List</h2>
      <div className="room-grid">
        {rooms.map((room) => (
          <div key={room._id} className="room-card">
            <div className="room-card-header">
              <h3>Room {room.roomNo}</h3>
              <span className="edit-icon" onClick={() => handleEdit(room)} title="Edit Room">✏️</span>
            </div>
            <p><strong>Floor:</strong> {room.floor}</p>
            <p><strong>Beds:</strong> {room.beds}</p>
            <p><strong>Sharing:</strong> {room.sharing}-Sharing</p>
            <p><strong>Rent:</strong> ₹{room.amount}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span className={room.status === "available" ? "status-available" : "status-occupied"}>
                {room.status}
              </span>
            </p>
            <p><strong>Facilities:</strong> {room.facilities.join(", ") || "None"}</p>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingRoom && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Room {editingRoom.roomNo}</h3>
            <input type="number" name="roomNo" value={editData.roomNo} onChange={handleInputChange} placeholder="Room No" />
            <input type="number" name="floor" value={editData.floor} onChange={handleInputChange} placeholder="Floor" />
            <input type="number" name="beds" value={editData.beds} onChange={handleInputChange} placeholder="Beds" />
            <input type="number" name="sharing" value={editData.sharing} onChange={handleInputChange} placeholder="Sharing" />
            <input type="number" name="amount" value={editData.amount} onChange={handleInputChange} placeholder="Rent" />
            <select name="status" value={editData.status} onChange={handleInputChange}>
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
            </select>
            <input type="text" name="facilities" value={editData.facilities} onChange={handleInputChange} placeholder="Facilities (comma-separated)" />
            <div className="modal-actions">
              <button onClick={handleUpdate}>Update</button>
              <button onClick={handleCloseModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllRooms;
