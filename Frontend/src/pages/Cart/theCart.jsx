import React from 'react';
import './_theCart.scss'
import { ItemCart } from './itemCart';

export const TheCart = () => {
    //{localStorage.getItem('cart')}
    return (
        <section className='theCart'>
            <div className='itemsCart grayContainer'>
                {
                    //console.log(typeof(localStorage.getItem('cart')))                    
                    JSON.parse(localStorage.getItem('cart')).map( (item, index) => {
                        return(
                            <ItemCart
                                nombre={item.Descripcion}
                                cod={item.Cod}
                                unitPrice={item.PVenta}
                                unitPaq={item.EsUnidadOpaquete}
                                category={(item.Categoria).toLowerCase()}
                                cantidad={item.Cant}
                            />
                        );                            
                    })
                }
            </div>
            <div className='dtlCart'>

            </div>
        </section>
    );
}