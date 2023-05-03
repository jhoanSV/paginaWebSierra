import React from "react";
import "./_header.scss";
import { Link } from "react-router-dom";


export function Header() {

    function showGhost() {
        const item = document.querySelector(".ghost-buscador");
        const item2 = document.querySelector(".caja-buscar");
        item.style.display = "flex";
        item2.focus();
    }

    function hideGhost() {
        const item = document.querySelector(".ghost-buscador");
        item.style.display = "none";
    }
    
    return(
        <header>
            <div className="container-fluid px-4 g-0 cabecera">
                <div className="row position-relative">

                    <button className="btn-buscar p-1" onClick={() => showGhost()}>
                        <i class="bi bi-search"></i>
                    </button>

                    <div className="ghost-buscador">

                        <input type="text" className="caja-buscar" placeholder="Buscar Producto" 
                        aria-label="campo de texto para busqueda"  onBlur={() => hideGhost()}                        
                        />

                    </div>


                    <div className="col g2">
                        <button className="menuNav" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="bi bi-list"></i>
                        </button>

                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="/">Inicio</a></li>
                            <li><a className="dropdown-item" href="/products">Productos</a></li>
                            <li><a className="dropdown-item" href="/about">Quienes somos</a></li>
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
                                <Link to="/" type="button" class="btn btn-navBar btn-lg">Inicio</Link>
                                <Link to="/products" type="button" class="btn btn-navBar btn-lg">Productos</Link>
                                <Link to="/about" type="button" class="btn btn-navBar btn-lg">Quienes somos</Link>
                                <Link to="/" type="button" class="btn btn-navBar btn-lg">Contactanos</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>       
    );
}
