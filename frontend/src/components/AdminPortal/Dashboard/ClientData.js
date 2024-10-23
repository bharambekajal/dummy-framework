import React, { useState } from 'react';
import "../../../assets/style/ClientData.css";
import axios from 'axios';

function ClientData() {
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};
    if (!field1.trim()) newErrors.field1 = 'Field 1 is required';
    if (!field2.trim()) newErrors.field2 = 'Field 2 is required';
    if (!number.trim()) newErrors.number = 'number is required';


    // Validate phone number length
    const numberRegex = /^\d{10,}$/; // Only digits, minimum 10
    if (!number.trim()) {
      newErrors.number = 'Phone number is required';
    } else if (!numberRegex.test(number)) {
      newErrors.number = 'Phone number must contain at least 10 digits';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.field3 = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.field3 = 'Email must be a valid email address';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      // If email is unique, proceed with submission
      const response = await axios.post('http://localhost:8087/api/post/businesScreens', {
        field1, field2, number, email
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });

      if (response.status === 201) {
        alert(`Email is sent to ${email}`);
        resetForm();
      } else {
        alert('Failed to save data');
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert('Email already exists');
      }
    }
  };

  const resetForm = () => {
    setField1('');
    setField2('');
    setNumber('');
    setEmail('');
    setErrors({});
  };

  return (
    <div className="business-screen">
      <h2 className="title">Business Screen 1</h2>
      <form className="form" onSubmit={handleSubmit}>
        {/* Field 1 */}
        <label htmlFor="field1" className="label">Field 1 : <span className="required"> * </span></label>
        <input
          type="text"
          id="field1"
          value={field1}
          onChange={(e) => setField1(e.target.value)}
          placeholder="Enter field 1 data"
          className="input-field"
        />
        {errors.field1 && <span className="error-text">{errors.field1}</span>}

        {/* Field 2 */}
        <label htmlFor="field2" className="label">Field 2 : <span className="required">*</span></label>
        <input
          type="text"
          id="field2"
          value={field2}
          onChange={(e) => setField2(e.target.value)}
          placeholder="Enter field 2 data"
          className="input-field"
        />
        {errors.field2 && <span className="error-text">{errors.field2}</span>}

        <label htmlFor="number" className="label">Phone number : <span className="required">*</span></label>
        <input
          type="text"
          id="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Enter phone number"
          className="input-field"
        />
        {errors.number && <span className="error-text">{errors.number}</span>}

        {/* Field 3 (Email) */}
        <label htmlFor="email" className="label">Email : <span className="required">*</span></label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          className="input-field"
        />
        {errors.email && <span className="error-text">{errors.email}</span>}
        <div className="button-group">
          <button type="submit" className="submit-button">Submit</button>
          <button type="button" className="reset-button" onClick={resetForm}>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default ClientData;
