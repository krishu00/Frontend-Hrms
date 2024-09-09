import React, { useState, useEffect } from 'react';
import '../../ComponentsCss/utils/RequestForm/RequestForm.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const RequestForm = (props) => {
  const [formData, setFormData] = useState({
    dateRange: [null, null],
    selectedDetail: '',
    title: '',
    reason: ''
  });
  const [requests, setRequests] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const formFields = [
    { name: 'dateRange', label: 'Choose date', type: 'date' },
    { name: 'selectedDetail', label: 'Details', type: 'select', options: ['A', 'B', 'C'] },
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'reason', label: 'Reason', type: 'textarea' }
  ];

  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem('requests')) || [];
    setRequests(storedRequests);
  }, []);

  useEffect(() => {
    localStorage.setItem('requests', JSON.stringify(requests));
  }, [requests]);

  const handleInputChange = (name, value) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newRequest = {
      id: Date.now(),
      ...formData
    };

    setRequests([...requests, newRequest]);

    setFormData({
      dateRange: [null, null],
      selectedDetail: '',
      title: '',
      reason: ''
    });

    alert('Request submitted successfully!');
  };

  const renderField = (field) => {
    switch (field.type) {
      case 'date':
        return (
          <DatePicker
            selectsRange={true}
            startDate={formData.dateRange[0]}
            endDate={formData.dateRange[1]}
            onChange={(update) => handleInputChange('dateRange', update)}
            isClearable={true}
            placeholderText="Select start and end date"
          />
        );
      case 'select':
        return (
          <div className="select-wrapper">
            <select 
              value={formData[field.name]} 
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <option value="">Select a detail</option>
              {field.options.map(option => (
                <option key={option} value={option}>Detail {option}</option>
              ))}
            </select>
            <span className={`dropdown-icon ${isDropdownOpen ? 'open' : ''}`}></span>
          </div>
        );
      case 'text':
        return (
          <input
            type="text"
            value={formData[field.name]}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={`Enter ${field.label.toLowerCase()} here`}
          />
        );
      case 'textarea':
        return (
          <textarea
            value={formData[field.name]}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={`Enter your ${field.label.toLowerCase()} here`}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <form className="request-form" onSubmit={handleSubmit}>
        <h2 className="form-title">{props.title}</h2>
        
        {formFields.map(field => (
          <div key={field.name} className={`${field.name}-input`}>
            <h3>{field.label}</h3>
            {renderField(field)}
          </div>
        ))}

        <div className="form-buttons">
          {props.cancelBtn && <button type="button" className="edit-button">Cancel</button>}
          <button type="submit" className="apply-button">Apply</button>
        </div>
      </form>
    </>
  );
};

export default RequestForm;





