import React from 'react';
import './Header.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Law Firm CRM</div>
      <ul className="navbar-menu">
        <li>CRM</li>
        <li>Reports</li>
        <li>Insights</li>
        <li>Billing</li>
      </ul>
      <div className="navbar-right">
        <div className="navbar-icon">🔔</div>
        <div className="navbar-profile">Profile</div>
      </div>
    </nav>
  );
}

export default Navbar;
