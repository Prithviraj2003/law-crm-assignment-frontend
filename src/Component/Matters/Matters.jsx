import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
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
import { Card } from "../Cards";
import "./Matters.css";
import { Table } from "../Table";

ChartJS.register(
  CategoryScale,
  ArcElement,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Matters() {
  const [modelTitle, setModelTitle] = useState("Add New Matter");
  const [matters, setMatters] = useState([]);
  const [clients, setClients] = useState([]); // Assuming you need client data
  const [associates, setAssociates] = useState([]); // Assuming you need associate data

  const [newMatter, setNewMatter] = useState({
    clientId: "",
    matterType: "",
    assignedAssociate: "",
    dueDate: "",
    priority: "Low",
    estimatedHours: "",
    actualHours: "",
    billingStatus: "Pending",
    notes: "",
  });

  const getMatters = async () => {
    try {
      const res = await axios.get("http://localhost:8888/matters");
      setMatters(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getClients = async () => {
    // Fetch clients if needed
    try {
      const res = await axios.get("http://localhost:8888/clients"); // Adjust URL as needed
      setClients(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAssociates = async () => {
    // Fetch associates if needed
    try {
      const res = await axios.get("http://localhost:8888/admins"); // Adjust URL as needed
      setAssociates(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMatters();
    getClients(); // Fetch clients
    getAssociates(); // Fetch associates
  }, []);

  const handleAddMatter = async () => {
    if (
      !newMatter.clientId ||
      newMatter.matterType.trim() === "" ||
      !newMatter.assignedAssociate ||
      newMatter.dueDate.trim() === ""
    ) {
      alert("Please fill in all fields");
      return;
    }
    if (modelTitle === "Edit Matter Details") {
      try {
        const matterToUpdate = { ...newMatter };
        await axios.patch(
          `http://localhost:8888/matters/${newMatter._id}`,
          matterToUpdate
        );
        alert("Matter updated successfully");
        getMatters();
      } catch (error) {
        alert("Failed to update matter");
      }
    } else {
      try {
        const matterToAdd = { ...newMatter };
        await axios.post("http://localhost:8888/matters", matterToAdd);
        getMatters();
        alert("Matter added successfully");
      } catch (error) {
        alert("Failed to add matter");
        console.log(error);
      }
    }

    setNewMatter({
      clientId: "",
      matterType: "",
      assignedAssociate: "",
      dueDate: "",
      priority: "Low",
      estimatedHours: "",
      actualHours: "",
      billingStatus: "Pending",
      notes: "",
    });

    const modalElement = document.getElementById("matterModal");
    if (modalElement) {
      const modal = window.bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  };
  const matterStatusData = {
    labels: ["Pending", "In Progress", "Completed"],
    datasets: [
      {
        label: "Matter Status",
        data: [
          matters.filter((matter) => matter.billingStatus === "Pending").length,
          matters.filter((matter) => matter.billingStatus === "In Progress")
            .length,
          matters.filter((matter) => matter.billingStatus === "Completed")
            .length,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#4CAF50"],
        hoverBackgroundColor: ["#e74c3c", "#2a92d8", "#43a047"],
      },
    ],
  };

  const summaryCards = [
    {
      title: "Total Matters",
      value: matters.length,
      subtitle: "All Matters",
      backgroundColor: "#f8f9fa",
    },
    {
      title: "Pending Matters",
      value: matters.filter((matter) => matter.billingStatus === "Pending")
        .length,
      subtitle: "Awaiting Completion",
      backgroundColor: "#f8f9fa",
    },
    {
      title: "Completed Matters",
      value: matters.filter((matter) => matter.billingStatus === "Completed")
        .length,
      subtitle: "Successfully Closed",
      backgroundColor: "#f8f9fa",
    },
  ];

  const columns = [
    {
      header: "Client Name",
      accessor: "clientId",
      render: (row) =>
        clients.find((client) => client._id === row.clientId)?.contact || "N/A",
    }, // Adjust as needed
    { header: "Matter Type", accessor: "matterType" },
    {
      header: "Assigned Associate",
      accessor: "assignedAssociate",
      render: (row) =>
        associates.find((associate) => associate._id === row.assignedAssociate)
          ?.username || "N/A",
    }, // Adjust as needed
    { header: "Due Date", accessor: "dueDate" },
    { header: "Priority", accessor: "priority" },
    { header: "Estimated Hours", accessor: "estimatedHours" },
    { header: "Actual Hours", accessor: "actualHours" },
    { header: "Billing Status", accessor: "billingStatus" },
    { header: "Notes", accessor: "notes" },
    { header: "Actions", accessor: "actions" },
  ];

  const tableData = matters?.map((matter) => ({
    ...matter,
    clientId: matter.clientId.name,
    assignedAssociate: matter.assignedAssociate.username,
    dueDate: matter.dueDate.split("T")[0],
    actions: (
      <div className="d-flex">
        <button
          className="btn btn-primary ms-5"
          data-bs-toggle="modal"
          data-bs-target="#matterModal"
          onClick={() => {
            setModelTitle("Edit Matter Details");
            setNewMatter(matter);
          }}
        >
          Edit
        </button>
        <button
          className="btn btn-danger ms-2"
          onClick={async () => {
            try {
              await axios.delete(`http://localhost:8888/matters/${matter._id}`);
              alert("Matter deleted successfully");
              getMatters();
            } catch (error) {
              alert("Failed to delete matter");
            }
          }}
        >
          Delete
        </button>
      </div>
    ),
  }));

  return (
    <main className="matters-page" style={{ width: "100%" }}>
      <h1 style={{ marginBottom: "20px" }}>Matter Management</h1>

      <div className="d-flex justify-content-around">
        {summaryCards?.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            value={card.value}
            subtitle={card.subtitle}
            style={{
              backgroundColor: card.backgroundColor,
              padding: "20px",
              borderRadius: "5px",
              marginBottom: "20px",
              width: "200px",
              textAlign: "center",
            }}
          />
        ))}
      </div>

      <div
        className="d-flex justify-content-around"
        style={{ marginTop: "2rem" }}
      >
        <div
          className="matters-chart"
          style={{
            backgroundColor: "#f8f9fa",
            padding: "20px",
            borderRadius: "5px",
            marginBottom: "20px",
            width: "500px",
          }}
        >
          <h3>Matters Status</h3>
          <Pie
            data={matterStatusData}
            style={{ width: "400px", height: "400px" }}
          />
        </div>
      </div>

      <div className="matters-table" style={{ marginTop: "2rem" }}>
        <div className="d-flex align-items-center mb-3">
          <h3>Matters List</h3>
          <button
            className="btn btn-primary ms-5"
            data-bs-toggle="modal"
            data-bs-target="#matterModal"
            onClick={() => setModelTitle("Add New Matter")}
          >
            Add New Matter
          </button>
        </div>

        <Table columns={columns} data={tableData} />
      </div>

      <div
        className="modal fade"
        id="matterModal"
        tabIndex="-1"
        aria-labelledby="matterModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="matterModalLabel">
                {modelTitle}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="clientId" className="form-label">
                    Client
                  </label>
                  <select
                    className="form-control"
                    id="clientId"
                    value={newMatter.clientId._id}
                    onChange={(e) =>
                      setNewMatter({ ...newMatter, clientId: e.target.value })
                    }
                    required
                  >
                    <option value="">Select Client</option>
                    {clients.map((client) => (
                      <option key={client._id} value={client._id}>
                        {client.name} {/* Adjust based on client data */}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="matterType" className="form-label">
                    Matter Type
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="matterType"
                    value={newMatter.matterType}
                    onChange={(e) =>
                      setNewMatter({ ...newMatter, matterType: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="assignedAssociate" className="form-label">
                    Assigned Associate
                  </label>
                  <select
                    className="form-control"
                    id="assignedAssociate"
                    value={newMatter.assignedAssociate._id}
                    onChange={(e) =>
                      setNewMatter({
                        ...newMatter,
                        assignedAssociate: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="">Select Associate</option>
                    {associates.map((associate) => (
                      <option key={associate._id} value={associate._id}>
                        {associate.username}{" "}
                        {/* Adjust based on associate data */}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="dueDate" className="form-label">
                    Due Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dueDate"
                    value={newMatter.dueDate}
                    onChange={(e) =>
                      setNewMatter({ ...newMatter, dueDate: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="priority" className="form-label">
                    Priority
                  </label>
                  <select
                    className="form-control"
                    id="priority"
                    value={newMatter.priority}
                    onChange={(e) =>
                      setNewMatter({ ...newMatter, priority: e.target.value })
                    }
                    required
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="estimatedHours" className="form-label">
                    Estimated Hours
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="estimatedHours"
                    value={newMatter.estimatedHours}
                    onChange={(e) =>
                      setNewMatter({
                        ...newMatter,
                        estimatedHours: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="actualHours" className="form-label">
                    Actual Hours
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="actualHours"
                    value={newMatter.actualHours}
                    onChange={(e) =>
                      setNewMatter({
                        ...newMatter,
                        actualHours: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="billingStatus" className="form-label">
                    Billing Status
                  </label>
                  <select
                    className="form-control"
                    id="billingStatus"
                    value={newMatter.billingStatus}
                    onChange={(e) =>
                      setNewMatter({
                        ...newMatter,
                        billingStatus: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="notes" className="form-label">
                    Notes
                  </label>
                  <textarea
                    className="form-control"
                    id="notes"
                    rows="3"
                    value={newMatter.notes}
                    onChange={(e) =>
                      setNewMatter({ ...newMatter, notes: e.target.value })
                    }
                  ></textarea>
                </div>
              </form>
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
                onClick={handleAddMatter}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Matters;
