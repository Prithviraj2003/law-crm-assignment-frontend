import { useState, useEffect } from "react";
import { taskCard } from "../Cards";
import axios from "axios";

function Task() {
  const [tasks, setTasks] = useState([]);
  const [associates, setAssociates] = useState([]);
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
    status: "Pending",
    assignedTo: null,
    matter: "",
  });

  useEffect(() => {
    // Fetch tasks from server when component mounts
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:8888/tasks"); // Update with your API endpoint
        setTasks(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    const fetchAssocoates = async () => {
      try {
        const response = await axios.get("http://localhost:8888/admins"); // Update with your API endpoint
        setAssociates(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
    fetchAssocoates();
  }, []);

  const handleAddTask = async () => {
    try {
      const response = await axios.post("http://localhost:8888/tasks", task); // Update with your API endpoint
      setTasks([...tasks, response.data]);
      setTask({
        title: "",
        description: "",
        dueDate: "",
        priority: "Medium",
        status: "Pending",
        assignedTo: null,
        matter: "",
      });
      alert("Task added successfully");
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Error adding task");
    }
  };

  return (
    <>
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
                required
              />
              <textarea
                className="form-control"
                placeholder="Description"
                aria-label="Description"
                aria-describedby="basic-addon1"
                style={{ marginBottom: "10px" }}
                onChange={(e) =>
                  setTask({ ...task, description: e.target.value })
                }
                value={task.description}
                required
              />
              <input
                type="date"
                className="form-control"
                aria-label="Due Date"
                aria-describedby="basic-addon1"
                style={{ marginBottom: "10px" }}
                onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
                value={task.dueDate}
                required
              />
              <select
                className="form-select"
                aria-label="Priority"
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
              <select
                className="form-select"
                aria-label="Status"
                style={{ marginBottom: "10px" }}
                onChange={(e) => setTask({ ...task, status: e.target.value })}
                value={task.status}
              >
                <option value="" disabled>
                  Select Status
                </option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="On Hold">On Hold</option>
              </select>
              <select
                className="form-select"
                aria-label="Status"
                style={{ marginBottom: "10px" }}
                onChange={(e) => {
                  console.log(e.target.value);
                  if (e.target.value === "") {
                    setTask({ ...task, assignedTo: null });
                    return;
                  }
                  setTask({ ...task, assignedTo: e.target.value });
                }}
                value={task.assignedTo}
              >
                <option value="">
                  Select Associate
                </option>
                {associates.map((associate) => (
                  <option value={associate._id}>{associate.username}</option>
                ))}
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
                data-bs-dismiss="modal"
                onClick={handleAddTask}
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasRightLabel">
            Tasks
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div
            className="dashboard-tasks"
            style={{
              backgroundColor: "#f8f9fa",
              padding: "20px",
              borderRadius: "5px",
            }}
          >
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
      </div>
    </>
  );
}

export default Task;
