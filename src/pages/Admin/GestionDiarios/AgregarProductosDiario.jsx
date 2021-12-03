import React, { useState, useEffect } from 'react';
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import HeaderStatus from "../../../components/HeaderStatus";
import swal from 'sweetalert';
import Swal2 from 'sweetalert2'
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MDBDataTableV5 } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import Axios from "axios";
import { faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from "react-router-dom";
export default function ListEvents() {
    const location = useLocation();
    const { idP } = (location && location.state) || {};
    const [idDiario] = useState(parseInt(idP));
    const [dataAccounts, setDataAccounts] = useState([]);
    const [dataProductos, setDataProductos] = useState([]);
    const [idProducto, setIdProducto] = useState('');
    const [cantidad, setCantidad] = useState('');
    useEffect(() => {
        if (dataAccounts.length === 0) {
            Axios.get('https://pollitobackend.azurewebsites.net/api/DiarioQueries/' + idDiario)
                .then(response => { setDataAccounts(response.data) });
        };
        if (dataProductos.length === 0) {
            Axios.get('https://pollitobackend.azurewebsites.net/api/Productos')
                .then(response => setDataProductos(response.data));
        }
    }, [dataAccounts.length, dataProductos.length,  idDiario]);
    function table() {
        Axios.get('https://pollitobackend.azurewebsites.net/api/DiarioQueries/' + idDiario)
            .then(response => { setDataAccounts(response.data) });
    }
    function toCreate(e) {
        e.preventDefault();
        let diarioId = parseInt(idDiario);
        let productosId = parseInt(idProducto);
        let quantity = parseInt(cantidad);
        let pendiente = parseInt(cantidad);
        const detalle = { diarioId, productosId, quantity, pendiente };
        Axios.post("https://pollitobackend.azurewebsites.net/api/Detalles", detalle)
            .then(response => {
                if (typeof response.data.id != "undefined") {
                    setIdProducto("");
                    setCantidad("");
                    Swal2.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Agregado correctamente!',
                        showConfirmButton: false,
                        timer: 1200
                    });
                    setDataAccounts([]);
                    table();
                } else {
                    return swal("Ha existido un error en la creacion del producto!", { icon: "error" });
                }
            })
        table();
    }
    function toDelete(idDetalle, e) {
        e.preventDefault();
        swal({
            title: "Estás seguro?",
            text: "Una vez eliminado el producto no puede ser recuperado!",
            icon: "warning",
            buttons: ["Cancelar", "Aceptar"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    Axios.delete("https://pollitobackend.azurewebsites.net/api/Detalles/" + idDetalle)
                        .then(response => {
                            if (response.data.icon === 'success')
                                setDataAccounts([]);
                            table();
                            return swal("El producto fue eliminado correctamente!", {
                                icon: "success"
                            });
                        });
                }
            });
    }
    const datatable = {
        columns: [
            {
                label: 'Producto',
                field: 'Producto',
                width: 50
            },
            {
                label: 'Cantidad',
                field: 'Cantidad',
                width: 50
            },
            {
                label: 'Eliminar',
                field: 'Eliminar',
                width: 50
            }
        ],
        rows: dataAccounts.map((item) => (
            {
                Producto: item.productos.descripcion,
                Cantidad: item.quantity,
                Eliminar: <Button onClick={(e) => toDelete(item.id, e)} className="BotonesColorEliminar" type="button" ><FontAwesomeIcon icon={faTrashAlt} /></Button>
            }))
    };
    return (
        <div>
            <Header />
            <HeaderStatus
                h1="Agregar productos al diario"
                backUrl="/AdministrarDiariosCreaEdita"
                backName="Lista de diarios"
                currentName="Agregar productos al diario"
            />
            <section className="calculate-bmi-area fade-in-card">
                <div className="container">
                    <div className="row">
                        <div className="row mb-3">
                            <div className="col-sm-12 mt-5">
                                <h2 className="para-color mb-3">Agregar productos al diario</h2>
                            </div>
                            <hr />
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-sm-12">
                            <div className="bmi-box">
                                <form onSubmit={toCreate}>
                                    <div className="row">
                                        <div className="col-sm-6 mt-3">
                                            <div className="form-group">
                                                <label>Producto<span></span></label>
                                                <select className="form-control custom-select" value={idProducto} onChange={(e) => setIdProducto(e.target.value)} >
                                                    <option>Selecciona el producto</option>
                                                    {
                                                        dataProductos.map((item) => (
                                                            <option value={item.id}>{item.descripcion}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-4 mt-3">
                                            <div className="form-group">
                                                <label>Cantidad<span></span></label>
                                                <select className="form-control custom-select" value={cantidad} onChange={(e) => setCantidad(e.target.value)} >
                                                    <option>Selecciona la cantidad</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                    <option value="9">9</option>
                                                    <option value="10">10</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-2 mt-5">
                                            <Button className="BotonesColorCrear" onClick={(e) => toCreate(e)} type="button" ><FontAwesomeIcon icon={faPlus} /> Agregar</Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="row">
                            <div className="row mb-3">
                                <div className="col-sm-12 mt-5">
                                    <h2 className="para-color mb-3">Lista de productos actual</h2>
                                </div>
                                <hr />
                            </div>
                        </div>
                        <div className="row fade-in-card">
                            <div className="col-sm-12 mt-2">
                                <div className="bmi-box">
                                    <MDBDataTableV5
                                        hover entriesOptions={[10, 20, 30]}
                                        entries={10}
                                        pagesAmount={4}
                                        data={datatable}
                                        searchTop
                                        searchBottom={false}
                                        infoLabel={["Mostrando de", "a", "de", "productos"]}
                                        paginationLabel={["Anterior", "Siguiente"]}
                                        noRecordsFoundLabel="No existen productos para mostrar..."
                                        searchLabel="Buscar productos"
                                        entriesLabel="Filas por página"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div >
    );
}





