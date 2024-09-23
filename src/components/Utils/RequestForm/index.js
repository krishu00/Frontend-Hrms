import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../ComponentsCss/utils/RequestForm/RequestForm.css';

const RequestForm = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: null,
    company: '',
    email: '',
    designation: '',
    password: '',
    contactNumber: ''
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { formFields, isSignIn, onSubmit } = props;

  const handleInputChange = (name, value) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const renderField = (field) => {
    switch (field.type) {
      case 'date':
        return (
          <DatePicker
            selected={formData.dateOfBirth}
            onChange={(date) => handleInputChange('dateOfBirth', date)}
            dateFormat="dd/MM/yyyy"
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={100}
            placeholderText="Select date of birth"
            isClearable
            showMonthDropdown
            dropdownMode="select"
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
              <option value="">Select a company</option>
              {field.options.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <span className={`dropdown-icon ${isDropdownOpen ? 'open' : ''}`}></span>
          </div>
        );
      case 'text':
      case 'password':
      case 'email':
      case 'tel':
        return (
          <input
            type={field.type}
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
    <form className={`request-form ${isSignIn ? 'sign-in-form' : ''}`} onSubmit={(e) => {
      e.preventDefault();
      onSubmit(formData, setIsLoading, setErrorMessage);
    }}>
      {isSignIn ? (
        <h1 className="sign-in-header">{props.title}</h1>
      ) : (
        <h2 className="form-title">{props.title}</h2>
      )}
      
      {!isSignIn && (
        <div className="name-input">
          <h3>Name</h3>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter name here"
          />
        </div>
      )}

      {formFields.map(field => (
        <div key={field.name} className={`${field.name}-input`}>
          <h3>
            {field.name === 'dateRange' ? 'Date of Birth' :
             field.name === 'selectedDetail' ? 'Company' :
             field.name === 'email' ? 'Email' :
             field.name === 'reason' ? 'Designation' :
             field.label}
          </h3>
          {renderField(field)}
        </div>
      ))}

      {!isSignIn && (
        <div className="contact-number-input">
          <h3>Contact Number</h3>
          <input
            type="tel"
            value={formData.contactNumber}
            onChange={(e) => handleInputChange('contactNumber', e.target.value)}
            placeholder="Enter contact number here"
          />
        </div>
      )}

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="form-buttons">
        {!isSignIn && props.cancelBtn && (
          <button type="button" className="edit-button" onClick={props.cancelBtn}>Cancel</button>
        )}
        <button type="submit" className={`apply-button ${isSignIn ? 'login-button' : ''}`} disabled={isLoading}>
          {isLoading ? 'Loading...' : (isSignIn ? 'Login' : 'Apply')}
        </button>
      </div>
    </form>
  );
};

export default RequestForm;
