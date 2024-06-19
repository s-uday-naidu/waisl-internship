import { faEdit, faFileArrowDown, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { saveAs } from 'file-saver';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as XLSX from 'xlsx';

export default function HomeServer() {
    const [serverList, setserverList] = useState([]);
    const [loading, setLoading] = useState(true);
    const { asset_tag_number } = useParams();

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

    const deleteUser = async (tagNumber) => {
        const confirmed = window.confirm(`Are you sure you want to delete asset with tag number ${tagNumber}?`);
        if (confirmed) {
            try {
                await axios.delete(`http://localhost:8080/api/v2/servers/deleteByAssetTag/${tagNumber}`);
                setserverList(serverList.filter(server => server.asset_tag_number !== tagNumber));
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

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
                <img src="/SERVERLOGO.png" alt="SERVER Logo" className="logo" style={{ maxHeight: '30px' }} />
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
                                    <th scope="col">OEM</th>
                                    <th scope="col">Serial_Number</th>
                                    <th scope="col">Model</th>
                                    <th scope="col">IP Address</th>
                                    <th scope="col">Host Name</th>
                                    <th scope="col">MAC Address</th>
                                    <th scope="col">Location</th>
                                    <th scope="col" style={{ whiteSpace: 'nowrap' }}>Actions</th>
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
                                        <td>
                                            <Link className="btn btn-outline-primary btn-sm mx-1" to={`/EditServer/${server.asset_tag_number}`}>
                                                <FontAwesomeIcon icon={faEdit} />
                                            </Link>
                                            <button
                                                className="btn btn-outline-danger btn-sm mx-1"
                                                onClick={() => deleteUser(server.asset_tag_number)}
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </td>
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
