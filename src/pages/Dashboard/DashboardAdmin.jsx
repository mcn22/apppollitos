import React, { useState, useEffect } from 'react';
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeaderStatus from "../../components/HeaderStatus";
import BarChart from '../../components/BarChart';
import LineChart from '../../components/LineChart';
import Axios from "axios";
import _ from 'lodash';
import { Link } from "react-router-dom";

const Dashboard = () => {

  const [users, setUsers] = useState([])
  const [pollitos, setPollitos] = useState([]);
  const [detalles, setDetalles] = useState([]);
  const [pending, setPending] = useState([]);
  const [missing, setMissing] = useState([]);
  const [go, setGo] = useState(true);

  var grouped = [];
  var total = [];
  var diario = [];
  var miss = [];

  // eslint-disable-next-line
  useEffect(async () => {

    if (go) {
      var pollito = [];
      await Axios.get('https://pollitobackend.azurewebsites.net/api/AspNetUsers')
        .then(response => setUsers(response.data));
      setGo(false);


      await Axios.get('https://pollitobackend.azurewebsites.net/api/Pollitos')
        .then(response => {
          setPollitos(response.data);
          // response.data.forEach(element => {
          //     pollito.push(element);
          // }); 
          pollito = response.data;

        });

      await Axios.get('https://pollitobackend.azurewebsites.net/api/Detalles')
        .then(response => {
          setDetalles(response.data);
          response.data.forEach(element => {
            if (element.pendiente > 0) {
              total.push(element);
            }
          });
          setDetalles(total);
          // eslint-disable-next-line
          grouped = _.countBy(total, "diarioId");
          var keys = Object.keys(grouped);
          setPending(keys);
        });

      await Axios.get('https://pollitobackend.azurewebsites.net/api/Diarios')
        .then(response => {
          response.data.forEach(element => {
            if (new Date(element.date).getFullYear === new Date().getFullYear && new Date(element.date).toLocaleString('default', { month: 'long' }) === new Date().toLocaleString('default', { month: 'long' })) {
              diario.push(element.pollitoId);
            }
          });
          pollito.forEach(element => {
            if (!diario.includes(element.id)) {
              miss.push(element);
            }
          });
          setMissing(miss);
        })

    }

  });
  return (<div>
    <Header />
    <HeaderStatus
      h1="Dashboard"
      backUrl="/Home"
      backName="Home"
      currentName="Dashboard"
    />
    <div classNameName="content-wrapper container pt-5">
      <div classNameName="mb-5 pt-5">
        <div classNameName="container mb-5 mt-5">
          <div className="row">
            <div className="row mb-3">
              <div className="col-sm-12 mt-5">
                <h2 className="para-color mb-3">Dashboard</h2>
              </div>
              <hr style={{ width: "90%", margin: "auto" }} />
            </div>
          </div>
        </div>
      </div>
      <div className="row m-5">
        <div className="col-lg-3 col-6 rounded ">
          <div className="small-box bg-light p-3 rounded card">
            <div className="inner pt-4">
              <h3>{users.length}</h3>
              <p>Total de usuarios</p>
            </div>
            <div className="icon">
              <i className="ion ion-bag"></i>
            </div>
            <Link to="/administrarcuentas" className="small-box-footer">Mas Información <i className="fas fa-arrow-circle-right"></i></Link>
          </div>
        </div>
        <div className="col-lg-3 col-6">
          <div className="small-box bg-light p-3 rounded card">
            <div className="inner pt-4 ">
              <h3>{pollitos.length}<sup style={{ fontSize: "20px" }}></sup></h3>
              <p>Total de pollitos</p>
            </div>
            <div className="icon">
              <i className="ion ion-stats-bars"></i>
            </div>
            <Link to="/AdministrarPollitos" className="small-box-footer">Mas Información <i className="fas fa-arrow-circle-right"></i></Link>
          </div>
        </div>
        <div className="col-lg-3 col-6">
          <div className="small-box bg-light p-3 rounded card">
            <div className="inner pt-4 ">
              <h3>{pending.length}</h3>
              <p>Diarios incompletos</p>
            </div>
            <div className="icon">
              <i className="ion ion-person-add"></i>
            </div>
            <Link to={{ pathname: '/DiariosIncompletos', state: { pollitoIncomplete: detalles } }} className="small-box-footer">Mas Información <i className="fas fa-arrow-circle-right"></i></Link>
          </div>
        </div>
        <div className="col-lg-3 col-6">
          <div className="small-box bg-light p-3 rounded card">
            <div className="inner pt-4 ">
              <h3>{missing.length}</h3>

              <p>Diarios pendientes del mes en curso</p>
            </div>
            <div className="icon">
              <i className="ion ion-pie-graph"></i>
            </div>
            <Link to={{ pathname: '/DiariosPendientes', state: { pollitoPending: missing } }} className="small-box-footer">Mas Información <i className="fas fa-arrow-circle-right"></i></Link>
          </div>
        </div>
      </div>
    </div>
    <div className="container mb-5">
      <div className="row">
        <div className="col-md-6 mt-3 tb-3">
          <BarChart />
        </div>
        <div className="col-md-6 mt-3 tb-3">
          <LineChart />
        </div>
      </div>
    </div>

    <Footer />
  </div>);
}
export default Dashboard





