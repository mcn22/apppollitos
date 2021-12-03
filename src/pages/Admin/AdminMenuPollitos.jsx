import React, { useEffect } from 'react';
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeaderStatus from "../../components/HeaderStatus";
import WOW from 'wowjs';
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
const UserSettings = () => {
    useEffect(() => {
        new WOW.WOW({
            live: false
        }).init();
    }, []);
    return (<div>
        <Header />
        <HeaderStatus
            h1="Menú de pollitos"
            backUrl="/Home"
            backName="Inicio"
            currentName="Menú de pollitos"
        />
        <div className="container mt-5 mb-5 fade-in-card">
            <div className="row">
                <div className="col-sm-12 text-center mt-4">
                    <h2 className="section-heading">Opciones del menú de los pollitos</h2>
                    <h3 className="section-subheading wow fadeIn" data-wow-duration="1s" data-wow-delay=".1s">Un sitio que contiene acceso a la creación de cuentas con privilegios de administrador o empleado,
                    además de la gestión del estado de las cuentas de todo tipo de usuarios.</h3>
                </div>
            </div>
            <div className="row mb-5">
                <div className="col-sm-6  mb-5 fade-in-card">
                    <div className="single-program wow fadeIn p-4 " data-wow-duration=".5s" data-wow-delay=".1s">
                        <span className="program-icon">
                            <i className="flaticon-clipboard"></i>
                        </span>
                        <h4 className="programme-heading">Gestionar pollitos</h4>
                        <p>Accede a la visualización de la lista de usuarios de todo tipo...</p>
                        <Link to="/AdministrarPollitos" style={{ textDecoration: 'none' }}><Button type="button" className="w-75 btn BotonesColor"><FontAwesomeIcon icon={faArrowRight} /></Button></Link>
                    </div>
                </div>
                <div className="col-sm-6 mb-5 fade-in-card">
                    <div className="single-program wow fadeIn p-4" data-wow-duration=".5s" data-wow-delay=".1s">
                        <span className="program-icon">
                            <i className="flaticon-clipboard"></i>
                        </span>
                        <h4 className="programme-heading">Crear y editar diarios</h4>
                        <p>Accede a la visualización de la lista de usuarios de todo tipo...</p>
                        <Link to="/AdministrarDiariosCreaEdita" style={{ textDecoration: 'none' }}><Button type="button" className="w-75 btn BotonesColor"><FontAwesomeIcon icon={faArrowRight} /></Button></Link>
                    </div>
                </div> 
            </div>
        </div>
        <Footer />
    </div>);
}
export default UserSettings
