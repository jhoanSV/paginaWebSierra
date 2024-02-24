import React from "react";
import "./_header.scss";
import { Link } from "react-router-dom";
import { getGlobal } from "../../globals/globals";
import secureLocalStorage from "react-secure-storage";


export function Header() {

    /*Funciones para mostrar o esconder caja de texto
      cuando se hace click o se pierde el focus de la caja
    */
    let userName = null
   
    if(getGlobal('isLogged')) userName = JSON.parse(secureLocalStorage.getItem('userData'))['Contacto']
    
    return(
        <header>
            <div className="container-fluid px-4 g-0 cabecera">
                <div className="row position-relative">
                    <div className="col g2">{/*Buttons group of the mobile*/}
                        <button className="menuNav" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="bi bi-list"></i>
                        </button>
                        <div className="logo mob">                            
                            <Link to="/" type="button">
                                <picture>
                                    <source
                                        type="image/avif"
                                        srcSet={require("../../Assets/avif/LogoSivar.avif")}
                                        />
                                    <img
                                        src={require("../../Assets/png/LogoSivar.png")}
                                        width="2207px"
                                        height="839px"
                                        alt="LogoSierra"
                                        decoding="async"
                                        />
                                </picture>
                            </Link>
                        </div>
                        <ul className="dropdown-menu">
                            <li><Link to="/" type="button" className="dropdown-item">Inicio</Link></li>
                            <li><Link to={'productos'} type="button" className="dropdown-item" state={{ bookM: `INICIO`}}>
                                    Productos
                                </Link>
                            </li>
                            <li><Link to="/nosotros" type="button" className="dropdown-item">Quienes somos</Link></li>
                            <li><Link to="/contactanos" type="button" className="dropdown-item">Contactanos</Link></li>
                        </ul>
                    </div>

                    <div className="col logo">
                        <Link to="/" type="button">
                            <picture>
                                <source
                                    type="image/avif"
                                    srcSet={require("../../Assets/avif/LogoSivar.avif")}
                                />
                                <img
                                    src={require("../../Assets/png/LogoSivar.png")}
                                    width="2207px"
                                    height="839px"
                                    alt="LogoSierra"
                                    decoding="async"
                                />
                            </picture>
                        </Link>
                    </div>

                    <div className="col buscar">
                        <div style={{height: 'min-content', position: 'relative'}}>
                            <input type='text' placeholder='Buscar producto'
                            />
                            <i className="bi bi-search"></i>
                        </div>
                    </div>

                    <div className="col user">
                        { getGlobal('isLogged') ?
                            <>
                                <div className="Tit userNameHead">
                                    Bienvenido {userName}
                                </div>
                                <Link to="/carrito" type="button" className='btnCart'>
                                    <i className="bi bi-cart4"></i>
                                </Link>
                                <Link to="/perfil" type="button" className='userIcon'>
                                    <i className="bi bi-hexagon-fill userHex"></i>
                                    <div className="userText">
                                        <span>{userName[0].toUpperCase()}</span>
                                    </div>
                                </Link>
                            </>
                            :
                            <>
                                <Link type="button" className='btnCart' onClick={()=>{alert('Pailañero');}}>
                                    <i className="bi bi-cart4"></i>
                                </Link>
                                <Link to="/inicio_sesion" type="button" className='btnSignIn'>
                                    <i className="bi bi-person-circle"></i>
                                    <div>
                                        <span>Iniciar sesion</span>
                                    </div>
                                </Link>
                            </>
                        }
                    </div>

                </div>

                <div className="row">
                    <div className="col">
                        <div className="buscar mob" style={{height: 'min-content', position: 'relative'}}>
                            <input type='text' placeholder='Buscar producto'
                            />
                            <i className="bi bi-search"></i>
                        </div>
                        <div className="grupoBotones">
                            <div className="btn-group g1 flex-wrap">{/*Buttons group of the main view (computer)*/}
                                <Link to="/" type="button" className="btn btn-navBar btn-lg">Inicio</Link>
                                <Link to="productos" type="button" className="btn btn-navBar btn-lg" state={{ bookM: `INICIO`}}>
                                    Productos
                                </Link>
                                <Link to="/catalogo/inicio" type="button" className="btn btn-navBar btn-lg">Catalogo</Link>
                                <Link to="/nosotros" type="button" className="btn btn-navBar btn-lg">Quienes somos</Link>
                                <Link to="/contactanos" type="button" className="btn btn-navBar btn-lg">Contactanos</Link>
                            </div>
                        </div>                        
                    </div>
                </div>
            </div>
        </header>       
    );
}
