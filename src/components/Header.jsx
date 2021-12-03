import {React} from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Button } from "react-bootstrap";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
// import HeaderCliente from "./HeaderCliente";
import HeaderAdmin from "./HeaderAdmin";
import HeaderUsuario from "./HeaderUsuario";
library.add(faCoffee, faSignOutAlt);
export default function Header() {
    const history = useHistory();
    const cookies = new Cookies();
    const logOut = () => {
        localStorage.clear();
        cookies.remove('id');
        cookies.remove('username');
        cookies.remove('nombre');
        cookies.remove('apellido');
        cookies.remove('telefono');
        history.push("/");
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top d-none d-sm-none d-md-block d-lg-block d-xl-block"
            id="mainNav">
            <div className="container">
                {localStorage.getItem('Cuenta') === 'Administrador' ? <HeaderAdmin /> : ''}
                {localStorage.getItem('Cuenta') === 'Usuario' ? <HeaderUsuario /> : ''}
                <div className=" navbar-collapse mt-1">
                    <ul className="navbar-nav ml-auto">
                        <ul className=" ml-auto">
                            <p style={{ color: "white", marginTop: "10px", fontSize: "18px", marginRight: "15px" }}>{localStorage.getItem('Email') ? "¡Hola " + localStorage.getItem('Email') + "!" : "Sin sesión activa..."}</p>
                        </ul>
                        <li>
                            <Button type="button" style={{ backgroundColor: "transparent", borderColor: "transparent", fontSize: "17px" }} onClick={logOut}><FontAwesomeIcon icon={faSignOutAlt} /> SALIR</Button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

