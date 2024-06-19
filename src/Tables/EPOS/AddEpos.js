import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useLocation as useReactRouterLocation } from 'react-router-dom';
export default function AddEpos() {
  let navigate = useNavigate();
  const reactRouterLocation = useReactRouterLocation();
  const { result1} = reactRouterLocation.state || {};

  const parentStyle = {
    display: 'flex',
    justifyContent: 'center', // Centers horizontally
  };

  const [Epos, setEpos] = useState({
    asset_tag_number: result1||"",
    oem:"",
    concessioner:"",
    ip_address: "",
    mac_address: "",
    serial_number:"",
    location: ""
  });

  const { asset_tag_number, oem, concessioner,ip_address, mac_address,serial_number, location} = Epos;

  const onInputChange = (e) => {
    setEpos({ ...Epos, [e.target.name]: e.target.value });
  };

  {/*const [EposList, setEposList] = useState([]);
const [loading, setLoading] = useState(true);*/}

  const onSubmit = async (e) => {

    e.preventDefault();
    console.log('Submitting:', Epos); // Log state before submitting
    try {
      const response = await axios.post("http://localhost:8080/api/v4/epos", Epos, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Response:', response.data);
      navigate("/epossuccess");
    } catch (error) {
      console.error('There was an error!', error.message);
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
        <img src="/favicon.png" alt="Epos Logo" className="logo" style={{ maxHeight: '40px', marginBottom: '5px' }} />
          <h2 className="text-center m-3">Add Asset</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="asset_tag_number" className="form-label">Asset Tag Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Asset Tag Number"
                name="asset_tag_number"
                id="asset_tag_number"
                value={asset_tag_number}
                readOnly
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="host_name" className="form-label">OEM</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter OEM"
                name="oem"
                id="oem"
                value={oem}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="host_name" className="form-label">Concessioner</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Concessioner Name"
                name="concessioner"
                id="concessioner"
                value={concessioner}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="ip_address" className="form-label">IP Address</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter IP Address"
                name="ip_address"
                id="ip_address"
                value={ip_address}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="mac_address" className="form-label">MAC Address</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter MAC Address"
                name="mac_address"
                id="mac_address"
                value={mac_address}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="serial_number" className="form-label">Serial Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Serial Number Address"
                name="serial_number"
                id="serial_number"
                value={serial_number}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="location" className="form-label">Location</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Location"
                name="location"
                id="location"
                value={location}
                onChange={onInputChange}
              />
            </div>
            <div style={parentStyle}>
              <button type="submit" className="btn btn-outline-primary">Submit</button>
              <button type="button" className="btn btn-outline-danger mx-2" onClick={() => navigate("/EPOSTAG")}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
