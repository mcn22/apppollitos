import React, { useState, useEffect } from 'react';
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import HeaderStatus from "../../../components/HeaderStatus";
import Axios from "axios";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";
const CreateDiario = () => {
    const history = useHistory();
    const [dataPollito, setDataPollito] = useState([]);
    const [dataTios, setDataTios] = useState([]);
    const [pollito, setPollito] = useState('');
    const [tio, setTio] = useState('');
    useEffect(() => {
        if (dataPollito.length === 0) {
            Axios.get('https://pollitobackend.azurewebsites.net/api/Pollitos')
                .then(response => setDataPollito(response.data));
        }
        if (dataTios.length === 0) {
            Axios.get('https://pollitobackend.azurewebsites.net/api/DiariosQuery')
                .then(response => setDataTios(response.data));
        }
    }, [dataPollito.length, dataTios.length]);
    async function createDiario(e) {
        e.preventDefault();
        let pollitoId = parseInt(pollito);
        let applicationUserId = tio;
        await Axios.get('https://pollitobackend.azurewebsites.net/api/DiariosQuery/' + applicationUserId)
            .then(response => {
                if (response.data.length === 0) {
                    var today = new Date();
                    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                    const diario = { pollitoId, applicationUserId, date };
                    Axios.post("https://pollitobackend.azurewebsites.net/api/Diarios", diario)
                        .then(response => {
                            if (typeof response.data.id != "undefined") {
                                let id = 0;
                                Axios.get('https://pollitobackend.azurewebsites.net/api/Diarios')//Acepto que esto es una idiotez para agarra el ultimo id...
                                    .then(response => {
                                        response.data.map((item) => (id = item.id));
                                        AgregarProductos(id);
                                    });
                            } else {
                                return swal("Ha existido un error en la creacion del diario!", { icon: "error" });
                            }
                        })
                } else {
                    return swal("El tío seleccionado ya tiene un diario asignado!", { icon: "error" });
                }
            });
    }
    function AgregarProductos(idDiario) {
        let idD = parseInt(idDiario);
        swal({
            title: "El diario se agregó correctamente!",
            text: "Deseas agregar productos al diario en este momento?",
            icon: "success",
            buttons: ["Cancelar", "Aceptar"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    history.push({ pathname: '/AgregarProductosDiario', state: { idP: idD } });
                } else {
                    history.push("/AdministrarDiariosCreaEdita");
                }
            });
    }
    return (<div>
        <Header />
        <HeaderStatus
            h1="Agregar diario"
            backUrl="/AdministrarDiariosCreaEdita"
            backName="Lista de diarios"
            currentName="Agregar pollito"
        />
        <section className="calculate-bmi-area fade-in-card">
            <div className="container">
                <div className="row">
                    <div className="row">
                        <div className="row mb-3">
                            <div className="col-sm-12 mt-5">
                                <h2 className="para-color mb-3">Registro de diarios</h2>
                            </div>
                            <hr />
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-sm-12">
                            <h4 className="para-color mt-4">Información requerida</h4>
                            <div className="bmi-box">
                                <form onSubmit={createDiario}>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Pollito<span></span></label>
                                                <select className="form-control custom-select" value={pollito} onChange={(e) => setPollito(e.target.value)} >
                                                    <option>Selecciona el pollito</option>
                                                    {
                                                        dataPollito.map((item) => (
                                                            <option value={item.id}>{item.nombre + " " + item.primerApellido + " " + item.segundoApellido}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Tío<span></span></label>
                                                <select className="form-control custom-select" value={tio} onChange={(e) => setTio(e.target.value)} >
                                                    <option>Selecciona el tío</option>
                                                    {
                                                        dataTios.map((item) => (
                                                            <option value={item.id}>{item.nombre + " " + item.primerApellido + " " + item.segundoApellido}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="contact-sub-btn w-100 text-center mt-5">
                                                <button type="submit" style={{ padding: "10px", width: "280px" }} className="btn btn-effect section-button">Agregar diario</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Footer />
    </div>);
}
export default CreateDiario





