import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditCctv() {
  const navigate = useNavigate();
  const { asset_tag_number } = useParams();

  const [cctv, setCctv] = useState({
    asset_tag_number: "",
    ip_address: "",
    oem:"",
    host_name: "",
    mac_address: "",
    serial_number: "",
    location: ""
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCctv = async () => {
      try {
        const result = await axios.get(`http://localhost:8080/api/v1/cctvs/asset/${asset_tag_number}`);
        setCctv(result.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        if (error.response) {
          console.error('Error response:', error.response.data);
        }
        setLoading(false);
      }
    };

    loadCctv();
  }, [asset_tag_number]);

  const onInputChange = (e) => {
    setCctv({ ...cctv, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/api/v1/cctvs/updateByassetTag/${asset_tag_number}`, cctv, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Response:', response.data);
      navigate("/cctvupdated");
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
        <img src="/favicon.png" alt="CCTV Logo" className="logo" style={{ maxHeight: '40px', marginBottom: '5px' }} />
          <h2 className="text-center m-3">Edit Asset</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="asset_tag_number" className="form-label">Asset Tag Number</label>
              <input
                type="text"
                className="form-control"
                name="asset_tag_number"
                id="asset_tag_number"
                value={cctv.asset_tag_number}
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
              <label htmlFor="ip_address" className="form-label">IP Address</label>
              <input
                type="text"
                className="form-control"
                name="ip_address"
                id="ip_address"
                value={cctv.ip_address}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="oem" className="form-label">OEM</label>
              <input
                type="text"
                className="form-control"
                name="oem"
                id="oem"
                value={cctv.oem}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="host_name" className="form-label">Host Name</label>
              <input
                type="text"
                className="form-control"
                name="host_name"
                id="host_name"
                value={cctv.host_name}
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
                value={cctv.mac_address}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="serial_number" className="form-label">Serial Number</label>
              <input
                type="text"
                className="form-control"
                name="serial_number"
                id="serial_number"
                value={cctv.serial_number}
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
                value={cctv.location}
                onChange={onInputChange}
              />
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-outline-primary">Submit</button>
              <button type="button" className="btn btn-outline-danger mx-2" onClick={() => navigate("/CCTV")}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
