import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useLocation as useReactRouterLocation } from 'react-router-dom';

export default function AddFids() {
  let navigate = useNavigate();
  const reactRouterLocation = useReactRouterLocation();
  const {result1,result2} = reactRouterLocation.state || {};
  const parentStyle = {
    display: 'flex',
    justifyContent: 'center', // Centers horizontally
  };

  const [Fids, setFids] = useState({
    asset_tag_number: result1||"",
    location:"",
    display_oem:"",
    display_sno:"",
    thinclient_oem:"",
    thinclient_sno:"",
    ip_address: "",
    tc_asset_tag_number: result2||""
  });

  const { asset_tag_number,location,display_oem,display_sno,thinclient_oem,thinclient_sno, ip_address, tc_asset_tag_number } = Fids;

  const onInputChange = (e) => {
    setFids({ ...Fids, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {

    e.preventDefault();
    console.log('Submitting:', Fids); // Log state before submitting
    try {
      const response = await axios.post("http://localhost:8080/api/v6/fids", Fids, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Response:', response.data);
      navigate("/fidssuccess");
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
        <img src="/favicon.png" alt="Fids Logo" className="logo" style={{ maxHeight: '40px', marginBottom: '5px' }} />
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
              <label htmlFor="thinclient_oem" className="form-label">TC-OEM</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter OEM"
                name="thinclient_oem"
                id="thinclient_oem"
                value={thinclient_oem}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="thinclient_sno" className="form-label">TC-SNO</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Seria lNumber"
                name="thinclient_sno"
                id="thinclient_sno"
                value={thinclient_sno}
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
              <label htmlFor="tc_asset_tag_number" className="form-label">TC-AssetTagNumber</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Asset Tag Number"
                name="tc_asset_tag_number"
                id="tc_asset_tag_number"
                value={tc_asset_tag_number}
                readOnly
                onChange={onInputChange}
              />
            </div>
            <div style={parentStyle}>
              <button type="submit" className="btn btn-outline-primary">Submit</button>
              <button type="button" className="btn btn-outline-danger mx-2" onClick={() => navigate("/FIDSTAG")}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
