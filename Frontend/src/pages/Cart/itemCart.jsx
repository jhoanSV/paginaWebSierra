import React, { useState } from 'react';
import './_itemCart.scss';

export const ItemCart = ({id, nombre, cod, unitPrice, unitPaq, category, cantidad, onDelete}) => {
    let imgpng = 0
    let imgAvif = 0

    const productJson = JSON.parse(localStorage.getItem('cart'))
    const [cant, setCant] = useState(parseInt(cantidad))
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

    function Formater(number){
        return new Intl.NumberFormat().format(number);
    };

    //alert('cant: '+cantidad)

    return (
        <div className='itemCartStyle'>
            <div>
                
            </div>
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
                            productJson[id].Cant = parseInt(cant)-unitPaq
                            localStorage.setItem('cart',JSON.stringify(productJson))
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
                        onChange={(e)=>{setCant(e.target.value);}}
                        onBlur={(e)=>{
                            let theCant = parseInt(e.target.value)
                            if(e.target.value%unitPaq !== 0){
                                theCant = parseInt(Math.ceil(e.target.value / unitPaq) * unitPaq)
                                setCant(theCant);
                            }
                            setTotalPrice(unitPrice*theCant)
                        }}
                    />
                    <button className="btnQuantity" onClick={() => {                        
                        //console.log(productJson[id].Cant);
                        productJson[id].Cant = parseInt(cant)+unitPaq
                        localStorage.setItem('cart',JSON.stringify(productJson))
                        setCant(parseInt(cant)+unitPaq)
                        setTotalPrice(unitPrice*(parseInt(cant)+unitPaq))                        
                    }}>
                        +
                    </button>
                </div>
                <div className="totalPrice inItemCart mainBlue">
                    <div className='subTit fw-bold' onClick={()=>{onDelete(cod)}}>Total:</div>
                    <h1>
                        <span className='text-black Tit'>
                            ${Formater(totalPrice)}
                        </span>
                    </h1>
                </div>
            </div>
        </div>
    );
}
