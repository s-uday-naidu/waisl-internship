import { faEdit, faFileArrowDown, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { saveAs } from 'file-saver';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as XLSX from 'xlsx';
export default function HomeEpos() {
    const [eposList, seteposList] = useState([]);
    const [loading, setLoading] = useState(true);
    const { asset_tag_number } = useParams();
    useEffect(() => {
        const fetcheposList = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v4/epos');
                seteposList(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching epos list:', error);
                setLoading(false);
            }
        };

        fetcheposList();
    }, []);

    const deleteUser = async (tagNumber) => {
        const confirmed = window.confirm(`Are you sure you want to delete asset with tag number ${tagNumber}?`);
        if (confirmed) {
            try {
                await axios.delete(`http://localhost:8080/api/v4/epos/deleteByAssetTag/${tagNumber}`);
                seteposList(eposList.filter(epos => epos.asset_tag_number !== tagNumber));
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(eposList);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'epos Assets');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'epos_Assets.xlsx');
    };

    if (loading) {
        return <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="text-right" style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#5a5a5a' }}>
                    Total epos Assets: {eposList.length}
                </div>
                <img src="/EPOSLOGO.png" alt="epos Logo" className="logo" style={{ maxHeight: '30px' }} />
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
                                    <th scope="col">Concessioner</th>
                                    <th scope="col">IP Address</th>
                                    <th scope="col">MAC Address</th>
                                    <th scope="col">Serial Number</th>
                                    <th scope="col">Location</th>
                                    <th scope="col" style={{ whiteSpace: 'nowrap' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {eposList.map((epos, index) => (
                                    <tr key={epos.id || index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{epos.asset_tag_number}</td>
                                        <td>{epos.oem}</td>
                                        <td>{epos.concessioner}</td>
                                        <td>{epos.ip_address}</td>
                                        <td>{epos.mac_address}</td>
                                        <td>{epos.serial_number}</td>
                                        <td>{epos.location}</td>
                                        <td>
                                            <Link className="btn btn-outline-primary btn-sm mx-1" to={`/EditEpos/${epos.asset_tag_number}`}>
                                                <FontAwesomeIcon icon={faEdit} />
                                            </Link>
                                            <button
                                                className="btn btn-outline-danger btn-sm mx-1"
                                                onClick={() => deleteUser(epos.asset_tag_number)}
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
