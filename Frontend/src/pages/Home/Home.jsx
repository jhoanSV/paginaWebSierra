import React from "react";
import "./_Home.scss";
//import { Carrusel } from "../../Componentes/Carruseles/Carrusel";
import { CarruselInf } from "../../Componentes/Carruseles";
import arJason from "../../Assets/jpg/productosJpg/productos.json";
import categ from "../../Assets/jpg/categorias/categorias.json";
import { Link } from "react-router-dom";

export function Home() {

    const itItems = categ.map( item => {

        return(
            <>
                <div className="c-categ">

                    <Link to={"catalogo"} state={{ bookM: `${item.descripcion.toUpperCase()}` }}>
                        <img
                            className={`${item.color}`}
                            src={require(`../../Assets/jpg/categorias/${item.descripcion}.jpg`)}
                            alt="categoria"
                        />
                    </Link>

                </div>

            </>
        );
    });

    return (
        <div className="inicio">
            <section id="sierra">
                <div className="container-fluid p-0">
                    
                    <div className="row g-0 avi fs-2">
                        <div className="col ">
                            <div className="d-flex justify-content-center gx-1">
                                <p>Eres <span> Ferretero? </span> tenemos precios especiales para ti... <span>contactanos</span></p>
                            </div>
                        </div>
                    </div>
                    

                    <div className="row py-3 gx-4">
                        <div className="col-5 caja-carrusel">
                        

                            <div className="row row-cols-1 gy-2">

                                <div className="col ">
                                    <div id='carrusel1' className="carousel slide" data-bs-ride="carousel">
                                        <div className="carousel-indicators">
                                            <button id="color-indicator" type="button" data-bs-target={`#carrusel1`} data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>                                            
                                        </div>
                                        <div className="carousel-inner h-100 c-inner">
                                            <div className="carousel-item active">
                                                <div className="test h-100">
                                                    <img src={require(`../../Assets/jpg/aliados/max.jpg`)} className="d-block w-100 h-100" alt="..."/>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="carousel-control-prev" type="button" data-bs-target={`#carrusel1`} data-bs-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Previous</span>
                                        </button>
                                        <button className="carousel-control-next" type="button" data-bs-target={`#carrusel1`} data-bs-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Next</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="col">
                                    <div id='carrusel2' className="carousel slide" data-bs-ride="carousel">
                                        <div className="carousel-indicators">
                                            <button id="color-indicator" type="button" data-bs-target={`#carrusel2`} data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                            <button id="color-indicator" type="button" data-bs-target={`#carrusel2`} data-bs-slide-to="1" aria-label="Slide 2"></button>
                                        </div>
                                        <div className="carousel-inner h-100 c-inner">
                                            <div className="carousel-item active">
                                                <div className="test h-100">
                                                    <img src={require(`../../Assets/jpg/Promociones/promoSuperBonder.jpg`)} className="d-block w-100 h-100" alt="..."/>
                                                </div>
                                            </div>
                                            <div className="carousel-item">
                                                <div className="test h-100">
                                                    <img src={require(`../../Assets/jpg/Promociones/promoTronex.jpg`)} className="d-block w-100 h-100" alt="..."/>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="carousel-control-prev" type="button" data-bs-target={`#carrusel2`} data-bs-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Previous</span>
                                        </button>
                                        <button className="carousel-control-next" type="button" data-bs-target={`#carrusel2`} data-bs-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Next</span>
                                        </button>
                                    </div>
                                </div>


                            </div>   


                        </div>

                        <div className="caja-video">
                            <div className="row row-cols-1 g-0">
                                
                                <div className="col">
                                    <video 
                                        width="100%"
                                        height="auto"
                                        src={require("../../Assets/mp4/video1.mp4")}
                                        autoPlay
                                        muted
                                        loop
                                    />

                                </div>

                                <div className="col">
                                    <div className="btn-catalogo1">
                                        <a href={require("../../Assets/docs/Catalogo.pdf")} download>
                                            <div className='d-flex align-items-center'>
                                                <img
                                                    src={require("../../Assets/png/DescargaCatalogo2.png")}
                                                    alt="BotonCatalogo"
                                                />
                                                <h1><span>DESCARGA NUESTRO <br/>CATALOGO!</span></h1>
                                            </div>
                                        </a>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                    <div className="row py-3 gx-4 justify-content-center">

                        <div className="col">

                            <div id="categorias" className="d-flex flex-wrap">

                                {itItems}

                            </div>

                        </div>

                    </div>


                </div>
            </section>

            <section id="masProductos">
                <div className="container-fluid p-0">
                    <div className="row g-0">
                        <div className="col">
                            <div className="fs-2 gx-1">
                                <p><b>Conoce otros productos para ti</b></p>
                            </div>
                        </div>
                    </div>

                    <div className="row g-0">
                        <div className="col">
                            <CarruselInf 
                                lista1={arJason}
                            />
                        </div>                            
                    </div>
                </div>
            </section>

        </div>
    );
}
