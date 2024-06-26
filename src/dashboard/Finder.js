import { faEdit, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Finder.css'; // Define your custom CSS for Finder component

export default function Finder() {
    const [eposList, setEposList] = useState([]);
    const [dyList, setDyList] = useState([]);
    const [eusList, setEusList] = useState([]);
    const [fidsList, setFidsList] = useState([]);
    const [matvList, setMatvList] = useState([]);
    const [serverList, setServerList] = useState([]);
    const [cctvList, setCctvList] = useState([]);
    const [laptopList, setlaptopList] = useState([]);
    const [loading, setLoading] = useState(true);
    let navigate = useNavigate();

    useEffect(() => {
        const fetchEpos = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v4/epos');
                setEposList(response.data);
            } catch (error) {
                console.error('Error fetching EPOS data:', error);
            }
        };

        const fetchDy = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v10/dy');
                setDyList(response.data);
            } catch (error) {
                console.error('Error fetching DY data:', error);
            }
        };

        const fetchEus = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v5/eus');
                setEusList(response.data);
            } catch (error) {
                console.error('Error fetching EUS data:', error);
            }
        };

        const fetchFids = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v6/fids');
                setFidsList(response.data);
            } catch (error) {
                console.error('Error fetching FIDS data:', error);
            }
        };

        const fetchMatv = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v7/matv');
                setMatvList(response.data);
            } catch (error) {
                console.error('Error fetching MATV data:', error);
            }
        };

        const fetchServer = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v2/servers');
                setServerList(response.data);
            } catch (error) {
                console.error('Error fetching Server data:', error);
            }
        };

        const fetchCctv = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/cctvs');
                setCctvList(response.data);
            } catch (error) {
                console.error('Error fetching CCTV data:', error);
            }
        };

        const fetchLaptop = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v12/laptops');
                setlaptopList(response.data);
            } catch (error) {
                console.error('Error fetching laptop data:', error);
            }
        };

        const fetchAllData = async () => {
            setLoading(true);
            await Promise.all([fetchEpos(), fetchDy(), fetchEus(), fetchFids(), fetchMatv(), fetchServer(), fetchCctv(),fetchLaptop()]);
            setLoading(false);
        };

        fetchAllData();
    }, []);
    if (loading) {
        return <div>Loading...</div>;
    }

    const totalAssets = eposList.length + eusList.length + dyList.length + fidsList.length + matvList.length + serverList.length + cctvList.length;

    return (
        <div className="finder-container container mt-4">
            <div className="row justify-content-center">
                {/* EPOS Card */}
                <div className="col-lg-4 col-md-6 mb-4">
                    <div className="card shadow-sm position-relative">
                        <div className="card-body">
                            <h5 className="card-title">
                                <img src="/EPOSLOGO.png" alt="DY Logo" className="logo" style={{ maxHeight: '30px' }} />
                            </h5>
                            <p className="card-text">Total: {eposList.length}</p>
                            <div className="overlay">
                                <Link to="/EPOSTAG" className="overlay-link">
                                    <FontAwesomeIcon icon={faPlus} className="overlay-icon" />
                                </Link>
                                <Link to="/EPOS" className="overlay-link">
                                    <FontAwesomeIcon icon={faEdit} className="overlay-icon" />
                                </Link>
                                <Link to="/EPOSV" className="overlay-link">
                                    <FontAwesomeIcon icon={faEye} className="overlay-icon" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* DY Card */}
                <div className="col-lg-4 col-md-6 mb-4">
                    <div className="card shadow-sm position-relative">
                        <div className="card-body">
                            <h5 className="card-title">
                                <img src="/DYLOGO.png" alt="DY Logo" className="logo" style={{ maxHeight: '30px' }} />
                            </h5>
                            <p className="card-text">Total: {dyList.length}</p>
                            <div className="overlay">
                                <Link to="/DYTAG" className="overlay-link">
                                    <FontAwesomeIcon icon={faPlus} className="overlay-icon" />
                                </Link>
                                <Link to="/DY" className="overlay-link">
                                    <FontAwesomeIcon icon={faEdit} className="overlay-icon" />
                                </Link>
                                <Link to="/DYV" className="overlay-link">
                                    <FontAwesomeIcon icon={faEye} className="overlay-icon" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* EUS Card */}
                <div className="col-lg-4 col-md-6 mb-4">
                    <div className="card shadow-sm position-relative">
                        <div className="card-body">
                            <h5 className="card-title">
                                <img src="/EUSLOGO.png" alt="EUS Logo" className="logo" style={{ maxHeight: '30px' }} />
                            </h5>
                            <p className="card-text">Total: {eusList.length}</p>
                            <div className="overlay">
                                <Link to="/EUSTAG" className="overlay-link">
                                    <FontAwesomeIcon icon={faPlus} className="overlay-icon" />
                                </Link>
                                <Link to="/EUS" className="overlay-link">
                                    <FontAwesomeIcon icon={faEdit} className="overlay-icon" />
                                </Link>
                                <Link to="/EUSView" className="overlay-link">
                                    <FontAwesomeIcon icon={faEye} className="overlay-icon" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FIDS Card */}
                <div className="col-lg-4 col-md-6 mb-4">
                    <div className="card shadow-sm position-relative">
                        <div className="card-body">
                            <h5 className="card-title">
                                <img src="/FIDSLOGO.png" alt="FIDS Logo" className="logo" style={{ maxHeight: '30px' }} />
                            </h5>
                            <p className="card-text">Total: {fidsList.length}</p>
                            <div className="overlay">
                                <Link to="/FIDSTAG" className="overlay-link">
                                    <FontAwesomeIcon icon={faPlus} className="overlay-icon" />
                                </Link>
                                <Link to="/FIDS" className="overlay-link">
                                    <FontAwesomeIcon icon={faEdit} className="overlay-icon" />
                                </Link>
                                <Link to="/FIDSView" className="overlay-link">
                                    <FontAwesomeIcon icon={faEye} className="overlay-icon" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* MATV Card */}
                <div className="col-lg-4 col-md-6 mb-4">
                    <div className="card shadow-sm position-relative">
                        <div className="card-body">
                            <h5 className="card-title">
                                <img src="/MATVLOGO.png" alt="MATV Logo" className="logo" style={{ maxHeight: '30px' }} />
                            </h5>
                            <p className="card-text">Total: {matvList.length}</p>
                            <div className="overlay">
                                <Link to="/MATVTAG" className="overlay-link">
                                    <FontAwesomeIcon icon={faPlus} className="overlay-icon" />
                                </Link>
                                <Link to="/MATV" className="overlay-link">
                                    <FontAwesomeIcon icon={faEdit} className="overlay-icon" />
                                </Link>
                                <Link to="/MATVV" className="overlay-link">
                                    <FontAwesomeIcon icon={faEye} className="overlay-icon" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SERVER Card */}
                <div className="col-lg-4 col-md-6 mb-4">
                    <div className="card shadow-sm position-relative">
                        <div className="card-body">
                            <h5 className="card-title">
                                <img src="/SERVERLOGO.png" alt="Server Logo" className="logo" style={{ maxHeight: '30px' }} />
                            </h5>
                            <p className="card-text">Total: {serverList.length}</p>
                            <div className="overlay">
                                <Link to="/SERVERTAG" className="overlay-link">
                                    <FontAwesomeIcon icon={faPlus} className="overlay-icon" />
                                </Link>
                                <Link to="/SERVERS" className="overlay-link">
                                    <FontAwesomeIcon icon={faEdit} className="overlay-icon" />
                                </Link>
                                <Link to="/SERVERSV" className="overlay-link">
                                    <FontAwesomeIcon icon={faEye} className="overlay-icon" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CCTV Card*/}
                <div className="col-lg-4 col-md-6 mb-4">
                    <div className="card shadow-sm position-relative">
                        <div className="card-body">
                            <h5 className="card-title">
                                <img src="/CCTVLOGO.png" alt="Server Logo" className="logo" style={{ maxHeight: '30px' }} />
                            </h5>
                            <p className="card-text">Total: {cctvList.length}</p>
                            <div className="overlay">
                                <Link to="/CCTVTAG" className="overlay-link">
                                    <FontAwesomeIcon icon={faPlus} className="overlay-icon" />
                                </Link>
                                <Link to="/CCTV" className="overlay-link">
                                    <FontAwesomeIcon icon={faEdit} className="overlay-icon" />
                                </Link>
                                <Link to="/CCTVView" className="overlay-link">
                                    <FontAwesomeIcon icon={faEye} className="overlay-icon" />
                                </Link>
                            </div>
                            
                        </div>
                    </div>
                </div>
                {/* LAPTOP Card*/}
                <div className="col-lg-4 col-md-6 mb-4">
                    <div className="card shadow-sm position-relative">
                        <div className="card-body">
                            <h5 className="card-title">
                                <img src="/eus1.png" alt="laptop Logo" className="logo" style={{ maxHeight: '30px' }} />
                            </h5>
                            <p className="card-text">Total: {laptopList.length}</p>
                            <div className="overlay">
                                <Link to="/laptoptag" className="overlay-link">
                                    <FontAwesomeIcon icon={faPlus} className="overlay-icon" />
                                </Link>
                                <Link to="/laptop" className="overlay-link">
                                    <FontAwesomeIcon icon={faEdit} className="overlay-icon" />
                                </Link>
                                <Link to="/viewlaptop" className="overlay-link">
                                    <FontAwesomeIcon icon={faEye} className="overlay-icon" />
                                </Link>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
