import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CCTVTAG() {
  const [isForm1Visible, setIsForm1Visible] = useState(true);
  const [result1, setResult1] = useState('');
  const [loading, setLoading] = useState(true);
  const [previousTag, setPreviousTag] = useState('');
  const [oem, setOem] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const OemCodes = {
    HikVision: 'HV',
    Tyco: 'TY',
    Pelco: 'PL',
    FlexiDome: 'FL',
    Dinion: 'DI',
    Bosch: 'BH',
    Axis: 'AX',
    AutoDome: 'AD',
    Uniview: 'UN',
    Ip: 'IP',
    HiFocus: 'HF',
    Samsung: 'SS',
    CpPlus: 'CP',
    Sony: 'SO'
  };

  const LocationCodes = {
    LEVEL_B: 'LVB',
    LEVEL_C: 'LVC',
    LEVEL_D: 'LVD',
    LEVEL_E: 'LVE',
    LEVEL_F: 'LVF',
    AIR_SIDE: 'AIS',
    LAND_SIDE: 'LDS',
    PTB: 'PTB'
  };

  useEffect(() => {
    const fetchPreviousTag = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/cctvs');
        const lastTag = response.data.pop().asset_tag_number;
        const numericPart = lastTag.match(/\d+/g).join('');
        setPreviousTag(numericPart);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching CCTV list:', error);
        setLoading(false);
      }
    };
    fetchPreviousTag();
  }, []);

  const handleConcatenate = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (loading) {
      return;
    }
    const form = e.target;
    if (form.checkValidity()) { // Check form validity
      const newTagNumber = (parseInt(previousTag, 10) + 1).toString().padStart(previousTag.length, '0');
      const concatenatedResult1 = `HC${newTagNumber}CCT${OemCodes[oem]}CC${LocationCodes[location]}`;
      setResult1(concatenatedResult1);
      navigate('/addCctvasset', { state: { result1: concatenatedResult1 } });
      setIsForm1Visible(false); // Switch to Form 2 after concatenation
    } else {
      // Form is invalid
      alert('Please fill in the required fields');
    }
  };

  return (
    <div className="container">
      <style>
        {`
          .custom-dropdown {
            position: relative;
          }

          .custom-dropdown select {
            appearance: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            background: none;
            padding-right: 30px;
            font-size: 16px;
          }

          .custom-dropdown:after {
            content: "\\25BC"; /* Unicode for down arrow */
            position: absolute;
            right: 10px;
            top: calc(50% + 19px); /* Adjust the arrow 3 points down */
            transform: translateY(-50%);
            font-size: 11px; /* Smaller arrow size */
            color: rgba(51, 51, 51, 0.3); /* 20% transparent */
            pointer-events: none;
          }
        `}
      </style>
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <img src="/favicon.png" alt="CCTV Logo" className="logo" style={{ maxHeight: '40px', marginBottom: '5px' }} />
          <h2 className="text-center m-3">Asset Tag Generator</h2>
          {isForm1Visible ? (
            <form onSubmit={handleConcatenate}>
              <div className="mb-3 custom-dropdown">
                <label htmlFor="oem" className="form-label">OEM:</label>
                <select
                  id="oem"
                  className="form-control"
                  value={oem}
                  onChange={(e) => setOem(e.target.value)}
                  required
                >
                  <option value="">Select OEM</option>
                  {Object.keys(OemCodes).map((code) => (
                    <option key={code} value={code}>{code}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3 custom-dropdown">
                <label htmlFor="location" className="form-label">Location:</label>
                <select
                  id="location"
                  className="form-control"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                >
                  <option value="">Select Location</option>
                  {Object.keys(LocationCodes).map((code) => (
                    <option key={code} value={code}>{code}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button type="submit" className="btn btn-outline-primary">
                  Concatenate
                </button>
                <button type="button" className="btn btn-outline-danger mx-2" onClick={() => navigate("/Summary")}>
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div>
              <p><strong>Result 1:</strong> {result1}</p>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button type="button" className="btn btn-outline-primary" onClick={() => navigate('/addCctvasset')}>
                  Go to Add CCTV Asset
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
