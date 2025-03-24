import React, { useEffect, useRef, useState } from "react";
import "./_ListItem.scss";
import { ModalProductDesk, ModalProductMob } from "../Modals";
import imgPlaceHolder from '../../Assets/png/placeHolderProduct.png';
import { Outlet, useNavigate, useLocation, useParams } from "react-router-dom";

export const ListItem=({llave, codigo, descripcion, descripcionComp,
    unitPrice, category, unitPaq, lista, agotado, ImgName, Show1, setShow1, callProduct})=>{

    const [key, setKey] = useState(0);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [isMobile, setIsMobile] = useState();
    const [imgSrc, setImgSrc] = useState(`https://sivarwebresources.s3.amazonaws.com/AVIF/${ImgName}.avif`)
    //const [Show1, setShow1] = useState(false);
    const theCaja = useRef()
    const navigate = useNavigate();
    const { id } = useParams();

    // Detecta si el producto de la URL coincide con este código y abre el modal
    /*useEffect(() => {
        if (id === codigo) {
            setShow1(true);
        }
    }, [id, codigo]);*/


    
    const resize_ob = new ResizeObserver(function() {
        setScreenWidth(window.innerWidth);
    });

    const click_caja = (productId) => {
        //this allow to lazy charge the modal content
        navigate(`/productos/${productId}`);
        setShow1(true)
    }

    const closeModal = () => {
        setShow1(false);
        navigate(`/productos`); // Regresa a la vista general sin ID en la URL
    };
    const observeBox = () =>{
        const elipsisjsjs = document.querySelectorAll('.ElipsJsjs')
        const observer = new IntersectionObserver((entries)=>{
            entries.forEach(entrie => {
                entrie.target.classList.toggle('active', entrie.isIntersecting);
            });
        },{
            rootMargin: '-100px',
        });
        elipsisjsjs.forEach(element => {
            observer.observe(element);
        });
    }

    useEffect(() => {
        resize_ob.observe(document.querySelector('#box'+llave));
        observeBox();
        //console.log("codigo: ", codigo, "ImgName: ", ImgName)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if(screenWidth < 700 ){
            setIsMobile(true)
        }else{
            setIsMobile(false)
        }            
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [screenWidth])    

    const handleError = () =>{
        setImgSrc(imgPlaceHolder)
    }

    useEffect(() => {
        setKey(prevKey => prevKey + 1);
        //setImgSrc(`https://sivarwebresources.s3.amazonaws.com/AVIF/${codigo}.avif`)

        const imageUrl = `https://sivarwebresources.s3.amazonaws.com/AVIF/${ImgName}.avif`;
    
        // Verificar el ETag del servidor
        fetch(imageUrl, { method: "HEAD", cache: "no-store"})
            .then((response) => {
            const eTag = response.headers.get("ETag"); // Obtener el ETag
            if (eTag) {
                setImgSrc(`${imageUrl}?v=${eTag}`); // Agregar el ETag como versión
            } else {
                setImgSrc(imageUrl); // Si no hay ETag, usar la URL normal
            }
            })
            .catch((error) => {
            console.error("Error verificando el ETag:", error);
            setImgSrc(imageUrl); // En caso de error, mostrar la imagen igual
            });
    }, [codigo]);

    return(
        <>
            <div id={`box${llave}`} ref={theCaja} className='caja' data-bs-toggle="modal" data-bs-target={`#producto${llave}`} onClick={()=>{callProduct(codigo)}}>                
                { agotado ?                    
                    <div className='soldOutLI' style={{
                        fontSize: (theCaja.current ? theCaja.current.clientWidth - 30 : 0)+'%'}}>
                        AGOTADO
                    </div>
                :
                    <></>
                }
                <div className={`imgProducto C${category}`}>
                    <picture>
                        <source
                            type="image/avif"
                            srcSet={imgSrc}
                        />
                        <img
                            src={imgSrc}
                            onError={()=>{setImgSrc(imgPlaceHolder)}}
                            alt="ImagenProducto"
                            decoding="async"
                        />
                    </picture>
                </div>

                <div>
                    <div className="ElipsJsjs" style={{fontSize: '1.1875rem', fontWeight: '700'}}>
                        {descripcion}</div>
                    <div className="ElipsJsjs" style={{fontSize: '1rem'}}>
                        {codigo}</div>
                </div>
            </div>
            
            {/*<div className="modal fade" id={`producto${llave}`} tabIndex="-1" aria-labelledby="productoLabel" aria-hidden="true">
                <div className="modal-dialog resizeModal">
                    { isMobile ? 
                        Show1 ? 
                        <ModalProductMob
                            key={key}
                            llave={llave}
                            img={imgSrc}
                            descripcion={descripcion}
                            descripcionComp={descripcionComp}
                            codigo={codigo}
                            category={category}
                            unitPaq={unitPaq}
                            unitPrice={unitPrice}
                            agotado={agotado}
                            lista={lista}
                            onHide={closeModal}
                        />:<></>
                        :
                        Show1 ?
                        <ModalProductDesk
                            key={key}
                            llave={llave}
                            img={imgSrc}
                            descripcion={descripcion}
                            descripcionComp={descripcionComp}
                            codigo={codigo}
                            category={category}
                            unitPaq={unitPaq}
                            unitPrice={unitPrice}
                            agotado={agotado}
                            lista={lista}
                            onHide={closeModal}
                        />
                        :
                        <></>
                    }
                </div>
            </div>*/}
        </>        
    );
}