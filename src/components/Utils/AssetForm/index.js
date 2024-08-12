import React, { useState, useRef, useEffect } from 'react';
import '../../ComponentsCss/utils/AssetForms/AssetForms.css'; 

const AssetForms = () => {
  const [assetType, setAssetType] = useState('');
  const [assetName, setAssetName] = useState('');
  const [date, setDate] = useState('');
  const [issue, setIssue] = useState('');
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const selectRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ assetType, assetName, date, issue });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsSelectOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const assetOptions = [
    { value: 'electronics', label: 'Electronics' },
    { value: 'office', label: 'Office equipments' },
    { value: 'furniture', label: 'Furniture' },
    { value: 'vehicles', label: 'Vehicles' },
    { value: 'others', label: 'Other' },
  ];

  return (
    <div className="asset-forms">
      <div className="form-header">
        <h2>Apply for Repairing of Assets</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-body">
          <div className="form-group">
            <div className="custom-select" ref={selectRef}>
              <div 
                className={`select-selected ${isSelectOpen ? 'open' : ''}`}
                onClick={() => setIsSelectOpen(!isSelectOpen)}
              >
                <span>{assetType ? assetOptions.find(option => option.value === assetType)?.label : 'Select Asset Type*'}</span>
              </div>
              {isSelectOpen && (
                <div className="select-items">
                  {assetOptions.map((option) => (
                    <div 
                      key={option.value}
                      onClick={() => {
                        setAssetType(option.value);
                        setIsSelectOpen(false);
                      }}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <input
              type="text"
              value={assetName}
              onChange={(e) => setAssetName(e.target.value)}
              placeholder="Asset Name*"
              required
            />
          </div>

          <div className="form-group date-group">
            <label className="date-label">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <textarea
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              placeholder="Describe the issue*"
              required
            ></textarea>
          </div>
        </div>

        <div className="form-footer">
          <button
            type="button"
            className="cancel-button"
            onClick={() => {
              setAssetType('');
              setAssetName('');
              setDate('');
              setIssue('');
            }}
          >
            Cancel
          </button>
          <button type="submit" className="submit-button">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AssetForms;
