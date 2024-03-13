import React, { useEffect, useState } from 'react';
import './_theCart.scss'
import { ItemCart } from './itemCart';
import { Formater } from '../../globals/otherFunctions';
import { EnviarVenta } from '../../api';
import secureLocalStorage from 'react-secure-storage';

export const TheCart = () => {
      
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')));    
    const [sendCost, setSendCost] = useState(5000);
    const [subTotalC, setSubTotalC] = useState(0);
    const [currentDiv, setCurrentDiv] = useState(0);
    let theUserCod = secureLocalStorage.getItem('userData')['Cod']
    console.log('the user cod --> '+theUserCod);
    const fecha = new Date();
    console.log(fecha+', '+fecha.getDate()+', '+fecha.getDay());

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

    const handleSendOrder = async() =>{
        const jsjs  = await EnviarVenta({
            "CodCliente": theUserCod,
            "FechaFactura": "2024-02-20 00:00:00",
            "FechaDeEstado": "2024-02-20 00:00:00",
            "FechaDeEntrega": "2024-02-23",
            "FechaVencimiento" : "2024-02-23",
            "NotaVenta": "",
            "VECommerce": "1",
            "TIngresados": "12(cantidad),CIT05(codigo),950(PVenta);6,SP136,3500"
        })
    }

    useEffect(() => {
        let jsjs = 0;
    
        cart.forEach((item) => {
            jsjs += item.PVenta * item.Cant;
        });    
        
        setSubTotalC(jsjs);
        if (jsjs > 300000) setSendCost(0)
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
                <div>SubTotal: $ {Formater(subTotalC)}</div>
                <div>Envio: $ {Formater(sendCost)}</div>
                <div className='subTit' style={{marginTop: '10px'}}>
                    Total: $
                    <span className='cBlack'>{Formater(subTotalC+sendCost)}</span>
                </div>
                <button className="btnSendOrd boton" data-bs-toggle="modal" data-bs-target={`#sendOrderMod`} onClick={() => {console.log('upalalupa');}}>
                    Enviar pedido
                </button>
            </div>

            <div className="modal fade" id='sendOrderMod' tabIndex="-1" aria-labelledby="idkLabel" aria-hidden="true">
                <div className="modal-dialog" style={{marginTop: '25vh'}}>
                    <div className="modal-content">
                        <div className='modal-body'>
                            <div className='sendOrd genFont'>
                                {  currentDiv === 0 &&
                                <>
                                    <button type="button" className="btnModal" onClick={()=>setCurrentDiv(a=>a+1)}>Enviar con ruta</button>
                                    <button type="button" className="btnModal" onClick={()=>setCurrentDiv(a=>a+2)} >Escoger fecha de envío</button>
                                </>
                                }
                                {  currentDiv === 1 &&
                                <div style={{flexDirection: 'column', margin: 'auto'}}>
                                    <div style={{fontSize: '22px', fontWeight: 'bold', textAlign: 'center'}}>
                                        Un asesor se comunicar&aacute; contigo para confirmarte la fecha
                                    </div>
                                    <div style={{display: 'flex', marginTop: '29px'}}>
                                        <button type="button" className="btnModal btnBack" onClick={()=>setCurrentDiv(a=>a-1)}>Volver</button>
                                        <button type="button" className="btnModal" onClick={()=>setCurrentDiv(a=>a+1)}>Siguiente</button>
                                    </div>
                                </div>
                                }
                                {  currentDiv === 2 &&
                                <div style={{flexDirection: 'column', width: '100%', padding: '15px'}}>
                                    <div>
                                        Nota:
                                    </div>
                                    <div>
                                        <textarea type='textbox' style={{minHeight: '162px', width: '100%', resize: 'none'}}
                                        placeholder='Recomendaciones/Sugerencias'>
                                        </textarea>

                                    </div>
                                    <div>SubTotal: $ {Formater(subTotalC)}</div>
                                    <div>Env&iacute;o: $ {Formater(sendCost)}</div>
                                    <div className='subTit fw-bold'>
                                        Total:{' '}
                                            <span className='text-black Tit'>
                                                {Formater(subTotalC+sendCost)}
                                            </span>
                                    </div>
                                    <div>
                                        <button type="button" className="btnModal btnBack" onClick={()=>setCurrentDiv(a=>a-2)}>Volver</button>
                                        <button type="button" className="btnModal" onClick={handleSendOrder}>Confirmar</button>
                                    </div>
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>                
        </section>
    );
}