import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { saveAs } from 'file-saver';
import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
export default function Viewserver() {
    const [serverList, setserverList] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchserverList = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v2/servers');
                setserverList(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching server list:', error);
                setLoading(false);
            }
        };

        fetchserverList();
    }, []);


    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(serverList);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'server Assets');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'server_Assets.xlsx');
    };

    if (loading) {
        return <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="text-right" style={{textAlign: 'right', fontSize: '0.9rem', fontWeight: 'bold', color: '#5a5a5a' }}>
                    Total Sever Assets: {serverList.length}
                </div>
                <img src="/SERVERLOGO.png" alt="server Logo" className="logo" style={{ maxHeight: '30px' }} />
                <button className="btn btn-outline-primary btn-sm mx-1" onClick={downloadExcel}style={{ backgroundColor: '#007bff', color: 'white', borderColor: '#007bff' }}>
                    <FontAwesomeIcon icon={faFileArrowDown} /> Download
                </button>
            </div>
            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover table-striped table-bordered">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">S_No</th>
                                    <th scope="col">Asset Tag Number</th>
                                    <th scope="col">OEM</th>
                                    <th scope="col">Serial_Number</th>
                                    <th scope="col">Model</th>
                                    <th scope="col">IP Address</th>
                                    <th scope="col">Host Name</th>
                                    <th scope="col">MAC Address</th>
                                    <th scope="col">Location</th>
                                </tr>
                            </thead>
                            <tbody>
                                {serverList.map((server, index) => (
                                    <tr key={server.id || index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{server.asset_tag_number}</td>
                                        <td>{server.oem}</td>
                                        <td>{server.serial_number}</td>
                                        <td>{server.model}</td>
                                        <td>{server.ip_address}</td>
                                        <td>{server.hostname}</td>
                                        <td>{server.mac_address}</td>
                                        <td>{server.location}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    );
}
