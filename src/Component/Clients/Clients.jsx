// src/components/Clients.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
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
import "./Clients.css";
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

function Clients() {
  // Demo client data
  const [modelTitle, setModelTitle] = useState("Add New Client");
  const [clients, setClients] = useState([]);
  const [associates, setAssociates] = useState([]);
  const getAssociates = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/admins`);
      setAssociates(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getClients = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/clients`
      );
      setClients(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getClients();
    getAssociates();
  }, []);
  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    clientType: "Individual",
    assignedAssociate: null,
  });
  console.log(newClient);
  // Handle adding a new client
  const handleAddClient = async () => {
    if (modelTitle === "Edit Client Details") {
      try {
        const res = await axios.patch(
          `${process.env.REACT_APP_SERVER_URL}/clients/${newClient._id}`,
          newClient
        );
        console.log(res);
        getClients();
        setNewClient({
          name: "",
          email: "",
          phone: "",
          address: "",
          clientType: "Individual",
          assignedAssociate: null,
        });
        alert("Client updated successfully");
      } catch (error) {
        console.log(error);
        alert("Failed to update Client");
      }
    } else {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/clients`,
          newClient
        );
        console.log(res);
        getClients();
        alert("Client added successfully");
      } catch (error) {
        console.log(error);
        alert("Failed to Add Client");
      }
    }
    // Close the modal programmatically if needed
    const modalElement = document.getElementById("clientModal");
    if (modalElement) {
      const modal = window.bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  };

  // Data for the Pie Chart (Client Type)
  const clientTypeData = {
    labels: ["Individual", "Corporate"],
    datasets: [
      {
        label: "Client Type",
        data: [
          clients.filter((client) => client.clientType === "Individual").length,
          clients.filter((client) => client.clientType === "Corporate").length,
        ],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#2a92d8", "#e74c3c"],
      },
    ],
  };

  // Summary Cards Data
  const summaryCards = [
    {
      title: "Total Clients",
      value: clients.length,
      subtitle: "All Clients",
      backgroundColor: "#f8f9fa",
    },
    {
      title: "Individual Clients",
      value: clients.filter((client) => client.clientType === "Individual")
        .length,
      subtitle: "Individual Clients",
      backgroundColor: "#f8f9fa",
    },
    {
      title: "Corporate Clients",
      value: clients.filter((client) => client.clientType === "Corporate")
        .length,
      subtitle: "Corporate Clients",
      backgroundColor: "#f8f9fa",
    },
  ];

  // Columns for the Table
  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Phone", accessor: "phone" },
    { header: "Address", accessor: "address" },
    { header: "Client Type", accessor: "clientType" },
    { header: "Assigned Associate", accessor: "assignedAssociate" },
    { header: "Created At", accessor: "createdAt" },
    { header: "Actions", accessor: "actions" },
  ];

  // Prepare data for the Table
  const tableData = clients.map((client) => ({
    ...client,
    assignedAssociate: client?.assignedAssociate?.username,
    createdAt: client?.createdAt?.split("T")[0],
    actions: (
      <div className="d-flex">
        <button
          className="btn btn-primary ms-5"
          data-bs-toggle="modal"
          data-bs-target="#clientModal"
          onClick={() => {
            setModelTitle("Edit Client Details");
            setNewClient(client);
          }}
        >
          Edit
        </button>
        <button
          className="btn btn-danger ms-2"
          onClick={async () => {
            try {
              await axios.delete(
                `${process.env.REACT_APP_SERVER_URL}/clients/${client._id}`
              );
              alert("Client deleted successfully");
              getClients();
            } catch (err) {
              console.log(err);
              alert("Failed to delete client");
            }
          }}
        >
          Delete
        </button>
      </div>
    ),
  }));

  return (
    <main className="clients-page" style={{ width: "100%" }}>
      <h1 style={{ marginBottom: "20px" }}>Client Management</h1>

      {/* Summary Cards */}
      <div className="d-flex justify-content-around">
        {summaryCards.map((card, index) => (
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

      {/* Charts */}
      <div
        className="d-flex justify-content-around"
        style={{ marginTop: "2rem" }}
      >
        <div
          className="client-chart"
          style={{
            backgroundColor: "#f8f9fa",
            padding: "20px",
            borderRadius: "5px",
            marginBottom: "20px",
            width: "500px",
          }}
        >
          <h3>Client Type Distribution</h3>
          <Pie data={clientTypeData} />
        </div>
      </div>

      {/* Client List Table */}
      <div className="clients-table" style={{ marginTop: "2rem" }}>
        <div className="d-flex align-items-center mb-3">
          <h3>Clients List</h3>
          <button
            className="btn btn-primary ms-5"
            data-bs-toggle="modal"
            data-bs-target="#clientModal"
            onClick={() => setModelTitle("Add New Client")}
          >
            Add New Client
          </button>
        </div>

        <Table columns={columns} data={tableData} />
      </div>

      {/* Add Client Modal */}
      <div
        className="modal fade"
        id="clientModal"
        tabIndex="-1"
        aria-labelledby="clientModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="clientModalLabel">
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
                  <label htmlFor="clientName" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="clientName"
                    value={newClient.name}
                    onChange={(e) =>
                      setNewClient({ ...newClient, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="clientEmail" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="clientEmail"
                    value={newClient.email}
                    onChange={(e) =>
                      setNewClient({ ...newClient, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="clientPhone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="clientPhone"
                    value={newClient.phone}
                    onChange={(e) =>
                      setNewClient({ ...newClient, phone: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="clientAddress" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="clientAddress"
                    value={newClient.address}
                    onChange={(e) =>
                      setNewClient({ ...newClient, address: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="clientType" className="form-label">
                    Client Type
                  </label>
                  <select
                    className="form-select"
                    id="clientType"
                    value={newClient.clientType}
                    onChange={(e) =>
                      setNewClient({ ...newClient, clientType: e.target.value })
                    }
                  >
                    <option value="Individual">Individual</option>
                    <option value="Corporate">Corporate</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="assignedAssociate" className="form-label">
                    Assigned Associate
                  </label>
                  <select
                    className="form-select"
                    id="assignedAssociate"
                    value={
                      newClient?.assignedAssociate
                        ? newClient?.assignedAssociate?._id
                        : null
                    }
                    onChange={(e) => {
                      if (e.target.value === "NA") {
                        return setNewClient({
                          ...newClient,
                          assignedAssociate: null,
                        });
                      } else {
                        setNewClient({
                          ...newClient,
                          assignedAssociate: e.target.value,
                        });
                      }
                    }}
                  >
                    <option value={null}>NA</option>
                    {associates.map((associate) => (
                      <option value={associate._id}>
                        {associate.username}
                      </option>
                    ))}
                  </select>
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
                onClick={handleAddClient}
              >
                Save Client
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Clients;
