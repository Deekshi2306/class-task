import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <NavLink to="/students" style={{ margin: '0 10px' }}>Students</NavLink>
      <NavLink to="/faculty" style={{ margin: '0 10px' }}>Faculty</NavLink>
      <NavLink to="/bulk-upload" style={{ margin: '0 10px' }}>Bulk Upload</NavLink>
    </nav>
  );
};

export default NavBar;
