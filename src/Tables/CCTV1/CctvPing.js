import axios from 'axios';
import React, { useState } from 'react';

export default function CctvPing() {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const pingCameras = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:8080/api/v12/cctv1/ping-cameras');
            setSummary(response.data);
        } catch (error) {
            setError('Error pinging cameras.');
        }
        setLoading(false);
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Ping CCTV Cameras</h2>
                <button
                    className="btn btn-primary"
                    onClick={pingCameras}
                    disabled={loading}
                >
                    {loading ? 'Pinging...' : 'Ping Cameras'}
                </button>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            {summary && (
                <div>
                    <h3>Ping Summary</h3>
                    <p>Total cameras: {summary.totalCameras}</p>
                    <p>Cameras which didn't respond to ping: {summary.unresponsiveCount}</p>
                    <h4>Unresponsive Cameras:</h4>
                    <ul>
                        {summary.unresponsiveIps.map((ip, index) => (
                            <li key={ip}>{ip} - {summary.unresponsiveHostnames[index]}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
