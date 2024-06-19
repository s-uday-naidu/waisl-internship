import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useLocation as useReactRouterLocation } from 'react-router-dom';

export default function AddMatv() {
  let navigate = useNavigate();
  const reactRouterLocation = useReactRouterLocation();
  const { result1, result2 } = reactRouterLocation.state || {};
  const parentStyle = {
    display: 'flex',
    justifyContent: 'center', // Centers horizontally
  };

  const [Matv, setMatv] = useState({
    asset_tag_number: result1||"",
    location: "",
    display_oem:"",
    display_sno:"",
    mediaplayer_oem:"",
    mediaplayer_sno:"",
    ip_address: "",
    mp_asset_tag_number: result2||""
  });

  const { asset_tag_number,location,display_oem,display_sno,mediaplayer_oem,mediaplayer_sno, ip_address, mp_asset_tag_number } = Matv;

  const onInputChange = (e) => {
    setMatv({ ...Matv, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {

    e.preventDefault();
    console.log('Submitting:', Matv); // Log state before submitting
    try {
      const response = await axios.post("http://localhost:8080/api/v7/matv", Matv, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Response:', response.data);
      navigate("/matvsuccess");
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
        <img src="/favicon.png" alt="Matv Logo" className="logo" style={{ maxHeight: '40px', marginBottom: '5px' }} />
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
            <div className="mb-3">
              <label htmlFor="display_oem" className="form-label">SC-OEM</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter OEM"
                name="display_oem"
                id="display_oem"
                value={display_oem}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="display_sno" className="form-label">SC-SNO</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Serial Number"
                name="display_sno"
                id="display_sno"
                value={display_sno}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="mediaplayer_oem" className="form-label">MP-OEM</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter OEM"
                name="mediaplayer_oem"
                id="mediaplayer_oem"
                value={mediaplayer_oem}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="mediaplayer_sno" className="form-label">MP-SNO</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Serial Number"
                name="mediaplayer_sno"
                id="mediaplayer_sno"
                value={mediaplayer_sno}
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
              <label htmlFor="mp_asset_tag_number" className="form-label">MP Tag Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Mediaplayer tag number"
                name="mp_asset_tag_number"
                id="mp_asset_tag_number"
                value={mp_asset_tag_number}
                readOnly
                onChange={onInputChange}
              />
            </div>
            <div style={parentStyle}>
              <button type="submit" className="btn btn-outline-primary">Submit</button>
              <button type="button" className="btn btn-outline-danger mx-2" onClick={() => navigate("/MATVTAG")}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
