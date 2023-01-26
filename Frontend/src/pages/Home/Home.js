import React from "react";
import "./_Home.scss";



export function Home() {
    return (
        <div className="inicio px-4 py-3">
            <section id="sierra">
                <div className="container-xxl p-0 avi">
                    <div className="row g-0">
                        <div className="col ">
                            <div class="d-flex justify-content-center fs-2 gx-1">
                                <p>Eres <span> Ferretero? </span> tenemos precios especiales para ti... contactanos</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-xxl p-0 ">
                    <div className="row g-0">
                        <div className="col-3 ">
                            <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <img src={require("../../Assets/jpg/CheemsOk.jpg")} class="d-block w-100" alt="..."/>
                                    </div>
                                    <div class="carousel-item">
                                        <img src="..." class="d-block w-100" alt="..."/>
                                    </div>
                                    <div class="carousel-item">
                                        <img src="..." class="d-block w-100" alt="..."/>
                                    </div>
                                </div>
                                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
