import React, { useEffect, useState, useRef } from 'react';
import "./_MPDesk.scss"
//import { getGlobal } from '../../globals/globals'; remove later
import { useTheContext } from '../../TheProvider';
import { useNavigate } from 'react-router-dom';
import { SpeakButton } from '../../InternalFunctions';
import imgPlaceHolder from '../../Assets/png/placeHolderProduct.png'

export const ModalProductDesk = ({llave, img, descripcion, descripcionComp, codigo, category,
    unitPaq, unitPrice, lista, agotado, onHide, ImgName}) => {

    const [cant, setCant] = useState(0)
    const [totalPrice, setTotalPrice] = useState(unitPrice*cant)
    const { logged, setNItemsCart } = useTheContext()
    const navigate = useNavigate()
    //Para controlar la voz
    //const [ imgSrc, setImgSrc] = useState(img);
    const [isSpeaking, setIsSpeaking] = useState(false);
    let text= descripcion + "; Descripción: " + descripcionComp + "; No esperes más, adquiérelo ahora."
    
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [imgError, setImgError] = useState(false);

    const handleError = () => {
        setImgError(true);
    };

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
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = "es-US";
            if (selectedVoice) utterance.voice = selectedVoice;
            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            speechSynthesis.speak(utterance);
          } else {
            alert("Tu navegador no soporta la API de síntesis de voz.");
          }
        }
      };
    //fin de para controlar la voz
    let quantity = null
    //let logged = getGlobal('isLogged')
    let catSource
    try {        
        catSource = require(`../../Assets/avif/Logos/${category}.avif`)
    } catch (error) {
        catSource = require(`../../Assets/png/LlaveSierra2.png`)
    }
    /*const productJson ={        
        "Cod": codigo,
        "Descripcion": descripcion,
        "Categoria": category,
        "PVenta": unitPrice,
        "EsUnidadOpaquete": unitPaq,
        "Iva": 19,
        "Agotado": 0,
        "Detalle": "",
        "Score": 2.10383333333          
    }*/

    function Formater(number){
        return new Intl.NumberFormat().format(number);
    };
    
    if( unitPaq > 1 ){
        quantity = 'Paquete de ' + unitPaq + ' unidades'
    }else{
        quantity = 'Unidad'
    }

    const btnCart = () => {
        
        try {
            //console.log("entro al carrito")
            //*First search in Localstorage for 'cart'. If true, theCart contains the json cart
            //*if false, theCart is undefined. productJson is the current product json.
            const theCart = localStorage.getItem('cart')        
            //const productJson = JSON.parse(localStorage.getItem('productsBottomCarousel'))[llave]
            const productJson = lista[llave]
            // if(theCart){
            const addToCart = JSON.parse(theCart)
            const productIndex = addToCart.findIndex(item => item.Cod === productJson.Cod);
            if (productIndex !== -1) {//* if the is already the same product just increase the cant
                addToCart[productIndex].Cant += cant
                addToCart[productIndex].ImgName = ImgName
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
            console.log(error)
        }
    }

    useEffect(() => {
        setCant(0);
    }, []);
    

    return (
        <div
            className='theModalContainer'
            onClick={() => {onHide(); speechSynthesis.cancel(); setIsSpeaking(false)}}
            >
            <div
                className='theModal-content'
                style={{width: '700px', position: 'relative'}}
                onClick={(e) => e.stopPropagation()} // Detiene la propagación
                >
                <div className='theModal-body'>
                    <button className='xButton' data-bs-dismiss="modal" aria-label="Close" onClick={() => {onHide(); speechSynthesis.cancel(); setIsSpeaking(false)}} style={{position: 'absolute', top: '0px', right: '0px'}}>
                        <i className='bi bi-x-circle-fill'/>
                    </button>
                    <div className="row row-cols-2">
                        <div className="col d-flex flex-column">
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
                                        srcSet={imgError ? imgPlaceHolder : img}
                                    />
                                    <img
                                        src={imgError ? imgPlaceHolder : img}
                                        onError={handleError}
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
                            <div className="mt-auto">                                        
                                <p className="subTit"><strong>Descripción:</strong></p>
                                <div className="description scrollableY genFont">
                                    {descripcionComp}.<br/>
                                </div>
                            </div>
                        </div>
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
                                <h1 id="productolLabel">
                                    {descripcion}<br/>
                                    <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%"}}>
                                        <span className="smolText">Cod: {codigo}</span>
                                        <button
                                            onClick={toggleSpeech}
                                            className="btn btn-primary"
                                        >
                                            <i className={`bi ${isSpeaking ? "bi-stop-circle" : "bi-volume-up"}`}></i>
                                        </button>
                                    </div>
                                </h1>                                        
                            </div>
                            <div className='mt-auto'>
                                <span className="smolText quantityText">{quantity}</span>
                                <div className="subTit fw-bold mainBlue">
                                    Cantidad:<br/>
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
                                                // Math.ceil(e.target.value / unitPaq) * unitPaq --> this calculates the min cant depends on unitPaq
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
                                <h1>
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
                                </h1>
                                { logged ? 
                                    <button className="btnAddCart boton" disabled={(agotado || (cant===0))} onClick={() => {btnCart(); onHide()}}>
                                        Agregar al carrito
                                    </button>
                                    :
                                    <button
                                        className="modalBtnLogin boton"
                                        onClick={() => {navigate('/inicio_sesion')}}
                                        //data-bs-dismiss="modal"
                                        >
                                        Suscr&iacute;bete para m&aacute;s
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
