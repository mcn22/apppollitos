import React, { useState, useEffect } from 'react';
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import HeaderStatus from "../../../components/HeaderStatus";
import Axios from "axios";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";
const CreateProducto = () => {
    const history = useHistory();
    const [dataCategorias, setDataCategorias] = useState([]);
    const [descripcion, setDescripcion] = useState('');
    const [idCategoria, setIdCategoria] = useState('');
    useEffect(() => {
        if (dataCategorias.length === 0) {
            Axios.get('https://pollitobackend.azurewebsites.net/api/Categorias')
                .then(response => setDataCategorias(response.data));
        }
    },[dataCategorias.length]);
    function createCondicion(e) {
        e.preventDefault();
        let categoriaId = parseInt(idCategoria);
        const producto = { descripcion, categoriaId };
        Axios.post("https://pollitobackend.azurewebsites.net/api/Productos",producto)
            .then(response => {
                if (typeof response.data.id != "undefined") {
                    swal("El producto se agregó correctamente", { icon: "success" });
                    history.push("/AdministrarProductos");
                } else {
                    return swal("Ha existido un error en la creacion del producto!", { icon: "error" });
                }
            })
            .then(error => { return swal(error, { icon: "error" }) });
    }
    return (<div>
        <Header />
        <HeaderStatus
            h1="Agregar producto"
            backUrl="/AdministrarProductos"
            backName="Lista de productos"
            currentName="Agregar producto"
        />
        <section className="calculate-bmi-area fade-in-card">
            <div className="container">
                <div className="row">
                    <div className="row">
                        <div className="row mb-3">
                            <div className="col-sm-12 mt-5">
                                <h2 className="para-color mb-3">Registro de productos</h2>
                            </div>
                            <hr />
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-sm-12">
                            <h4 className="para-color mt-4">Información requerida</h4>
                            <div className="bmi-box">
                                <form onSubmit={createCondicion}>
                                    <div className="row">
                                        <div className="col-sm-6 mt-3">
                                            <div className="form-group">
                                                <label>Descripción<span>*</span></label>
                                                <input type="text" className="form-control" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
                                            </div>
                                        </div>  
                                        <div className="col-sm-6 mt-3">
                                            <div className="form-group">
                                                <label>Categoría<span></span></label>
                                                <select name="tutor" className="form-control custom-select" value={idCategoria} onChange={(e) => setIdCategoria(e.target.value)} >
                                                    <option>Selecciona la categoría</option>
                                                    {
                                                        dataCategorias.map((item) => (
                                                            <option value={item.id}>{item.descripcion}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>                                 
                                        <div className="col-sm-12">
                                            <div className="contact-sub-btn w-100 text-center mt-5">
                                                <button type="submit" style={{ padding: "10px", width: "280px" }} className="btn btn-effect section-button">Agregar producto</button>
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
export default CreateProducto





