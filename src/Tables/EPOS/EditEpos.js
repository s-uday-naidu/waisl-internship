import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditEpos() {
  const navigate = useNavigate();
  const { asset_tag_number } = useParams();

  const [Epos, setEpos] = useState({
    asset_tag_number: "",
    oem:"",
    concessioner:"",
    ip_address: "",
    mac_address: "",
    serial_number:"",
    location: ""
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEpos = async () => {
      try {
        const result = await axios.get(`http://localhost:8080/api/v4/epos/asset/${asset_tag_number}`);
        setEpos(result.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        if (error.response) {
          console.error('Error response:', error.response.data);
        }
        setLoading(false);
      }
    };

    loadEpos();
  }, [asset_tag_number]);

  const onInputChange = (e) => {
    setEpos({ ...Epos, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/api/v4/epos/updateByassetTag/${asset_tag_number}`, Epos, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Response:', response.data);
      navigate("/eposupdated");
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
        <img src="/favicon.png" alt="Epos Logo" className="logo" style={{ maxHeight: '40px', marginBottom: '5px' }} />
          <h2 className="text-center m-3">Edit Asset</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="asset_tag_number" className="form-label">Asset Tag Number</label>
              <input
                type="text"
                className="form-control"
                name="asset_tag_number"
                id="asset_tag_number"
                value={Epos.asset_tag_number}
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
                value={Epos.oem}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="host_name" className="form-label">Concessioner</label>
              <input
                type="text"
                className="form-control"
                name="concessioner"
                id="concessioner"
                value={Epos.concessioner}
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
                value={Epos.ip_address}
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
                value={Epos.mac_address}
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
                value={Epos.serial_number}
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
                value={Epos.location}
                onChange={onInputChange}
              />
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-outline-primary">Submit</button>
              <button type="button" className="btn btn-outline-danger mx-2" onClick={() => navigate("/EPOS")}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
