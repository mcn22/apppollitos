import React, { useState, useRef } from 'react';
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import HeaderStatus from "../../../components/HeaderStatus";
import Axios from "axios";
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";
import md5 from 'md5';
const CreateUsuario = () => {
    const nombreRef = useRef();
    const lnameRef = useRef();
    const phoneRef = useRef();
    const emailRef = useRef();
    const dateRef = useRef();
    const cedulaRef = useRef();
    const snameRef = useRef();
    const perfilRef = useRef();
    const provinceRef = useRef()
    const postalRef = useRef();
    const detalleRef = useRef();
    const passRef = useRef();
    const confirmPassRef = useRef();
    const [error, setError] = useState(true);
    const [loading] = useState(false);
    const history = useHistory();
    function setValues(e) {
        setError(false)
        e.preventDefault();
        var enteredValue = dateRef.current.value;
        var birthDate = new Date(enteredValue);
        var today = new Date();
        var enteredAge = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            enteredAge--;
        }
        const cliente = {
            id:cedulaRef.current.value,
            email: emailRef.current.value,
            emailConfirmed:true,
            phoneNumber:phoneRef.current.value,
            phoneNumberConfirmed:true,
            lockoutEnd:today,
            nombre: nombreRef.current.value,
            primerApellido: lnameRef.current.value,
            segundoApellido: snameRef.current.value,
            securityStamp:"Activo",
            userName:perfilRef.current.value,
            birthDate: dateRef.current.value,
            passwordHash: md5(passRef.current.value)
           
        };
        const direccion = {
            provincia: provinceRef.current.value,
            canton: postalRef.current.value,
            distrito: postalRef.current.value,
            detalles: detalleRef.current.value
        }
        if (passRef.current.value === confirmPassRef.current.value) {
            if (enteredAge >= 18) {
                    setError(false)
                    Axios.post("https://pollitobackend.azurewebsites.net/api/AspNetUsers", cliente)
                    .then(response => {
                        if (typeof response.data.id != "undefined") {

                            //agregar la creacion de la direccion aca.
                            Axios.post("https://pollitobackend.azurewebsites.net/api/Direcciones",direccion);

                            swal("Cuenta creada correctamente!", {
                                icon: "success"
                            });
                            history.push("/AdminMenuUsuarios");

                        } else {
                            return swal("Ha existido un error en la creacion del usuario!", {
                                icon: "error"
                            });
                        }
                    })
                    .then(error => {
                        console.log(error);//recoger el error
                        return swal(error, {
                            icon: "error"
                        });
                    });

                    if(error){
                        return swal("Ha existido un error en la creacion del usuario!", {
                            icon: "error"
                        });
                    }
               
                
            } else {
                return swal("Debe ser mayor de 18 años para poder inscribirse en nuestros programas.", {
                    icon: "error"
                });
            }
        } else {
            return swal("Las contraseñas no coinciden, favor intente de nuevo", {
                icon: "error"
            });
        }
    }
    return (<div>
        <Header />
        <HeaderStatus
            h1="Agregar Usuario"
            backUrl="/AdminMenuUsuarios"
            backName="Menu Usuarios"
            currentName="Agregar Usuario"
        />
        <section className="calculate-bmi-area fade-in-card">
            <div className="container">
             
                <div className="row">
                    <div className="col-sm-12">
                        <h2 className="para-color mt-5">Registro de usuario</h2>
                    </div>
                </div>
                <div className="row ">
                    <div className="">
                        
                        <h4 className="para-color mt-4">Información requerida</h4>
                        <div className="bmi-box">
                            <form onSubmit={setValues}>
                                <div className="row">
                                    <div className="col-sm-4 mt-3">
                                        <div className="form-group">
                                            <label>Nombre<span>*</span></label>
                                            <input type="text" className="form-control" placeholder="" ref={nombreRef} id="nombre" name="nombre" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-4 mt-3">
                                        <div className="form-group">
                                            <label >Apellido<span>*</span></label>
                                            <input type="text" className="form-control" placeholder="" ref={lnameRef} name="apellido" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-4 mt-3">
                                        <div className="form-group">
                                            <label >Segundo Apellido<span>*</span></label>
                                            <input type="text" className="form-control" placeholder="" ref={snameRef} name="sapellido" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label >Teléfono<span>*</span></label>
                                            <input type="text" className="form-control" pattern="[0-9]+" maxlength="8"  placeholder="" ref={phoneRef} id="telefono" name="telefono" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label >Correo electrónico<span>*</span></label>
                                            <input type="email" className="form-control" placeholder="" ref={emailRef} name="email" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label >Cédula<span>*</span></label>
                                            <input type="text" className="form-control" placeholder="" ref={cedulaRef} name="cedula" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label >Fecha de nacimiento<span>*</span></label>
                                            <input type="date" className="form-control" placeholder="" ref={dateRef} name="bDate" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label >Perfil<span>*</span></label>
                                            <select name="province" className="form-control custom-select" ref={perfilRef} required>
                                                <option>Seleccione perfil</option>
                                                <option value="Administrador">Administrador</option>
                                                <option value="Usuario">Usuario</option>
                                                
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label >Provincia<span>*</span></label>
                                            <select name="province" className="form-control custom-select" ref={provinceRef} required>
                                                <option>Selecciona la provincia</option>
                                                <option value="1">San José</option>
                                                <option value="2">Alajuela</option>
                                                <option value="3">Cartago</option>
                                                <option value="4">Heredia</option>
                                                <option value="5">Guanacaste</option>
                                                <option value="6">Puntarenas</option>
                                                <option value="7">Limón</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label >Cantón<span>*</span></label>
                                            <input type="text" className="form-control" placeholder="" ref={postalRef} name="postalCode" required />
                                        </div>
                                        <hr className="my-4" />
                                    </div>
                                    <div className="col-sm-8">
                                        <div className="form-group">
                                            <label >Dirección<span>*</span></label>
                                            <input type="text" className="form-control" placeholder="" ref={detalleRef} name="address" required/>
                                        </div>
                                        <hr className="my-4" />
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label >Contraseña<span>*</span></label>
                                            <input type="password" className="form-control" placeholder="" ref={passRef} name="password" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label >Confirme contraseña<span>*</span></label>
                                            <input type="password" className="form-control" placeholder="" ref={confirmPassRef} required />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="col-sm-12">
                                        <div className="contact-sub-btn w-100 text-center mt-2">
                                            <button type="submit" disabled={loading} className="btn btn-effect section-button">Registrar</button>

                                        </div>
                                        
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                   
                </div>
            </div>
        </section>
        <Footer />
    </div>);
}
export default CreateUsuario





