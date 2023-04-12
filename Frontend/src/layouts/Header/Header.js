import React from "react";

import "./_header.scss";


export function Header() {
    
    return(
        <header>
            <div className="container-fluid px-4 g-0 cabecera">
                <div className="row">

                    <div className="col g2">
                        <button className="menuNav" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list-ul" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                            </svg>
                        </button>

                        <ul class="dropdown-menu">
                            <li><a className="dropdown-item" href="/inicio">Inicio</a></li>
                            <li><a className="dropdown-item" href="/productos">Productos</a></li>
                            <li><a className="dropdown-item" href="/quienessomos">Quienes somos</a></li>
                            <li><a className="dropdown-item" href="/contactanos">Contactanos</a></li>
                        </ul>
                    </div>

                    <div className="col logo">
                        <a href="index.html" style={{textDecoration: "none" }}>
                            <img
                                src={require("../../Assets/png/LogoSierra.png")}
                                width="2207px"
                                height="839px"
                                alt="LogoSierra"
                            />
                        </a>                      
                    </div>

                    <div className="col buscar">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control caja-buscar" placeholder="Buscar Producto" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
                            <span className="input-group-text" id="basic-addon1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                </svg>
                            </span>
                        </div>
                    </div>

                    <div className="col user">
                        <a href="index.html" style={{textDecoration: "none" }}>
                            <img
                                src={require("../../Assets/png/tuercaUsuario.png")}
                                width="2965px"
                                height="2965px"
                                alt="User"
                            />
                        </a>                        
                    </div>

                </div>

                <div className="row">
                    <div className="col">
                        <div className="grupoBotones">
                            <div className="btn-group g1 flex-wrap">
                                <button type="button" class="btn btn-navBar btn-lg">Inicio</button>
                                <button type="button" class="btn btn-navBar btn-lg">Productos</button>
                                <button type="button" class="btn btn-navBar btn-lg">Quienes somos</button>
                                <button type="button" class="btn btn-navBar btn-lg">Contactanos</button>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </header>       
    );
}
