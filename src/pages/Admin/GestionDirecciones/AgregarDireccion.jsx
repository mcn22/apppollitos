import React, { useState } from 'react';
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import HeaderStatus from "../../../components/HeaderStatus";
import Axios from "axios";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";
const CreateDireccion = () => {
    const history = useHistory();
    const [provincia, setProvincia] = useState('');
    const [canton, setCanton] = useState('');
    const [distrito, setDistrito] = useState('');
    const [detalles, setDetalle] = useState('');
    function createDireccion(e) {
        e.preventDefault();
        const direccion = { provincia, canton, distrito, detalles};
        Axios.post("https://pollitobackend.azurewebsites.net/api/Direcciones", direccion)
            .then(response => {
                if (typeof response.data.id != "undefined") {
                    swal("La dirección se agregó correctamente", { icon: "success" });
                    history.push("/AdministrarDirecciones");
                } else {
                    return swal("Ha existido un error en la creacion de la dirección!", { icon: "error" });
                }
            })
    }
    return (<div>
        <Header />
        <HeaderStatus
            h1="Agregar dirección"
            backUrl="/AdministrarDirecciones"
            backName="Lista de direcciones"
            currentName="Agregar dirección"
        />
        <section className="calculate-bmi-area fade-in-card">
            <div className="container">
                <div className="row">
                    <div className="row">
                        <div className="row mb-3">
                            <div className="col-sm-12 mt-5">
                                <h2 className="para-color mb-3">Registro de direcciones</h2>
                            </div>
                            <hr />
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-sm-12">
                            <h4 className="para-color mt-4">Información requerida</h4>
                            <div className="bmi-box">
                                <form onSubmit={createDireccion}>
                                    <div className="row">
                                        <div className="col-sm-4 mt-3">
                                            <div className="form-group">
                                                <label>Provincia<span>*</span></label>
                                                <input type="text" className="form-control" value={provincia} onChange={(e) => setProvincia(e.target.value)} required />
                                            </div>
                                        </div>
                                        <div className="col-sm-4 mt-3">
                                            <div className="form-group">
                                                <label>Cantón<span>*</span></label>
                                                <input type="text" className="form-control" value={canton} onChange={(e) => setCanton(e.target.value)} required />
                                            </div>
                                        </div>   
                                        <div className="col-sm-4 mt-3">
                                            <div className="form-group">
                                                <label>Distrito<span>*</span></label>
                                                <input type="text" className="form-control" value={distrito} onChange={(e) => setDistrito(e.target.value)} required />
                                            </div>
                                        </div> 
                                        <div className="col-sm-12 mt-3">
                                            <div className="form-group">
                                                <label>Detalle<span>*</span></label>
                                                <input type="text" className="form-control" value={detalles} onChange={(e) => setDetalle(e.target.value)} required />
                                            </div>
                                        </div>                             
                                        <div className="col-sm-12">
                                            <div className="contact-sub-btn w-100 text-center mt-5">
                                                <button type="submit" style={{ padding: "10px", width: "280px" }} className="btn btn-effect section-button">Agregar dirección</button>
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
export default CreateDireccion





