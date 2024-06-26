import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useLocation as useReactRouterLocation } from 'react-router-dom';

export default function Addlaptop() {
  let navigate = useNavigate();
  const reactRouterLocation = useReactRouterLocation();
  const { result1 } = reactRouterLocation.state || {};
  const parentStyle = {
    display: 'flex',
    justifyContent: 'center',
  };

  const [laptop, setLaptop] = useState({
    asset_tag_number: result1 || "",
    serial_number: "",
    ip_address: "",
    mac_address: "",
    oem: "",
    model: "",
    amc: "",
    status: ""
  });

  const [ciFile, setCiFile] = useState(null);

  const { asset_tag_number, serial_number, ip_address, mac_address, oem, model, amc, status } = laptop;

  const onInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "ci") {
      setCiFile(files[0]);
    } else {
      setLaptop({ ...laptop, [name]: value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting:', laptop); // Log state before submitting

    const formData = new FormData();
    formData.append('asset_tag_number', asset_tag_number);
    formData.append('serial_number', serial_number);
    formData.append('ip_address', ip_address);
    formData.append('mac_address', mac_address);
    formData.append('oem', oem);
    formData.append('model', model);
    formData.append('amc', amc);
    formData.append('status', status);
    if (ciFile) {
      formData.append('ci', ciFile);
    }

    try {
      const response = await axios.post("http://localhost:8080/api/v12/laptops", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Response:', response.data);
      navigate("/success");
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
          <img src="/favicon.png" alt="laptop Logo" className="logo" style={{ maxHeight: '40px', marginBottom: '5px' }} />
          <h2 className="text-center m-3">Add Asset</h2>
          <form onSubmit={onSubmit} encType="multipart/form-data">
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
              <label htmlFor="serial_number" className="form-label">Serial Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Serial Number"
                name="serial_number"
                id="serial_number"
                value={serial_number}
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
              <label htmlFor="oem" className="form-label">OEM</label>
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
              <label htmlFor="model" className="form-label">Model</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Model"
                name="model"
                id="model"
                value={model}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="ci" className="form-label" style={{color:"red"}}>Purchase Order *</label>
              <input
                type="file"
                className="form-control"
                name="ci"
                id="ci"
                accept="application/pdf"
                onChange={onInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="amc" className="form-label">AMC End Date</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Date"
                name="amc"
                id="amc"
                value={amc}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="status" className="form-label">Status</label>
              <select
                className="form-control"
                name="status"
                id="status"
                value={status}
                onChange={onInputChange}
              >
                <option value="">Select Status</option>
                <option value="Live">Live</option>
                <option value="Spare">Spare</option>
                <option value="Consumable">Consumable</option>
              </select>
            </div>
            <div style={parentStyle}>
              <button type="submit" className="btn btn-outline-primary">Submit</button>
              <button type="button" className="btn btn-outline-danger mx-2" onClick={() => navigate("/laptoptag")}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
