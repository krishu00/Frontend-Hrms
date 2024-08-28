import React, { useState, useEffect } from 'react';
import Table from '../../Utils/Table/index';
import PrimaryButton from '../../Utils/PrimaryButton/index';
import Heading from '../../Utils/Heading/index';
import '../../ComponentsCss/Templates/Templates.css';

const Templates = () => {
  console.log('Templates component rendering');

  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('Templates useEffect running');
    // Simulating data fetching
    setTimeout(() => {
      setTemplates([
        { id: 1, name: 'Template A', approvals: 2, lastModified: '2024-06-20' },
        { id: 2, name: 'Template B', approvals: 3, lastModified: '2024-06-19' },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleAddTemplate = () => {
    console.log('Add template clicked');
  };

  const handleEditTemplate = (template) => {
    console.log('Edit template clicked', template);
  };

  const handleDeleteTemplate = (template) => {
    console.log('Delete template clicked', template);
  };

  const renderActions = (template) => (
    <>
      <PrimaryButton onClick={() => handleEditTemplate(template)} className="templates__action-btn--edit">
        Edit
      </PrimaryButton>
      <PrimaryButton onClick={() => handleDeleteTemplate(template)} className="templates__action-btn--delete">
        Delete
      </PrimaryButton>
    </>
  );

  if (isLoading) {
    return <div>Loading templates...</div>;
  }

  return (
    <div className="templates">
      <div className="templates__header">
        <Heading level={1} className="templates__title">Templates</Heading>
        <PrimaryButton onClick={handleAddTemplate} className="templates__create-btn">
          CREATE NEW TEMPLATE
        </PrimaryButton>
      </div>
      {templates.length > 0 ? (
        <Table
          headers={['Sr. No', 'Template Name', 'Level of Approvals', 'Last Modified On', 'Actions']}
          data={templates}
          renderActions={renderActions}
        />
      ) : (
        <p>No templates found.</p>
      )}
    </div>
  );
};

export default Templates;