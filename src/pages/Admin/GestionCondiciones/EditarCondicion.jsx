import React, { useState } from 'react';
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import HeaderStatus from "../../../components/HeaderStatus";
import Axios from "axios";
import swal from 'sweetalert';
import { useHistory, useLocation } from "react-router-dom";
const UpdateCondicion = () => {
    const history = useHistory();
    const location = useLocation();
    const { idP, detalleP} = (location && location.state) || {};
    const [id] = useState(parseInt(idP));
    const [detalleCondicion, setDetalleCondicion] = useState(detalleP);
    function updateCondicion(e) {
        e.preventDefault();
        const condicion= { id, detalleCondicion };
        Axios.put("https://pollitobackend.azurewebsites.net/api/Condiciones/" + id, condicion)
            .then(response => {
                swal("La condición se agregó correctamente", { icon: "success" });
                history.push("/AdministrarCondiciones");
            })
    }
    return (<div>
        <Header />
        <HeaderStatus
            h1="Actualizar condición"
            backUrl="/AdministrarTutores"
            backName="Lista de condiciones"
            currentName="Actualizar condición"
        />
        <section className="calculate-bmi-area fade-in-card">
            <div className="container">
                <div className="row">
                    <div className="row">
                        <div className="row mb-3">
                            <div className="col-sm-12 mt-5">
                                <h2 className="para-color mb-3">Actualización de condiciones</h2>
                            </div>
                            <hr />
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-sm-12">
                            <h4 className="para-color mt-4">Información requerida</h4>
                            <div className="bmi-box">
                                <form onSubmit={updateCondicion}>
                                    <div className="row">
                                        <div className="col-sm-12 mt-3">
                                            <div className="form-group">
                                                <label>Condición<span>*</span></label>
                                                <input type="text" className="form-control" value={detalleCondicion} onChange={(e) => setDetalleCondicion(e.target.value)} id="nombre" name="nombre" required />
                                            </div>
                                        </div>                                     
                                        <div className="col-sm-12">
                                            <div className="contact-sub-btn w-100 text-center mt-5">
                                                <button type="submit" style={{ padding: "10px", width: "280px" }} className="btn btn-effect section-button">Actualizar condición</button>
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
export default UpdateCondicion





