import React, { useState, useEffect } from 'react';
import './SkillProvider.css';

function SkillProvider() {
  const [serviceRequests, setServiceRequests] = useState([]);
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({
    fullname: '',
    skills: '',
    experience: '',
    availability: '',
  });

  useEffect(() => {
    // Fetch service requests from the backend
    fetch('http://127.0.0.1:5000/service_requests')
      .then((response) => response.json())
      .then((data) => {
        setServiceRequests(data);
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

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
    fetch('http://127.0.0.1:5000/service-provider', {
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
            fullname: '', // Reset form fields
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

  const filteredServiceRequests = serviceRequests.filter((request) =>
    request.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container-fluid mt-5" style={{ backgroundColor: '#f2f2f2' }}>
      <h2 className="text-primary">Skill Provider Dashboard</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Title..."
              value={search}
              onChange={handleChange}
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header" style={{ backgroundColor: '#007bff', color: '#fff' }}>
              Service Requests
            </div>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>User ID</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredServiceRequests.map((request) => (
                    <tr key={request.id}>
                      <td>{request.title}</td>
                      <td>{request.description}</td>
                      <td>{request.location}</td>
                      <td>{request.status}</td>
                      <td>{request.user_id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header" style={{ backgroundColor: '#6c757d', color: '#fff' }}>
              Create a New Service Provider
            </div>
            <div className="card-body">
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
                    className="form-control"
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
                    className="form-control"
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
                    className="form-control"
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
                    className="form-control"
                  />
                </div>
                <button type="submit" className="btn btn-success">
                  Create Service Provider
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkillProvider;
