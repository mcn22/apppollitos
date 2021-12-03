import React, { useState, useEffect } from 'react';
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import HeaderStatus from "../../../components/HeaderStatus";
import Swal2 from 'sweetalert2'
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MDBDataTableV5 } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import Axios from "axios";
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from "react-router-dom";
export default function ListEvents() {
    const location = useLocation();
    const { idP } = (location && location.state) || {};
    const [idDiario] = useState(parseInt(idP));
    const [dataAccounts, setDataAccounts] = useState([]);
    const [dataProductos, setDataProductos] = useState([]);
    useEffect(() => {
        if (dataAccounts.length === 0) {
            Axios.get('https://pollitobackend.azurewebsites.net/api/DiarioQueries/' + idDiario)
                .then(response => { setDataAccounts(response.data) });
        };
        if (dataProductos.length === 0) {
            Axios.get('https://pollitobackend.azurewebsites.net/api/Productos')
                .then(response => setDataProductos(response.data));
        }
    }, [dataAccounts.length, dataProductos.length, idDiario]);
    function table() {
        Axios.get('https://pollitobackend.azurewebsites.net/api/DiarioQueries/' + idDiario)
            .then(response => { setDataAccounts(response.data) });

    }
    function toEdit(item, e) {
        e.preventDefault();
        Swal2.fire({
            title: 'Introduce la cantidad faltante',
            input: 'number',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            showLoaderOnConfirm: true,
            preConfirm: (cantPendiente) => {
                let id = parseInt(item.id);
                let idDiario = parseInt(item.idDiario);
                let productosId = parseInt(item.productosId);
                let quantity = parseInt(item.quantity);
                let date = item.date;
                let diarioId = parseInt(item.diarioId);
                let pendiente = parseInt(cantPendiente);
                const detalle = { id, idDiario, productosId, quantity, date, diarioId, pendiente }
                return Axios.put("https://pollitobackend.azurewebsites.net/api/Detalles/" + id, detalle)
                    .then(response => {
                        if (typeof response.data.id != "undefined") {
                            return response.json()
                        }
                    })
            },
            allowOutsideClick: () => !Swal2.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                Swal2.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Actualizado correctamente!',
                    showConfirmButton: false,
                    timer: 1200
                });
                setDataAccounts([]);
                table();
            }
        })
    }
    const datatable = {
        columns: [
            {
                label: 'Producto',
                field: 'Producto',
                width: 50
            },
            {
                label: 'Cantidad requerida',
                field: 'CantidadR',
                width: 50
            },
            {
                label: 'Cantidad pendiente',
                field: 'CantidadP',
                width: 50
            },
            {
                label: 'Editar',
                field: 'Editar',
                width: 50
            }
        ],
        rows: dataAccounts.map((item) => (
            {
                Producto: item.productos.descripcion,
                CantidadR: item.quantity,
                CantidadP: item.pendiente,
                Editar: <Button onClick={(e) => toEdit(item, e)} className="BotonesColorModificar" type="button" ><FontAwesomeIcon icon={faEdit} /></Button>
            }))
    };
    return (
        <div>
            <Header />
            <HeaderStatus
                h1="Editar productos pendientes del diario"
                backUrl="/AdministrarDiariosVerifica"
                backName="Lista de diarios"
                currentName="Editar productos pendientes del diario"
            />
            <section className="calculate-bmi-area fade-in-card">
                <div className="container">
                    <div className="row">
                        <div className="row">
                            <div className="row mb-3">
                                <div className="col-sm-12 mt-5">
                                    <h2 className="para-color mb-3">Lista de productos del diario</h2>
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





