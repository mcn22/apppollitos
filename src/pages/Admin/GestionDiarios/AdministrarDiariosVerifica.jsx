import React, { useState, useEffect } from 'react';
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import HeaderStatus from "../../../components/HeaderStatus";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import Axios from "axios";
import * as moment from 'moment';
import { useHistory } from "react-router-dom";
import { faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
export default function ListEvents() {
    const history = useHistory();
    const [dataAccounts, setDataAccounts] = useState([]);
    const [condicion, setCondicion] = useState('');
    const [direccion, setDireccion] = useState('');
    const [direccionDetalle, setDireccionDetalle] = useState('');
    const [tutor, setTutor] = useState('');
    const [tutorTel, setTutorTel] = useState('');
    useEffect(() => {
        if (dataAccounts.length === 0) table();
    });
    function toEdit(idDiario, e) {
        e.preventDefault();
        history.push({
            pathname: '/EditarPendientesDiario', state: {
                idP: idDiario
            }
        });
    }
    function table() {
        let id = parseInt(localStorage.getItem('Id'))
        Axios.get('https://pollitobackend.azurewebsites.net/api/DiariosQuery/' + id)
            .then(response => {
                setDataAccounts(response.data);
                cargaDetallePollito(response.data.shift().pollitoId);
            });
    }
    function cargaDetallePollito(idPollito) {
        let id = parseInt(idPollito)
        Axios.get('https://pollitobackend.azurewebsites.net/api/pollitos/' + id)
            .then(response => {
                setCondicion(response.data.condicion.detalleCondicion);
                setDireccion(response.data.direccion.provincia + " / " + response.data.direccion.canton + " / " + response.data.direccion.distrito);
                setDireccionDetalle(response.data.direccion.detalles);
                setTutor(response.data.tutor.nombre + " " + response.data.tutor.primerApellido + " " + response.data.tutor.segundoApellido);
                setTutorTel(response.data.tutor.telefono);
            });
    }
    function verDetalle(diario, e) {
        e.preventDefault();
        history.push({
            pathname: '/VisualizarDiario', state: {
                idP: diario.id, pollitoP: diario.pollito.nombre + " " + diario.pollito.primerApellido + " " + diario.pollito.segundoApellido,
                encargadoP: diario.applicationUser.nombre + " " + diario.applicationUser.primerApellido + " " + diario.applicationUser.segundoApellido
            }
        });
    }
    return (
        <div>
            <Header />
            <HeaderStatus
                h1="Detalle del diario"
                backUrl="/Home"
                backName="Inicio"
                currentName="Detalle del diario"
            />
            <section className="calculate-bmi-area fade-in-card">
                <div className="container">
                    <div>
                        <div class="card">
                            <div class="card-body">
                                <div className="row">
                                    <div className="col-sm-12 p-3">
                                        <h2 className="para-color mb-3">Detalle del diario asignado</h2>
                                    </div>
                                    <hr className="ml-5" style={{ width: "90%" }} />
                                </div>
                                {
                                    dataAccounts.map((item) => (
                                        <div className="row">
                                            <div className="col-sm-12 mt-3">
                                                <div className="col-sm-12 bg-light">
                                                    <div className="para-color col-sm-6 float-left bg-light">
                                                        <div className="col-sm-12 pt-3">
                                                            <h4 className="para-color text-left" >Nombre del pollito : </h4>
                                                        </div>
                                                        <div className="col-sm-12  ml-5 pb-3" >
                                                            <h5 className="para-color text-left" >{item.pollito.nombre + " " + item.pollito.primerApellido + " " + item.pollito.segundoApellido}</h5>
                                                        </div>
                                                    </div>
                                                    <div className="para-color col-sm-6 float-left bg-light">
                                                        <div className="col-sm-12 pt-3">
                                                            <h4 className="para-color text-left" >Teléfono del pollito : </h4>
                                                        </div>
                                                        <div className="col-sm-12 pb-3 ml-5" >
                                                            <h5 className="para-color text-left" >{item.pollito.telefono}</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-12">
                                                    <div className="para-color col-sm-6 float-left" >
                                                        <div className="col-sm-12 pt-3">
                                                            <h4 className="para-color text-left" >Nombre del tutor : </h4>
                                                        </div>
                                                        <div className="col-sm-12 pb-3 ml-5">
                                                            <h5 className="para-color text-left" >{tutor}</h5>
                                                        </div>
                                                    </div>
                                                    <div className="para-color col-sm-6 float-left ">
                                                        <div className="col-sm-12 pt-3">
                                                            <h4 className="para-color text-left" >Teléfono del tutor : </h4>
                                                        </div>
                                                        <div className="col-sm-12 pb-3 ml-5" >
                                                            <h5 className="para-color text-left" >{tutorTel}</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-12 bg-light" >
                                                    <div className="para-color col-sm-6 float-left bg-light">
                                                        <div className="col-sm-12 pt-3">
                                                            <h4 className="para-color text-left" >Condición del pollito: </h4>
                                                        </div>
                                                        <div className="col-sm-12 pb-3 ml-5">
                                                            <h5 className="para-color text-left" >{condicion} </h5>
                                                        </div>
                                                    </div>
                                                    <div className="para-color col-sm-6 float-left bg-light" >
                                                        <div className="col-sm-12 pt-3">
                                                            <h4 className="para-color text-left" >Fecha del diario : </h4>
                                                        </div>
                                                        <div className="col-sm-12 pb-3 ml-5">
                                                            <h5 className="para-color text-left" >{moment(item.date).format("DD/MM/YYYY")}</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-12 " >
                                                    <div className="para-color col-sm-6 float-left ">
                                                        <div className="col-sm-12 pt-3">
                                                            <h4 className="para-color text-left" >Dirección del pollito: </h4>
                                                        </div>
                                                        <div className="col-sm-12 pb-3 ml-5">
                                                            <h5 className="para-color text-left" >{direccion} </h5>
                                                        </div>
                                                    </div>
                                                    <div className="para-color col-sm-6 float-left" >
                                                        <div className="col-sm-12 pt-3">
                                                            <h4 className="para-color text-left" >Detalle de la dirección : </h4>
                                                        </div>
                                                        <div className="col-sm-12 pb-3 ml-5">
                                                            <h5 className="para-color text-left" >{direccionDetalle} </h5>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-12 " >
                                                    <div className="para-color col-sm-6 float-left bg-light">
                                                        <div className="col-sm-12 pt-3 ">
                                                            <h4 className="para-color text-left" >Editar pendientes: </h4>
                                                        </div>
                                                        <div className="col-sm-12 pb-3 ">
                                                            <Button onClick={(e) => toEdit(item.id, e)} className="BotonesColorModificar w-100" type="button" ><FontAwesomeIcon icon={faEdit} /></Button>
                                                        </div>
                                                    </div>
                                                    <div className="para-color col-sm-6 float-left bg-light" >
                                                        <div className="col-sm-12 pt-3">
                                                            <h4 className="para-color text-left" >Ver información del diario : </h4>
                                                        </div>
                                                        <div className="col-sm-12 pb-3 ">
                                                            <Button onClick={(e) => verDetalle(item, e)} type="button" className="BotonesColor w-100"><FontAwesomeIcon icon={faEye} /></Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div >
    );
}





