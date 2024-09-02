import React from "react";
import "./Cards.css";

function Card({ title, value, subtitle }) {
  return (
    <div className="card" style={{ width: "18rem", height: "fit-content" }}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{value}</p>
        <span className="card-subtitle mb-2 text-muted">{subtitle}</span>
      </div>
    </div>
  );
}

function taskCard({ title, dueDate, assignedTo, status, priority }) {
  return (
    <div className="card mb-2" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="" style={{ fontSize: "12px" }}>
          {dueDate ? `Due on ${dueDate.split("T")[0]}` : "No Due Date"}
        </p>
        <p className="" style={{ fontSize: "15px" }}>
          {assignedTo ? `Assigned to ${assignedTo.username}` : ""}
        </p>
        <p className="" style={{ fontSize: "15px" }}>
          {status}
        </p>
        {priority === "High" ? (
          <span className="badge bg-danger" style={{ color: "white" }}>
            {priority}
          </span>
        ) : priority === "Medium" ? (
          <span className="badge bg-warning" style={{ color: "black" }}>
            {priority}
          </span>
        ) : (
          <span className="badge bg-success" style={{ color: "white" }}>
            {priority}
          </span>
        )}
      </div>
    </div>
  );
}

export { Card, taskCard };
