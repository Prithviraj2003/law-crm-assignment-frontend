import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, taskCard } from "./Cards"; 
import "./Dashboard.css";
import { useState } from "react";
import { Table } from "./Table";

ChartJS.register(
  CategoryScale,
  ArcElement,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [tasks, setTasks] = useState([
    {
      title: "Call Client",
      due: "12/12/2024",
      status: "Pending",
      priority: "High",
    },
    {
      title: "Prepare Case",
      due: "12/12/2024",
      status: "Pending",
      priority: "Medium",
    },
    {
      title: "Review Case",
      due: "12/12/2024",
      status: "Pending",
      priority: "Low",
    },
    {
      title: "Call Client",
      due: "12/12/2024",
      status: "Pending",
      priority: "High",
    },
  ]);
  const [matters] = useState([
    {
      matterID: "1",
      clientContact: "John Doe",
      matterType: "Civil",
      assignedAssociate: "Jane Doe",
      dueDate: "12/12/2024",
      priority: "High",
      estimatedHours: "10",
      actualHours: "5",
      billingStatus: "Pending",
      notes: "Lorem Ipsum",
    },
    {
      matterID: "2",
      clientContact: "John Doe",
      matterType: "Civil",
      assignedAssociate: "Jane Doe",
      dueDate: "12/12/2024",
      priority: "High",
      estimatedHours: "10",
      actualHours: "5",
      billingStatus: "Pending",
      notes: "Lorem Ipsum",
    },
    {
      matterID: "3",
      clientContact: "John Doe",
      matterType: "Civil",
      assignedAssociate: "Jane Doe",
      dueDate: "12/12/2024",
      priority: "High",
      estimatedHours: "10",
      actualHours: "5",
      billingStatus: "Pending",
      notes: "Lorem Ipsum",
    },
    {
      matterID: "4",
      clientContact: "John Doe",
      matterType: "Civil",
      assignedAssociate: "Jane Doe",
      dueDate: "12/12/2024",
      priority: "High",
      estimatedHours: "10",
      actualHours: "5",
      billingStatus: "Pending",
      notes: "Lorem Ipsum",
    },
  ]);
  const [task, setTask] = useState({
    title: "",
    due: "",
    priority: "",
  });

  const handleAddTask = () => {
    setTasks([...tasks, task]);
    setTask({
      title: "",
      due: "",
      priority: "",
    });
  };

  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Matters",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
  const matterStatusData = {
    labels: ["Open", "In Progress", "Closed"],
    datasets: [
      {
        label: "Matter Status",
        data: [5, 8, 12],
        backgroundColor: ["#0088FE", "#00C49F", "#FFBB28"],
        hoverBackgroundColor: ["#0077E6", "#00B396", "#FFAA00"],
      },
    ],
  };

  return (
    <main className="dashboard">
      <h1 style={{ marginBottom: "20px" }}>Matter Overview</h1>
      <div
        className="modal fade"
        id="taskModal"
        tabindex="-1"
        aria-labelledby="taskModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="taskModalLabel">
                Add Task
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                placeholder="Task Title"
                aria-label="Task Title"
                aria-describedby="basic-addon1"
                style={{ marginBottom: "10px" }}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                value={task.title}
              />
              <input
                type="date"
                className="form-control"
                aria-label="Due Date"
                aria-describedby="basic-addon1"
                style={{ marginBottom: "10px" }}
                onChange={(e) => setTask({ ...task, due: e.target.value })}
                value={task.due}
              />
              <select
                className="form-select"
                aria-label="Default select example"
                style={{ marginBottom: "10px" }}
                onChange={(e) => setTask({ ...task, priority: e.target.value })}
                value={task.priority}
              >
                <option value="" disabled>
                  Select Priority
                </option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddTask}
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-around">
        <div className="dashboard-grid">
          <Card
            title="Matters This Month"
            value="15"
            subtitle="This Month"
            style={{
              backgroundColor: "#f8f9fa",
              padding: "20px",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
          />
          <Card
            title="Active Matters"
            value="76"
            subtitle="All Time"
            style={{
              backgroundColor: "#f8f9fa",
              padding: "20px",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
          />
          <Card
            title="Clients"
            value="206"
            subtitle="This Month"
            style={{
              backgroundColor: "#f8f9fa",
              padding: "20px",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
          />
          <div
            className="dashboard-chart"
            style={{
              backgroundColor: "#f8f9fa",
              padding: "20px",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
          >
            <h3>Matters</h3>
            <Bar data={data} />
          </div>
          <div style={{ marginTop: "2rem", width: "400px" }}>
            <h3>Matter Status</h3>
            <Pie data={matterStatusData} />
          </div>
        </div>

        <div
          className="dashboard-tasks"
          style={{
            backgroundColor: "#f8f9fa",
            padding: "20px",
            borderRadius: "5px",
          }}
        >
          <h3>Tasks</h3>
          <ul className="p-0" style={{ listStyle: "none" }}>
            {tasks.map((task, index) => (
              <li key={index}>{taskCard(task)}</li>
            ))}
            <li>
              <button
                className="btn btn-primary"
                style={{ width: "100%", marginTop: "10px" }}
                data-bs-toggle="modal"
                data-bs-target="#taskModal"
              >
                Add Task
              </button>
            </li>
          </ul>
        </div>
      </div>
      <Table matter={matters} />
    </main>
  );
}

export default Dashboard;
