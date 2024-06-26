import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Editlaptop() {
  const navigate = useNavigate();
  const { asset_tag_number } = useParams();

  const [laptop, setLaptop] = useState({
    asset_tag_number: "",
    serial_number: "",
    ip_address: "",
    mac_address: "",
    oem: "",
    model: "",
    ci: null,
    amc: "",
    status: "",
    LifeCycle: ""
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLaptop = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v12/laptops/asset/${asset_tag_number}`);
        setLaptop(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        if (error.response) {
          console.error('Error response:', error.response.data);
        }
        setLoading(false);
      }
    };

    loadLaptop();
  }, [asset_tag_number]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLaptop({ ...laptop, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setLaptop({ ...laptop, ci: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('asset_tag_number', laptop.asset_tag_number);
    formData.append('serial_number', laptop.serial_number);
    formData.append('ip_address', laptop.ip_address);
    formData.append('mac_address', laptop.mac_address);
    formData.append('oem', laptop.oem);
    formData.append('model', laptop.model);
    formData.append('amc', laptop.amc);
    formData.append('status', laptop.status);
    formData.append('LifeCycle', laptop.LifeCycle);
    if (laptop.ci instanceof File) {
      formData.append('ci', laptop.ci);
    }

    try {
      console.log('FormData:', formData); // Add this line before axios.put
      const response = await axios.put(`http://localhost:8080/api/v12/laptops/asset/${asset_tag_number}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Response:', response.data);
      navigate("/laptopupdated");
    } catch (error) {
      console.error('Error submitting form:', error.message);
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
          <img src="/favicon.png" alt="laptop Logo" className="logo" style={{ maxHeight: '40px', marginBottom: '5px' }} />
          <h2 className="text-center m-3">Edit Asset</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-3">
              <label htmlFor="asset_tag_number" className="form-label">Asset Tag Number</label>
              <input
                type="text"
                className="form-control"
                name="asset_tag_number"
                id="asset_tag_number"
                value={laptop.asset_tag_number}
                readOnly
                onChange={handleInputChange}
                style={{
                  backgroundColor: '#e9ecef',
                  cursor: 'not-allowed',
                  color: '#6c757d'
                }}
                title="This field cannot be edited"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="serial_number" className="form-label">Serial Number</label>
              <input
                type="text"
                className="form-control"
                name="serial_number"
                id="serial_number"
                value={laptop.serial_number}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="ip_address" className="form-label">IP Address</label>
              <input
                type="text"
                className="form-control"
                name="ip_address"
                id="ip_address"
                value={laptop.ip_address}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="mac_address" className="form-label">MAC Address</label>
              <input
                type="text"
                className="form-control"
                name="mac_address"
                id="mac_address"
                value={laptop.mac_address}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="oem" className="form-label">OEM</label>
              <input
                type="text"
                className="form-control"
                name="oem"
                id="oem"
                value={laptop.oem}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="model" className="form-label">Model</label>
              <input
                type="text"
                className="form-control"
                name="model"
                id="model"
                value={laptop.model}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="ci" className="form-label">Purchase Order</label>
              <input
                type="file"
                className="form-control"
                name="ci"
                id="ci"
                accept="application/pdf"
                onChange={handleFileChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="amc" className="form-label">AMC End Date</label>
              <input
                type="text"
                className="form-control"
                name="amc"
                id="amc"
                value={laptop.amc}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="status" className="form-label">Status</label>
              <select
                className="form-control"
                name="status"
                id="status"
                value={laptop.status}
                onChange={handleInputChange}
              >
                <option value="">Select Status</option>
                <option value="Live">Live</option>
                <option value="Spare">Spare</option>
                <option value="Consumable">Consumable</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="LifeCycle" className="form-label">Life Cycle</label>
              <input
                type="text"
                className="form-control"
                name="LifeCycle"
                id="LifeCycle"
                value={laptop.LifeCycle}
                onChange={handleInputChange}
              />
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-outline-primary">Submit</button>
              <button type="button" className="btn btn-outline-danger mx-2" onClick={() => navigate("/laptop")}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
