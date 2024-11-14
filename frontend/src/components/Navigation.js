import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/students">Students</Link></li>
        <li><Link to="/faculty">Faculty</Link></li>
        <li><Link to="/bulk-upload">Bulk Upload</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;