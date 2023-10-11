import React, { useState, useEffect } from 'react';
import './SkillProvider.css';

function SkillProvider() {
  const [formData, setFormData] = useState({
    fullname: '',
    skills: '',
    experience: '',
    availability: '',
  });

  const [serviceRequests, setServiceRequests] = useState([]);

  useEffect(() => {
    // Fetch service requests from the backend
    fetch('https://skillswap-0fqo.onrender.com/service_requests')
      .then((response) => response.json())
      .then((data) => {
        setServiceRequests(data);
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceProviderData = {
      fullname: formData.fullname,
      skills: formData.skills,
      experience: formData.experience,
      availability: formData.availability,
    };

    // Send the service provider data to the backend (POST request to /service-provider)
    fetch('https://skillswap-0fqo.onrender.com/service-provider', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(serviceProviderData),
    })
      .then((response) => {
        if (response.ok) {
          alert('Service provider created successfully');
          setFormData({
            fullname: '',
            skills: '',
            experience: '',
            availability: '',
          });
        } else {
          alert('Service provider creation failed');
        }
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  };

  const handleDeleteRequest = (id) => {
    // Send a DELETE request to the backend to delete a service request
    fetch(`https://skillswap-0fqo.onrender.com/service-requests/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          alert('Service request deleted successfully');
          // Update the service requests list after deletion
          setServiceRequests(serviceRequests.filter((request) => request.id !== id));
        } else {
          alert('Service request deletion failed');
        }
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  };

  return (
    <div className="skill-provider-container">
      <h2 className="skill-provider-heading">Skill Provider Dashboard</h2>
      <div className="form-container">
        <div className="form-section">
          <div className="form-header">
            <h3>Create a New Service Provider</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullname">Full Name</label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={formData.fullname}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="skills">Skills</label>
              <input
                type="text"
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="experience">Experience</label>
              <input
                type="text"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="availability">Availability</label>
              <input
                type="text"
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={handleFormChange}
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Create Service Provider
            </button>
          </form>
        </div>
      </div>

      <div className="service-requests-container">
        <h3 className="service-requests-heading">Service Requests</h3>
        <div className="card-container">
          {serviceRequests.map((request) => (
            <div className="card" key={request.id}>
              <h4 className="card-title">{request.title}</h4>
              <p className="card-description">Description: {request.description}</p>
              <p className="card-location">Location: {request.location}</p>
              <p className="card-status">Status: {request.status}</p>
              <p className="card-user-id">User ID: {request.user_id}</p>
              <button
                type="button"
                className="delete-button"
                onClick={() => handleDeleteRequest(request.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SkillProvider;
