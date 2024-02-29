import React, { useEffect, useState } from "react";
import "./_Home.scss";
import { CarruselInf } from "../../Componentes/Carruseles";
import categ from "../../Assets/jpg/categorias/categorias.json";
import { Link } from "react-router-dom";
import { useObserver } from "../../Componentes/UseObs";
import { BottonCarousel } from '../../api';
import { getGlobal } from "../../globals/globals";
import secureLocalStorage from "react-secure-storage";

export function Home() {

    const [bottomC, setBottomC] = useState(null);

    const [observer, setElements, entries] = useObserver({
        treshhold: 0.25,
        rootMargin: 1,
        root: null
    });

    //Todo: Create the function that alternate the cathegories
    function alternateCategoria(jsonArray) {
        // Use Set to store unique values
        const uniqueCategories = new Set();

        // Iterate through the array and add each "Categoria" value to the Set
        jsonArray.forEach(item => {
            uniqueCategories.add(item.Categoria);
        });

        // Convert the Set to an array and return
        const categories = Array.from(uniqueCategories)
        console.log('categories', categories)
        //Create an eplty array for the new order and an index for the list of categorie
        const reorderedArray = [];
        
        while (jsonArray.length > 0) {
            for (let i = 0; i < categories.length; i++) {
                for (let j = 0; j < jsonArray.length; j++) {
                    if (jsonArray[j].Categoria === categories[i]) {
                        reorderedArray.push(jsonArray[j]);
                        jsonArray.splice(j, 1); // Remove the matched element from jsonArray
                        break;
                    } 
                }
            }
        }
        return reorderedArray;
      }

    const tobuttonCarousel = async() =>{
        let theCodeUser = 0
        let isLogged = false
        if(getGlobal('isLogged')){
            isLogged = true
            theCodeUser = JSON.parse(secureLocalStorage.getItem('userData'))['Cod']
        }
        //*return the list of products of the button carousel, if is not logged, use the default user code
        console.log('si entro a la funcion')
        const bCaroucel = await BottonCarousel(
            {
                "logged": isLogged,
                "CodUser": theCodeUser
            }
        )
        const ReorderedList = alternateCategoria(bCaroucel) 
        console.log('ReorderedList', ReorderedList)
        return ReorderedList
    }    

    //*Funcion para mostrar las categorias en categorias.json
    const itItems = categ.map( (item, index) => {

        const imgAvif = require(`../../Assets/avif/categorias/${item.descripcion}.avif`)
        const imgjpg = require(`../../Assets/jpg/categorias/${item.descripcion}.jpg`)
        return(
            <div key={index} className="c-categ">

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
    
    useEffect(() => {
        async function fetchData() {
            const jsjs = await tobuttonCarousel()
            console.log('Setea nuevo json');
            localStorage.setItem('productsBottomCarousel', JSON.stringify(jsjs))
            setBottomC(jsjs)
        }        
        fetchData()
        // eslint-disable-next-line
    }, []);

    return (
        <div className="inicio">            
            <section id="sierra">
                <div className="container-fluid p-0">
                    
                    <div className="row g-0 avi fs-2">
                        <div className="col ">
                            <div className="d-flex justify-content-center gx-1">
                                <p>Eres <span> Ferretero? </span> tenemos precios especiales para ti... <Link to="/contactanos"><span>contactanos</span></Link></p>
                            </div>
                        </div>
                    </div>
                    

                    <div className="row py-3 gx-4">
                        <div className="col-5 caja-carrusel">
                        

                            <div className="row row-cols-1 gy-2">

                                <div className="col ">
                                    <div id='carrusel1' className="carousel slide" data-bs-ride="carousel">
                                        <div className="carousel-indicators">                                            
                                            <button type="button" data-bs-target="carrusel1" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                            <button type="button" data-bs-target="carrusel1" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                        </div>
                                        <div className="carousel-inner h-100 c-inner">
                                            <div className="carousel-item active">
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
                            { bottomC &&
                            <CarruselInf
                                //lista1={arJason}
                                lista1={bottomC}
                            />}
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
