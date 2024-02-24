import React, { useState } from 'react';
import './_itemCart.scss';

export const ItemCart = ({nombre, cod, unitPrice, unitPaq, category, cantidad}) => {
    let imgpng = 0
    let imgAvif = 0

    const [cant, setCant] = useState(cantidad)
    const [totalPrice, setTotalPrice] = useState(unitPrice*cant)
    
    try {//intenta buscar la imagen png
        imgpng = require(`../../Assets/png/Productos/${cod}.png`)
    } catch (error) {
        imgpng = 0
    }
    try {//intenta buscar la imagen AVIF
        imgAvif = require(`../../Assets/avif/Productos/${cod}.avif`)
    } catch (error) {
        imgAvif = 0
    }

    return (
        <div className='itemCartStyle'>
            <div className='itemCartImgContainer'>
                <div className={`imgProducto itemCartImg C${category}`}>
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
            </div>
            <div className='detailsItem'>
                <div className='subTit' style={{lineHeight: '1.1'}}><strong>{nombre}</strong>
                    <div className='smolText' style={{color: '#747474'}}>{cod}</div>
                </div>
                <div style={{marginTop: '10px'}}>
                    COP {unitPrice}
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
                <div>
                    {totalPrice}
                </div>
            </div>
        </div>
    );
}
