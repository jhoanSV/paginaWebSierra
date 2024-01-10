import React, { useState } from "react";
import "./_ListItem.scss";
//import { Link } from "react-router-dom";

export const ListItem=({llave, codigo, descripcion, descripcionComp, unitPrice=5800})=>{

    const [totalPrice, setTotalPrice] = useState()    

    let imgjpg = 0
    let imgAvif = 0
    try {//intenta buscar la imagen jpg
        imgjpg = require(`../../Assets/png/Productos/${codigo}.png`)
    } catch (error) {
        imgjpg = 0
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
        setTotalPrice(777)
    }

    return(
        //src={require(`../../Assets/jpg/Promociones/${data[0].cod}.jpg`)}
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
                                            src={imgjpg}
                                            alt="categoria"
                                            decoding="async"
                                        />
                                    </picture>
                                    :
                                    <img
                                        src={imgjpg}
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
                    <div className="modal-content p-3">
                        <div className="modal-body p-0">
                            <div className="descBox">
                                <div className="row">
                                    <div className="col-6">
                                        <h1 className="modal-title fs-5 d-block" id="productolLabel">
                                            {descripcion}<br/>
                                            <span className="codigo">Cod: {codigo}</span>
                                        </h1>
                                        <div className="imgModal">
                                            <picture>
                                                <source
                                                    id={`lazy_modal${llave}`}
                                                    type="image/avif"
                                                    elsrc={imgAvif}
                                                />
                                                <img
                                                    //className="w-100"
                                                    elsrc={imgjpg}
                                                    alt="categoria"
                                                    decoding="async"
                                                />
                                            </picture>
                                        </div>                                
                                    </div>
                                    <div className="col-6">
                                        <div className="subTit fw-bold">
                                            Cantidad:<br/>
                                        </div>
                                        <div className="quantityBox">
                                            <button className="btnQuantity">
                                                -
                                            </button>
                                            <input className='quantity' type="number" min={1} step={1} value={1}/>
                                            <button className="btnQuantity">
                                                +
                                            </button>
                                        </div>
                                        <strong>Descripcion:</strong><br/><br/>
                                        <div className="description scrollableY genFont">
                                            {descripcionComp}.<br/> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt explicabo expedita ratione libero. Nostrum illo sint, optio ut nemo quas, quo deleniti vel ipsum impedit distinctio magni, laborum cumque similique?
                                        </div>
                                        <div className="genFont fst-italic">
                                            Paquete de nosecuantas unidades<br/>
                                        </div>                                        
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        Valor unitario:<br/>
                                        {/*$5.800*/}
                                        ${unitPrice}
                                    </div>
                                    <div className="col-6">
                                        Valor total:<br/>
                                        {/*$11.600*/}
                                        {totalPrice}
                                    </div>
                                    <div className="col-12 d-flex justify-content-center py-2">
                                        <button className="btnDescBox">
                                            Agregar al carrazo prro
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