import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MATVTAG() {
  const [isForm1Visible, setIsForm1Visible] = useState(true);
  const [result1, setResult1] = useState('');
  const [result2, setResult2] = useState('');
  const [loading, setLoading] = useState(true);
  const [previousTag, setPreviousTag] = useState('');
  const [oem, setOem] = useState('');
  const[mp,setMp]=useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const OemCodes = {
    LG:'LG',
    SHARP:'SH',
    Samsung:'SS'
  };

  const LocationCodes = {
    LEVEL_B: 'LVB',
    LEVEL_C: 'LVC',
    LEVEL_D: 'LVD',
    LEVEL_E: 'LVE',
    LEVEL_F: 'LVF',
    PTB:"PTB",
    LAND_SIDE:"LDS"
  };

  const mpCodes={
    Scala:'SC',
    HP:'HP',
    DELL:'DL',
    LENOVO:'LE',
    SmartStation:'SM'
  };

  useEffect(() => {
    const fetchPreviousTag = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v7/matv');
        const lastTag = response.data.pop().asset_tag_number;
        const numericPart = lastTag.match(/\d+/g).join('');
        setPreviousTag(numericPart);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching MATV list:', error);
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
    const newTagNumber = (parseInt(previousTag, 10) + 1).toString().padStart(previousTag.length, '0');
    const concatenatedResult1 = `HC${newTagNumber}MAT${OemCodes[oem]}SC${LocationCodes[location]}`;
    const concatenatedResult2 = `HC${newTagNumber}MAT${mpCodes[mp]}MP${LocationCodes[location]}`;
    setResult1(concatenatedResult1);
    setResult2(concatenatedResult2);
    navigate('/addMatvasset', { state: { result1: concatenatedResult1, result2: concatenatedResult2 } });
    setIsForm1Visible(false); // Switch to Form 2 after concatenation
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
          <img src="/favicon.png" alt="MATV Logo" className="logo" style={{ maxHeight: '40px', marginBottom: '5px' }} />
          <h2 className="text-center m-3">Asset Tag Generator</h2>
          {isForm1Visible ? (
            <form onSubmit={handleConcatenate}>
              <div className="mb-3 custom-dropdown">
                <label htmlFor="oem" className="form-label">SC-OEM:</label>
                <select
                  id="oem"
                  className="form-control"
                  value={oem}
                  onChange={(e) => setOem(e.target.value)}
                  required
                >
                  <option value="">Select Screen's OEM</option>
                  {Object.keys(OemCodes).map((code) => (
                    <option key={code} value={code}>{code}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3 custom-dropdown">
                <label htmlFor="mp" className="form-label">MP-OEM:</label>
                <select
                  id="mp"
                  className="form-control"
                  value={mp}
                  onChange={(e) => setMp(e.target.value)}
                  required
                >
                  <option value="">Select Mediaplayer's OEM</option>
                  {Object.keys(mpCodes).map((code) => (
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
              <p><strong>Result 2:</strong> {result2}</p>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button type="button" className="btn btn-outline-primary" onClick={() => navigate('/addMatvasset')}>
                  Go to Add MATV Asset
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
