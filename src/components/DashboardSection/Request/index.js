import React, { useState, useRef, useEffect } from 'react';
import { FaEye, FaCheck, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import '../../ComponentsCss/Request/Request.css'

export default function Request() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (isDropdownOpen && dropdownRef.current && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      dropdownRef.current.style.width = `${buttonRect.width}px`;
    }
  }, [isDropdownOpen]);

  const requestedData = [
    { sno: 1, name: 'John Doe', appliedFor: 'Software Developer', reason: 'Career growth' },
    { sno: 2, name: 'Jane Smith', appliedFor: 'Project Manager', reason: 'New challenge' },
    { sno: 3, name: 'Mike Johnson', appliedFor: 'UI/UX Designer', reason: 'Skill development' },
  ];

  const appliedData = [
    { sno: 1, name: 'Alice Brown', appliedFor: 'Data Analyst', reason: 'Career change', appliedOn: '2023-05-15' },
    { sno: 2, name: 'Bob Wilson', appliedFor: 'DevOps Engineer', reason: 'Better opportunities', appliedOn: '2023-05-16' },
    { sno: 3, name: 'Carol Davis', appliedFor: 'Full Stack Developer', reason: 'Professional growth', appliedOn: '2023-05-17' },
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="request-container">
      <div className="apply-button-container">
        <button ref={buttonRef} className="apply-button" onClick={toggleDropdown}>
          Apply For {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {isDropdownOpen && (
          <div ref={dropdownRef} className="dropdown-menu">
            <button>Leave</button>
            <button>Work from home</button>
            <button>New asset</button>
            <button>Repair asset</button>
            <button>Request to HR</button>
          </div>
        )}
      </div>

      <h2>Requested to You</h2>
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Applied For</th>
              <th>Reason</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requestedData.map((item) => (
              <tr key={item.sno}>
                <td>{item.sno}</td>
                <td>{item.name}</td>
                <td>{item.appliedFor}</td>
                <td>{item.reason}</td>
                <td>
                  <div className="action-icons">
                    <FaEye className="action-icon" />
                    <FaCheck className="action-icon" />
                    <FaTimes className="action-icon" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Applied by You</h2>
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Applied For</th>
              <th>Reason</th>
              <th>Applied On</th>
            </tr>
          </thead>
          <tbody>
            {appliedData.map((item) => (
              <tr key={item.sno}>
                <td>{item.sno}</td>
                <td>{item.name}</td>
                <td>{item.appliedFor}</td>
                <td>{item.reason}</td>
                <td>{item.appliedOn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}



