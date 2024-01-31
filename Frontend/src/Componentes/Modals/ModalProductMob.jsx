import React, { useState } from 'react';

export const ModalProductMob = ({imgAvif, imgpng, descripcion, descripcionComp, codigo, category,
    unitPaq, unitPrice, logged=true}) => {

    const [cant, setCant] = useState(unitPaq)
    const [totalPrice, setTotalPrice] = useState(unitPrice*cant)
    const [showDesc, setShowDesc] = useState(false)

    let quantity = null

    function Formater(number){
        return new Intl.NumberFormat().format(number);
    };
    
    if( unitPaq > 1 ){
        quantity = 'Paquete de ' + unitPaq + ' unidades'
    }else{
        quantity = 'Unidad'
    }

    return (
        <div className="modal-content productBox">
            <button className="xButton" data-bs-dismiss="modal" aria-label="Close">
                <i className="bi bi-x-circle-fill"></i>
            </button>
            <div className="modal-body p-0">
                <div className="row row-cols-1">
                    <div className="col d-flex flex-column">
                        <div className="mainFeatures">
                            <div className="theLogo">
                                <picture>
                                    {imgAvif ?
                                        <>
                                        <source
                                            type="image/avif"
                                            srcSet={require(`../../Assets/avif/Logos/${category}.avif`)}
                                        />
                                        <img
                                            title={category}//Here comes the category logo when received
                                            src={require(`../../Assets/png/Logos/${category}.png`)}
                                            alt="imgProducto"
                                            decoding="async"
                                        />
                                        </>
                                        :
                                        <img
                                            title={category}//Here comes the category logo when received
                                            src={require(`../../Assets/png/Logos/${category}.png`)}
                                            alt="imgProducto"
                                            decoding="async"
                                        />
                                    }
                                </picture>
                            </div>
                            <div className='subTit' id='productoLabel'>
                                {descripcion}
                                <div className='smolText'>Cod: {codigo}</div>
                            </div>
                        </div>
                        <div className="imgModal">
                            <picture>
                                {imgAvif ?
                                    <>
                                        <source
                                            type="image/avif"
                                            srcSet={imgAvif}
                                        />
                                        <img
                                            elsrc={imgpng}
                                            alt="imgProducto"
                                            decoding="async"
                                        />
                                    </>
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
                            </picture>
                        </div>
                        <div className="commingsoon">
                            <img
                                src={require("../../Assets/png/Proximamente.png")}
                                alt="commingsoon"
                                decoding="async"
                            />
                        </div>
                        <span className="smolText quantityText">{quantity}</span>
                        <div className="unitPrice genFont">
                            <span className='mainBlue fw-bold'>
                                Valor:&nbsp;
                            </span>
                            { logged &&
                            <span className="fw-bold">
                                ${Formater(unitPrice)}
                            </span>
                            }
                        </div>                        
                        <div className='row'>
                            <div className='col'>
                                <div className="subTit fw-bold mainBlue">
                                    Cantidad
                                </div>
                                <div className="quantityBox" style={{marginLeft: '10px'}}>
                                    <button className="btnQuantity" onClick={() => {
                                        if((cant-unitPaq)>0){
                                            setCant(cant-unitPaq)
                                            setTotalPrice(unitPrice*(cant-unitPaq))
                                        }
                                    }}>
                                        -
                                    </button>
                                    <input
                                        className='quantity' type="number"
                                        min={1}
                                        value={cant}
                                        style={{width: `${(String(cant).length*14.4)+24}px`}} //here i change the with in function of the length of the content plus 24 of padding
                                        readOnly
                                    />
                                    <button className="btnQuantity" onClick={() => {
                                        setCant(cant+unitPaq)
                                        setTotalPrice(unitPrice*(cant+unitPaq))
                                    }}>
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="col">
                                { logged ?
                                    <div className="totalPrice mainBlue">
                                        <div className='subTit fw-bold'>Total:</div>
                                        <h1>
                                            <span className='text-black Tit'>
                                                ${Formater(totalPrice)}
                                            </span>
                                        </h1>
                                    </div>
                                    :
                                    <div className="totalPrice genFont d-flex fw-bold">
                                        Suscribete para más
                                    </div>
                                }
                            </div>
                        </div>
                        <div className='mt-auto'>
                            <button className="btnAddCart" onClick={() => {alert("PROXIMAMENTE")}}>
                                Agregar al carrito
                            </button>
                        </div>
                        <div className="mt-auto">
                            <p className="subTit" onClick={() => {
                                setShowDesc(!showDesc)
                            }}>
                                <strong><u className='mainBlue'>Descripcion:</u></strong>
                            </p>
                            { showDesc &&
                                <div className="description scrollableY genFont">
                                    {descripcionComp}.<br/>
                                </div>
                            }
                        </div>
                    </div>                    
                </div>
            </div>
        </div>
    );
}
