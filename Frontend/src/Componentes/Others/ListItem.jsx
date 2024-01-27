import React from "react";
import "./_ListItem.scss";
import { /*ModalProductDesk,*/ ModalProductMob } from "../Modals";

export const ListItem=({llave, codigo, descripcion, descripcionComp,
    unitPrice=5800, category='electricos', unitPaq=2})=>{

    let imgpng = 0
    let imgAvif = 0 
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
        var el_id = "#lazy_modal" + (llave)
        const elemento = document.querySelector(el_id)
        const elSrcValue = elemento.getAttribute('elsrc') 
        elemento.srcset = elSrcValue
        elemento.removeAttribute("id")
    }

    return(
        <>
            <div className='caja' data-bs-toggle="modal" data-bs-target={`#producto${llave}`} onClick={click_caja}>
                
                <div className="row">
                    <div className="col h-100">
                        <div className="row row-cols-1 g-0">

                            <div className="col imgProducto">                               
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
                <div className="modal-dialog modal-lg">
                    <ModalProductMob
                        imgAvif={imgAvif}
                        imgpng={imgpng}
                        descripcion={descripcion}
                        descripcionComp={descripcionComp}
                        codigo={codigo}
                        category={category}
                        unitPaq={unitPaq}
                        unitPrice={unitPrice}
                    />
                </div>
            </div>

                        
        </>        
    );
}