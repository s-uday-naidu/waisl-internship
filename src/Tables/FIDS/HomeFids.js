import { faEdit, faFileArrowDown, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { saveAs } from 'file-saver';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import * as XLSX from 'xlsx';
export default function HomeFids() {
    const [FidsList, setFidsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const { asset_tag_number } = useParams();
    useEffect(() => {
        const fetchFidsList = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v6/fids');
                setFidsList(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching Fids list:', error);
                setLoading(false);
            }
        };

        fetchFidsList();
    }, []);

    const deleteUser = async (tagNumber) => {
        const confirmed = window.confirm(`Are you sure you want to delete asset with tag number ${tagNumber}?`);
        if (confirmed) {
            try {
                await axios.delete(`http://localhost:8080/api/v6/fids/deleteByAssetTag/${tagNumber}`);
                setFidsList(FidsList.filter(Fids => Fids.asset_tag_number !== tagNumber));
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(FidsList);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Fids Assets');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'Fids_Assets.xlsx');
    };

    if (loading) {
        return <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="text-right" style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#5a5a5a' }}>
                    Total Fids Assets: {FidsList.length}
                </div>
                <img src="/FIDSLOGO.png" alt="Fids Logo" className="logo" style={{ maxHeight: '30px' }} />
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
                                    <th scope="col">Location</th>
                                    <th scope="col">SC-OEM</th>
                                    <th scope="col">SC-SNO</th>
                                    <th scope="col">TC-OEM</th>
                                    <th scope="col">TC-SNO</th>
                                    <th scope="col">IP Address</th>
                                    <th scope="col">TC-AssetTagNumber</th>
                                    <th scope="col" style={{ whiteSpace: 'nowrap' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {FidsList.map((Fids, index) => (
                                    <tr key={Fids.id || index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{Fids.asset_tag_number}</td>
                                        <td>{Fids.location}</td>
                                        <td>{Fids.display_oem}</td>
                                        <td>{Fids.display_sno}</td>
                                        <td>{Fids.thinclient_oem}</td>
                                        <td>{Fids.thinclient_sno}</td>
                                        <td>{Fids.ip_address}</td>
                                        <td>{Fids.tc_asset_tag_number}</td>
                                        <td>
                                            <Link className="btn btn-outline-primary btn-sm mx-1" to={`/EditFids/${Fids.asset_tag_number}`}>
                                                <FontAwesomeIcon icon={faEdit} />
                                            </Link>
                                            <button
                                                className="btn btn-outline-danger btn-sm mx-1"
                                                onClick={() => deleteUser(Fids.asset_tag_number)}
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
