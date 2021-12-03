import React, { useState} from 'react';
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import HeaderStatus from "../../../components/HeaderStatus";
import Axios from "axios";
import swal from 'sweetalert';
import { useHistory, useLocation } from "react-router-dom";
const EditarUsuario = () => {
    const location = useLocation();
    const { id, nombre, primerApellido, segundoApellido, phoneNumber, email, birthDate, userName, passwordHash, securityStamp, lockoutEnd } = (location && location.state) || {};
    const [idU, setId] = useState(id)
    const [nombreU, setNombre] = useState(nombre)
    const [primerApellidoU, setFname] = useState(primerApellido)
    const [segundoApellidoU, setLname] = useState(segundoApellido)
    const [phoneNumberU, setPhoneNumber] = useState(phoneNumber)
    const [beginDate, setBeginDate] = useState(lockoutEnd)
    const [pass, setPass] = useState(passwordHash)
    const [userN, setUserN] = useState(userName)
    const [cuenta, setCuenta] = useState(securityStamp)
    const [emailU, setEmail] = useState(email)
    const [birthDateU, setBirthDate] = useState(birthDate)
    const [error, setError] = useState(true);
    const [loading] = useState(false);
    const history = useHistory();
    function setValues(e) {
        setError(true)
        e.preventDefault();
        const baseUrl = "https://pollitobackend.azurewebsites.net/api/AspNetUsers";
        var enteredValue = birthDateU;
        var birthDate = new Date(enteredValue);
        var today = new Date();
        var enteredAge = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            enteredAge--;
        }
        const cliente = {
            id:idU,
            email: emailU,
            phoneNumber:phoneNumberU,
            userName:userN,
            passwordHash:pass,
            securityStamp:cuenta,
            nombre: nombreU,
            lockoutEnd:beginDate,
            primerApellido: primerApellidoU,
            segundoApellido: segundoApellidoU,
            birthDate: birthDateU
        };
       
            if (enteredAge >= 18) {
                    setError(false)
                    Axios.put(baseUrl + `/${id}`, cliente)
                    .then(response => {
                        console.log(cliente);
                        if (response.request.status === 204) {

                            swal("Cuenta actualizada correctamente!", {
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
        
    }
    return (<div>
        <Header />
        <HeaderStatus
            h1="Editar Usuario"
            backUrl="/administrarcuentas"
            backName="Administrar Cuentas"
            currentName="Editar Usuario"
        />
        <section className="calculate-bmi-area fade-in-card">
            <div className="container">
             
                <div className="row">
                    <div className="col-sm-12">
                        <h2 className="para-color mt-5">Editar usuario</h2>
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
                                            <input type="text" className="form-control" placeholder="" value={nombreU} onChange={(e) => setNombre(e.target.value)} id="nombre" name="nombre" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-4 mt-3">
                                        <div className="form-group">
                                            <label >Apellido<span>*</span></label>
                                            <input type="text" className="form-control" placeholder="" value={primerApellidoU} onChange={(e) => setFname(e.target.value)} name="apellido" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-4 mt-3">
                                        <div className="form-group">
                                            <label >Segundo Apellido<span>*</span></label>
                                            <input type="text" className="form-control" placeholder="" value={segundoApellidoU} onChange={(e) => setLname(e.target.value)} name="sapellido" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label >Teléfono<span>*</span></label>
                                            <input type="text" className="form-control" pattern="[0-9]+" maxlength="8"  placeholder="" value={phoneNumberU} onChange={(e) => setPhoneNumber(e.target.value)} id="telefono" name="telefono" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label >Correo electrónico<span>*</span></label>
                                            <input type="email" className="form-control" placeholder="" value={emailU} onChange={(e) => setEmail(e.target.value)} name="email" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label >Cédula<span>*</span></label>
                                            <input type="text" className="form-control" placeholder="" value={idU} onChange={(e) => setId(e.target.value)} name="cedula" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label >Fecha de nacimiento<span>*</span></label>
                                            <input type="date" className="form-control" placeholder="" value={birthDateU} onChange={(e) => setBirthDate(e.target.value)} name="bDate" required />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label >Tipo Cuenta<span>*</span></label>
                                            <input type="text" className="form-control" placeholder="" value={userN} onChange={(e) => setUserN(e.target.value)}  disabled />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="form-group">
                                            <label >Estado<span>*</span></label>
                                            <input type="text" className="form-control" placeholder="" value={cuenta} onChange={(e) => setCuenta(e.target.value)}  disabled />
                                        </div>
                                    </div>
                                    <input type="hidden" className="form-control" placeholder="" value={pass} onChange={(e) => setPass(e.target.value)}  disabled />
                                    <input type="hidden" className="form-control" placeholder="" value={beginDate} onChange={(e) => setBeginDate(e.target.value)}  disabled />
                                    <br />
                                    <div className="col-sm-12">
                                        <div className="contact-sub-btn w-100 text-center mt-2">
                                            <button type="submit" disabled={loading} className="btn btn-effect section-button">Actualizar</button>

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
export default EditarUsuario





