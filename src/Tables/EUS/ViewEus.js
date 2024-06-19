import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { saveAs } from 'file-saver';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as XLSX from 'xlsx';
export default function ViewEUS() {
    const [EusList, setEusList] = useState([]);
    const [loading, setLoading] = useState(true);
    const { asset_tag_number } = useParams();
    useEffect(() => {
        const fetchEusList = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v5/eus');
                setEusList(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching Eus list:', error);
                setLoading(false);
            }
        };

        fetchEusList();
    }, []);


    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(EusList);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Eus Assets');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'Eus_Assets.xlsx');
    };

    if (loading) {
        return <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="text-right" style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#5a5a5a' }}>
                    Total Eus Assets: {EusList.length}
                </div>
                <img src="/EUSLOGO.png" alt="Eus Logo" className="logo" style={{ maxHeight: '30px' }} />
                <div>
                    <button
                        className="btn btn-outline-primary btn-sm mx-1"
                        onClick={downloadExcel}
                        style={{ backgroundColor: '#007bff', color: 'white', borderColor: '#007bff' }}
                    >
                        <FontAwesomeIcon icon={faFileArrowDown} /> Download
                    </button>
                </div>
            </div>
            <div className="card shadow-sm">
                <div className="card-boEus">
                    <div className="table-responsive">
                        <table className="table table-hover table-striped table-bordered">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">S_No</th>
                                    <th scope="col">Asset Tag Number</th>
                                    <th scope="col">OEM</th>
                                    <th scope="col">Model</th>
                                    <th scope="col">Service Tag</th>
                                    <th scope="col">W_End Date</th>
                                    <th scope='col'>User Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {EusList.map((Eus, index) => (
                                    <tr key={Eus.id || index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{Eus.asset_tag_number}</td>
                                        <td>{Eus.oem}</td>
                                        <td>{Eus.model}</td>
                                        <td>{Eus.service_tag}</td>
                                        <td>{Eus.warranty_expiry_date}</td>
                                        <td>{Eus.user_email}</td>
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
