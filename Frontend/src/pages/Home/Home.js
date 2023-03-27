import React from "react";
import { Carrusel } from "../../Componentes/Carruseles/Carrusel";
import "./_Home.scss";




export function Home() {
    return (
        <div className="inicio px-4 py-3">
            <section id="sierra">
                <div className="container-xxl p-0">
                    
                    <div className="row g-0 avi">
                        <div className="col ">
                            <div className="d-flex justify-content-center fs-2 gx-1">
                                <p>Eres <span> Ferretero? </span> tenemos precios especiales para ti... contactanos</p>
                            </div>
                        </div>
                    </div>
                    

                    <div className="row g-0 py-3 gx-4">
                        <div className="col-5">
                        

                            <div className="row row-cols-1 g-0">

                                <div className="col ">
                                    <Carrusel
                                        idCarrusel={"c1"}
                                    />
                                </div>

                                <div className="col ">
                                    <Carrusel
                                        idCarrusel={"car2"}
                                    />
                                </div>


                            </div>   


                        </div>

                        <div className="col-7">
                            <div className="row row-cols-1 g-0">
                                
                                <div className="col">
                                    <video 
                                        width="100%"
                                        height="auto"
                                        src=""                                    
                                        controls
                                        autoPlay
                                        muted
                                        loop
                                    />

                                </div>

                                <div className="col btn-catalogo">
                                    <a href="">
                                        Descarga nuestro catalogo
                                    </a>                                                                      
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section id="masProductos">
                <div className="container-xxl p-0">
                    <div className="row g-0">
                        <div className="col">
                            <div className="fs-2 gx-1">
                                <p><b>Conoce otros productos para ti</b></p>
                            </div>
                        </div>
                    </div>

                    <div className="row g-0">
                        <div className="col">
                            <div id="carrusel-inferior" className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-indicators">
                                    <button type="button" data-bs-target="#carrusel-inferior" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#carrusel-inferior" data-bs-slide-to="1" aria-label="Slide 2"></button>                                    
                                </div>
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <div className="row g-0">
                                            <div className="col g-0">
                                                <img src={require("../../Assets/jpg/productosJpg/CheemsOk.jpg")}  alt="..."/>
                                            </div>                                                                                        
                                            <div className="col g-0">
                                                <img src={require("../../Assets/jpg/productosJpg/CheemsOk.jpg")}  alt="..."/>                                                
                                            </div>
                                            <div className="col g-0">
                                                <img src={require("../../Assets/jpg/productosJpg/CheemsOk.jpg")}  alt="..."/>                                                
                                            </div>
                                            <div className="col g-0">
                                                <img src={require("../../Assets/jpg/productosJpg/CheemsOk.jpg")}  alt="..."/>                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <div className="row g-0">
                                            <div className="col g-0">
                                                <img src={require("../../Assets/jpg/productosJpg/CheemsOk.jpg")}  alt="..."/>
                                            </div>                                                                                        
                                            <div className="col g-0">
                                                <img src={require("../../Assets/jpg/productosJpg/CheemsOk.jpg")}  alt="..."/>                                                
                                            </div>
                                            <div className="col g-0">
                                                <img src={require("../../Assets/jpg/productosJpg/CheemsOk.jpg")}  alt="..."/>                                                
                                            </div>
                                        </div>
                                    </div>                                    
                                </div>
                                <button className="carousel-control-prev" type="button" data-bs-target="#carrusel-inferior" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carrusel-inferior" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
