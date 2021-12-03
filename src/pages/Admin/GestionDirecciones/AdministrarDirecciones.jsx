import React, { useState, useEffect } from 'react';
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import HeaderStatus from "../../../components/HeaderStatus";
import swal from 'sweetalert';
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MDBDataTableV5 } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { faTrashAlt, faEdit, faPlus, faEye } from '@fortawesome/free-solid-svg-icons';
export default function ListEvents() {
    const history = useHistory();
    const [dataAccounts, setDataAccounts] = useState([]);
    useEffect(() => {
        if (dataAccounts.length === 0) table();
    });
    function table() {
        Axios.get('https://pollitobackend.azurewebsites.net/api/direcciones')
            .then(response => setDataAccounts(response.data));
    }
    function toEdit(direccion, e) {
        e.preventDefault();
        history.push({
            pathname: '/EditarDireccion', state: {
                idP: direccion.id, provinciaP: direccion.provincia, cantonP: direccion.canton,
                distritoP: direccion.distrito, detalleP: direccion.detalles
            }
        });
    }
    function toDelete(idDireccion, e) {
        e.preventDefault();
        swal({
            title: "Estás seguro?",
            text: "Una vez eliminada la dirección no puede ser recuperada!",
            icon: "warning",
            buttons: ["Cancelar", "Aceptar"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    Axios.delete("https://pollitobackend.azurewebsites.net/api/Direcciones/" + idDireccion)
                        .then(response => {
                            if (response.data.icon === 'success')
                                setDataAccounts([]);
                            table();
                            return swal("La dirección fue eliminada correctamente!", {
                                icon: "success"
                            });
                        });
                }
            });
    }
    function toCreate(e) {
        e.preventDefault();
        history.push({ pathname: '/AgregarDireccion' });
    }
    function toDetails(item, e) {
        e.preventDefault();
        return swal(`Detalle de la dirección de: ${item.distrito}`, item.detalles);
    }
    const datatable = {
        columns: [
            {
                label: 'Provicia',
                field: 'Provincia',
                width: 50
            },
            {
                label: 'Cantón',
                field: 'Canton',
                width: 50
            },
            {
                label: 'Distrito',
                field: 'Distrito',
                width: 50
            },
            {
                label: 'Detalles',
                field: 'Detalles',
                width: 50
            },
            {
                label: 'Editar dirección',
                field: 'Editar',
                width: 100
            },
            {
                label: 'Eliminar dirección',
                field: 'Eliminar',
                width: 50
            }
        ],
        rows: dataAccounts.map((item) => (
            {
                Provincia: item.provincia,
                Canton: item.canton,
                Distrito: item.distrito,
                Detalles: <Button onClick={(e) => toDetails(item, e)} className="BotonesColor" type="button" ><FontAwesomeIcon icon={faEye} /></Button>,
                Editar: <Button onClick={(e) => toEdit(item, e)} className="BotonesColorModificar" type="button" ><FontAwesomeIcon icon={faEdit} /></Button>,
                Eliminar: <Button onClick={(e) => toDelete(item.id, e)} className="BotonesColorEliminar" type="button" ><FontAwesomeIcon icon={faTrashAlt} /></Button>
            }))
    };
    return (
        <div>
            <Header />
            <HeaderStatus
                h1="Lista de direcciones"
                backUrl="/AdminMenuGeneral"
                backName="Menú general"
                currentName="Lista de direcciones"
            />
            <section className="calculate-bmi-area fade-in-card">
                <div className="container">
                    <div className="row">
                        <div className="row mb-3 mt-5">
                            <div className="col-sm-8 mb-3">
                                <h2 className="para-color text-left" >Lista de direcciones registradas</h2>
                            </div>
                            <div className="col-sm-3 mb-3 ml-5 ">
                                <Button className="BotonesColorCrear w-100" onClick={(e) => toCreate(e)} type="button" ><FontAwesomeIcon icon={faPlus} /> Agregar dirección</Button>
                            </div>
                            <hr />
                        </div>
                        <div className="row fade-in-card">
                            <div className="col-sm-12 mt-4">
                                <div className="bmi-box">
                                    <MDBDataTableV5
                                        hover entriesOptions={[10, 20, 25]}
                                        entries={10}
                                        pagesAmount={4}
                                        data={datatable}
                                        searchTop
                                        searchBottom={false}
                                        infoLabel={["Mostrando de", "a", "de", "direcciones"]}
                                        paginationLabel={["Anterior", "Siguiente"]}
                                        noRecordsFoundLabel="No existen direcciones para mostrar..."
                                        searchLabel="Buscar dirección"
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





