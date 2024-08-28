import React, { useState } from 'react';
import '../../../components/ComponentsCss/utils/AssetsForm/AssetsForm.css';
const AssetsForm = () => {
  const [formData, setFormData] = useState({
    category: '',
    assetName: '',
    isActive: false,
    comments: '',
  });

  const dropdownOptions = [
    'Category 1',
    'Category2',
    'Category 3',
    'Category 4',
    'Others',

  ];

 const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
     ...prevData,
     [name]: type === 'checkbox' ? checked : value,
   }));
 }; 

 const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
 };

  return (
    <form className="assets-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>APPLY FOR REPAIRING OF ASSETS</h2> 
      </div>

      <div className="form-body">
        <div className="form-left">
          <div className="form-group" id=" first-div" >
            <label htmlFor="category" className='category'>Category:</label>
            <select
              id="category"
              name="category" 
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>Select a category</option>
              {dropdownOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group " id="second-div">
            <label htmlFor="assetName">Asset Name:</label>
            <input
              type="text"
              id="assetName"
              name="assetName"
              value={formData.assetName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group" id="third-div">
            <label htmlFor="comments">Issue:</label>
            <textarea
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleInputChange}
              rows="4"
            ></textarea>
          </div>
        </div>
      </div>

      <div className="form-footer">
        <button type="cancel" className="cancel-btn">Cancel</button>
        <button type="submit" className="submit-btn">Submit</button>
      </div>
    </form>
  );
};

export default AssetsForm;