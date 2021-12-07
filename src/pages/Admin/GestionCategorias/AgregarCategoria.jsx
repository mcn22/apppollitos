import React, { useState} from 'react';
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import HeaderStatus from "../../../components/HeaderStatus";
import Axios from "axios";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";
const CreateCategoria = () => {
    const history = useHistory();
    const [descripcion, setDescripcion] = useState('');
    function createCategoria(e) {
        e.preventDefault();
        const categoria = { descripcion };
        Axios.post("https://pollitobackend.azurewebsites.net/api/Categorias",categoria)
            .then(response => {
                if (typeof response.data.id != "undefined") {
                    swal("La categoría se agregó correctamente", { icon: "success" });
                    history.push("/AdministrarCategorias");
                } else {
                    return swal("Ha existido un error en la creacion de la categoría!", { icon: "error" });
                }
            })
    }
    return (<div>
        <Header />
        <HeaderStatus
            h1="Agregar categoría"
            backUrl="/AdministrarCategorias"
            backName="Lista de categorías"
            currentName="Agregar categoría"
        />
        <section className="calculate-bmi-area fade-in-card">
            <div className="container">
                <div className="row">
                    <div className="row">
                        <div className="row mb-3">
                            <div className="col-sm-12 mt-5">
                                <h2 className="para-color mb-3">Registro de categoría</h2>
                            </div>
                            <hr />
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-sm-12">
                            <h4 className="para-color mt-4">Información requerida</h4>
                            <div className="bmi-box">
                                <form onSubmit={createCategoria}>
                                    <div className="row">
                                        <div className="col-sm-12 mt-3">
                                            <div className="form-group">
                                                <label>Descripción<span>*</span></label>
                                                <input type="text" className="form-control" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
                                            </div>
                                        </div>                                   
                                        <div className="col-sm-12">
                                            <div className="contact-sub-btn w-100 text-center mt-5">
                                                <button type="submit" style={{ padding: "10px", width: "280px" }} className="btn btn-effect section-button">Agregar categoría</button>
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
export default CreateCategoria





