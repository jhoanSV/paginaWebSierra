import React from "react";
import "./_CarruselInf.scss";
import data from "../Assets/productosJpg/productos.json";

export function CarruselInf(){
    return(
        <>
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carrusel1" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carrusel1" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carrusel1" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner ">
                <div className="carousel-item active">
                    <img src={require(`../Assets/productosJpg/${data.cod}.jpg`)} className="w-100" alt="..."/>
                </div>
                <div className="carousel-item">                                                
                    <img src={require(`../Assets/productosJpg/${data.cod}.jpg`)}  alt="..."/>                                                
                </div>
                <div className="carousel-item">
                    <img src={require(`../Assets/productosJpg/${data.cod}.jpg`)}  alt="..."/>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carrusel1" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carrusel1" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </>
    );
}