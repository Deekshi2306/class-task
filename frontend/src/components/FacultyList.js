import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FacultyList() {
  const [faculty, setFaculty] = useState([]);  // Initialize as empty array
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [branch, setBranch] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL_FACULTY || "https://class-task-w4e9.onrender.com";

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      // Ensure response.data is an array
      if (Array.isArray(response.data)) {
        setFaculty(response.data);
      } else {
        console.error('Data received is not an array:', response.data);
        setFaculty([]);
      }
    } catch (error) {
      console.error("Error fetching faculty:", error);
      setError("HI");
      setFaculty([]); // Set to empty array on error
    } finally {
      setLoading(false);
    }
  };

  const saveFaculty = async () => {
    try {
      const facultyData = { name, designation, branch };

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, facultyData);
        setEditingId(null);
      } else {
        await axios.post(API_URL, facultyData);
      }

      setName('');
      setDesignation('');
      setBranch('');
      fetchFaculty();
    } catch (error) {
      console.error("Error saving faculty:", error);
      setError("Failed to save faculty member");
    }
  };

  const deleteFaculty = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchFaculty();
    } catch (error) {
      console.error("Error deleting faculty:", error);
      setError("Failed to delete faculty member");
    }
  };

  const editFaculty = (facultyMember) => {
    setEditingId(facultyMember._id);
    setName(facultyMember.name);
    setDesignation(facultyMember.designation);
    setBranch(facultyMember.branch);
  };

  return (
    <div className="container faculty-list-container">
      <h2 className="title">Faculty List</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="form-group">
        <input
          className="input-field"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="input-field"
          placeholder="Designation"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
        />
        <input
          className="input-field"
          placeholder="Branch"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
        />
        <button className="action-button" onClick={saveFaculty}>
          {editingId ? "Update Faculty" : "Add Faculty"}
        </button>
      </div>

      <div className="table-container">
        {loading ? (
          <p>Loading...</p>
        ) : faculty.length === 0 ? (
          <p>No faculty members found</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Designation</th>
                <th>Branch</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {faculty.map((facultyMember) => (
                <tr key={facultyMember._id}>
                  <td>{facultyMember.name}</td>
                  <td>{facultyMember.designation}</td>
                  <td>{facultyMember.branch}</td>
                  <td>
                    <button 
                      className="edit-button" 
                      onClick={() => editFaculty(facultyMember)}
                    >
                      Edit
                    </button>
                    <button 
                      className="delete-button" 
                      onClick={() => deleteFaculty(facultyMember._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default FacultyList;
