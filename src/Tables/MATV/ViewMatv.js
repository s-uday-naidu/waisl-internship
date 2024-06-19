import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { saveAs } from 'file-saver';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as XLSX from 'xlsx';
export default function ViewMatv() {
    const [MatvList, setMatvList] = useState([]);
    const [loading, setLoading] = useState(true);
    const { asset_tag_number } = useParams();
    useEffect(() => {
        const fetchMatvList = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v7/matv');
                setMatvList(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching Matv list:', error);
                setLoading(false);
            }
        };

        fetchMatvList();
    }, []);

    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(MatvList);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Matv Assets');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'Matv_Assets.xlsx');
    };

    if (loading) {
        return <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="text-right" style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#5a5a5a' }}>
                    Total Matv Assets: {MatvList.length}
                </div>
                <img src="/MATVLOGO.png" alt="Matv Logo" className="logo" style={{ maxHeight: '30px' }} />
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
                                    <th scope="col">MP-OEM</th>
                                    <th scope="col">MP-SNO</th>
                                    <th scope="col">IP_Address</th>
                                    <th scope="col">MP Tag Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {MatvList.map((Matv, index) => (
                                    <tr key={Matv.id || index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{Matv.asset_tag_number}</td>
                                        <td>{Matv.location}</td>
                                        <td>{Matv.display_oem}</td>
                                        <td>{Matv.display_sno}</td>
                                        <td>{Matv.mediaplayer_oem}</td>
                                        <td>{Matv.mediaplayer_sno}</td>
                                        <td>{Matv.ip_address}</td>
                                        <td>{Matv.mp_asset_tag_number}</td>
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
