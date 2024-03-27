import React, { useState, useEffect } from 'react';
import { getGlobal } from '../../globals/globals';
//import imgPlaceHolder from '../../Assets/png/placeHolderProduct.png'

export const ModalProductMob = ({llave, img, descripcion, descripcionComp, codigo, category,
    unitPaq, unitPrice, lista, agotado}) => {

    const [cant, setCant] = useState(0)
    const [totalPrice, setTotalPrice] = useState(unitPrice*cant)
    const [showDesc, setShowDesc] = useState(false)

    let logged = getGlobal('isLogged')
    let quantity = null
    let catSource
    try {        
        catSource = require(`../../Assets/avif/Logos/${category}.avif`)
    } catch (error) {
        catSource = require(`../../Assets/png/LlaveSierra2.png`)
    }

    function Formater(number){
        return new Intl.NumberFormat().format(number);
    };
    
    if( unitPaq > 1 ){
        quantity = 'Paquete de ' + unitPaq + ' unidades'
    }else{
        quantity = 'Unidad'
    }

    const btnCart = () => {
        //*First search in Localstorage for 'cart'. If true, theCart contains the json cart
        //*if false, theCart is undefined. productJson is the current product json.
        const theCart = localStorage.getItem('cart')
        const productJson = lista[llave]
        // if(theCart){
        const addToCart = JSON.parse(theCart)
        const productIndex = addToCart.findIndex(item => item.Cod === productJson.Cod);
        if (productIndex !== -1) {//* if the is already the same product just increase the cant
            addToCart[productIndex].Cant += cant
            localStorage.setItem("cart", JSON.stringify(addToCart))
            return
        }
        //*Add the cant assigned
        productJson.Cant = cant
        addToCart.push(productJson)
        localStorage.setItem("cart", JSON.stringify(addToCart))
        // }else{
        //     //*Add the cant assigned
        //     productJson.Cant = cant
        //     localStorage.setItem("cart", JSON.stringify([productJson]))
        // }
    }
    
    useEffect(() => {
        setCant(0)
    }, []);

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
                                    <source
                                        type="image/avif"
                                        srcSet={catSource}
                                    />
                                    <img
                                        src={catSource}                                        
                                        alt="logo"
                                        decoding="async"
                                    />
                                </picture>
                            </div>
                            <div className='subTit' id='productoLabel'>
                                {descripcion}
                                <div className='smolText'>Cod: {codigo}</div>
                            </div>
                        </div>
                        <div className={`imgModal C${category}`}>
                            <picture style={{position: 'relative', overflow: 'hidden'}}>
                                { agotado ?
                                    <div className='soldOutMod'>
                                        AGOTADO
                                    </div>
                                :
                                    <></>
                                }
                                <source
                                    type="image/avif"
                                    srcSet={img}
                                />
                                <img
                                    src={img}
                                    alt="productImg"
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
                                <div className="quantityBox">
                                    <button className="btnQuantity" onClick={() => {
                                        if((cant-unitPaq)>=0){
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
                                        onChange={(e)=>{setCant(parseInt(e.target.value));}}
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
                                        setCant(parseInt(cant)+unitPaq)
                                        setTotalPrice(unitPrice*(parseInt(cant)+unitPaq))
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
                            <button className="btnAddCart boton" disabled={(agotado || (cant===0))} onClick={() => {btnCart()}} data-bs-dismiss="modal">
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
