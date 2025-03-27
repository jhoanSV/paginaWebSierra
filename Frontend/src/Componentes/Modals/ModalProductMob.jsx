import React, { useState, useEffect } from 'react';
//import { getGlobal } from '../../globals/globals'; remove later
import { useTheContext } from '../../TheProvider';
import { useNavigate } from 'react-router-dom';
import { speak, SpeakButton } from '../../InternalFunctions';
import imgPlaceHolder from '../../Assets/png/placeHolderProduct.png'

export const ModalProductMob = ({llave, img, descripcion, descripcionComp, codigo, category,
    unitPaq, unitPrice, lista, agotado, onHide, ImgName, Data}) => {

    const [cant, setCant] = useState(0)
    const [totalPrice, setTotalPrice] = useState(Data.PVenta*cant)
    const [showDesc, setShowDesc] = useState(false)
    const { logged, setNItemsCart } = useTheContext()
    const [utterance, setUtterance] = useState(null);
    const navigate = useNavigate()
    //Para controlar la voz
    const [isSpeaking, setIsSpeaking] = useState(false);
    let text= Data.Descripcion + "; Descripción: " + Data.Detalle + "; No esperes más, adquiérelo ahora."
    
    const [selectedVoice, setSelectedVoice] = useState(null);

    useEffect(() => {
        const loadVoices = () => {
            const voices = speechSynthesis.getVoices();
            const preferredVoice = voices.find(voice => 
            voice.name.includes("Google Español") || 
            voice.name.includes("US Spanish") || 
            voice.name.includes("Microsoft Sabina") ||
            voice.lang === "es-US"
            );
            setSelectedVoice(preferredVoice || voices.find(voice => voice.lang.startsWith("es")));
        };

        loadVoices();
        speechSynthesis.onvoiceschanged = loadVoices;
    }, []);

    const toggleSpeech = () => {
        if (isSpeaking) {
            // Si ya está hablando, detenerlo
            speechSynthesis.cancel();
            setIsSpeaking(false);
        } else {
            if ("speechSynthesis" in window) {
            const newUtterance = new SpeechSynthesisUtterance(text);
            newUtterance.lang = "es-US";
            if (selectedVoice) newUtterance.voice = selectedVoice;
            newUtterance.onstart = () => {setIsSpeaking(true)}
            //setIsSpeaking(true);
            newUtterance.onend = () => setIsSpeaking(false);
            newUtterance.onerror = (event) => {
                console.error('Ocurrió un error durante la síntesis de voz:', event.error);
                setIsSpeaking(false);
            };
            setUtterance(newUtterance);
            speechSynthesis.speak(newUtterance);
            } else {
                alert("Tu navegador no soporta la API de síntesis de voz.");
            }
        }
    };
    //fin de para controlar la voz

    //let logged = getGlobal('isLogged')
    let quantity = null
    let catSource
    try {        
        catSource = require(`../../Assets/avif/Logos/${Data.Categoria}.avif`)
    } catch (error) {
        catSource = require(`../../Assets/png/LlaveSierra2.png`)
    }

    function Formater(number){
        return new Intl.NumberFormat().format(number);
    };
    
    if( Data.EsUnidadOpaquete > 1 ){
        quantity = 'Paquete de ' + Data.EsUnidadOpaquete + ' unidades'
    }else{
        quantity = 'Unidad'
    }

    const btnCart = () => {
        try {
            //*First search in Localstorage for 'cart'. If true, theCart contains the json cart
            //*if false, theCart is undefined. productJson is the current product json.
            const theCart = localStorage.getItem('cart')
            //const productJson = lista[llave]
            // if(theCart){
            const productJson = Data
            const addToCart = JSON.parse(theCart)
            const productIndex = addToCart.findIndex(item => item.Cod === productJson.Cod);
            if (productIndex !== -1) {//* if the is already the same product just increase the cant
                addToCart[productIndex].Cant += cant
                addToCart[productIndex].ImgName = Data.ImgName
                localStorage.setItem("cart", JSON.stringify(addToCart))
                return
            }
            //*Add the cant assigned
            productJson.Cant = cant
            addToCart.push(productJson)
            setNItemsCart(addToCart.length)
            localStorage.setItem("cart", JSON.stringify(addToCart))
            // }else{
            //     //*Add the cant assigned
            //     productJson.Cant = cant
            //     localStorage.setItem("cart", JSON.stringify([productJson]))
            // }
        } catch (error) {
            console.log("error al enviar producto: ", error)
        }
    }
    
    useEffect(() => {
        setCant(0)
    }, []);

    return (
        <div className='theModalContainer'>
            <div className='theModal-content modal-content.productBox' style={{width: '85%', position: 'relative', minHeight: '85%'}}>
                <div className='theModal-body'>
                    <button className='xButton' data-bs-dismiss="modal" aria-label="Close" onClick={() => {onHide(); speechSynthesis.cancel(); setIsSpeaking(false)}} style={{position: 'absolute', top: '0px', right: '0px'}}>
                        <i className='bi bi-x-circle-fill'/>
                    </button>
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
                                <div className='subTit' id='productoLabel' style={{width: '80%', paddingRight: '10px', marginRight: '5px'}}>
                                    {Data.Descripcion}
                                    <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%"}}>
                                        <div className='smolText'>Cod: {Data.Cod}</div>
                                        <button
                                            onClick={toggleSpeech}
                                            className="btn btn-primary"
                                            >
                                            <i className={`bi ${isSpeaking ? "bi-stop-circle" : "bi-volume-up"}`}></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className={`imgModal C${Data.Categoria}`}>
                                <picture style={{position: 'relative', overflow: 'hidden'}}>
                                    { Data.Agotado ?
                                        <div className='soldOutMod'>
                                            AGOTADO
                                        </div>
                                    :
                                        <></>
                                    }
                                    <source
                                        type="image/avif"
                                        srcSet={Data.img}
                                    />
                                    <img
                                        src={Data.img}
                                        //onError={handleError}
                                        alt="productImg"
                                        decoding="async"
                                    />
                                </picture>
                            </div>
                            <div style={{marginLeft: '5px', marginRight: '5px'}}>
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
                                        ${Formater(Data.PVenta)}
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
                                                if((cant-Data.EsUnidadOpaquete)>=0){
                                                    setCant(cant-Data.EsUnidadOpaquete)
                                                    setTotalPrice(Data.PVenta*(cant-Data.EsUnidadOpaquete))
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
                                                    if(e.target.value%Data.EsUnidadOpaquete !== 0){
                                                        theCant = parseInt(Math.ceil(e.target.value / Data.EsUnidadOpaquete) * Data.EsUnidadOpaquete)
                                                        setCant(theCant);
                                                    }
                                                    setTotalPrice(Data.PVenta*theCant)
                                                }}
                                            />
                                            <button className="btnQuantity" onClick={() => {
                                                setCant(parseInt(cant)+Data.EsUnidadOpaquete)
                                                setTotalPrice(Data.PVenta*(parseInt(cant)+Data.EsUnidadOpaquete))
                                            }}>
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col">
                                        { logged &&
                                            <div className="totalPrice mainBlue">
                                                <div className='subTit fw-bold'>Total:</div>
                                                <h1>
                                                    <span className='text-black Tit'>
                                                        ${Formater(totalPrice)}
                                                    </span>
                                                </h1>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className='mt-auto'>
                                    { logged ? 
                                        <button className="btnAddCart boton" disabled={(Data.Agotado || (cant===0))} onClick={() => {btnCart(); onHide() }} data-bs-dismiss="modal">
                                            Agregar al carrito
                                        </button>
                                        :
                                        <button className="modalBtnLogin boton" onClick={() => {navigate('/inicio_sesion')}} data-bs-dismiss="modal">
                                            Suscr&iacute;bete para m&aacute;s
                                        </button>
                                    }
                                </div>
                                <div className="mt-auto">
                                    <p className="subTit" onClick={() => {
                                        setShowDesc(!showDesc)
                                    }}>
                                        <strong><u className='mainBlue'>Descripción:</u></strong>
                                    </p>
                                    { showDesc &&
                                        <div>
                                            <div className="description scrollableY genFont">
                                                {Data.Detalle}.<br/>
                                            </div>
                                        </div>
                                    }
                                </div>

                            </div>
                        </div>                    
                    </div>
                </div>
            </div>
        </div>
    );
}
