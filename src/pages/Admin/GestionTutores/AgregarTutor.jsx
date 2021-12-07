import React, { useState } from 'react';
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import HeaderStatus from "../../../components/HeaderStatus";
import Axios from "axios";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";
const CreateTutor = () => {
    const history = useHistory();
    const [nombre, setNombre] = useState('');
    const [primerApellido, setPrimerApellido] = useState('');
    const [segundoApellido, setSegundoApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    function createTutor(e) {
        e.preventDefault();
        const tutor = { nombre, primerApellido, segundoApellido, telefono};
        Axios.post("https://pollitobackend.azurewebsites.net/api/Tutores", tutor)
            .then(response => {
                if (typeof response.data.id != "undefined") {
                    swal("El tutor se agregó correctamente", { icon: "success" });
                    history.push("/AdministrarTutores");
                } else {
                    return swal("Ha existido un error en la creacion del tutor!", { icon: "error" });
                }
            })
    }
    return (<div>
        <Header />
        <HeaderStatus
            h1="Agregar tutor"
            backUrl="/AdministrarTutores"
            backName="Lista de tutores"
            currentName="Agregar tutor"
        />
        <section className="calculate-bmi-area fade-in-card">
            <div className="container">
                <div className="row">
                    <div className="row">
                        <div className="row mb-3">
                            <div className="col-sm-12 mt-5">
                                <h2 className="para-color mb-3">Registro de tutores</h2>
                            </div>
                            <hr />
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-sm-12">
                            <h4 className="para-color mt-4">Información requerida</h4>
                            <div className="bmi-box">
                                <form onSubmit={createTutor}>
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
                                        <div className="col-sm-12">
                                            <div className="contact-sub-btn w-100 text-center mt-5">
                                                <button type="submit" style={{ padding: "10px", width: "280px" }} className="btn btn-effect section-button">Agregar tutor</button>
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
export default CreateTutor





