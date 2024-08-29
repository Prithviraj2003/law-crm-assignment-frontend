import { useState } from "react";

export function Table({ matter }) {
const [matters, setMatters] = useState(matter);
const [currentMatter, setCurrentMatter] = useState({});
const [showModal, setShowModal] = useState(false);

const handleShow = (matter) => {
    setCurrentMatter(matter);
    setShowModal(true);
};

const handleClose = () => {
    setCurrentMatter({});
    setShowModal(false);
};

const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentMatter((prevMatter) => ({
        ...prevMatter,
        [name]: value,
    }));
};

const handleSave = () => {
    if (currentMatter.matterID) {
        setMatters((prevMatters) =>
            prevMatters.map((matter) =>
                matter.matterID === currentMatter.matterID ? currentMatter : matter
            )
        );
    } else {
        currentMatter.matterID = matters.length + 1;
        setMatters((prevMatters) => [...prevMatters, currentMatter]);
    }
    handleClose();
};

  return (
    <div style={{ padding: "1rem" }}>
      <div className="matter-table">
        <div className="d-flex ">
          <h3>Matter Table</h3>
          <button
            className="btn btn-primary text-right ms-5"
            style={{ marginBottom: "1rem" }}
            onClick={() => handleShow({})}
          >
            Add Matter
          </button>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Matter ID</th>
                <th>Client Contact</th>
                <th>Matter Type</th>
                <th>Assigned Associate</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Estimated Hours</th>
                <th>Actual Hours</th>
                <th>Billing Status</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {matters.map((matter, index) => (
                <tr key={index}>
                  <td>{matter.matterID}</td>
                  <td>{matter.clientContact}</td>
                  <td>{matter.matterType}</td>
                  <td>{matter.assignedAssociate}</td>
                  <td>{matter.dueDate}</td>
                  <td>{matter.priority}</td>
                  <td>{matter.estimatedHours}</td>
                  <td>{matter.actualHours}</td>
                  <td>{matter.billingStatus}</td>
                  <td
                    style={{
                      width: "20%",
                      maxWidth: "200px",
                      overflow: "auto",
                    }}
                  >
                    {matter.notes}
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleShow(matter)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="editMatterModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editMatterModalLabel">
                  Edit Matter
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={handleClose}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {currentMatter && (
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Matter ID</label>
                      <input
                        type="text"
                        className="form-control"
                        name="matterID"
                        value={currentMatter.matterID?currentMatter.matterID:matters.length+1}
                        readOnly
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Client Contact</label>
                      <input
                        type="text"
                        className="form-control"
                        name="clientContact"
                        value={currentMatter.clientContact}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Matter Type</label>
                      <input
                        type="text"
                        className="form-control"
                        name="matterType"
                        value={currentMatter.matterType}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Assigned Associate</label>
                      <input
                        type="text"
                        className="form-control"
                        name="assignedAssociate"
                        value={currentMatter.assignedAssociate}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Due Date</label>
                      <input
                        type="date"
                        className="form-control"
                        name="dueDate"
                        value={currentMatter.dueDate}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Priority</label>
                      <input
                        type="text"
                        className="form-control"
                        name="priority"
                        value={currentMatter.priority}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Estimated Hours</label>
                      <input
                        type="number"
                        className="form-control"
                        name="estimatedHours"
                        value={currentMatter.estimatedHours}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Actual Hours</label>
                      <input
                        type="number"
                        className="form-control"
                        name="actualHours"
                        value={currentMatter.actualHours}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Billing Status</label>
                      <input
                        type="text"
                        className="form-control"
                        name="billingStatus"
                        value={currentMatter.billingStatus}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Notes</label>
                      <textarea
                        className="form-control"
                        name="notes"
                        rows="3"
                        value={currentMatter.notes}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </form>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSave}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
