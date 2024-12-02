import React, { useEffect, useState } from 'react';
import '../../../assets/style/landingPages/UserProfileCard.css';
import portrait from '../../../assets/img/profile_img.jpg';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function ProfileCard() {

  const [adminDetails, setAdminDetails] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    role: '',
  });

  const [editableDetails, setEditableDetails] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    role: '',
  });
  
  const [isEditable, setIsEditable] = useState(false); // Tracks edit mode

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const adminData = JSON.parse(localStorage.getItem('admin'));
        const adminId = adminData ? adminData.id : null;

        if (adminId) {
          const response = await axios.get(`http://localhost:8087/api/admin/get/${adminId}`);
          if (response.data && response.data.status === "success") {
            setAdminDetails(response.data.data);
            setEditableDetails(response.data.data); // Initialize editable fields
          }
        }
      } catch (error) {
        console.error('Error fetching admin details:', error);
      }
    };

    fetchAdminData();
  }, []); 

  const toggleEdit = () => {
    setIsEditable(!isEditable); // Toggle the edit mode
  };

  const saveChanges = async () => {
    try {
      const adminData = JSON.parse(localStorage.getItem('admin'));
      const adminId = adminData ? adminData.id : null;

      if (adminId) {
        const response = await axios.put(`http://localhost:8087/api/admin/update/${adminId}`, editableDetails);

        if (response.data && response.data.status === "success") {
          setIsEditable(false);
          setAdminDetails(editableDetails);
          toast.success('Profile updated successfully!', { position: "top-center" });
        } else {
          toast.error('Failed to update profile.', { position: "top-center" });
        }
      }
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  return (
    <div className='d-flex align-items-center justify-content-center p-5'>
      <div className='upc'>
      <div className='gradient'></div>
      <div className='profile-down'>
        <img src={portrait} alt='Profile' />
        <FaEdit 
          onClick={toggleEdit} 
          style={{ cursor: 'pointer', marginLeft: '127px', marginTop: '-108px' }}
        />
        <div className='profile-title'>
          {`${adminDetails.first_name} ${adminDetails.last_name}`}
        </div>

        <div className='profile-describtion'>
          <form>
            <div className="input-group">
              <label>First Name:</label>
              <input
                type="text"
                value={editableDetails.first_name}
                onChange={(e) => setEditableDetails({ ...editableDetails, first_name: e.target.value })}
                readOnly={!isEditable}
                style={{ backgroundColor: isEditable ? '#f0f0f0' : 'white' }}
              />
            </div>
            <div className="input-group">
              <label>Last Name:</label>
              <input
                type="text"
                value={editableDetails.last_name}
                onChange={(e) => setEditableDetails({ ...editableDetails, last_name: e.target.value })}
                readOnly={!isEditable}
                style={{ backgroundColor: isEditable ? '#f0f0f0' : 'white' }}
              />
            </div>
            <div className="input-group">
              <label>Email:</label>
              <input
                type="email"
                value={editableDetails.email}
                onChange={(e) => setEditableDetails({ ...editableDetails, email: e.target.value })}
                readOnly={!isEditable}
                style={{ backgroundColor: isEditable ? '#f0f0f0' : 'white' }}
              />
            </div>
            <div className="input-group">
              <label>Phone Number:</label>
              <input
                type="tel"
                value={editableDetails.phone_number}
                onChange={(e) => setEditableDetails({ ...editableDetails, phone_number: e.target.value })}
                readOnly={!isEditable}
                style={{ backgroundColor: isEditable ? '#f0f0f0' : 'white' }}
              />
            </div>
            <div className="input-group">
              <label>Role:</label>
              <input
                type="text"
                value={editableDetails.role}
                readOnly
                style={{ backgroundColor: 'white' }}
              />
            </div>
          </form>
        </div>

        {isEditable && (
          <button onClick={saveChanges} className="save-button">Save</button>
        )}
      </div>
    </div>
    </div>
  );
}

export default ProfileCard;
