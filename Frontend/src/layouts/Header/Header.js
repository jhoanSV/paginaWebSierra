import React from "react";

import "./_header.scss";


export function Header({reDireccion}) {
    
    return(
        <header>
            <div className="container-xxl cabecera">
                <div className="row">

                    <div className="col logo">
                        <a href="index.html" style={{textDecoration: "none" }}>
                            <img
                                src={require("../../Assets/png/LogoSierra.png")}
                                width="2207px"
                                height="839px"
                            />
                        </a>                      
                    </div>

                    <div className="col-5 buscar">
                        <div className="input-group mb-3">
                            <button className="btn btn-outline-secondary" type="button" id="button-addon1">
                                o
                            </button>
                            <input type="text" className="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
                        </div>
                    </div>

                    <div className="col user">
                        <a href="index.html" style={{textDecoration: "none" }}>
                            <img
                            className="offset-9"
                            src={require("../../Assets/png/tuercaUsuario.png")}
                            width="2965px"
                            height="2965px"/>
                        </a>                        
                    </div>

                </div>

                <div className="row">
                    <nav className="menu">
                        <ul className="navbar">
                            <a id="btn-iz" onClick={reDireccion}>
                                <li>
                                    Inicio
                                </li>
                            </a>
                            <a href="index.html">
                                <li>
                                    Productos
                                </li>
                            </a>
                            <a href="index.html">
                                <li>
                                    Quienes Somos
                                </li>
                            </a>
                            <a id="btn-der" href="index.html">
                                <li>
                                    Contactanos
                                </li>
                            </a>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>       
    );
}