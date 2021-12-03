
import React from "react";
import {Router, Switch, Route  } from "react-router-dom";
import history from "../history";
import '../css/App.css';
import '../css/style.css';
import ProtectedRoute from "../ProtectedRoute";
import AdminRoute from "../AdminRoute";
//---Admin
import AdminMenuUsuarios from "../pages/Admin/AdminMenuUsuarios";
import AdminMenuGeneral from "../pages/Admin/AdminMenuGeneral";
import AdminMenuPollitos from "../pages/Admin/AdminMenuPollitos";
import AdminMenuDiarios from "../pages/Admin/AdminMenuDiarios";
//---Cuenta
import Login from "../pages/Cuenta/Login";
import Registro from "../pages/Cuenta/Registro";
import Home from "../pages/Admin/Home";
import AdministrarCuentas from "../pages/Admin/AdministrarCuentas";
//---Usuario
import AgregarUsuario from "../pages/Admin/GestionUsuarios/AgregarUsuarios";
import EditarUsuario from "../pages/Admin/GestionUsuarios/EditarUsuarios";
//---Pollitos
import AdministrarPollitos from "../pages/Admin/GestionPollitos/AdministrarPollitos";
import AgregarPollito from "../pages/Admin/GestionPollitos/AgregarPollito";
import EditarPollito from "../pages/Admin/GestionPollitos/EditarPollito";
//---Tutores
import AdministrarTutores from "../pages/Admin/GestionTutores/AdministrarTutores";
import AgregarTutor from "../pages/Admin/GestionTutores/AgregarTutor";
import EditarTutor from "../pages/Admin/GestionTutores/EditarTutor";
//---Direcciones
import AdministrarDirecciones from "../pages/Admin/GestionDirecciones/AdministrarDirecciones";
import AgregarDireccion from "../pages/Admin/GestionDirecciones/AgregarDireccion";
import EditarDireccion from "../pages/Admin/GestionDirecciones/EditarDireccion";
//---Condiciones
import AdministrarCondiciones from "../pages/Admin/GestionCondiciones/AdministrarCondiciones";
import AgregarCondicion from "../pages/Admin/GestionCondiciones/AgregarCondicion";
import EditarCondicion from "../pages/Admin/GestionCondiciones/EditarCondicion";
//---Noticias
import AdministrarNoticias from "../pages/Admin/GestionNoticias/AdministrarNoticias";
import AgregarNoticia from "../pages/Admin/GestionNoticias/AgregarNoticia";
import EditarNoticia from "../pages/Admin/GestionNoticias/EditarNoticia";
//---Categorias
import AdministrarCategorias from "../pages/Admin/GestionCategorias/AdministrarCategorias";
import AgregarCategoria from "../pages/Admin/GestionCategorias/AgregarCategoria";
import EditarCategoria from "../pages/Admin/GestionCategorias/EditarCategoria";
//---Productos
import AdministrarProductos from "../pages/Admin/GestionProductos/AdministrarProductos";
import AgregarProducto from "../pages/Admin/GestionProductos/AgregarProducto";
import EditarProducto from "../pages/Admin/GestionProductos/EditarProducto";
//---Diarios
import AdministrarDiariosCreaEdita from "../pages/Admin/GestionDiarios/AdministrarDiariosCreaEdita";
import AdministrarDiariosVerifica from "../pages/Admin/GestionDiarios/AdministrarDiariosVerifica";
import AgregarDiario from "../pages/Admin/GestionDiarios/AgregarDiario";
import VisualizarDiario from "../pages/Admin/GestionDiarios/VisualizarDiario";
import EditarPendientesDiario from "../pages/Admin/GestionDiarios/EditarPendientesDiario";
import AgregarProductosDiario from "../pages/Admin/GestionDiarios/AgregarProductosDiario";
import DiariosPendientes from "../pages/Admin/GestionDiarios/DiariosPendientes";
import DiariosIncompletos from "../pages/Admin/GestionDiarios/DiariosIncompletos";
//---Dashboard
import DashboardAdmin from "../pages/Dashboard/DashboardAdmin";
//---Permisos
import NotAuthorize from "../components/NotAuthorize";
function App() {
  return (
    <Router history={history}>
      <div className="App">
      <Switch>
        <Route path='/Registro' component={Registro}/>
        <Route path='/' exact component={Login}/>
        <Route path="/NotAuthorize" component={NotAuthorize}/>
        <ProtectedRoute path='/Home' component={Home}/>
        <Route path='/AdminMenuUsuarios' component={AdminMenuUsuarios}/>
        <Route path='/AdminMenuGeneral' component={AdminMenuGeneral}/>
        <Route path='/AdminMenuPollitos' component={AdminMenuPollitos}/>
        <Route path='/AdminMenuDiarios' component={AdminMenuDiarios}/>
        <Route path="/AdministrarCuentas" component={AdministrarCuentas}/>

        <AdminRoute path="/AgregarUsuario" component={AgregarUsuario}/>
        <AdminRoute path="/EditarUsuario" component={EditarUsuario}/>

        <AdminRoute path="/AdministrarPollitos" component={AdministrarPollitos}/>
        <AdminRoute path="/AgregarPollito" component={AgregarPollito}/>
        <AdminRoute path="/EditarPollito" component={EditarPollito}/>
        <Route path="/DiariosPendientes" component={DiariosPendientes}/>
        <Route path="/DiariosIncompletos" component={DiariosIncompletos}/>

        <AdminRoute path="/AdministrarTutores" component={AdministrarTutores}/>
        <AdminRoute path="/AgregarTutor" component={AgregarTutor}/>
        <AdminRoute path="/EditarTutor" component={EditarTutor}/>

        <Route path="/AdministrarDirecciones" component={AdministrarDirecciones}/>
        <Route path="/AgregarDireccion" component={AgregarDireccion}/>
        <Route path="/EditarDireccion" component={EditarDireccion}/>

        <AdminRoute path="/AdministrarCondiciones" component={AdministrarCondiciones}/>
        <AdminRoute path="/AgregarCondicion" component={AgregarCondicion}/>
        <AdminRoute path="/EditarCondicion" component={EditarCondicion}/>

        <AdminRoute path="/AdministrarNoticias" component={AdministrarNoticias}/>
        <AdminRoute path="/AgregarNoticia" component={AgregarNoticia}/>
        <AdminRoute path="/EditarNoticia" component={EditarNoticia}/>

        <Route path="/AdministrarCategorias" component={AdministrarCategorias}/>
        <Route path="/AgregarCategoria" component={AgregarCategoria}/>
        <Route path="/EditarCategoria" component={EditarCategoria}/>

        <Route path="/AdministrarProductos" component={AdministrarProductos}/>
        <Route path="/AgregarProducto" component={AgregarProducto}/>
        <Route path="/EditarProducto" component={EditarProducto}/>

        <ProtectedRoute path="/AdministrarDiariosCreaEdita" component={AdministrarDiariosCreaEdita}/>
        <ProtectedRoute path="/AdministrarDiariosVerifica" component={AdministrarDiariosVerifica}/>
        <ProtectedRoute path="/AgregarDiario" component={AgregarDiario}/>
        <ProtectedRoute path="/VisualizarDiario" component={VisualizarDiario}/>
        <ProtectedRoute path="/EditarPendientesDiario" component={EditarPendientesDiario}/>
        <ProtectedRoute path="/AgregarProductosDiario" component={AgregarProductosDiario}/>

        <AdminRoute path="/Dashboard" component={DashboardAdmin}/>
      </Switch>
      </div>       
    </Router> 
  );
}
export default App;
