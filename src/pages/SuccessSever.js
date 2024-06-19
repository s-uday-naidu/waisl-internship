import React from 'react';
import { Link } from 'react-router-dom';

const SuccessServer = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <img src="/favicon.png" alt="server Logo" className="logo" style={{ maxHeight: '40px', marginBottom: '15px' }} />
            <p style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>Asset added successfully</p>
            <div><Link className="btn btn-outline-primary" to="/Summary">Return to the previous page</Link></div>
        </div>
    );
};

export default SuccessServer;
