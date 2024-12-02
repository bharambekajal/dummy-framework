
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../assets/style/SearchScreen.css";
import { AiFillEdit, AiOutlineCheckCircle } from "react-icons/ai";
import ClientData from "../Dashboard/ClientData";

function SearchComponent() {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const toggleStatus = async (userId, newStatus) => {
    setResults((prevResults) =>
      prevResults.map((user) =>
        user.id === userId ? { ...user, is_active: newStatus } : user
      )
    );

    try {
      await axios.patch(`http://localhost:8087/api/user/${userId}/status`, {
        is_active: newStatus,
      });
    } catch (error) {
      console.error("Error updating user status:", error);
      setError("Failed to update user status. Please try again.");
      setResults((prevResults) =>
        prevResults.map((user) =>
          user.id === userId ? { ...user, is_active: !newStatus } : user
        )
      );
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8087/api/user/allUser"
      );
      const usersWithStatus = response.data
        .map((user) => ({
          ...user,
          is_active: user.is_active ?? true,
        }))
        .sort((a, b) => a.id - b.id);

      setResults(usersWithStatus);
      setError("");
    } catch (err) {
      setError("Failed to load users. Please try again.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) {
      fetchAllUsers();
      return;
    }

    const searchUrl = `http://localhost:8087/api/user/search/${searchType}/${query}`;

    try {
      const response = await axios.get(searchUrl);
      if (Array.isArray(response.data) && response.data.length > 0) {
        setResults(response.data);
        setError("");
      } else if (response.data) {
        setResults([response.data]);
        setError("");
      }
    } catch (err) {
      setResults([]);
      // setError("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  const handleUserUpdate = (updatedUser) => {
    setResults((prevResults) =>
      prevResults.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      )
    );
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsEditMode(true);
  };

  const handleEditCancel = () => {
    setSelectedUser(null);
    setIsEditMode(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value) {
      fetchAllUsers();
    }
  };

  return (
    <div className="h-100">
      <div className="search-container h-100">
        <div className="search-box h-100">
          {!isEditMode && (
            <div className="container d-flex justify-content-start px-0 flex-column">
              <form className="d-flex search-form" onSubmit={handleSearch}>
                <select
                  className="form-select me-0"
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  style={{
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    width: "95px",
                  }}
                >
                  <option value="name">Name</option>
                  <option value="id">ID</option>
                </select>
                <input
                  className="form-control me-0"
                  type="text"
                  placeholder={`Search by ${searchType}...`}
                  value={query}
                  onChange={handleInputChange}
                  aria-label="Search"
                  style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                />
                <button
                  className="btn search-button"
                  type="submit"
                  style={{ backgroundColor: "#97C3D4", color: "white" }}
                >
                  Search
                </button>
              </form>
              {error && (
                <p className="text-danger mt-2" style={{ textAlign: "center" }}>
                  {error}
                </p>
              )}
            </div>
          )}

          <div className="h-100">
            {isEditMode ? (
            <ClientData
            isEditMode={isEditMode}
            selectedUser={selectedUser}
            onCancel={handleEditCancel}
            onUserUpdate={handleUserUpdate}
            action="user"
          />
            ) : results.length > 0 ? (
              <table className="container table table-striped table-bordered">
                <thead className="thead-dark">
                  <tr>
                    <th>S.No</th>
                    <th>Name</th>
                    <th>State</th>
                    <th>Number</th>
                    <th>City</th>
                    <th>Occupation</th>
                    <th>Email</th>
                    <th>Registration Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                    <th>Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, index) => (
                    <tr key={result.id}>
                      <td>{index + 1}</td>
                      <td>{result.name}</td>
                      <td>{result.state}</td>
                      <td>{result.number}</td>
                      <td>{result.city}</td>
                      <td>{result.occupation}</td>
                      <td>{result.email}</td>
                      <td>{formatDate(result.created_at)}</td>
                      <td>{result.is_active ? "Active" : "Inactive"}</td>
                      <td>
                        <span className="d-flex align-items-center">
                          <button
                            className={`btn ${
                              result.is_active ? "btn-danger" : "btn-success"
                            } btn-sm`} // Added 'btn-sm'
                            onClick={() =>
                              toggleStatus(result.id, !result.is_active)
                            }
                            style={{ fontSize: "12px", padding: "5px 10px" }} // Inline styles to adjust the size
                          >
                            {result.is_active ? "Deactivate" : "Activate"}
                          </button>
                          <AiFillEdit
                            style={{
                              cursor: "pointer",
                              marginLeft: "8px",
                              color: "#007bff",
                              fontSize: "24px", // Increased icon size
                            }}
                            onClick={() => handleEditClick(result)}
                          />
                        </span>
                      </td>
                      <td>
                        {result.is_updated ? (
                          <AiOutlineCheckCircle
                            style={{
                              color: "green",
                              fontSize: "20px",
                            }}
                            title="Updated"
                          />
                        ) : (
                          <span></span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p style={{ marginLeft: "100px", marginTop: "30px" }}>
                No results found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchComponent;
