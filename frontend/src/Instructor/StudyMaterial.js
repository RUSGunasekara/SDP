import React, { useEffect, useState } from "react";
import axios from "axios";
import InstructorSidebar from './InstructorSidebar';
import { Button, Table, Form, Modal } from "react-bootstrap";

const API_URL = "http://localhost:5000/materials";

const StudyMaterial = () => {
  const [materials, setMaterials] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    axios.get(API_URL).then((res) => setMaterials(res.data));
  }, []);

  const handleAdd = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("owner_ID", "owner123");
    formData.append("Instructor_ID", "instructor456");

    await axios.post(API_URL, formData);
    window.location.reload();
  };

  const handleUpdate = async () => {
    await axios.put(`${API_URL}/${selectedMaterial.material_ID}`, selectedMaterial);
    setShowModal(false);
    window.location.reload();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    window.location.reload();
  };

  return (
    <div className="sm-container">
    <InstructorSidebar />
    <div className="sm-content">
      <div className="container mt-4">
        <h2>Study Materials</h2>
        <Form.Group>
          <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} />
          <Button onClick={handleAdd} className="mt-2">Upload</Button>
        </Form.Group>
        
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Material URL</th>
              <th>Upload Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((material) => (
              <tr key={material.material_ID}>
                <td>{material.material_ID}</td>
                <td>
                  <a href={material.material_URL} target="_blank" rel="noopener noreferrer">View</a>
                </td>
                <td>{material.upload_date}</td>
                <td>
                  <Button variant="warning" onClick={() => { setSelectedMaterial(material); setShowModal(true); }}>Update</Button>
                  <Button variant="danger" onClick={() => handleDelete(material.material_ID)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Material</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control value={selectedMaterial?.material_URL} onChange={(e) => setSelectedMaterial({ ...selectedMaterial, material_URL: e.target.value })} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleUpdate}>Save Changes</Button>
          </Modal.Footer>
        </Modal>
    </div>
    </div>
    </div>
  );
};

export default StudyMaterial;