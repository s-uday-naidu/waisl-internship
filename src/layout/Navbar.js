import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
export default function Navbar() {
    const navigate = useNavigate();
        const navbarStyle = {
        background: 'linear-gradient(to right, #6a89ff, #08f4d3)',
        height: '66px', // Set height to reduce the navbar size
        display: 'flex',
        alignItems: 'center',
        position:'relative'
    };
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };
    
    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleOptionClick = () => {
        setIsHovered(false); // Hide dropdown after clicking any option
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={navbarStyle}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src='/waisllogo.png' alt='logo' className='logo' 
                        style={{
                            display: 'inline-block',
                            backgroundColor: 'rgba(255, 255, 255, 0.80)',
                            position: 'absolute',
                            left: '0',
                            top: '50%',
                            right:'100%',
                            height: 'auto',
                            transform: 'translateY(-50%)',
                            maxHeight: '40px',
                            maxWidth: '160px',
                            borderRadius: '0 15px 15px 0',
                            padding: '1px',
                            zIndex: '1',
                        }}/>
                </Link>
                <div className="buttons-container">
                <div className="dropdown-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <span className="dy-button" onClick={() => navigate('/Summary')}>ASSETS</span>
                    </div>
                    {/*&nbsp;&nbsp;
                    <div className="dropdown-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <span className="dy-button">DY</span>
                        {isHovered && (
                            <div className="dropdown-options">
                                <button className="dropdown-option" onClick={() => { navigate("/DYV"); handleOptionClick(); }}>View</button>
                                <button className="dropdown-option" onClick={() => { navigate("/DYTAG"); handleOptionClick(); }}> Add</button>
                                <button className="dropdown-option" onClick={() => { navigate("/DY"); handleOptionClick(); }}> Edit</button>
                            </div>
                        )}
                    </div>
                    &nbsp;&nbsp;
                    <div className="dropdown-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <span className="dy-button">EPOS</span>
                        {isHovered && (
                            <div className="dropdown-options">
                                <button className="dropdown-option" onClick={() => { navigate("/EPOSV"); handleOptionClick(); }}>View</button>
                                <button className="dropdown-option" onClick={() => { navigate("/EPOSTAG"); handleOptionClick(); }}>Add</button>
                                <button className="dropdown-option" onClick={() => { navigate("/EPOS"); handleOptionClick(); }}>Edit</button>
                            </div>
                        )}
                    </div>
                    &nbsp;&nbsp;
                    <div className="dropdown-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <span className="dy-button">EUS</span>
                        {isHovered && (
                            <div className="dropdown-options">
                                <button className="dropdown-option" onClick={() => { navigate("/EUSView"); handleOptionClick(); }}>View</button>
                                <button className="dropdown-option" onClick={() => { navigate("/EUSTAG"); handleOptionClick(); }}>Add</button>
                                <button className="dropdown-option" onClick={() => { navigate("/EUS"); handleOptionClick(); }}>Edit</button>
                            </div>
                        )}
                    </div>
                    &nbsp;&nbsp;
                    <div className="dropdown-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <span className="dy-button">FIDS</span>
                        {isHovered && (
                            <div className="dropdown-options">
                                <button className="dropdown-option" onClick={() => { navigate("/FIDSView"); handleOptionClick(); }}>View</button>
                                <button className="dropdown-option" onClick={() => { navigate("/FIDSTAG"); handleOptionClick(); }}>Add</button>
                                <button className="dropdown-option" onClick={() => { navigate("/FIDS"); handleOptionClick(); }}>Edit</button>
                            </div>
                        )}
                    </div>
                    &nbsp;&nbsp;
                    <div className="dropdown-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <span className="dy-button">MATV</span>
                        {isHovered && (
                            <div className="dropdown-options">
                                <button className="dropdown-option" onClick={() => { navigate("/MATVV"); handleOptionClick(); }}>View</button>
                                <button className="dropdown-option" onClick={() => { navigate("/MATVTAG"); handleOptionClick(); }}>Add</button>
                                <button className="dropdown-option" onClick={() => { navigate("/MATV"); handleOptionClick(); }}>Edit</button>
                            </div>
                        )}
                    </div>
                    &nbsp;&nbsp;
                    <div className="dropdown-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <span className="dy-button">SERVERS</span>
                        {isHovered && (
                            <div className="dropdown-options">
                                <button className="dropdown-option" onClick={() => { navigate("/SERVERSV"); handleOptionClick(); }}>View</button>
                                <button className="dropdown-option" onClick={() => { navigate("/SERVERTAG"); handleOptionClick(); }}>Add</button>
                                <button className="dropdown-option" onClick={() => { navigate("/SERVERS"); handleOptionClick(); }}>Edit</button>
                            </div>
                        )}
                    </div>
                    &nbsp;&nbsp;
                    <div className="dropdown-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <span className="dy-button">CCTV</span>
                        {isHovered && (
                            <div className="dropdown-options">
                                <button className="dropdown-option" onClick={() => { navigate("/CCTVview"); handleOptionClick(); }}>View</button>
                                <button className="dropdown-option" onClick={() => { navigate("/CCTVTAG"); handleOptionClick(); }}>Add</button>
                                <button className="dropdown-option" onClick={() => { navigate("/CCTV"); handleOptionClick(); }}>Edit</button>
                            </div>
                        )}
                    </div>
                    &nbsp;&nbsp;
                    &nbsp;&nbsp;
                    &nbsp;&nbsp;
                    &nbsp;*/}
                    &nbsp;&nbsp;
                    &nbsp;&nbsp;
                    &nbsp;&nbsp;
                </div>
            </div>
        </nav>
    );
}