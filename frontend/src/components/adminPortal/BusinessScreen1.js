import React, { useState } from 'react';
import "../../assets/style/BusinessScreen1.css";
import axios from 'axios';

function BusinessScreen1() {
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({}); 

  const validateFields = () => {
    const newErrors = {};
    if (!field1.trim()) newErrors.field1 = 'Field 1 is required';
    if (!field2.trim()) newErrors.field2 = 'Field 2 is required';
    
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.field3 = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.field3 = 'Email 3 must be a valid email address';
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
        field1, field2, email
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });

      if (response.status === 201) {
        alert(`Email is send to ${email}`)
        setField1('');
        setField2('');
        setEmail('');
        setErrors({});
      } else {
        alert('Failed to save data');
      }
    } catch (error) {
      if(error.status === 409){
        alert('Email already exist')
      }
    }
  };

  return (
    <div className="business-screen">
      <h2 className="title">Business Screen 1</h2>
      <form className="form" onSubmit={handleSubmit}>
        {/* Field 1 */}
        <label htmlFor="field1" className="label">Field 1: <span className="required">*</span></label>
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
        <label htmlFor="field2" className="label">Field 2: <span className="required">*</span></label>
        <input
          type="text"
          id="field2"
          value={field2}
          onChange={(e) => setField2(e.target.value)}
          placeholder="Enter field 2 data"
          className="input-field"
        />
        {errors.field2 && <span className="error-text">{errors.field2}</span>}

        {/* Field 3 (Email) */}
        <label htmlFor="email" className="label">Email: <span className="required">*</span></label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          className="input-field"
        />
        {errors.email && <span className="error-text">{errors.email}</span>}

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default BusinessScreen1;
