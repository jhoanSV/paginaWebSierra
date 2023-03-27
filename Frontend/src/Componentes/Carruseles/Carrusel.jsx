import React from "react";
import "./_Carrusel.scss";
import data from "../../Assets/jpg/Promociones/promociones.json";

//`../Assets/productosJpg/${data.cod}.jpg`

export function Carrusel(props){
    return(
        <>
            <div id={`${props.idCarrusel}`} className="carousel slide h22" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target={`#${props.idCarrusel}`} data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target={`#${props.idCarrusel}`} data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target={`#${props.idCarrusel}`} data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner h-100">
                    <div className="carousel-item center active">
                        <img src={require(`../../Assets/jpg/Promociones/${data[0].cod}.jpg`)} className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item center">
                        <img src={require(`../../Assets/jpg/Promociones/${data[0].cod}.jpg`)} className="d-block w-100" alt="..."/>
                    </div>
                    <div className="carousel-item center">
                        <img src={require(`../../Assets/jpg/Promociones/${data[1].cod}.jpg`)} className="d-block w-100" alt="..."/>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target={`#${props.idCarrusel}`} data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target={`#${props.idCarrusel}`} data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </>
    );
}