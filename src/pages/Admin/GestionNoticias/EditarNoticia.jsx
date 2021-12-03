import React, { useState } from 'react';
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import HeaderStatus from "../../../components/HeaderStatus";
import Axios from "axios";
import swal from 'sweetalert';
import { useHistory, useLocation } from "react-router-dom";
const UpdateNoticia = () => {
    const history = useHistory();
    const location = useLocation();
    const { idP, descripcionP } = (location && location.state) || {};
    const [id] = useState(parseInt(idP));
    const [descripcion, setDescripcion] = useState(descripcionP);
    function updateNoticia(e) {
        e.preventDefault();
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var applicationUserId = localStorage.getItem('Id');
        const noticia = { id, descripcion, date , applicationUserId};
        Axios.put("https://pollitobackend.azurewebsites.net/api/Noticias/" + id, noticia)
            .then(response => {
                swal("La noticia se agregó correctamente", { icon: "success" });
                history.push("/AdministrarNoticias");
            })
    }
    return (<div>
        <Header />
        <HeaderStatus
            h1="Actualizar noticia"
            backUrl="/AdministrarNoticias"
            backName="Lista de noticias"
            currentName="Actualizar noticia"
        />
        <section className="calculate-bmi-area fade-in-card">
            <div className="container">
                <div className="row">
                    <div className="row">
                        <div className="row mb-3">
                            <div className="col-sm-12 mt-5">
                                <h2 className="para-color mb-3">Actualización de noticias</h2>
                            </div>
                            <hr />
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-sm-12">
                            <h4 className="para-color mt-4">Información requerida</h4>
                            <div className="bmi-box">
                                <form onSubmit={updateNoticia}>
                                    <div className="row">
                                        <div className="col-sm-12 mt-3">
                                            <div className="form-group">
                                                <label>Descripción<span>*</span></label>
                                                <input type="text" className="form-control" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} id="nombre" name="nombre" required />
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="contact-sub-btn w-100 text-center mt-5">
                                                <button type="submit" style={{ padding: "10px", width: "280px" }} className="btn btn-effect section-button">Actualizar noticia</button>
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
export default UpdateNoticia





