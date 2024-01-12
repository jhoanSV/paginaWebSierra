import React, { useState } from "react";
import "./_ListItem.scss";
//import { Link } from "react-router-dom";

export const ListItem=({llave, codigo, descripcion, descripcionComp,
    unitPrice=5800, category='electricos', unitPaq=2 })=>{

    const [cant, setCant] = useState(unitPaq)
    const [totalPrice, setTotalPrice] = useState(unitPrice*cant)

    let imgpng = 0, logopng = 0, quantity = null
    let imgAvif = 0, logoAvif = 0    
    try {//intenta buscar la imagen png
        imgpng = require(`../../Assets/png/Productos/${codigo}.png`)
        logopng = require(`../../Assets/png/Logos/${category}.png`)
    } catch (error) {
        imgpng = 0
        logopng = 0
    }
    try {//intenta buscar la imagen AVIF
        imgAvif = require(`../../Assets/avif/Productos/${codigo}.avif`)
        logoAvif = require(`../../Assets/avif/Logos/${category}.avif`)
    } catch (error) {
        imgAvif = 0
        logoAvif = 0
    }
    if( unitPaq > 1 ){
        quantity = 'Paquete de ' + unitPaq + ' unidades'
    }else{
        quantity = 'Unidad'
    }
    const click_caja = () => {
        var el_id = "#lazy_modal" + (llave)
        var el_id2 = "#lazy2_modal" + (llave)
        const elemento = document.querySelector(el_id)
        const elemento2 = document.querySelector(el_id2)
        const elSrcValue = elemento.getAttribute('elsrc') 
        const elSrcValue2 = elemento2.getAttribute('elsrc') 
        elemento.srcset = elSrcValue
        elemento2.srcset = elSrcValue2
        elemento.removeAttribute("id")
        elemento2.removeAttribute("id")
    }

    function Formater(number){
        return new Intl.NumberFormat().format(number);
    };

    return(
        <>
            <div className="caja" data-bs-toggle="modal" data-bs-target={`#producto${llave}`} onClick={click_caja}>
                
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
                                    :
                                    <img
                                        src={imgpng}
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
                    <div className="modal-content productBox">
                        <button className="xButton" data-bs-dismiss="modal" aria-label="Close">
                            <i className="bi bi-x-circle-fill"></i>
                        </button>
                        <div className="modal-body p-0">
                            <div className="row row-cols-2">
                                <div className="col d-flex flex-column">
                                    <div className="imgModal">
                                        <picture>
                                            <source
                                                id={`lazy_modal${llave}`}
                                                type="image/avif"
                                                elsrc={imgAvif}
                                            />
                                            <img
                                                elsrc={imgpng}
                                                alt="imgProducto"
                                                decoding="async"
                                            />
                                        </picture>
                                    </div>
                                    <div className="commingsoon">
                                        <img
                                            src={require("../../Assets/png/Proximamente.png")}
                                            alt="commingsoon"
                                            decoding="async"
                                        />
                                    </div>
                                    <div className="mt-auto">                                        
                                        <p className="subTit"><strong>Descripcion:</strong></p>
                                        <div className="description scrollableY genFont">
                                            {descripcionComp}.<br/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col d-flex flex-column">
                                    <div className="mainFeatures">
                                        <div className="theLogo">
                                            <picture>
                                                <source
                                                    id={`lazy2_modal${llave}`}
                                                    type="image/avif"
                                                    elsrc={logoAvif}
                                                />
                                                <img
                                                    title='xDxD'
                                                    elsrc={logopng}
                                                    alt="imgProducto"
                                                    decoding="async"
                                                />
                                            </picture>
                                        </div>
                                        <h1 id="productolLabel">
                                            {descripcion}<br/>
                                            <span className="smolText">Cod: {codigo}</span>
                                        </h1>                                        
                                    </div>
                                    <div className='mt-auto'>
                                        <span className="smolText quantityText">{quantity}</span>
                                        <div className="subTit fw-bold mainBlue">
                                            Cantidad:<br/>
                                        </div>
                                        <div className="quantityBox">
                                            <button className="btnQuantity" onClick={() => {
                                                if((cant-unitPaq)>0){
                                                    setCant(cant-unitPaq)
                                                    setTotalPrice(unitPrice*(cant-unitPaq))
                                                }
                                            }}>
                                                -
                                            </button>
                                            <input className='quantity' type="number" min={1} step={unitPaq} value={cant} readOnly/>
                                            <button className="btnQuantity" onClick={() => {
                                                setCant(cant+unitPaq)
                                                setTotalPrice(unitPrice*(cant+unitPaq))
                                            }}>
                                                +
                                            </button>
                                        </div>
                                        <div className="unitPrice genFont">
                                            <span className='mainBlue fw-bold'>
                                                Valor:&nbsp;
                                            </span>
                                            <span className="fw-bold">                                            
                                                ${Formater(unitPrice)}
                                            </span>
                                        </div>
                                        <h1>
                                            <div className="totalPrice genFont mainBlue d-flex">
                                                Total:&nbsp;
                                                <span className='mainBlue fw-bold'>
                                                    ${Formater(totalPrice)}
                                                </span>
                                            </div>
                                        </h1>
                                        <button className="btnDescBox">
                                            Agregar al carrito
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        
    );
}