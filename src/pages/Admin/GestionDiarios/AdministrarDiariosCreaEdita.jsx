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
import * as moment from 'moment';
import { useHistory } from "react-router-dom";
import { faTrashAlt, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
export default function ListEvents() {
    const history = useHistory();
    const [dataAccounts, setDataAccounts] = useState([]);
    useEffect(() => {
        if (dataAccounts.length === 0) table();
    });
    function toEdit(diario, e) {
        e.preventDefault();
        history.push({
            pathname: '/AgregarProductosDiario', state: {
                idP: diario.id
            }
        });
    }
    function toCreate(e) {
        e.preventDefault();
        history.push({ pathname: '/AgregarDiario' });
    }
    function table() {
        Axios.get('https://pollitobackend.azurewebsites.net/api/diarios')
            .then(response => setDataAccounts(response.data));
    }
    function toDelete(idDiario, e) {
        e.preventDefault();
        swal({
            title: "Estás seguro?",
            text: "Una vez eliminado el diario no puede ser recuperado!",
            icon: "warning",
            buttons: ["Cancelar", "Aceptar"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    Axios.delete("https://pollitobackend.azurewebsites.net/api/Diarios/" + idDiario)
                        .then(response => {
                            if (response.data.icon === 'success')
                                setDataAccounts([]);
                            table();
                            return swal("El diario fue eliminado correctamente!", {
                                icon: "success"
                            });
                        });
                }
            });
    }
    const datatable = {
        columns: [            
            {
                label: 'Fecha',
                field: 'Fecha',
                width: 50
            },
            {
                label: 'Nombre del pollito',
                field: 'NombreP',
                width: 50
            },
            {
                label: 'Nombre del responsable',
                field: 'NombreT',
                width: 50
            },
            {
                label: 'Editar diario',
                field: 'Editar',
                width: 100
            },
            {
                label: 'Eliminar',
                field: 'Eliminar',
                width: 50
            }
            
        ],
        rows: dataAccounts.map((item) => (
            {
                Fecha : moment(item.date).format("DD/MM/YYYY"),
                NombreP: item.pollito.nombre + " " + item.pollito.primerApellido + " " + item.pollito.segundoApellido,
                NombreT: item.applicationUser.nombre + " " + item.applicationUser.primerApellido + " " + item.applicationUser.segundoApellido,
                Editar: <Button onClick={(e) => toEdit(item, e)} className="BotonesColorModificar" type="button" ><FontAwesomeIcon icon={faEdit} /></Button>,
                Eliminar: <Button onClick={(e) => toDelete(item.id, e)} className="BotonesColorEliminar" type="button" ><FontAwesomeIcon icon={faTrashAlt} /></Button>
            
            }))
    };
    return (
        <div>
            <Header />
            <HeaderStatus
                h1="Lista de diarios"
                backUrl="/AdminMenuPollitos"
                backName="Menú de pollitos"
                currentName="Lista de diarios"
            />
            <section className="calculate-bmi-area fade-in-card">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8">
                            <h2 className="para-color"style={{ marginRigth: "600px" }}>Lista de diarios registrados</h2>
                        </div>
                        <div className="col-sm-3 ml-5">
                            <Button className="BotonesColorCrear" onClick={(e) => toCreate(e)} type="button" ><FontAwesomeIcon icon={faPlus} /> Agregar diario</Button>
                        </div>
                        <div className="row fade-in-card">
                            <div className="col-sm-12 mt-4">
                                <div className="bmi-box">
                                    <MDBDataTableV5
                                        hover entriesOptions={[5, 20, 25]}
                                        entries={5}
                                        pagesAmount={4}
                                        data={datatable}
                                        searchTop
                                        searchBottom={false}
                                        infoLabel={["Mostrando de", "a", "de", "diarios"]}
                                        paginationLabel={["Anterior", "Siguiente"]}
                                        noRecordsFoundLabel="No existen diarios para mostrar..."
                                        searchLabel="Buscar diario"
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





