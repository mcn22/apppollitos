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
            h1="Menú general"
            backUrl="/Home"
            backName="Inicio"
            currentName="Menú general"
        />
        <div className="container mt-5 mb-5 fade-in-card">
            <div className="row">
                <div className="col-sm-12 text-center mt-4">
                    <h2 className="section-heading">Opciones del menú general</h2>
                    <h3 className="section-subheading wow fadeIn" data-wow-duration="1s" data-wow-delay=".1s">Un sitio que contiene acceso a la creación de cuentas con privilegios de administrador o empleado,
                    además de la gestión del estado de las cuentas de todo tipo de usuarios.</h3>
                </div>
            </div>
            <div className="row mb-5">
                <div className="col-sm-4  mb-5 fade-in-card">
                    <div className="single-program wow fadeIn p-4 " data-wow-duration=".5s" data-wow-delay=".1s">
                        <span className="program-icon">
                            <i className="flaticon-clipboard"></i>
                        </span>
                        <h4 className="programme-heading">Gestionar tutores</h4>
                        <p>Accede a la visualización de la lista de usuarios de todo tipo...</p>
                        <Link to="/AdministrarTutores" style={{ textDecoration: 'none' }}><Button type="button" className="w-75 btn BotonesColor"><FontAwesomeIcon icon={faArrowRight} /></Button></Link>
                    </div>
                </div>
                <div className="col-sm-4 mb-5 fade-in-card">
                    <div className="single-program wow fadeIn p-4" data-wow-duration=".5s" data-wow-delay=".1s">
                        <span className="program-icon">
                            <i className="flaticon-clipboard"></i>
                        </span>
                        <h4 className="programme-heading">Gestionar direcciones</h4>
                        <p>Accede a la visualización de la lista de usuarios de todo tipo...</p>
                        <Link to="/administrarDirecciones" style={{ textDecoration: 'none' }}><Button type="button" className="w-75 btn BotonesColor"><FontAwesomeIcon icon={faArrowRight} /></Button></Link>
                    </div>
                </div>
                <div className="col-sm-4 mb-5 fade-in-card">
                    <div className="single-program wow fadeIn p-4" data-wow-duration=".5s" data-wow-delay=".1s">
                        <span className="program-icon">
                            <i className="flaticon-clipboard"></i>
                        </span>
                        <h4 className="programme-heading">Gestionar condiciones</h4>
                        <p>Accede a la visualización de la lista de usuarios de todo tipo...</p>
                        <Link to="/administrarCondiciones" style={{ textDecoration: 'none' }}><Button type="button" className="w-75 btn BotonesColor"><FontAwesomeIcon icon={faArrowRight} /></Button></Link>
                    </div>
                </div>
                <div className="col-sm-4 mb-5 fade-in-card">
                    <div className="single-program wow fadeIn p-4" data-wow-duration=".5s" data-wow-delay=".1s">
                        <span className="program-icon">
                            <i className="flaticon-clipboard"></i>
                        </span>
                        <h4 className="programme-heading">Gestionar noticias</h4>
                        <p>Accede a la visualización de la lista de usuarios de todo tipo...</p>
                        <Link to="/administrarNoticias" style={{ textDecoration: 'none' }}><Button type="button" className="w-75 btn BotonesColor"><FontAwesomeIcon icon={faArrowRight} /></Button></Link>
                    </div>
                </div>
                <div className="col-sm-4 mb-5 fade-in-card">
                    <div className="single-program wow fadeIn p-4" data-wow-duration=".5s" data-wow-delay=".1s">
                        <span className="program-icon">
                            <i className="flaticon-clipboard"></i>
                        </span>
                        <h4 className="programme-heading">Gestionar categorías</h4>
                        <p>Accede a la visualización de la lista de usuarios de todo tipo...</p>
                        <Link to="/administrarCategorias" style={{ textDecoration: 'none' }}><Button type="button" className="w-75 btn BotonesColor"><FontAwesomeIcon icon={faArrowRight} /></Button></Link>
                    </div>
                </div>
                <div className="col-sm-4 mb-5 fade-in-card">
                    <div className="single-program wow fadeIn p-4" data-wow-duration=".5s" data-wow-delay=".1s">
                        <span className="program-icon">
                            <i className="flaticon-clipboard"></i>
                        </span>
                        <h4 className="programme-heading">Gestionar productos</h4>
                        <p>Accede a la visualización de la lista de usuarios de todo tipo...</p>
                        <Link to="/administrarProductos" style={{ textDecoration: 'none' }}><Button type="button" className="w-75 btn BotonesColor"><FontAwesomeIcon icon={faArrowRight} /></Button></Link>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>);
}
export default UserSettings
