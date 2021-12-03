import React, { useState, useEffect } from 'react';
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import HeaderStatus from "../../../components/HeaderStatus";
import Axios from "axios";
import swal from 'sweetalert';
import { useHistory, useLocation } from "react-router-dom";
const UpdateProducto = () => {
    const history = useHistory();
    const location = useLocation();
    const [dataCategorias, setDataCategorias] = useState([]);
    const { idP, descripcionP, categoriaIdP} = (location && location.state) || {};
    const [id] = useState(parseInt(idP));
    const [descripcion, setDescripcion] = useState(descripcionP);
    const [categoria, setCategoria] = useState(categoriaIdP);
    useEffect(() => {
        if (dataCategorias.length === 0) {
            Axios.get('https://pollitobackend.azurewebsites.net/api/Categorias')
                .then(response => setDataCategorias(response.data));
        }
    },[dataCategorias.length ]);
    function updateProducto(e) {
        e.preventDefault();
        let categoriaId = parseInt(categoria);
        const producto = { id, descripcion, categoriaId };
        Axios.put("https://pollitobackend.azurewebsites.net/api/Productos/" + id, producto)
            .then(response => {
                swal("El producto se agregó correctamente", { icon: "success" });
                history.push("/AdministrarProductos");
            })
    }
    return (<div>
        <Header />
        <HeaderStatus
            h1="Actualizar producto"
            backUrl="/AdministrarProductos"
            backName="Lista de producto"
            currentName="Actualizar producto"
        />
        <section className="calculate-bmi-area fade-in-card">
            <div className="container">
                <div className="row">
                    <div className="row">
                        <div className="row mb-3">
                            <div className="col-sm-12 mt-5">
                                <h2 className="para-color mb-3">Actualización de producto</h2>
                            </div>
                            <hr />
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-sm-12">
                            <h4 className="para-color mt-4">Información requerida</h4>
                            <div className="bmi-box">
                                <form onSubmit={updateProducto}>
                                    <div className="row">
                                        <div className="col-sm-6 mt-3">
                                            <div className="form-group">
                                                <label>Producto<span>*</span></label>
                                                <input type="text" className="form-control" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} id="nombre" name="nombre" required />
                                            </div>
                                        </div> 
                                        <div className="col-sm-6 mt-3">
                                            <div className="form-group">
                                                <label >Categoría<span></span></label>
                                                <select className="form-control custom-select" value={categoria} onChange={(e) => setCategoria(e.target.value)} >
                                                    {
                                                        dataCategorias.map((item) => (
                                                            item.id === categoria ?
                                                                <option value={item.id} selected>{item.descripcion} (Actual)</option> :
                                                                <option value={item.id}>{item.descripcion}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>                                    
                                        <div className="col-sm-12">
                                            <div className="contact-sub-btn w-100 text-center mt-5">
                                                <button type="submit" style={{ padding: "10px", width: "280px" }} className="btn btn-effect section-button">Actualizar producto</button>
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
export default UpdateProducto





