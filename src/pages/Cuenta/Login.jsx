import React, { useState, useRef } from "react";
import Footer from "../../components/Footer";
import md5 from 'md5';
import { Button, Alert, Label} from "reactstrap";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import PollitoLogo from "../../images/pollitosHierro.png";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';


library.add(faGoogle, faFacebookF)

function Login() {
  const emailRef = useRef();
  const history = useHistory();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const baseUrl = "https://pollitobackend.azurewebsites.net/api/AspNetUsers";

  function setLogin(e) {
    e.preventDefault();
    setError("");
    const login = {
      username: emailRef.current.value,
      password: md5(passwordRef.current.value)
    };

    var test = "";

    Axios.get(baseUrl + `/${login.username}/${login.password}`)
      .then(async response => {
        
        test = response.data.securityStamp;
        if(response.request.status === 200){
            if(await response.data.securityStamp === "Activo"){
             
            //set localStorage
            localStorage.setItem("Id", response.data.id);
            localStorage.setItem("Cuenta", response.data.userName);
            localStorage.setItem("Email", response.data.email);
            localStorage.setItem("Perfil", true);
            
           
            history.push("/Home");
            }
            
            if(response.data.securityStamp === "Inactivo") {
              setError("Su cuenta se encuentra inactiva favor contactar a su administrador al 2545-1520");
            }
           
            
        }else{
            setError("Su contraseña o usuario estan incorrectos");
        }
        
      })
      .then(error => {
        console.log(error);
        
        if (test !== "Inactivo") {
          setError("Su contraseña o usuario estan incorrectos, error!");
        }
        
      });
  }

  return (<div>
    <section className="get-a-membership-area fade-in-card">
      <div className="section-overlay-login">
        <div className="offset-md-1 col-xl-3 col-lg-4 col-md-4 p-5 mt-5" style={{ backgroundColor: "rgba(0,0,0,.5)", borderRadius: "20px", marginBottom: "55px" }}>
          <h3 className="mt" style={{ fontSize: 40 }}>
            <img src={PollitoLogo} alt="Energym-logo" />
          </h3>
          <p className="mb-3 " style={{ color: "#D6D2C4" }}>Bienvenido! Favor ingrese a su cuenta</p>
          {error && <Alert variant="danger" className="mt" style={{ width: "20%" }}>{error}</Alert>}
          <form className="mt" style={{ width: "20%", color: "#D6D2C4" }} onSubmit={setLogin}>
            <div className="form-group">
              <Label for="search-input1" style={{ color: "#D6D2C4" }}>Correo electrónico:</Label>
              <input
                className="form-control"
                style={{ background: "transparent", color:"#D6D2C4", borderRadius: "10px" }}
                defaultValue={""}
                ref={emailRef}
                required
                name="email"
                placeholder="Ingrese su correo electrónico"
              />
            </div>
            <div className="form-group mb-2">
              <Label for="search-input1" style={{ color: "#D6D2C4" }}>Contraseña:</Label>
              <input
                className="form-control"
                style={{ background: "transparent",color:"#D6D2C4", borderRadius: "10px" }}
                defaultValue={""}
                ref={passwordRef}
                type="password"
                required
                name="password"
                placeholder="Ingrese su contraseña"
              />
            </div>
           
            <Button
              type="submit"
              color="warning"
              className="w-100 btn-warning mt-4"
              style={{ borderRadius: "10px" }}
              size="sm"
            >
              Ingresar
            </Button>
            <br></br>

            <div className="d-flex align-items-center mt-4">
              
              <Link to="/Registro" className="ml-1" style={{ color: "#D6D2C4", textDecoration: "none" }}>
              No tiene cuenta? Registrarse
              </Link>
            </div>

           
            <Button
              
              color="danger"
              className="w-100 btn-danger mt-4"
              style={{ borderRadius: "10px" }}
              size="sm"
            >
              <Link to="/Registro" className="ml-1" style={{ color: "#D6D2C4", textDecoration: "none" }}>
                Registrarse
              </Link>
            </Button>
            
            
            
          </form>
        </div>
      </div>
    </section>
    <Footer />
  </div>);
}
export default Login;