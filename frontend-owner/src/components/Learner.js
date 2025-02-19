import React, { useState, useEffect, useCallback } from "react";
import { Table, Button, Form, InputGroup } from "react-bootstrap";
import axios from "axios";
import OwnerSidebar from "./OwnerSidebar";
import "../style/Learner.css"; // Ensure this CSS file is correctly imported

const LearnerTable = () => {
  const [learners, setLearners] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredLearners, setFilteredLearners] = useState([]);

  // Define fetchLearners before using it in useEffect
  const fetchLearners = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/api/learner');
      const data = await response.json();
      setLearners(data);
      setFilteredLearners(data);
    } catch (err) {
      console.error("Error fetching learners:", err);
    }
  }, []); // Empty dependency array ensures this function does not change

  useEffect(() => {
    fetchLearners(); // Call the function in useEffect
  }, [fetchLearners]); // Add fetchLearners as a dependency to ensure it's stable

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this learner?")) {
      try {
        await axios.delete(`http://localhost:5000/delete-learner/${id}`);
        fetchLearners(); // Re-fetch learners after deletion
      } catch (error) {
        console.error("Error deleting learner:", error);
        alert("Error deleting learner. Please try again.");
      }
    }
  };

  const handleSearch = () => {
    const filtered = learners.filter((learner) =>
      Object.values(learner).some((value) =>
        value.toString().toLowerCase().includes(search.toLowerCase())
      )
    );
    setFilteredLearners(filtered);
  };

  return (
    <div className="learner-container">
      <OwnerSidebar />
      <div className="learner-content">
        <div className="container mt-4">
          <h2>Learners</h2>

          {/* Search Bar */}
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="primary" onClick={handleSearch}>Search</Button>
          </InputGroup>

          {/* Responsive Table */}
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Learner ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Vehicle Classes</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLearners.length > 0 ? (
                  filteredLearners.map((learner) => (
                    <tr key={learner.learner_id}>
                      <td>{learner.learner_id}</td>
                      <td>{learner.first_name}</td>
                      <td>{learner.last_name}</td>
                      <td>{learner.email}</td>
                      <td>{learner.mobile_number}</td>
                      <td>{learner.vehicle_classes || "N/A"}</td>
                      <td>
                        <Button
                          variant="info"
                          className="me-2"
                          onClick={() => console.log("Viewing", learner)}
                        >
                          View
                        </Button>
                        <Button
                          variant="warning"
                          className="me-2"
                          onClick={() => console.log("Updating", learner)}
                        >
                          Update
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(learner.learner_id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No learners found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnerTable;
