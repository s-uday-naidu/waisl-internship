import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { saveAs } from 'file-saver';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import * as XLSX from 'xlsx';
export default function Viewlaptop() {
    const [laptopList, setlaptopList] = useState([]);
    const [loading, setLoading] = useState(true);
    const { asset_tag_number } = useParams();
    useEffect(() => {
        const fetchlaptopList = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v12/laptops');
                setlaptopList(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching laptop list:', error);
                setLoading(false);
            }
        };

        fetchlaptopList();
    }, []);
    const downloadPDF = async (tagNumber) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v12/laptops/download/${tagNumber}`, {
                responseType: 'blob',
            });
            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
            saveAs(pdfBlob, `purchase_order_${tagNumber}.pdf`);
        } catch (error) {
            console.error('Error downloading PDF:', error);
        }
    };

    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(laptopList);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'laptop Assets');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'laptop_Assets.xlsx');
    };

    if (loading) {
        return <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="text-right" style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#5a5a5a' }}>
                    Total laptop Assets: {laptopList.length}
                </div>
                <img src="/eus1.png" alt="laptop Logo" className="logo" style={{ maxHeight: '30px' }} />
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
                                    <th scope="col">Serial Number</th>
                                    <th scope="col">IP Address</th>
                                    <th scope="col">MAC Address</th>
                                    <th scope="col">OEM</th>
                                    <th scope="col">Model</th>
                                    <th scope="col">Purchase Order</th>
                                    <th scope="col">AMC End Date</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {laptopList.map((laptop, index) => (
                                    <tr key={laptop.id || index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{laptop.asset_tag_number}</td>
                                        <td>{laptop.serial_number}</td>
                                        <td>{laptop.ip_address}</td>
                                        <td>{laptop.mac_address}</td>
                                        <td>{laptop.oem}</td>
                                        <td>{laptop.model}</td>
                                        <td>
                                        <button
                                                className="btn btn-outline-primary btn-sm mx-1"
                                                onClick={() => downloadPDF(laptop.asset_tag_number)}
                                            >
                                                <FontAwesomeIcon icon={faFileArrowDown} />
                                            </button>
                                        </td>
                                        <td>{laptop.amc}</td>
                                        <td>{laptop.status}</td>
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
