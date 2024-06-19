import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditFids() {
  const navigate = useNavigate();
  const { asset_tag_number } = useParams();

  const [Fids, setFids] = useState({
    asset_tag_number: "",
    location:"",
    display_oem:"",
    display_sno:"",
    thinclient_oem:"",
    thinclient_sno:"",
    ip_address: "",
    tc_asset_tag_number: ""
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFids = async () => {
      try {
        const result = await axios.get(`http://localhost:8080/api/v6/fids/asset/${asset_tag_number}`);
        setFids(result.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        if (error.response) {
          console.error('Error response:', error.response.data);
        }
        setLoading(false);
      }
    };

    loadFids();
  }, [asset_tag_number]);

  const onInputChange = (e) => {
    setFids({ ...Fids, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/api/v6/fids/updateByassetTag/${asset_tag_number}`, Fids, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Response:', response.data);
      navigate("/fidsupdated");
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
        <img src="/favicon.png" alt="Fids Logo" className="logo" style={{ maxHeight: '40px', marginBottom: '5px' }} />
          <h2 className="text-center m-3">Edit Asset</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="asset_tag_number" className="form-label">Asset Tag Number</label>
              <input
                type="text"
                className="form-control"
                name="asset_tag_number"
                id="asset_tag_number"
                value={Fids.asset_tag_number}
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
              <label htmlFor="location" className="form-label">Location</label>
              <input
                type="text"
                className="form-control"
                name="location"
                id="location"
                value={Fids.location}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="display_oem" className="form-label">SC-OEM</label>
              <input
                type="text"
                className="form-control"
                name="display_oem"
                id="display_oem"
                value={Fids.display_oem}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="display_sno" className="form-label">SC-SNO</label>
              <input
                type="text"
                className="form-control"
                name="display_sno"
                id="display_sno"
                value={Fids.display_sno}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="thinclient_oem" className="form-label">TC-OEM</label>
              <input
                type="text"
                className="form-control"
                name="thinclient_oem"
                id="thinclient_oem"
                value={Fids.thinclient_oem}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="thinclient_sno" className="form-label">TC-SNO</label>
              <input
                type="text"
                className="form-control"
                name="thinclient_sno"
                id="thinclient_sno"
                value={Fids.thinclient_sno}
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
                value={Fids.ip_address}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="tc_asset_tag_number" className="form-label">TC-AssetTagNumber</label>
              <input
                type="text"
                className="form-control"
                name="tc_asset_tag_number"
                id="tc_asset_tag_number"
                value={Fids.tc_asset_tag_number}
                onChange={onInputChange}
                style={{
                  backgroundColor: '#e9ecef',
                  cursor: 'not-allowed',
                  color: '#6c757d'
                }}
                title="This field cannot be edited"
              />
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-outline-primary">Submit</button>
              <button type="button" className="btn btn-outline-danger mx-2" onClick={() => navigate("/FIDS")}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
