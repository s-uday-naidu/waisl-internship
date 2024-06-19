import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditServer() {
  const navigate = useNavigate();
  const { asset_tag_number } = useParams();

  const [server, setserver] = useState({
    asset_tag_number: "",
    oem:"",
    serial_number:"",
    model:"",
    ip_address: "",
    hostname: "",
    mac_address: "",
    location: ""
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadserver = async () => {
      try {
        const result = await axios.get(`http://localhost:8080/api/v2/servers/asset/${asset_tag_number}`);
        setserver(result.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        if (error.response) {
          console.error('Error response:', error.response.data);
        }
        setLoading(false);
      }
    };

    loadserver();
  }, [asset_tag_number]);

  const onInputChange = (e) => {
    setserver({ ...server, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/api/v2/servers/updateByassetTag/${asset_tag_number}`, server, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Response:', response.data);
      navigate("/serversuccess");
    } catch (error) {
      console.error('There was an error!', error.message);
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
        <img src="/favicon.png" alt="DY Logo" className="logo" style={{ maxHeight: '40px', marginBottom: '5px' }} />
          <h2 className="text-center m-3">Edit Asset</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="asset_tag_number" className="form-label">Asset Tag Number</label>
              <input
                type="text"
                className="form-control"
                name="asset_tag_number"
                id="asset_tag_number"
                value={server.asset_tag_number}
                readOnly
                onChange={onInputChange}
                style={{
                  backgroundColor: '#e9ecef',
                  cursor: 'not-allowed',
                  color: '#6c757d'
                }}
                title="This field cannot be edited"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="host_name" className="form-label">OEM</label>
              <input
                type="text"
                className="form-control"
                name="oem"
                id="oem"
                value={server.oem}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="host_name" className="form-label">Serial Number</label>
              <input
                type="text"
                className="form-control"
                name="serial_number"
                id="serial_number"
                value={server.serial_number}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="host_name" className="form-label">Model</label>
              <input
                type="text"
                className="form-control"
                name="model"
                id="model"
                value={server.model}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="ip_address" className="form-label">IP Address</label>
              <input
                type="text"
                className="form-control"
                name="ip_address"
                id="ip_address"
                value={server.ip_address}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="host_name" className="form-label">Host Name</label>
              <input
                type="text"
                className="form-control"
                name="hostname"
                id="hostname"
                value={server.hostname}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="mac_address" className="form-label">MAC Address</label>
              <input
                type="text"
                className="form-control"
                name="mac_address"
                id="mac_address"
                value={server.mac_address}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="location" className="form-label">Location</label>
              <input
                type="text"
                className="form-control"
                name="location"
                id="location"
                value={server.location}
                onChange={onInputChange}
              />
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-outline-primary">Submit</button>
              <button type="button" className="btn btn-outline-danger mx-2" onClick={() => navigate("/SERVERS")}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
