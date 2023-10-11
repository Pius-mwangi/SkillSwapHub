import React, { useState, useEffect } from 'react';
import './SkillSeekerDashboard.css';

function SkillSeekerDashboard() {
  const [serviceRequest, setServiceRequest] = useState({
    title: '',
    description: '',
    location: '',
    status: '',
  });

  const [isMessagingOpen, setIsMessagingOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [serviceProviders, setServiceProviders] = useState([]);

  const handleMessagingButtonClick = () => {
    setIsMessagingOpen(!isMessagingOpen);
    if (!isMessagingOpen) {
      setMessage('');
    }
  };

  const handleAddFileClick = (fileInputId) => {
    const fileInput = document.getElementById(fileInputId);
    fileInput.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      alert(`Selected file: ${selectedFile.name}`);
      // You can also upload the file to your server here if needed.
    }
  };

  const handleContactUsClick = () => {
    window.location.href = 'mailto:piuslingston@gmail.com';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceRequest({ ...serviceRequest, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace the URL below with your service request API endpoint.
    fetch('https://skillswap-0fqo.onrender.com/service-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(serviceRequest),
    })
      .then((response) => {
        if (response.ok) {
          alert('Service request created successfully');
          setServiceRequest({
            title: '',
            description: '',
            location: '',
            status: '',
          });
        } else {
          alert('Service request creation failed');
        }
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  };

  useEffect(() => {
    // Replace the URL below with your service providers API endpoint.
    fetch('https://skillswap-0fqo.onrender.com/service-providers')
      .then((response) => response.json())
      .then((data) => {
        setServiceProviders(data);
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  }, []);

  return (
    <div className="skill-seeker-dashboard">
      <div className="sidebar">
        <ul>
          <li className="add-cv">
            <div className="sidebar-option" onClick={() => handleAddFileClick('cvFileInput')}>
              <span className="sidebar-icon">➕</span> ADD CV
            </div>
          </li>
          <li className="add-profile-photo">
            <div className="sidebar-option" onClick={() => handleAddFileClick('profilePhotoFileInput')}>
              <span className="sidebar-icon">📷</span> ADD PROFILE PHOTO
            </div>
          </li>
          <li className="messaging" id="messaging-btn">
            <div className="sidebar-option" onClick={handleMessagingButtonClick}>
              <span className="sidebar-icon">💬</span> MESSAGING
            </div>
          </li>
          <li className="contact-us">
            <div className="sidebar-option" onClick={handleContactUsClick}>
              <span className="sidebar-icon">📞</span> CONTACT US
            </div>
          </li>
        </ul>
      </div>
      <div className="content">
        <div className="content-container">
          {isMessagingOpen ? (
            <div className="messaging-container">
              {/* Add your messaging interface here */}
            </div>
          ) : (
            <div className="form-container">
              <form onSubmit={handleSubmit} className="service-request-form">
                <div className="form-group">
                  <input
                    type="text"
                    name="title"
                    value={serviceRequest.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <textarea
                    name="description"
                    value={serviceRequest.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="location"
                    value={serviceRequest.location}
                    onChange={handleChange}
                    placeholder="Location"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="status"
                    value={serviceRequest.status}
                    onChange={handleChange}
                    placeholder="Status"
                    className="form-input"
                  />
                </div>
                <button type="submit" className="form-button">
                  Create Service Request
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      <input
        type="file"
        id="profilePhotoFileInput"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <input
        type="file"
        id="cvFileInput"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <div className="service-providers">
        <h2>Service Providers</h2>
        <ul className="service-providers-list">
          {serviceProviders.map((provider) => (
            <li key={provider.id} className="service-provider-item">
              <p className="provider-label">Full Name:</p>
              <p className="provider-value">{provider.fullname}</p>
              <p className="provider-label">Skills:</p>
              <p className="provider-value">{provider.skills}</p>
              <p className="provider-label">Experience:</p>
              <p className="provider-value">{provider.experience} years</p>
              <p className="provider-label">Availability:</p>
              <p className="provider-value">{provider.availability}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SkillSeekerDashboard;
