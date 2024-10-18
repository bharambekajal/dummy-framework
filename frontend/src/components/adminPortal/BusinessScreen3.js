// BusinessScreen1.js
import React, { useState } from 'react';
import "../../assets/style/BusinessScreen1.css"

function BusinessScreen3() {
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const [field3, setField3] = useState('');
  const [field4, setField4] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitted: ${field1}, ${field2}, ${field3},${field4}`);
  };

  return (
    <div className="business-screen">
      <h2 className="title">Business Screen 1</h2>
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
        
        {/* Label for field3 */}
        <label htmlFor="field3" className="label">Field 3:</label>
        <input
          type="text"
          id="field3"
          value={field3}
          onChange={(e) => setField3(e.target.value)}
          placeholder="Enter field 3 data"
          className="input-field"
        />
        <label htmlFor="field4" className="label">Field 3:</label>
        <input
          type="text"
          id="field4"
          value={field4}
          onChange={(e) => (setField4.target.value)}
          placeholder="Enter field 4data"
          className="input-field"
        />
        
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default BusinessScreen3;
