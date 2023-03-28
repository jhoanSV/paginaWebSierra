import React from "react";

import "./_header.scss";


export function Header({reDireccion}) {
    
    return(
        <header>
            <div className="container-xxl px-4 g-0 cabecera">
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
                            <input type="text" className="form-control" placeholder="Buscar Producto" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
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
                            className="offset-9"
                            src={require("../../Assets/png/tuercaUsuario.png")}
                            width="2965px"
                            height="2965px"/>
                        </a>                        
                    </div>

                </div>

                <div className="row justify-content-center">
                    <div className="col">
                        <div className="d-flex justify-content-center">
                            <div className="btn-group w-67 flex-wrap">
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