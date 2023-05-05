import React from "react";
import "./_Home.scss";
import { Carrusel } from "../../Componentes/Carruseles/Carrusel";
import { CarruselInf } from "../../Componentes/Carruseles";
import arJason from "../../Assets/jpg/productosJpg/productos.json";
import categ from "../../Assets/jpg/categorias/categorias.json";
import { Link } from "react-router-dom";

export function Home() {

    const itItems = categ.map( item => {

        return(
            <>
                <div key={item.id} className="c-categ">

                    <Link to={`/categories/${item.descripcion}`}>
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
                                <p>Eres <span> Ferretero? </span> tenemos precios especiales para ti... contactanos</p>
                            </div>
                        </div>
                    </div>
                    

                    <div className="row py-3 gx-4">
                        <div className="col-5 caja-carrusel">
                        

                            <div className="row row-cols-1 gy-2">

                                <div className="col ">
                                    <Carrusel
                                        idCarrusel={"c1"}
                                    />
                                </div>

                                <div className="col" id="carrusel2">
                                    <Carrusel
                                        idCarrusel={"car2"}
                                    />
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
                                        <a href={require("../../Assets/docs/CATALOGO-NUEVO-FEB-2023.pdf")} download>
                                            <img
                                                src={require("../../Assets/png/DescargaCatalogo.png")}
                                                width="713"
                                                height="240"
                                                alt="BotonCatalogo"
                                            />
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
