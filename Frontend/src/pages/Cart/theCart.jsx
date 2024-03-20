import React, { useEffect, useRef, useState } from 'react';
import './_theCart.scss'
import { ItemCart } from './itemCart';
import { Formater } from '../../globals/otherFunctions';
import { EnviarVenta } from '../../api';
import secureLocalStorage from 'react-secure-storage';

export const TheCart = () => {
      
    const closeRef = useRef();
    const dateChosen = useRef();
    const theTextArea = useRef();

    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')));    
    const [sendCost, setSendCost] = useState(5000);
    const [subTotalC, setSubTotalC] = useState(0);
    const [currentDiv, setCurrentDiv] = useState(0);
    const [route, setRoute] = useState(false);
    const [btnDis, setBtnDis] = useState(true);
    const LaFecha = new Date()
    let theUserCod = JSON.parse(secureLocalStorage.getItem('userData'))['Cod']
    //console.log(JSON.parse(secureLocalStorage.getItem('userData')));

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
        const fecha = new Date()        
        const today = fecha.getFullYear() + '-' + (fecha.getMonth()+1) + '-' + fecha.getDate() + ' ' + fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds()        
        let TIngresados = [], sendDate = '', notes = theTextArea.current.value
        cart.forEach((element) => {
            TIngresados.push(`${element['Cant']},${element['Cod']},${element['PVenta']}`)
        });
        TIngresados = TIngresados.join(';');
        if(route){
            sendDate = fecha.getFullYear() + '-' + (fecha.getMonth()+1) + '-' + (fecha.getDate())
            notes = notes + ' ...Cuadrar fecha de entrega'
        }else{
            sendDate = dateChosen.current.value
        }
        console.log(notes);
        const orderReq  = await EnviarVenta({
            "CodCliente": theUserCod,
            "FechaFactura": today,
            "FechaDeEstado": today,
            "FechaDeEntrega": sendDate,
            "FechaVencimiento" : sendDate,
            "NotaVenta": notes,
            "VECommerce": "1",
            "TIngresados": TIngresados
        })
        console.log(orderReq);
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

            <div className="modal fade" id='sendOrderMod' data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="idkLabel" aria-hidden="true">
                <div className="modal-dialog" style={{marginTop: '25vh'}}>
                    <div className="modal-content">
                        <button className="xButton" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{setCurrentDiv(0);setBtnDis(true)}} ref={closeRef}>
                            <i className="bi bi-x-circle-fill"></i>
                        </button>
                        <div className='modal-body'>
                            <div className='sendOrd genFont'>
                                {  currentDiv === 0 &&
                                <>
                                    <button type="button" className="btnModal" onClick={()=>{setCurrentDiv(a=>a+1);setRoute(true);setBtnDis(false)}}>Enviar con ruta</button>
                                    <button type="button" className="btnModal" onClick={()=>{setCurrentDiv(a=>a+2);setRoute(false)}} >Escoger fecha de envío</button>
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
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            Nota:
                                        </div>
                                        { !route &&
                                        <div>
                                            fecha:{' '}
                                            <input type="date" id="deadline" name="deadline" ref={dateChosen}
                                                min={`${LaFecha.getFullYear()}-${(LaFecha.getMonth()+1).toString().padStart(2, '0').slice(-2)}-${(LaFecha.getDate()+1)}`}
                                                style={{borderRadius: '10px'}}
                                                onChange={()=>setBtnDis(false)}
                                            />
                                        </div>
                                        }
                                    </div>
                                    <div>
                                        <textarea type='textbox' className='textAreaModal' ref={theTextArea}
                                            placeholder='Recomendaciones/Sugerencias'                                            
                                        />
                                    </div>
                                    <div>SubTotal: $ {Formater(subTotalC)}</div>
                                    <div>Env&iacute;o: $ {Formater(sendCost)}</div>
                                    <div className='Tit fw-bold' style={{color: '#193773'}}>
                                        Total: {' '}
                                        <span className='cBlack'>${Formater(subTotalC+sendCost)}</span>
                                    </div>
                                    <div style={{display: 'flex', marginTop: '15px'}}>
                                        <button type="button" className="btnModal btnBack"
                                            onClick={()=>setCurrentDiv(a=>a-2)}>
                                            Volver
                                        </button>
                                        <button type="button" className="btnModal btnConfirm" disabled={btnDis}
                                            onClick={handleSendOrder}>
                                            Confirmar
                                        </button>
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