import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useLocation as useReactRouterLocation } from 'react-router-dom';

export default function AddEUS() {
  let navigate = useNavigate();
  const reactRouterLocation = useReactRouterLocation();
  const { result1} = reactRouterLocation.state || {};
  const parentStyle = {
    display: 'flex',
    justifyContent: 'center', // Centers horizontally
  };

  const [Eus, setEus] = useState({
    asset_tag_number: result1||"",
    oem: "",
    model: "",
    service_tag: "",
    warranty_expiry_date: "",
    user_email: ""
  });

  const { asset_tag_number, oem, model,service_tag,warranty_expiry_date,user_email} = Eus;

  const onInputChange = (e) => {
    setEus({ ...Eus, [e.target.name]: e.target.value });
  };

 
  const onSubmit = async (e) => {

    e.preventDefault();
    console.log('Submitting:', Eus); // Log state before submitting
    try {
      const response = await axios.post("http://localhost:8080/api/v5/eus", Eus, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Response:', response.data);
      navigate("/eussuccess");
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
        <img src="/favicon.png" alt="Eus Logo" className="logo" style={{ maxHeight: '40px', marginBottom: '5px' }} />
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
              <label htmlFor="service_tag" className="form-label">Service Tag</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Service Tag"
                name="service_tag"
                id="service_tag"
                value={service_tag}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="warranty_expiry_date" className="form-label">Warranty Expiry Date</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Date"
                name="warranty_expiry_date"
                id="warranty_expiry_date"
                value={warranty_expiry_date}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="user_email" className="form-label">User Email</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter User Email"
                name="user_email"
                id="user_email"
                value={user_email}
                onChange={onInputChange}
              />
            </div>
            <div style={parentStyle}>
              <button type="submit" className="btn btn-outline-primary">Submit</button>
                <button type="button" className="btn btn-outline-danger mx-2" onClick={() => navigate("/EUSTAG")}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
