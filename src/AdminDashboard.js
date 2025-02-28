import { useState, useEffect } from "react";
import axios from "axios";
import "./AdminDashboard.css"; //import css

function AdminDashboard() {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/responses?password=admin")
      .then((res) => {
        console.log("API Response:", res.data);
        setResponses(res.data);
      })
      .catch((err) => {
        console.error("Error fetching responses:", err);
      });
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Survey Responses</h2>
      {responses.length === 0 ? (
        <p className="no-responses">No responses yet.</p>
      ) : (
        <div className="table-wrapper">
          <table className="survey-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>Nationality</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {responses.map((response, index) => (
                <tr key={index}>
                  <td>{response.name}</td>
                  <td>{response.gender}</td>
                  <td>{response.nationality}</td>
                  <td>{response.email}</td>
                  <td>{response.phone}</td>
                  <td>{response.address}</td>
                  <td>{response.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
