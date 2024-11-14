import React, { useState } from 'react';
import axios from 'axios';

function BulkUpload() {
  const [file, setFile] = useState(null);
  const [uploadType, setUploadType] = useState('faculty');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        `http://localhost:5000/api/bulk-upload/${uploadType}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setMessage(response.data.message);
      setFile(null);
      // Reset file input
      e.target.reset();
    } catch (error) {
      setError(error.response?.data?.message || 'Error uploading file');
    }
  };

  return (
    <div className="bulk-upload-container">
      <h2>Bulk Upload</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Upload Type:</label>
          <select 
            value={uploadType} 
            onChange={(e) => setUploadType(e.target.value)}
          >
            <option value="faculty">Faculty</option>
            <option value="students">Students</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Select CSV File:</label>
          <input 
            type="file" 
            accept=".csv" 
            onChange={handleFileChange}
          />
        </div>

        <button type="submit" className="upload-button">
          Upload
        </button>
      </form>

      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}

      <div className="instructions">
        <h3>Instructions:</h3>
        <p>Please upload a CSV file with the following format:</p>
        {uploadType === 'faculty' ? (
          <p>Name, Designation, Branch</p>
        ) : (
          <p>Name, Roll Number, Branch</p>
        )}
        <p>The first row should contain headers.</p>
      </div>
    </div>
  );
}

export default BulkUpload;