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
import { faTrashAlt, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
export default function ListEvents() {
    const history = useHistory();
    const [dataAccounts, setDataAccounts] = useState([]);
    useEffect(() => {
        if (dataAccounts.length === 0) table();
    });
    function table() {
        Axios.get('https://pollitobackend.azurewebsites.net/api/noticias')
            .then(response => setDataAccounts(response.data));
    }
    function toEdit(noticia, e) {
        e.preventDefault();
        history.push({ pathname: '/EditarNoticia', state: { idP: noticia.id, descripcionP: noticia.descripcion } });
    }
    function toDelete(idNoticia, e) {
        e.preventDefault();
        swal({
            title: "Estás seguro?",
            text: "Una vez eliminada la noticia no puede ser recuperada!",
            icon: "warning",
            buttons: ["Cancelar", "Aceptar"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    Axios.delete("https://pollitobackend.azurewebsites.net/api/Noticias/" + idNoticia)
                        .then(response => {
                            if (response.data.icon === 'success')
                                setDataAccounts([]);
                            table();
                            return swal("La noticia fue eliminada correctamente!", {
                                icon: "success"
                            });
                        });
                }
            });
    }
    function toCreate(e) {
        e.preventDefault();
        history.push({ pathname: '/AgregarNoticia' });
    }
    const datatable = {
        columns: [
            {
                label: 'Fecha',
                field: 'Fecha',
                width: 50
            },
            {
                label: 'Detalle de la noticia',
                field: 'Detalle',
                width: 50
            },
            {
                label: 'Editar noticia',
                field: 'Editar',
                width: 100
            },
            {
                label: 'Eliminar noticia',
                field: 'Eliminar',
                width: 50
            }
        ],
        rows: dataAccounts.map((item) => (
            {
                Fecha: moment(item.date).format("DD/MM/YYYY"),
                Detalle: item.descripcion,
                Editar: <Button onClick={(e) => toEdit(item, e)} className="BotonesColorModificar" type="button" ><FontAwesomeIcon icon={faEdit} /></Button>,
                Eliminar: <Button onClick={(e) => toDelete(item.id, e)} className="BotonesColorEliminar" type="button" ><FontAwesomeIcon icon={faTrashAlt} /></Button>
            }))
    };
    return (
        <div>
            <Header />
            <HeaderStatus
                h1="Lista de noticias"
                backUrl="/AdminMenuGeneral"
                backName="Menú general"
                currentName="Lista de noticias"
            />
            <section className="calculate-bmi-area fade-in-card">
                <div className="container">
                    <div className="row">
                        <div className="row mb-3 mt-5">
                            <div className="col-sm-8 mb-3">
                                <h2 className="para-color text-left" >Lista de noticias registradas</h2>
                            </div>
                            <div className="col-sm-3 mb-3 ml-5 ">
                                <Button className="BotonesColorCrear w-100" onClick={(e) => toCreate(e)} type="button" ><FontAwesomeIcon icon={faPlus} /> Agregar noticia</Button>
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
                                        infoLabel={["Mostrando de", "a", "de", "noticias"]}
                                        paginationLabel={["Anterior", "Siguiente"]}
                                        noRecordsFoundLabel="No existen noticias para mostrar..."
                                        searchLabel="Buscar noticia"
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





