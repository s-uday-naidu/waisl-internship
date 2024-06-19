import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { saveAs } from 'file-saver';
import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

export default function ViewDy() {
    const [dyList, setDyList] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchDyList = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v10/dy');
                setDyList(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching DY list:', error);
                setLoading(false);
            }
        };

        fetchDyList();
    }, []);


    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(dyList);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'DY Assets');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'DY_Assets.xlsx');
    };

    if (loading) {
        return <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="text-right" style={{textAlign: 'right', fontSize: '0.9rem', fontWeight: 'bold', color: '#5a5a5a' }}>
                    Total DY Assets: {dyList.length}
                </div>
                <img src="/DYLOGO.png" alt="DY Logo" className="logo" style={{ maxHeight: '30px' }} />
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
                                    <th scope="col">Host Name</th>
                                    <th scope="col">IP Address</th>
                                    <th scope="col">MAC Address</th>
                                    <th scope="col">Location</th>
                                    <th scope="col">BioPC-S</th>
                                    <th scope="col">Mface-S</th>
                                    <th scope="col">MFACE Tag Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dyList.map((dy, index) => (
                                    <tr key={dy.id || index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{dy.asset_tag_number}</td>
                                        <td>{dy.host_name}</td>
                                        <td>{dy.ip_address}</td>
                                        <td>{dy.mac_address}</td>
                                        <td>{dy.location}</td>
                                        <td>{dy.bio_pc_serial}</td>
                                        <td>{dy.mface_serial}</td>
                                        <td>{dy.m_asset_tag_number}</td>
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
