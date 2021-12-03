import React from 'react';
import { Link } from "react-router-dom";
export default function HeaderUser() {
    return (
        <React.Fragment>
            <div style={{ marginLeft: "20px", marginTop: "9px", fontSize: "18px" }}>
                <Link to="/Home" style={{ textDecoration: 'none', color: "white" }}>INICIO</Link>
            </div>
            <div style={{ marginLeft: "20px", marginTop: "9px", fontSize: "18px" }}>
                <Link to="/AdministrarDiariosVerifica" style={{ textDecoration: 'none', color: "white" }}>DIARIOS</Link>
            </div>       
        </React.Fragment>
    )
}

