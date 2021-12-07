import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Typewriter from 'typewriter-effect';
import { Button } from "react-bootstrap";
import Axios from "axios";
import * as moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function NotAuthorize() {
    const [dataNoticias, setDataNoticias] = useState([]);
    useEffect(() => {
        try {
            window.FB.XFBML.parse();
        } catch (error) { }
    }, []);
    useEffect(() => {
        if (dataNoticias.length === 0) {
            Axios.get('https://pollitobackend.azurewebsites.net/api/noticias')
                .then(response => setDataNoticias(response.data));
            console.log(dataNoticias)
        };
    });
    function calculaDias(fechaPublicacion) {
        var fecha = moment(fechaPublicacion).format("YYYY-MM-DD");
        var publicacion = moment(fecha);
        var hoy = moment();
        var dias = hoy.diff(publicacion, "days");
        if (dias === 0) {
            return " hoy";
        }
        else {
            if (dias === 1) {
                return " hace " + dias + " día";
            } else {
                return " hace " + dias + " días";
            }
        }

    }
    return (
        <div>
            <Header />
            <header className="home-banner-area fade-in-card">
                <div id="planet-2" className="planet layer-2"></div>
                <div className="container ">
                    <div className="header-caption text-left">
                        <h1 style={{ marginTop: "130px", fontSize: "70px" }} className="header-caption-heading cd-headline clip is-full-width wow fadeIn rounded"
                            data-wow-duration=".4s" data-wow-delay=".2s">Comprometidos con
                            <Typewriter
                                options={{
                                    strings: [' el bienestar...', 'la felicidad...', 'la alimentacion...', ' el amor.'],
                                    autoStart: true,
                                    loop: true,
                                }}
                            />
                        </h1>
                        <p className="wow fadeInUp" data-wow-duration="1.0s" data-wow-delay=".4s">¡Gracias!</p>
                    </div>
                </div>
            </header>
            <div className="container fade-in-card" style={{ marginTop: "80px", marginBottom: "10px" }}>
                <div className="row">
                    <div className="row mb-3 mt-3">
                        <div className="col-sm-12">
                            <h2 className="para-color mb-3">Accesos directos</h2>
                        </div>
                        <hr />
                    </div>
                </div>
                {localStorage.getItem('Cuenta') === 'Administrador' ?
                    <div className="row">
                        <div className="col-sm-6 col-md-6 col-lg-4 fade-in-card">
                            <div className="single-program wow fadeIn p-4" data-wow-duration=".5s" data-wow-delay=".1s">
                                <span className="program-icon">
                                    <i className="flaticon-clipboard"></i>
                                </span>
                                <h4 className="programme-heading">Gestionar pollitos</h4>
                                <p>Accede a la visualización de los datos de nuestros pollitos.</p>
                                <Link to="/administrarPollitos" ><Button type="button" className="w-75 btn BotonesColor ml-4 "><FontAwesomeIcon icon={faArrowRight} /></Button></Link>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-4  fade-in-card">
                            <div className="single-program wow fadeIn p-4" data-wow-duration=".5s" data-wow-delay=".1s">
                                <span className="program-icon">
                                    <i className="flaticon-clipboard"></i>
                                </span>
                                <h4 className="programme-heading">Gestionar tutores</h4>
                                <p>Accede a la visualización de los tutores de nuestros pollitos.</p>
                                <Link to="/AdministrarTutores" ><Button type="button" className="w-75 btn BotonesColor ml-4 "><FontAwesomeIcon icon={faArrowRight} /></Button></Link>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-4  fade-in-card">
                            <div className="single-program wow fadeIn p-4" data-wow-duration=".5s" data-wow-delay=".1s">
                                <span className="program-icon">
                                    <i className="flaticon-clipboard"></i>
                                </span>
                                <h4 className="programme-heading">Gestionar productos</h4>
                                <p>Accede a la visualización de los productos del diario.</p>
                                <Link to="/administrarProductos" ><Button type="button" className="w-75 btn BotonesColor ml-4 "><FontAwesomeIcon icon={faArrowRight} /></Button></Link>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="row">
                        <div className="col-sm-8 offset-md-2 fade-in-card">
                            <div className="single-program wow fadeIn p-4" data-wow-duration=".5s" data-wow-delay=".1s">
                                <span className="program-icon">
                                    <i className="flaticon-clipboard"></i>
                                </span>
                                <h4 className="programme-heading">Verificar diario</h4>
                                <p>Accede a la visualización de los diarios creados...</p>
                                <Link to="/AdministrarDiariosVerifica" style={{ textDecoration: 'none' }}><Button type="button" className="w-75 btn BotonesColor"><FontAwesomeIcon icon={faArrowRight} /></Button></Link>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div className="container fade-in-card" style={{ marginTop: "60px", marginBottom: "10px" }}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="row ">
                            <div className="col-sm-6">
                                <h2 className="para-color mb-3">Centro de noticias</h2>
                            </div>
                            <hr style={{ width: "470px" }} />
                        </div>
                        <div className="row mb-5 p-2" style={{ width: "510px" }} >
                            {dataNoticias.length > 0 ? dataNoticias.map((item) => {
                                return <div className="col-sm-12 fade-in-card mt-4" >
                                    <div className="single-program wow fadeIn" data-wow-duration=".5s" data-wow-delay=".1s" style={{ marginBottom: "14px", backgroundColor: "rgb(243, 243, 252)" }}>
                                        <h6 className=" mt-0" style={{ fontSize: "22px" }}>{item.descripcion}</h6>
                                        <h6 className="para-color mt-3" style={{ fontSize: "13px" }}>Agregado por
                                            {" " + item.applicationUser.nombre} {item.applicationUser.primerApellido}  {calculaDias(item.date)}.</h6>
                                    </div>
                                </div>
                            }) : <div className="col-md-10">
                                <h4 className="para-color mt-5">No existen noticias creadas actualmente...</h4>
                                <br />
                                <h5 className="para-color mt-1">Visita esta sección frecuentemente para estar al tanto de las novedades en las noticias.</h5>
                            </div>}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row mb-4">
                            <div className="col-sm-12">
                                <h2 className="para-color mb-3">Post recientes en Facebook</h2>
                            </div>
                            <hr style={{ width: "470px", marginLeft: "20px" }} />
                        </div>
                        <div className="fb-page" data-href="https://www.facebook.com/pollitosdehierro" data-tabs="timeline" data-width="500" data-height="560" data-small-header="true" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="false"><blockquote cite="https://www.facebook.com/pollitosdehierro" className="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/pollitosdehierro">Fundación pollitos de hierro</a></blockquote></div>
                    </div>
                </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <Footer />
        </div>
    );
}