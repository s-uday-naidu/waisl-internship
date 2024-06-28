import React from 'react';
import { Link } from 'react-router-dom';

const EUSUPDATED = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
        <img src="/favicon.png" alt="DY Logo" className="logo" style={{ maxHeight: '40px', marginBottom: '15px' }} />
        <p style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Asset updated successfully</p>
        <Link className="btn btn-outline-primary" to="/EUS">Return to the previous page</Link>
    </div>
    );
};

export default EUSUPDATED;