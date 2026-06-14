import React, { useEffect, useState } from "react";
import "./_Home.scss";
import { CarruselInf } from "../../Componentes/Carruseles";
import categ from "../../Assets/jpg/categorias/categorias.json";
import { Link, useNavigate } from "react-router-dom";
import { useObserver } from "../../Componentes/UseObs";
import { BottonCarousel, CategoryPages } from '../../api';
import { useTheContext } from "../../TheProvider";
import secureLocalStorage from "react-secure-storage";

export function Home() {
    const [CategoryList, setCategoryList] = useState(categ);
    const [bottomC, setBottomC] = useState(null);
    const [car1imgs, setCar1imgs] = useState(1);
    const { logged, queryEnded } = useTheContext()

    const navigate = useNavigate();

    const [observer, setElements, entries] = useObserver({
        treshhold: 0.25,
        rootMargin: 1,
        root: null
    });

    // Tu función original se queda tal cual la diseñaste
    const getPage = async () => {
        try {
            const Categorias = await CategoryPages(); // Traemos la lista de la API
            
            // Recorremos tu JSON estático 'categ' para inyectarle la página de la API
            const jsonConPropiedadAñadida = categ.map((itemJson) => {
                // Buscamos la coincidencia en los datos de la API
                const coincidenciaAPI = Categorias.find(
                    (e) => e.Categoria?.toLowerCase() === itemJson.descripcion?.toLowerCase()
                );

                // Retornamos el ítem original del JSON pero LE AÑADIMOS la propiedad 'Page' de la API
                return {
                    ...itemJson,
                    Page: coincidenciaAPI?.Pag ?? 1 // Si la API lo tiene usa ese, si no pone 1
                };
            });

            // Guardamos en el estado el JSON modificado con la nueva propiedad
            console.log('jsonConPropiedadAñadida', jsonConPropiedadAñadida)
            setCategoryList(jsonConPropiedadAñadida);

        } catch (error) {
            console.error("Error al sincronizar páginas:", error);
        }
    };

    // 2. Al cargar el componente, modificamos los datos
    useEffect(() => {
        getPage()
    }, []);
  
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
        let theCodeUser = ''
        let isLogged = false
        if(logged){
            isLogged = true
            theCodeUser = JSON.parse(secureLocalStorage.getItem('userData'))['Cod']
        }
        //console.log('isLogged: '+ isLogged + ' CodUser: ' + theCodeUser);
        //*return the list of products of the button carousel, if is not logged, use the default user code
        const bCaroucel = await BottonCarousel(
            {
                "logged": isLogged,
                "CodUser": theCodeUser
            }
        )
        const ReorderedList = alternateCategoria(bCaroucel)
        return ReorderedList
    }    

    //*Funcion para mostrar las categorias en categorias.json
    const itItems = CategoryList.map( (item, index) => {

        const imgAvif = require(`../../Assets/avif/categorias/${item.descripcion}.avif`)
        const imgjpg = require(`../../Assets/jpg/categorias/${item.descripcion}.jpg`)

        const handleNavigation = () => {
            // Si la API aún no ha inyectado 'Page', frenamos la navegación
            if (!item.Page) {
                console.log("Esperando datos de la API...");
                return; 
            }
            
            // Capturamos exactamente qué está leyendo JavaScript en este botón
            console.log("=== DATOS DEL CLICK ===");
            console.log("Categoría clickeada visualmente:", item.descripcion);
            console.log("ID del objeto actual:", item.id);
            console.log("Page que va a mandar al navigate:", item.Page);
            navigate(`/catalogo/${item.Page}`);
        };
        return(
            <div
                key={index}
                className="ImgBtnContainer"
                onClick={handleNavigation}
            >
                {/*<Link to={`catalogo/${item.Page}`}>*/}
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
                {/*</Link>*/}
            </div>
        );
    });

    const CarrouselItems = ({ baseSrc }) => {

        return Array.from({ length: car1imgs }).map((_, i) => (
            <div key={i} className={`carousel-item ${i === 0 ? 'active' : ''}`}>
                <div className="test h-100">
                    <Link to={i===0? '/catalogo/1':'productos'}>
                        <img
                            className="d-block w-100 h-100"
                            src={`${baseSrc}CARRUSEL_${i+1}.gif`}
                            alt={`Slide ${i+1}`}
                            decoding="async"
                        />
                    </Link>
                </div>
            </div>
        ));
    }

    useEffect(() => {
        const los_elementos = document.querySelectorAll(".el_lazy2");
        setElements(los_elementos)
    }, [setElements])

    useEffect(() => {
        async function fetchData() {
            const listOfProductCarrouselInf = await tobuttonCarousel()
            localStorage.setItem('productsBottomCarousel', JSON.stringify(listOfProductCarrouselInf))
            setBottomC(listOfProductCarrouselInf)
        }
        fetchData()

        // eslint-disable-next-line
    }, [ queryEnded ]);

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
        let index = 1;

        const checkCar1Imgs = async () => {
            const theUrl = `https://sivarwebresources.s3.amazonaws.com/IMG_CARRUSEL/CARRUSEL_${index}.gif`;
            try {
                const res = await fetch(theUrl, { method: 'HEAD', cache: "no-store" });
                
                if (res.ok) {
                    index++;
                    await checkCar1Imgs();
                } else {
                    setCar1imgs(index - 1);
                }
            } catch (error) {
                setCar1imgs(index - 1);
            }
        };

        checkCar1Imgs();
        window.scrollTo(0,0)
        return () => {
            //*the code below is to solve an bug when the user try to close a modal with thw back arrow
            try {
                document.getElementsByTagName("body")[0].removeAttribute("style");
                document.getElementsByTagName("body")[0].classList.remove("modal-open")
                document.querySelector('.modal-backdrop').remove()
            } catch (error) {

            }
        };
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
                        

                            <div className="row gy-2">

                                <div className="col ">
                                    <div id='carrusel1' className="carousel slide" data-bs-ride="carousel">
                                        <div className="carousel-indicators">
                                            {Array.from({ length: car1imgs }).map((_, i) => 
                                                <button 
                                                    key={i}
                                                    id="color-indicator"
                                                    type="button"
                                                    data-bs-target="#carrusel1"
                                                    data-bs-slide-to={`${i}`}
                                                    className={i===0 ? 'active':''}
                                                    aria-current={i===0 ? 'true':'false'}
                                                    aria-label={`Slide ${i+1}`}></button>
                                            )}
                                            {/* <button id="color-indicator" type="button" data-bs-target="#carrusel1" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                            <button id="color-indicator" type="button" data-bs-target="#carrusel1" data-bs-slide-to="2" aria-label="Slide 3"></button> */}
                                        </div>
                                        <div className="carousel-inner h-100 c-inner">

                                            <CarrouselItems baseSrc="https://sivarwebresources.s3.amazonaws.com/IMG_CARRUSEL/" />

                                            {/* <div className="carousel-item active">
                                                <div className="test h-100">
                                                    <Link to={'/especiales'}>
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
                                            </div> */}
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
                            </div>
                        </div>

                        <div className="caja-video">
                            <div className="row g-0">
                                
                                <div className="col">
                                    <video 
                                        width="100%"
                                        height="auto"
                                        src={require("../../Assets/mp4/video1.mp4")}
                                        poster={require('../../Assets/webp/frame1.webp')}
                                        autoPlay
                                        muted
                                        loop
                                    />
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
