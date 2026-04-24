import { NavLink } from "react-router-dom";

const MonitorNavbar = () => {

    const handleHomeClick = () => {
        console.log('Home clicked');
    };

    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'rgb(245, 242, 242)'}}>
            <div className="container-fluid">

                <NavLink
                    to="/"
                    end
                    onClick={handleHomeClick}
                    className={({ isActive }) =>
                        `navbar-brand d-flex align-items-center text-decoration-none ${isActive ? 'active' : ''}`
                    }
                >
                    <i className="bi bi-house-door-fill"></i>
                </NavLink>

                <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item mx-2">
                            <NavLink
                                to="/incidents"
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? 'active' : ''}`
                                }
                            >
                                Incidents
                            </NavLink>
                        </li>

                        <li className="nav-item mx-2">
                            <NavLink
                                to="/logs"
                                className={({ isActive }) =>
                                    `nav-link ${isActive ? 'active' : ''}`
                                }
                            >
                                Logs
                            </NavLink>
                        </li>

                    </ul>
                </div>

            </div>
        </nav>
    );
};

export default MonitorNavbar;