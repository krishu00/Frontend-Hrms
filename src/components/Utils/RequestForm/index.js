import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../ComponentsCss/utils/RequestForm/RequestForm.css';

const RequestForm = (props) => {
  const [formData, setFormData] = useState({
    dateRange: [null, null],
    selectedDetail: '',
    title: '',
    reason: '',
    email: '',
    password: ''
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
      case 'password':
      case 'email':
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
      <h2 className="form-title">{props.title}</h2>
      
      {formFields.map(field => (
        <div key={field.name} className={`${field.name}-input`}>
          <h3>{field.label}</h3>
          {renderField(field)}
        </div>
      ))}

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












