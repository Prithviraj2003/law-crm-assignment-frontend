import React, { useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { taskCard } from "./Cards";
import Task from "./Tasks/Tasks";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-logo">Law Firm CRM</div>
      <ul className="navbar-menu">
        <li
          onClick={() => {
            navigate("/");
          }}
        >
          Matters
        </li>
        <li
          onClick={() => {
            navigate("/clients");
          }}
        >
          Clients
        </li>
      </ul>
      <div className="navbar-right">
        <button
          class="btn btn-primary"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
        >
          Tasks &lt;&lt;{" "}
        </button>
        <Task />
      </div>
    </nav>
  );
}

export default Navbar;
