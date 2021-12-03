import React, { useState, useEffect } from 'react';
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import HeaderStatus from "../../../components/HeaderStatus";
import Axios from "axios";
import swal from 'sweetalert';
import { useHistory, useLocation } from "react-router-dom";
const UpdatePollito = () => {
    const history = useHistory();
    const location = useLocation();
    const { idP, nombreP, primerApellidoP, segundoApellidoP, telefonoP, condicionIdP, direccionIdP, tutorIdP } = (location && location.state) || {};
    const [id] = useState(parseInt(idP));
    const [dataCondiciones, setDataCondiciones] = useState([]);
    const [dataDirecciones, setDataDirecciones] = useState([]);
    const [dataTutor, setDataTutor] = useState([]);
    const [nombre, setNombre] = useState(nombreP);
    const [primerApellido, setPrimerApellido] = useState(primerApellidoP);
    const [segundoApellido, setSegundoApellido] = useState(segundoApellidoP);
    const [telefono, setTelefono] = useState(telefonoP);
    const [condicion, setCondicion] = useState(parseInt(condicionIdP));
    const [direccion, setDireccion] = useState(parseInt(direccionIdP));
    const [tutor, setTutor] = useState(parseInt(tutorIdP));
    useEffect(() => {
            if (dataCondiciones.length === 0) {
                Axios.get('https://pollitobackend.azurewebsites.net/api/Condiciones')
                    .then(response => setDataCondiciones(response.data));
            }
            if (dataDirecciones.length === 0) {
                Axios.get('https://pollitobackend.azurewebsites.net/api/Direcciones')
                    .then(response => setDataDirecciones(response.data));
            }
            if (dataTutor.length === 0) {
                Axios.get('https://pollitobackend.azurewebsites.net/api/Tutores')
                    .then(response => setDataTutor(response.data));
            }
    }, [dataCondiciones.length , dataDirecciones.length, dataTutor.length ]);
    function updatePollito(e) {
        e.preventDefault();
        let condicionId = parseInt(condicion);
        let direccionId = parseInt(direccion);
        let tutorId = parseInt(tutor);
        const pollito = { id, nombre, primerApellido, segundoApellido, telefono, condicionId, direccionId, tutorId };
        Axios.put("https://pollitobackend.azurewebsites.net/api/Pollitos/" + id, pollito)
            .then(response => {
                swal("El pollito se agregó correctamente", { icon: "success" });
                history.push("/AdministrarPollitos");
            })
    }
    return (<div>
        <Header />
        <HeaderStatus
            h1="Actualizar pollito"
            backUrl="/AdministrarPollitos"
            backName="Lista de pollitos"
            currentName="Actualizar pollito"
        />
        <section className="calculate-bmi-area fade-in-card">
            <div className="container">
                <div className="row">
                    <div className="row">
                        <div className="row mb-3">
                            <div className="col-sm-12 mt-5">
                                <h2 className="para-color mb-3">Actualización de pollito</h2>
                            </div>
                            <hr />
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-sm-12">
                            <h4 className="para-color mt-4">Información requerida</h4>
                            <div className="bmi-box">
                                <form onSubmit={updatePollito}>
                                    <div className="row">
                                        <div className="col-sm-3 mt-3">
                                            <div className="form-group">
                                                <label>Nombre<span>*</span></label>
                                                <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} id="nombre" name="nombre" required />
                                            </div>
                                        </div>
                                        <div className="col-sm-3 mt-3">
                                            <div className="form-group">
                                                <label>Primer apellido<span>*</span></label>
                                                <input type="text" className="form-control" value={primerApellido} onChange={(e) => setPrimerApellido(e.target.value)} id="primerApellido" name="primerApellido" required />
                                            </div>
                                        </div>
                                        <div className="col-sm-3 mt-3">
                                            <div className="form-group">
                                                <label>Segundo apellido<span>*</span></label>
                                                <input type="text" className="form-control" value={segundoApellido} onChange={(e) => setSegundoApellido(e.target.value)} id="segundoApellido" name="segundoApellido" required />
                                            </div>
                                        </div>
                                        <div className="col-sm-3 mt-3">
                                            <div className="form-group">
                                                <label>Teléfono<span>*</span></label>
                                                <input type="text" className="form-control" value={telefono} onChange={(e) => setTelefono(e.target.value)} id="telefono" name="telefono" required />
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <label >Condición<span></span></label>
                                                <select name="condicion" className="form-control custom-select" value={condicion} onChange={(e) => setCondicion(e.target.value)} >
                                                    {
                                                        dataCondiciones.map((item) => (
                                                            item.id === direccion ?
                                                                <option value={item.id} selected>{item.detalleCondicion} (Actual)</option> :
                                                                <option value={item.id}>{item.detalleCondicion}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <label >Dirección<span></span></label>
                                                <select name="direccion" className="form-control custom-select" value={direccion} onChange={(e) => setDireccion(e.target.value)} >
                                                    {
                                                        dataDirecciones.map((item) => (
                                                            item.id === direccion ?
                                                                <option value={item.id} selected>{item.provincia + " / " + item.canton + " / " + item.distrito } (Actual)</option> :
                                                                <option value={item.id}>{item.provincia + " / " + item.canton + " / " + item.distrito }</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="form-group">
                                                <label>Tutor<span></span></label>
                                                <select className="form-control custom-select" value={tutor} onChange={(e) => { setTutor(e.target.value) }} >
                                                    {
                                                        dataTutor.map((item) => (
                                                            item.id === tutor ?
                                                                <option value={item.id} selected>{item.nombre + " " + item.primerApellido + " " + item.segundoApellido} (Actual)</option> :
                                                                <option value={item.id}>{item.nombre + " " + item.primerApellido + " " + item.segundoApellido}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="contact-sub-btn w-100 text-center mt-5">
                                                <button type="submit" style={{ padding: "10px", width: "280px" }} className="btn btn-effect section-button">Actualizar pollito</button>
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
export default UpdatePollito





