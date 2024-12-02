import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import ClientData from "../Dashboard/ClientData";

function SaveDraft() {
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [isEditForm, setIsEditForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchDrafts = async () => {
    try {
      const response = await axios.get(`http://localhost:8087/api/user/get`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` }
      });
      setResults(response.data);
      setError("");
    } catch (err) {
      setError("Failed to load drafts. Please try again.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDrafts();
    console.log("results--", results);
  }, []);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsEditForm(true);
  };

  const handleEditCancel = () => {
    setSelectedUser(null);
    setIsEditForm(false);
  };

  const handleUserUpdate = (updatedUser) => {
    setResults((prevResults) =>
      prevResults.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const handleDeleteClick = async (userId) => {
    try {
      await axios.delete(`http://localhost:8087/api/user/delete/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` }
      });
      setResults((prevResults) => prevResults.filter((user) => user.id !== userId));
    } catch (err) {
      setError("Failed to delete draft. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="h-100">
      <div className="search-container h-100">
        <div className="search-box h-100">
          <div className="h-100">
            {isEditForm ? (
              <ClientData
                selectedUser={selectedUser}
                onCancel={handleEditCancel}
                onUserUpdate={handleUserUpdate}
                action="draft"
              />
            ) : results.length > 0 ? (
              <table className="container table table-striped table-bordered">
                <thead className="thead-dark">
                  <tr>
                    <th>S.No.</th> {/* Added S.No. column */}
                    <th>Name</th>
                    <th>State</th>
                    <th>Number</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <tr key={result.id}>
                      <td>{index + 1}</td> {/* S.No. */}
                      <td>{result.name}</td>
                      <td>{result.state}</td>
                      <td>{result.number}</td>
                      <td>{result.email}</td>
                      <td>
                        <AiFillEdit
                          style={{
                            cursor: "pointer",
                            marginLeft: "8px",
                            color: "#007bff",
                            fontSize: "24px",
                          }}
                          onClick={() => handleEditClick(result)}
                        />
                        <AiFillDelete
                          style={{
                            cursor: "pointer",
                            marginLeft: "8px",
                            color: "red",
                            fontSize: "24px",
                          }}
                          onClick={() => handleDeleteClick(result.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center mt-3">No drafts found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SaveDraft;
