import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditEUS() {
  const navigate = useNavigate();
  const { asset_tag_number } = useParams();

  const [Eus, setEus] = useState({
    asset_tag_number: "",
    oem: "",
    model: "",
    service_tag: "",
    warranty_expiry_date: "",
    user_email: ""
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEus = async () => {
      try {
        const result = await axios.get(`http://localhost:8080/api/v5/eus/asset/${asset_tag_number}`);
        setEus(result.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        if (error.response) {
          console.error('Error response:', error.response.data);
        }
        setLoading(false);
      }
    };

    loadEus();
  }, [asset_tag_number]);

  const onInputChange = (e) => {
    setEus({ ...Eus, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/api/v5/eus/updateByassetTag/${asset_tag_number}`, Eus, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Response:', response.data);
      navigate("/eusupdated");
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
        <img src="/favicon.png" alt="Eus Logo" className="logo" style={{ maxHeight: '40px', marginBottom: '5px' }} />
          <h2 className="text-center m-3">Edit Asset</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="asset_tag_number" className="form-label">Asset Tag Number</label>
              <input
                type="text"
                className="form-control"
                name="asset_tag_number"
                id="asset_tag_number"
                value={Eus.asset_tag_number}
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
              <label htmlFor="oem" className="form-label">OEM</label>
              <input
                type="text"
                className="form-control"
                name="oem"
                id="oem"
                value={Eus.oem}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="model" className="form-label">Model</label>
              <input
                type="text"
                className="form-control"
                name="model"
                id="model"
                value={Eus.model}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="service_tag" className="form-label">Service Tag</label>
              <input
                type="text"
                className="form-control"
                name="service_tag"
                id="service_tag"
                value={Eus.service_tag}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="warranty_expiry_date" className="form-label">Warranty Expiry Date</label>
              <input
                type="text"
                className="form-control"
                name="warranty_expiry_date"
                id="warranty_expiry_date"
                value={Eus.warranty_expiry_date}
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="user_email" className="form-label">User Email</label>
              <input
                type="text"
                className="form-control"
                name="user_email"
                id="user_email"
                value={Eus.user_email}
                onChange={onInputChange}
              />
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-outline-primary">Submit</button>
              <button type="button" className="btn btn-outline-danger mx-2" onClick={() => navigate("/Eus")}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
);
}
