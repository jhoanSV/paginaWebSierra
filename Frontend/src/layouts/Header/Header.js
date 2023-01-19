import React from "react";

import "./header.scss";
import "../../scss/index.scss"


export function Header({reDireccion}) {
    
    return(
        <header className="cabecera">
            <div className="seccion1">
                
                <div className="logo">
                    <a href="index.html" style={{textDecoration: "none" }}>
                        <img
                            src={require("../../Assets/png/LogoSierra.png")}
                            width="100%"
                            height="100%"
                        />
                    </a>
                </div>

                <div className="barra-busqueda">
                    <i className="fi fi-rr-search lupa"></i>
                    <input type="text" name="busqueda" className="caja-texto" placeholder="Buscar producto"/>
                </div>

                <div className="user">
                    <a href="index.html" style={{textDecoration: "none" }}>
                        <img
                        src={require("../../Assets/png/tuercaUsuario.png")}
                        width="100%" height="100%"/>
                    </a>
                </div>
                
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
            <div className="seccion2">
                
            </div>
        </header>       
    );
}