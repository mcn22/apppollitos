import React from 'react';
import { Link } from "react-router-dom";
export default function HeaderUser() {
    return (
        <React.Fragment>
            <div style={{ marginLeft: "20px", marginTop: "9px", fontSize: "18px" }}>
                <Link to="/Home" style={{ textDecoration: 'none', color: "white" }}>INICIO</Link>
            </div>
            <div style={{ marginLeft: "20px", marginTop: "9px", fontSize: "18px" }}>
                <Link to="/AdminMenuGeneral" style={{ textDecoration: 'none', color: "white" }}>GENERAL</Link>
            </div>
            <div style={{ marginLeft: "20px", marginTop: "9px", fontSize: "18px" }}>
                <Link to="/AdminMenuPollitos" style={{ textDecoration: 'none', color: "white" }}>POLLITOS</Link>
            </div>
            <div style={{ marginLeft: "20px", marginTop: "9px", fontSize: "18px" }}>
                <Link to="/AdminMenuUsuarios" style={{ textDecoration: 'none', color: "white" }}>USUARIOS</Link>
            </div>
            <div style={{ marginLeft: "20px", marginTop: "9px", fontSize: "18px" }}>
                <Link to="/Dashboard" style={{ textDecoration: 'none', color: "white" }}>DASHBOARD</Link>
            </div>
            
        </React.Fragment>
    )
}

