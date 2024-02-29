import React, { useEffect, useState } from 'react';
import './_theCart.scss'
import { ItemCart } from './itemCart';
import { Formater } from '../../globals/otherFunctions';

export const TheCart = () => {

    let sendCost = 5000    
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')));
    const [subTotalC, setSubTotalC] = useState(0);

    const deleteItemCart = (id) =>{        
        const newCart = [...cart]
        newCart.splice(id, 1);
        localStorage.setItem('cart', JSON.stringify(newCart))
        setCart(newCart);
        //setSubTotalC(sumVal)
    }

    const updateCant = (id, val) =>{
        const newCart = [...cart]
        newCart[id].Cant = val        
        setCart(newCart)
        localStorage.setItem('cart',JSON.stringify(newCart))        
    }

    useEffect(() => {
        let jsjs = 0;
    
        cart.forEach((item) => {            
            jsjs += item.PVenta * item.Cant;
        });    
        
        setSubTotalC(jsjs);
    }, [cart]);

    return (
        <section className='theCart'>
            <div className='itemsCart grayContainer'>
                {                    
                    cart.map( (item, index) => {                                                
                        return(
                            <ItemCart
                                key={index}
                                id={index}
                                nombre={item.Descripcion}
                                cod={item.Cod}
                                unitPrice={item.PVenta}
                                unitPaq={item.EsUnidadOpaquete}
                                category={(item.Categoria).toLowerCase()}
                                cantidad={item.Cant}
                                onDelete={deleteItemCart}
                                updtC = {updateCant}
                            />
                        );                        
                    })                    
                }                
            </div>
            <div className='dtlCart grayContainer'>
                <div>SubTotal: $ {subTotalC}</div>
                <div>Envio: $ {Formater(sendCost)}</div>
                <div className='subTit' style={{marginTop: '10px'}}>
                    Total: $
                    <span className='cBlack'>{Formater(subTotalC+sendCost)}</span>
                </div>
                <button className="btnSendOrd boton" onClick={() => {console.log('upalalupa');}}>
                    Enviar pedido
                </button>
            </div>
        </section>
    );
}