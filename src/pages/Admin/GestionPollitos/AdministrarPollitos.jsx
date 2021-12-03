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
import { faTrashAlt, faEdit, faPlus} from '@fortawesome/free-solid-svg-icons';
export default function ListEvents() {
    const history = useHistory();
    const [dataAccounts, setDataAccounts] = useState([]);
    useEffect(() => {
        if (dataAccounts.length === 0) table();
    });
    function toEdit(pollito, e) {
        e.preventDefault();
        history.push({
            pathname: '/EditarPollito', state: {
                idP: pollito.id, nombreP: pollito.nombre, primerApellidoP: pollito.primerApellido, segundoApellidoP: pollito.segundoApellido,
                telefonoP: pollito.telefono, condicionIdP: pollito.condicionId, direccionIdP: pollito.direccionId, tutorIdP: pollito.tutorId
            }
        });
    }
    function toDelete(idPollito, e) {
        e.preventDefault();
        swal({
            title: "Estás seguro?",
            text: "Una vez eliminado el pollito no puede ser recuperado!",
            icon: "warning",
            buttons: ["Cancelar", "Aceptar"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    Axios.delete("https://pollitobackend.azurewebsites.net/api/Pollitos/" + idPollito)
                        .then(response => {
                            if (response.data.icon === 'success')
                                setDataAccounts([]);
                            table();
                            return swal("El pollito fue eliminado correctamente!", {
                                icon: "success"
                            });
                        });
                }
            });
    }
    function toCreate(e) {
        e.preventDefault();
        history.push({ pathname: '/AgregarPollito' });
    }
    function table() {
        Axios.get('https://pollitobackend.azurewebsites.net/api/pollitos')
            .then(response => setDataAccounts(response.data));
    }
    const datatable = {
        columns: [
            {
                label: 'Nombre del pollito',
                field: 'Nombre',
                width: 50
            },
            {
                label: 'Teléfono',
                field: 'Telefono',
                width: 50
            },
            {
                label: 'Editar pollito',
                field: 'Editar',
                width: 100
            },
            {
                label: 'Eliminar pollito',
                field: 'Eliminar',
                width: 50
            }
        ],
        rows: dataAccounts.map((item) => (
            {
                Nombre: item.nombre + " " + item.primerApellido + " " + item.segundoApellido,
                Telefono: item.telefono,
                Editar: <Button onClick={(e) => toEdit(item, e)} className="BotonesColorModificar" type="button" ><FontAwesomeIcon icon={faEdit} /></Button>,
                Eliminar: <Button onClick={(e) => toDelete(item.id, e)} className="BotonesColorEliminar" type="button" ><FontAwesomeIcon icon={faTrashAlt} /></Button>
            }))
    };
    return (
        <div>
            <Header />
            <HeaderStatus
                h1="Lista de pollitos"
                backUrl="/AdminMenuPollitos"
                backName="Menú de pollitos"
                currentName="Lista de pollitos"
            />
            <section className="calculate-bmi-area fade-in-card">
                <div className="container">
                    <div className="row">
                        <div className="row mb-3 mt-5">
                            <div className="col-sm-8 mb-3">
                                <h2 className="para-color text-left" >Lista de pollitos registrados</h2>
                            </div>
                            <div className="col-sm-3 mb-3 ml-5 ">
                                <Button className="BotonesColorCrear w-100" onClick={(e) => toCreate(e)} type="button" ><FontAwesomeIcon icon={faPlus} /> Agregar pollito</Button>
                            </div>
                            <hr />
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
                                        infoLabel={["Mostrando de", "a", "de", "pollitos"]}
                                        paginationLabel={["Anterior", "Siguiente"]}
                                        noRecordsFoundLabel="No existen pollitos para mostrar..."
                                        searchLabel="Buscar pollito"
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





