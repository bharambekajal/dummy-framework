import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../../assets/style/SearchScreen.css";

function SearchComponent() {
  const [query, setQuery] = useState(''); 
  const [results, setResults] = useState([]); 
  const [error, setError] = useState(''); 

  const toggleStatus = async (userId, newStatus) => {
  
    setResults((prevResults) =>
      prevResults.map((user) =>
        user.id === userId ? { ...user, isActive: newStatus } : user
      )
    );
  
    try {
      await axios.patch(`http://localhost:8087/api/user/${userId}/status`, {
        isActive: newStatus,
      });
    } catch (error) {
      console.error('Error updating user status:', error);
      setError('Failed to update user status. Please try again.');
  
      // Revert back to the previous state on error
      setResults((prevResults) =>
        prevResults.map((user) =>
          user.id === userId ? { ...user, isActive: !newStatus } : user
        )
      );
    }
  };
  

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8087/api/user/allUser');

    
        const usersWithStatus = response.data.map((user) => ({
          ...user,
          isActive: user.isActive ?? true, 
        }));
        setResults(usersWithStatus); 
        setError('');
      } catch (err) {
        setError('Failed to load users. Please try again.');
        console.error(err);
      }
    };

    fetchAllUsers(); // Fetch users on component mount
  }, []);

  // Handle search form submission
  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      const response = await axios.get(`http://localhost:8087/api/user/search/${query}`);
      console.log(response.data);

      if (Array.isArray(response.data)) {
        setResults(response.data);
      } else if (response.data) {
        setResults([response.data]);
      } else {
        setResults([]); // Reset if no data
      }

      setError(''); // Clear errors
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    }
  };

  return (
    <div>
      <nav className="navbar bg-light">
        <div className="container d-flex justify-content-center">
          <form className="d-flex search-form" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="text"
              placeholder="Search by name or ID..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search"
            />
            <button className="btn btn-primary search-button" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>

      <div className="container mt-4">
        {error && <p className="text-danger">{error}</p>}

        {results.length > 0 ? (
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>Field 1</th>
                <th>Field 2</th>
                <th>Number</th>
                <th>Field 3</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={result.id}>
                  <td>{result.id}</td>
                  <td>{result.field1}</td>
                  <td>{result.field2}</td>
                  <td>{result.number}</td>
                  <td>{result.field3}</td>
                  <td>{result.email}</td>
                  <td>{result.isActive ? 'Active' : 'Inactive'}</td>
                  <td>
                    <button
                      className={`btn ${result.isActive ? 'btn-danger' : 'btn-success'}`}
                      onClick={() => toggleStatus(result.id, !result.isActive)}
                    >
                      {result.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
}

export default SearchComponent;
