import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Header = () => {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [username] = useState("Tarangini Rai");
    const menuRef = useRef(null);

    const handleHelp = () => {
        console.log('Opening help...');
    };

    const handleProfile = () => {
        console.log('Navigating to profile...');
        setShowUserMenu(false);
    };

    const handleSettings = () => {
        console.log('Navigating to settings...');
        setShowUserMenu(false);
    };

    const handleLogout = () => {
        console.log('Logging out...');
        setShowUserMenu(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowUserMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="bg-dark sticky-top">
            <div className="d-flex justify-content-between align-items-center px-2 py-2">
                <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-graph-up-arrow fs-3 text-info"></i>
                    <h1 className="fs-4 fw-bold text-white m-0">IT-Monitor</h1>
                </div>

                <div className="d-flex align-items-center gap-3">
                    <button
                        className="btn btn-outline-light btn-sm border-0 text-decoration-none"
                        onClick={handleHelp}
                        title="Help"
                    >
                        <i className="bi bi-question-circle fs-5"></i>
                    </button>

                    <div className="dropdown" ref={menuRef}>
                        <button
                            className="btn btn-outline-light btn-sm d-flex align-items-center border-0"
                            onClick={() => setShowUserMenu(!showUserMenu)}
                            id="userDropdown"
                        >
                            <i className="bi bi-person-circle fs-5 me-1"></i>
                            <span className="d-none d-md-inline">{username}</span>
                            <i className='bi bi-chevron-down ms-1 small'></i>
                        </button>

                        {showUserMenu && (
                            <div className="dropdown-menu dropdown-menu-end show border rounded position-absolute end-0 bg-dark" style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)' }}>
                                <button
                                    className="dropdown-item text-white d-flex align-items-center gap-2"
                                    onClick={handleProfile}
                                    style={{ backgroundColor: '#1a1a2e', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}
                                >
                                    <i className="bi bi-person"></i>
                                    Profile
                                </button>
                                <button
                                    className="dropdown-item text-white d-flex align-items-center gap-2"
                                    onClick={handleSettings}
                                    style={{ backgroundColor: '#1a1a2e', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}
                                >
                                    <i className="bi bi-gear"></i>
                                    Settings
                                </button>
                                <hr className="dropdown-divider border-secondary m-2" />
                                <button
                                    className="dropdown-item text-danger d-flex align-items-center gap-2"
                                    onClick={handleLogout}
                                    style={{ backgroundColor: '#1a1a2e' }}
                                >
                                    <i className="bi bi-box-arrow-right"></i>
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

