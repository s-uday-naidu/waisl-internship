import React from 'react';
import { Link } from 'react-router-dom';

const ServerSuccessMessage = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
            <img src="/favicon.png" alt="server Logo" className="logo" style={{ maxHeight: '40px', marginBottom: '15px' }} />
            <p style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Asset updated successfully</p>
            <Link className="btn btn-outline-primary" to="/SERVERS">Return to the previous page</Link>
        </div>
    );
};

export default ServerSuccessMessage;
