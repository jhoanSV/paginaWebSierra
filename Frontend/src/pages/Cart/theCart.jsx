import React, { useState } from 'react';
import './_theCart.scss'
import { ItemCart } from './itemCart';

export const TheCart = () => {

    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')));
    //{localStorage.getItem('cart')}
    const deleteItemCart = (id) =>{
        const newCart = cart.filter((item) => item.Cod !== id);
        localStorage.setItem('cart', JSON.stringify(newCart))
        setCart(newCart);
    }

    return (
        <section className='theCart'>
            <div className='itemsCart grayContainer'>
                {
                    //console.log(typeof(localStorage.getItem('cart')))
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
                            />
                        );
                    })
                }
            </div>
            <div className='dtlCart grayContainer'>
                SubTotal:
                Envio:
                Total:
            </div>
        </section>
    );
}