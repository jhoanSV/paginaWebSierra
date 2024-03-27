import React, { useEffect, useRef, useState } from "react";
import "./_ListItem.scss";
import { ModalProductDesk, ModalProductMob } from "../Modals";
import imgPlaceHolder from '../../Assets/png/placeHolderProduct.png'

export const ListItem=({llave, codigo, descripcion, descripcionComp,
    unitPrice, category, unitPaq, lista, agotado})=>{

    const [key, setKey] = useState(0);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [isMobile, setIsMobile] = useState();
    const [imgSrc, setImgSrc] = useState(`https://sivar.com.co/Imgs/ProductsAVIF/${codigo}.avif`)
    const [Show1, setShow1] = useState(false);
    const theCaja = useRef()
    
    const resize_ob = new ResizeObserver(function() {
        setScreenWidth(window.innerWidth);
    });

    const click_caja = () => {
        //this allow to lazy charge the modal content
        setShow1(true)
    }

    useEffect(() => {
        resize_ob.observe(document.querySelector('#box'+llave));
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
        //console.log(`img ${codigo} not found`);
        setImgSrc(imgPlaceHolder)
    }

    useEffect(() => {
        setKey(prevKey => prevKey + 1);
        setImgSrc(`https://sivar.com.co/Imgs/ProductsAVIF/${codigo}.avif`)
    }, [codigo]);

    return(
        <>
            <div id={`box${llave}`} ref={theCaja} className='caja' data-bs-toggle="modal" data-bs-target={`#producto${llave}`} onClick={click_caja}>                
                { agotado ?                    
                    <div className='soldOutLI' style={{fontSize: (theCaja.current ? theCaja.current.clientWidth - 30 : 0)+'%'}}>
                        AGOTADO
                    </div>
                :
                    <></>
                }
                <div className="row">
                    <div className="col h-100">
                        <div className="row row-cols-1 g-0">

                            <div className={`col imgProducto C${category}`}>
                                <picture>
                                    <source
                                        type="image/avif"
                                        srcSet={imgSrc}
                                    />
                                    <img
                                        src={imgSrc}
                                        onError={handleError}
                                        alt="ImagenProducto"
                                        decoding="async"
                                    />
                                </picture>
                            </div>

                            <div className="col">
                                <div className="descFont titleFont">{descripcion}</div>
                                <div className="codFont">{codigo}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="modal fade" id={`producto${llave}`} tabIndex="-1" aria-labelledby="productoLabel" aria-hidden="true">
                
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
                        />
                        :
                        <></>
                    }
                </div>
            </div>
        </>        
    );
}