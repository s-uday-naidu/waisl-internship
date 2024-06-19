import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { saveAs } from 'file-saver';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as XLSX from 'xlsx';
export default function ViewCctv() {
    const [CctvList, setCctvList] = useState([]);
    const [loading, setLoading] = useState(true);
    const { asset_tag_number } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchCctvList = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/cctvs');
                setCctvList(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching Cctv list:', error);
                setLoading(false);
            }
        };

        fetchCctvList();
    }, []);


    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(CctvList);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Cctv Assets');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'Cctv_Assets.xlsx');
    };

    if (loading) {
        return <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="text-right" style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#5a5a5a' }}>
                    Total Cctv Assets: {CctvList.length}
                </div>
                <img src="/CCTVLOGO.png" alt="Cctv Logo" className="logo" style={{ maxHeight: '30px' }} />
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
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover table-striped table-bordered">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">S_No</th>
                                    <th scope="col">Asset Tag Number</th>
                                    <th scope="col">IP Address</th>
                                    <th scope="col">OEM</th>
                                    <th scope="col">Host Name</th>
                                    <th scope="col">MAC Address</th>
                                    <th scope="col">Serial Number</th>
                                    <th scope="col">Location</th>
                                </tr>
                            </thead>
                            <tbody>
                                {CctvList.map((Cctv, index) => (
                                    <tr key={Cctv.id || index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{Cctv.asset_tag_number}</td>
                                        <td>{Cctv.ip_address}</td>
                                        <td>{Cctv.oem}</td>
                                        <td>{Cctv.host_name}</td>
                                        <td>{Cctv.mac_address}</td>
                                        <td>{Cctv.serial_number}</td>
                                        <td>{Cctv.location}</td>
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
