import React from "react";
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
                                    <div id="carouselExampleAutoplaying-1" className="carousel slide" data-bs-ride="carousel">
                                        <div className="carousel-indicators">
                                            <button type="button" data-bs-target="#carouselExampleAutoplaying-1" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                            <button type="button" data-bs-target="#carouselExampleAutoplaying-1" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                            <button type="button" data-bs-target="#carouselExampleAutoplaying-1" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                        </div>
                                        <div className="carousel-inner">
                                            <div className="carousel-item active">
                                                <img src={require("../../Assets/productosJpg/CheemsOk.jpg")} className="d-block w-100" alt="..."/>
                                            </div>
                                            <div className="carousel-item">
                                                <img src={require("../../Assets/productosJpg/CheemsOk.jpg")} className="d-block w-100" alt="..."/>
                                            </div>
                                            <div className="carousel-item">
                                                <img src={require("../../Assets/productosJpg/CheemsOk.jpg")} className="d-block w-100" alt="..."/>
                                            </div>
                                        </div>
                                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying-1" data-bs-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Previous</span>
                                        </button>
                                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying-1" data-bs-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Next</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="col ">
                                    <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                                        <div className="carousel-indicators">
                                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                        </div>
                                        <div className="carousel-inner">
                                            <div className="carousel-item active">
                                                <img src={require("../../Assets/productosJpg/CheemsOk.jpg")} className="d-block w-100" alt="..."/>
                                            </div>
                                            <div className="carousel-item">
                                                <img src={require("../../Assets/productosJpg/CheemsOk.jpg")} className="d-block w-100" alt="..."/>
                                            </div>
                                            <div className="carousel-item">
                                                <img src={require("../../Assets/productosJpg/CheemsOk.jpg")} className="d-block w-100" alt="..."/>
                                            </div>
                                        </div>
                                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Previous</span>
                                        </button>
                                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Next</span>
                                        </button>
                                    </div>
                                </div>


                            </div>   


                        </div>

                        <div className="col-7">
                            <div className="row row-cols-1 g-0">
                                
                                <div className="col">
                                    <video 
                                        width="100%"
                                        height="auto"
                                        src={require("../../Assets/mp4/vid1.mp4")}                                    
                                        controls
                                        autoPlay
                                        muted
                                        loop
                                    />

                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section id="masProductos">

            </section>

        </div>
    );
}
