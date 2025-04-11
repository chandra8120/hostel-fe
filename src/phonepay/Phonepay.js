import React, { useEffect, useState } from "react";
import {API_URL} from '../api.config'
import "./phonepay.css";

const PhonepayList = () => {
  const [phonepays, setPhonepays] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPhonepay = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token from localStorage:", token);

        const res = await fetch(`${API_URL}/phonepay/admin/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to fetch phonepay");
        }

        const data = await res.json();
        console.log("Fetched response:", data);

        if (!Array.isArray(data) || data.length === 0) {
          console.warn("No phonepay data found.");
        }

        setPhonepays(data); // <-- THIS WAS MISSING
      } catch (err) {
        console.error("Backend error:", err.message || "Unknown error");
        setError(err.message || "Unknown error");
      }
    };

    fetchPhonepay();
  }, []);

  return (
    <div className="phonepay-container">
     
      {error && <p className="error">{error}</p>}
      <div className="phonepay-grid">
        {phonepays.length === 0 && !error && (
          <p>No Phonepay entries found.</p>
        )}
        {phonepays.map((entry) => (
          <div key={entry._id} className="phonepay-card">
            {entry.image && (
              <img
                src={`data:image/jpeg;base64,${entry.image}`}
                alt={entry.name}
                className="phonepay-image"
              />
            )}
            <h3>{entry.name}</h3>
            <p><strong>Phone:</strong> {entry.phone}</p>
            {entry.description && <p>{entry.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhonepayList;
