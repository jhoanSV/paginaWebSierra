import React, { useEffect, useState } from "react";
import "./_ListItem.scss";
import { ModalProductDesk, ModalProductMob } from "../Modals";

export const ListItem=({llave, codigo, descripcion, descripcionComp,
    unitPrice, category, unitPaq, lista})=>{

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [isMobile, setIsMobile] = useState();
    const [Show1, setShow1] = useState(false);

    let imgpng = 0
    let imgAvif = 0
    
    const resize_ob = new ResizeObserver(function() {
        setScreenWidth(window.innerWidth);
    });
    
    try {//intenta buscar la imagen png
        imgpng = require(`../../Assets/png/Productos/${codigo}.png`)
    } catch (error) {
        imgpng = 0
    }
    try {//intenta buscar la imagen AVIF
        imgAvif = require(`../../Assets/avif/Productos/${codigo}.avif`)
    } catch (error) {
        imgAvif = 0
    }

    const click_caja = () => {
        /*var el_id = "#lazy_modal" + (llave)
        const elemento = document.querySelector(el_id)
        const elSrcValue = elemento.getAttribute('elsrc') 
        elemento.srcset = elSrcValue
        elemento.removeAttribute("id")*/
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

    return(
        <>
            <div id={`box${llave}`} className='caja' data-bs-toggle="modal" data-bs-target={`#producto${llave}`} onClick={click_caja}>
                
                <div className="row">
                    <div className="col h-100">
                        <div className="row row-cols-1 g-0">

                            <div className={`col imgProducto C${category}`}>
                                { imgAvif ? 
                                    <picture>
                                        <source                                            
                                            type="image/avif"
                                            srcSet={imgAvif}                                            
                                        />
                                        <img                                            
                                            src={imgpng}
                                            alt="categoria"
                                            decoding="async"
                                        />
                                    </picture>
                                    : imgpng ?                                    
                                    <img
                                        src={imgpng}
                                        alt="categoria"
                                        decoding="async"
                                    />
                                    :
                                    <img
                                        src={require('../../Assets/png/placeHolderProduct.png')}
                                        alt="categoria"
                                        decoding="async"
                                    />
                                }
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
                            llave={llave}
                            imgAvif={imgAvif}
                            imgpng={imgpng}
                            descripcion={descripcion}
                            descripcionComp={descripcionComp}
                            codigo={codigo}
                            category={category}
                            unitPaq={unitPaq}
                            unitPrice={unitPrice}
                            lista={lista}
                        />:<></>
                        :
                        Show1 ?
                        <ModalProductDesk
                            llave={llave}
                            imgAvif={imgAvif}
                            imgpng={imgpng}
                            descripcion={descripcion}
                            descripcionComp={descripcionComp}
                            codigo={codigo}
                            category={category}
                            unitPaq={unitPaq}
                            unitPrice={unitPrice}
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