import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


const Profile = () => {
  const {id} =  useParams();
  
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8087/api/user/getUser/${id}`); 

        const data = await response.json(); 
        setUserInfo(data); 
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [id]);

  
  if (!userInfo) {
    return <p style={styles.loading}>Loading user data...</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>User Profile</h1>
      <div style={styles.infoContainer}>
        <p><strong>Field1:</strong> {userInfo.field1}</p>
        <p><strong>Field2:</strong> {userInfo.field2}</p>
        <p><strong>Phone Number:</strong> {userInfo.number}</p>
        <p><strong>Field3:</strong> {userInfo.field3}</p>
        <p><strong>Email:</strong> {userInfo.email}</p>
      </div>
    </div>
  );
};


const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#282c34',
    minHeight: '100vh',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  },
  header: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  infoContainer: {
    backgroundColor: '#444',
    padding: '20px',
    borderRadius: '8px',
    width: '300px',
    textAlign: 'left',
  },
  loading: {
    color: 'white',
    fontSize: '1.5rem',
    marginTop: '20px',
  },
};

export default Profile;
