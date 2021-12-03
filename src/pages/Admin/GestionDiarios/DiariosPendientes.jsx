import React, { useState } from 'react';
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import HeaderStatus from "../../../components/HeaderStatus";
import { MDBDataTableV5 } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import { useLocation } from "react-router-dom";

export default function DiariosPendientes() {

    const location = useLocation();
    const { pollitoPending } = (location && location.state) || {};
    const [pollitos] = useState(pollitoPending);
    const month = new Date().getMonth() + 1;

    const datatable = {
        columns: [
            {
                label: 'Nombre del pollito',
                field: 'Nombre',
                width: 50
            },
            {
                label: 'Apellido',
                field: 'Apellido',
                width: 50
            },
            {
                label: 'Teléfono',
                field: 'Telefono',
                width: 50
            },
            {
                label: 'Benefactor',
                field: 'Benefactor',
                width: 100
            },
            {
                label: 'Teléfono',
                field: 'TelefonoU',
                width: 50
            }
        ],
        rows: pollitos.map((item) => (
            {
                Nombre: item.nombre,
                Apellido: item.primerApellido,
                Telefono: item.telefono,
                Benefactor: item.applicationUser.email,
                TelefonoU: item.applicationUser.phoneNumber
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