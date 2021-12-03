import React, { useState, useEffect } from 'react';
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import HeaderStatus from "../../../components/HeaderStatus";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import { useLocation } from "react-router-dom";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Axios from "axios";
export default function VisualizarDiario() {
    const location = useLocation();
    const { idP, pollitoP, encargadoP } = (location && location.state) || '';
    const [id] = useState(idP);
    const [pollito] = useState(pollitoP);
    const [encargado] = useState(encargadoP);
    const [dataAccounts, setDataAccounts] = useState([]);
    useEffect(() => {
        if (dataAccounts.length === 0) {
            Axios.get('https://pollitobackend.azurewebsites.net/api/DiarioQueries/' + id)
                .then(response => { setDataAccounts(response.data) });
        }
    }, [dataAccounts.length, id],);
    function createMarkup() {
        return {
            __html: diarioToHTML()
        };
    }
    function diarioToHTML() {
        var data = `
        <div className="col-sm-12 float-left mb-3">
            <h1>Información del diario</h1>
            <hr />
            <br>
            <h5>Nombre del pollito: ${pollito} <br><br> Nombre del tío: ${encargado}</h5>
            <br>
        </div>
        <br>
        <div className="col-sm-12 float-left mb-3">
            <h1 className="para-color">Detalle del diario</h1>
            <hr />
        </div>
        <table>
        <tr>
          <th><h2>Producto &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp  </h2></th>
          <th><h2>Cantidad &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp </h2></th>
          <th><h2>Pendiente &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp </h2></th>
        </tr>
        `
        dataAccounts.map((item) => (
            data += `
            <tr>
                <th><h5>${item.productos.descripcion}&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp </h5></th>
                <th><h5>${item.quantity}&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp </h5></th>
                <th><h5>${item.pendiente > 0 ? item.pendiente : "NO"}&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp </h5></th>
            </tr>
            `
        ))
        data += `</table> `
        return data
    }
    function printDocument(e) {
        e.preventDefault();
        const input = document.getElementById('documento');
        html2canvas(input, { scrollY: -window.scrollY })
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF("p", "mm", "a4");
                var width = pdf.internal.pageSize.getWidth();
                var height = pdf.internal.pageSize.getHeight();
                pdf.addImage(imgData, 'PNG', 0, 0, width, height);
                pdf.save("Diario-" + pollito + ".pdf");
            });
    }
    return (
        <div>
            <Header />
            <HeaderStatus
                h1="Detalle del diario"
                backUrl="AdministrarDiariosVerifica"
                backName="Lista de diarios"
                currentName="Detalle del diario"
            />
            <section className="calculate-bmi-area fade-in-card">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="col-sm-6 mb-3 offset-md-3">
                                <button className="btn btn-primary BotonesColor" style={{ width: "100%" }} onClick={(e) => printDocument(e)}>Generar PDF</button>
                            </div>
                        </div>
                    </div>
                    <hr style={{ width: "90%", marginLeft: "50px", marginBottom: "30px" }} />
                    <div className="row">
                        <div className="p-4 col-md-10 offset-md-1 bg-light border rounded-3 campoInnerDiet">
                            <div id="documento" className="p-5" style={{ width: '210mm', minHeight: '297mm', marginLeft: 'auto', marginRight: 'auto' }} dangerouslySetInnerHTML={createMarkup()} />
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div >
    );
}





