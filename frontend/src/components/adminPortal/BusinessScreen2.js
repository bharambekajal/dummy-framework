// BusinessScreen1.js
import React, { useState } from 'react';
import "../../assets/style/BusinessScreen1.css"

function BusinessScreen2() {
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitted: ${field1}, ${field2}`);
  };

  return (
    <div className="business-screen">
      <h2 className="title">Business Screen 2</h2>
      <form className="form" onSubmit={handleSubmit}>
        {/* Label for field1 */}
        <label htmlFor="field1" className="label">Field 1:</label>
        <input
          type="text"
          id="field1"
          value={field1}
          onChange={(e) => setField1(e.target.value)}
          placeholder="Enter field 1 data"
          className="input-field"
        />
        
        {/* Label for field2 */}
        <label htmlFor="field2" className="label">Field 2:</label>
        <input
          type="text"
          id="field2"
          value={field2}
          onChange={(e) => setField2(e.target.value)}
          placeholder="Enter field 2 data"
          className="input-field"
        />
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default BusinessScreen2;
