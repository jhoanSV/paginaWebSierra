import React from 'react';
import "./_Login.scss";

export const Login = () => {
    return (
        <section className='py-5 d-flex justify-content-center'>
            <div className="grayContainer">
                <div className='tuercaContainer'>
                    <picture>
                        <source
                            type="image/avif"
                            srcSet={require("../../Assets/avif/tuercaUsuario2.avif")}
                        />
                        <img
                            src={require("../../Assets/png/tuercaUsuario2.png")}
                            width="180px"
                            height="206px"
                            alt="tuerca"
                            decoding="async"
                        />
                    </picture>
                </div>
                <div>
                    <div className="userEmail">
                        <i className="bi bi-envelope-fill"></i>
                        <input type="text" className="theInput fw-bold" placeholder="Correo" 
                            aria-label="Campo para correo"
                            onChange={(e) => {e.target.classList.remove('fw-bold')}}
                            onBlur={(e) => {
                                if ((e.target.value) === ''){
                                    e.target.classList.add('fw-bold')
                                }                                
                            }}
                        />
                    </div>
                    <div className="userPass">
                        <i className="bi bi-lock-fill"></i>
                        <input type="password" className="theInput fw-bold" placeholder="Contraseña" 
                            aria-label="Campo para contraseña"
                            onChange={(e) => {e.target.classList.remove('fw-bold')}}
                            onBlur={(e) => {
                                if ((e.target.value) === ''){
                                    e.target.classList.add('fw-bold')
                                }                                
                            }}
                        />
                    </div>
                    <div className="mt-2">
                        <span className='fw-bold'>Olvidé mi contraseña</span>
                    </div>                        
                </div>
                <div className="mt-5 w-100">
                    <div className='d-flex justify-content-between toDirCol'>
                        <div>
                            <input type='checkbox' className='theCheck'
                            />
                            <span className='ms-3'>Recordar datos</span>
                        </div>
                        <span>Registrarme</span>
                    </div>
                    <button className='btnStlGen btnLogin'>
                        Iniciar sesion
                    </button>
                </div>
            </div>            
        </section>
    );
}