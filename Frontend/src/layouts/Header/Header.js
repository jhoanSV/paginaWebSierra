import React from "react";

import "./header.scss";
import "../../scss/index.scss"


export function Header() {
    
    return(
        <header className="cabecera">
            <div className="seccion1">
                <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css'/>
                
                <a className="logo" href="index.html" style={{textDecoration: "none" }}>
                    <img
                        src={require("../../Assets/png/LogoSierra.png")}
                        width="100%"
                        height="100%"
                    />
                </a>

                <div className="barra-busqueda">
                    <i className="fi fi-rr-search lupa"></i>
                    <input type="text" name="busqueda" className="caja-texto" placeholder="jdjdjjdjd"/>
                </div>

                <a className="user" href="index.html" style={{textDecoration: "none" }}>
                    <img
                    src={require("../../Assets/png/icono2.png")}
                    width="100%" height="100%"/>
                </a>
            </div>
            <div className="seccion2">
                <nav className="menu">
                    <ul className="navbar">
                        <a id="btn-iz" href="index.html">
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
        </header>       
    );
}