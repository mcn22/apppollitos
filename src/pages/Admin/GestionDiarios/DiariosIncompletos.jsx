import React, { useState, useEffect } from 'react';
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import HeaderStatus from "../../../components/HeaderStatus";
import { MDBDataTableV5 } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import { useLocation } from "react-router-dom";
import Axios from "axios";
export default function DiariosPendientes() {
    const location = useLocation();
    const { pollitoIncomplete } = (location && location.state) || {};
    const [pollitos] = useState(pollitoIncomplete);
    const [dataPollitos, setDataPollitos] = useState([]);
    const month = new Date().getMonth() + 1;
    useEffect(() => {
        if (dataPollitos.length === 0) {
            Axios.get('https://pollitobackend.azurewebsites.net/api/pollitos')
                .then(response => setDataPollitos(response.data));
        }
    }, [dataPollitos.length]);
    function nombrePollito(id) {
        let nombre = "";
        dataPollitos.forEach(elemento => {
            if (elemento.id === id) {
                nombre = elemento.nombre + " " + elemento.primerApellido + " " + elemento.segundoApellido + " ";
            }
        });
        return nombre;
    }
    const datatable = {
        columns: [
            {
                label: 'Nombre del pollito',
                field: 'Nombre',
                width: 50
            },
            {
                label: 'ID del diario',
                field: 'diarioId',
                width: 50
            },
            {
                label: 'Producto',
                field: 'Producto',
                width: 50
            },
            {
                label: 'Pendiente',
                field: 'Pendiente',
                width: 100
            },
            {
                label: 'Cédula del tío',
                field: 'Benefactor',
                width: 50
            }
        ],
        rows: pollitos.map((item) => (
            {
                Nombre: nombrePollito(item.diario.pollitoId),
                diarioId: item.diarioId,
                Producto: item.productos.descripcion,
                Pendiente: item.pendiente,
                Benefactor: item.diario.applicationUserId
            }))
    };

    return (<div>
        <Header />
        <HeaderStatus
            h1="Pollitos con diarios pendientes"
            backUrl="/Dashboard"
            backName="Dashboard"
            currentName="Pollitos con diarios pendientes"
        />
        <section className="calculate-bmi-area fade-in-card">
            <div className="container">
                <div className="row">
                    <div className="row">
                        <div className="col-sm-12 p-3">
                            <h2 className="para-color mb-3">Pollitos con Diarios pendientes para el mes {month}</h2>
                        </div>
                        <hr className="ml-5" style={{ width: "90%" }} />
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
    </div>);
}