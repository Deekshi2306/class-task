import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import FacultyList from './components/FacultyList'
import StudentList from './components/StudentList';
import BulkUpload from './components/Bulkupload';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/faculty" element={<FacultyList />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/bulk-upload" element={<BulkUpload />} />
          <Route path="/" element={<FacultyList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;