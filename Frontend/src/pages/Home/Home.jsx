import React, { useEffect } from "react";
import "./_Home.scss";
//import { Carrusel } from "../../Componentes/Carruseles/Carrusel";
import { CarruselInf } from "../../Componentes/Carruseles";
import arJason from "../../Assets/png/Productos/productos.json";
import categ from "../../Assets/jpg/categorias/categorias.json";
import { Link } from "react-router-dom";
import { useObserver } from "../../Componentes/UseObs";

export function Home() {
    const [observer, setElements, entries] = useObserver({
        treshhold: 0.25,
        rootMargin: 1,
        root: null
    });

    //Funcion para mostrar las categorias en categorias.json
    const itItems = categ.map( item => {

        const imgAvif = require(`../../Assets/avif/categorias/${item.descripcion}.avif`)
        const imgjpg = require(`../../Assets/jpg/categorias/${item.descripcion}.jpg`)
        return(                        
            <>
                <div className="ImgBtnContainer">

                    <Link to={`catalogo/${item.descripcion}`}>
                        <picture>
                            <source
                                className="el_lazy2"
                                type="image/avif"
                                elsrc={imgAvif}
                            />
                            <img
                                className={`${item.color} el_lazy`}
                                elsrc={imgjpg}
                                alt="categoria"
                                decoding="async"
                            />
                        </picture>
                    </Link>

                </div>

            </>
        );
    });

    useEffect(() => {
        const los_elementos = document.querySelectorAll(".el_lazy2");
        setElements(los_elementos)
    }, [setElements])

    useEffect(() => {
        entries.forEach(entry=>{
            if (entry.isIntersecting){                
                const elmt = entry.target;
                const elSrcValue = elmt.getAttribute('elsrc')
                elmt.srcset = elSrcValue
                observer.unobserve(elmt)
            }
        });
    }, [entries, observer])

    return (
        <div className="inicio">
            <section id="sierra">
                <div className="container-fluid p-0">
                    
                    <div className="row g-0 avi fs-2">
                        <div className="col ">
                            <div className="d-flex justify-content-center gx-1">
                            <p>Eres <span> Ferretero? </span> tenemos precios especiales para ti... <Link to="/contactUs"><span>contactanos</span></Link></p>
                            </div>
                        </div>
                    </div>
                    

                    <div className="row py-3 gx-4">
                        <div className="col-5 caja-carrusel">
                        

                            <div className="row row-cols-1 gy-2">

                                <div className="col ">
                                    <div id='carrusel1' className="carousel slide" data-bs-ride="carousel">
                                        <div className="carousel-indicators">
                                            <button id="color-indicator" type="button" data-bs-target="#carrusel1" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                            <button id="color-indicator" type="button" data-bs-target="#carrusel1" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                            <button id="color-indicator" type="button" data-bs-target="#carrusel1" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                        </div>
                                        <div className="carousel-inner h-100 c-inner">
                                            <div className="carousel-item active">
                                                <div className="test h-100">
                                                    <Link to={'/productos/especiales'}>
                                                        <picture>
                                                            <source
                                                                type="image/avif"
                                                                srcSet={require("../../Assets/avif/imgCarrusel3.avif")}
                                                                />
                                                            <img
                                                                className="d-block w-100 h-100"
                                                                src={require(`../../Assets/jpg/imgCarrusel3.jpg`)}
                                                                alt="..."
                                                                decoding="async"
                                                                />
                                                        </picture>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="carousel-item">
                                                <div className="test h-100">
                                                    <picture>
                                                        <source
                                                            type="image/avif"
                                                            srcSet={require("../../Assets/avif/TekBond.avif")}
                                                        />
                                                        <img
                                                            className="d-block w-100 h-100 el_lazy"
                                                            src={require(`../../Assets/jpg/aliados/TekBond.jpg`)}
                                                            alt="..."
                                                            decoding="async"
                                                        />
                                                    </picture>
                                                </div>
                                            </div>
                                            <div className="carousel-item">
                                                <div className="test h-100">                                                    
                                                    <picture>
                                                        <source
                                                            type="image/avif"
                                                            srcSet={require("../../Assets/avif/max.avif")}
                                                        />
                                                        <img
                                                            className="d-block w-100 h-100 el_lazy"
                                                            src={require(`../../Assets/jpg/aliados/max.jpg`)}
                                                            alt="..."
                                                            decoding="async"
                                                        />
                                                    </picture>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="carousel-control-prev" type="button" data-bs-target={`#carrusel1`} data-bs-slide="prev">
                                            <span id="color-indicator" className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Previous</span>
                                        </button>
                                        <button className="carousel-control-next" type="button" data-bs-target={`#carrusel1`} data-bs-slide="next">
                                            <span id="color-indicator" className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Next</span>
                                        </button>
                                    </div>
                                </div>

                                <div className="col">
                                    <div id='carrusel2' className="carousel slide" data-bs-ride="carrusel2">
                                        <div className="carousel-indicators">
                                            <button id="color-indicator" type="button" data-bs-target={`#carrusel2`} data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                            <button id="color-indicator" type="button" data-bs-target={`#carrusel2`} data-bs-slide-to="1" aria-label="Slide 2"></button>
                                        </div>
                                        <div className="carousel-inner h-100 c-inner">
                                            <div className="carousel-item active">
                                                <div className="test h-100">                                                    
                                                    <picture>
                                                        <source
                                                            type="image/avif"
                                                            srcSet={require("../../Assets/avif/PromoPegante.avif")}
                                                        />
                                                        <img
                                                            className="d-block w-100 h-100 el_lazy"
                                                            src={require(`../../Assets/jpg/Promociones/PromoPegante.jpg`)}
                                                            alt="..."
                                                            decoding="async"
                                                        />
                                                    </picture>
                                                </div>
                                            </div>
                                            <div className="carousel-item">
                                                <div className="test h-100">
                                                    <picture>
                                                        <source
                                                            type="image/avif"
                                                            srcSet={require("../../Assets/avif/PromoSilicona.avif")}
                                                        />
                                                        <img
                                                            className="d-block w-100 h-100 el_lazy"
                                                            src={require(`../../Assets/jpg/Promociones/PromoSilicona.jpg`)}
                                                            alt="..."
                                                            decoding="async"
                                                        />
                                                    </picture>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="carousel-control-prev" type="button" data-bs-target={`#carrusel2`} data-bs-slide="prev">
                                            <span id="color-indicator" className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Previous</span>
                                        </button>
                                        <button className="carousel-control-next" type="button" data-bs-target={`#carrusel2`} data-bs-slide="next">
                                            <span id="color-indicator" className="carousel-control-next-icon" aria-hidden="true"></span>
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
                                        <a href={require("../../Assets/docs/Catalogo2024.pdf")} download>
                                            <div className='d-flex align-items-center'>
                                                <img
                                                    src={require("../../Assets/png/DescargaCatalogo2.png")}
                                                    alt="BotonCatalogo"
                                                    className="el_lazy"
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
