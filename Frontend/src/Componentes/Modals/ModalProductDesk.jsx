import React, { useEffect, useState, useRef } from 'react';
import "./_MPDesk.scss"
//import { getGlobal } from '../../globals/globals'; remove later
import { useTheContext } from '../../TheProvider';
import { useNavigate } from 'react-router-dom';
import { getFontSize, priceValue } from '../../InternalFunctions';
// import { SpeakButton } from '../../InternalFunctions';
// import imgPlaceHolder from '../../Assets/png/placeHolderProduct.png'

export const ModalProductDesk = ({ onHide, Data, Move, indexGroup, Group }) => {

    const [cant, setCant] = useState(0)
    const [totalPrice, setTotalPrice] = useState({
        Total: Data.PVenta * cant,
        Descuento: 0
    })
    const { logged, setNItemsCart } = useTheContext()
    const navigate = useNavigate()
    //const cacheBuster = Date.now();
    //const imageUrl = `https://sivarwebresources.s3.amazonaws.com/AVIF/${Data.ImgName}.avif?${cacheBuster}`
    //Para controlar la voz
    //const [ imgSrc, setImgSrc] = useState(img);
    const [isSpeaking, setIsSpeaking] = useState(false);
    let text = Data.Descripcion + "; Descripción: " + Data.Detalle + "; No esperes más, adquiérelo ahora."

    const [selectedVoice, setSelectedVoice] = useState(null);

    //Group Pagination logic
    const containerRef = useRef(null);
    const activeItemRef = useRef(null);
    const [offset, setOffset] = useState(5);

    useEffect(() => {
        if (containerRef.current && activeItemRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            const itemWidth = activeItemRef.current.offsetWidth;
            const itemOffsetLeft = activeItemRef.current.offsetLeft;
            const newOffset = itemOffsetLeft - (containerWidth / 2) + (itemWidth / 2);

            setOffset(-newOffset);
        }
    }, [indexGroup]);

    console.log('heeeeeey',Data.img);

    useEffect(() => {
        setCant(0);
    }, []);

    useEffect(() => {
        const discountValue = (Data.PVenta * (1 - Data.Porcentaje / 100)).toFixed(2)
        const Price = parseInt(cant) + Data.EsUnidadOpaquete > Data.APartirDe ? discountValue : Data.PVenta
        setTotalPrice({
            Total: Price * (cant),
            Descuento: (Data.PVenta - Price) * (cant)
        })
        // eslint-disable-next-line
    }, [Data]);

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
        catSource = require(`../../Assets/avif/Logos/${Data.Categoria}.avif`)
    } catch (error) {
        catSource = require(`../../Assets/png/LlaveSierra2.png`)
    }

    // function Formater(number) {
    //     return new Intl.NumberFormat().format(number);
    // };

    if (Data.EsUnidadOpaquete > 1) {
        quantity = 'Paquete de ' + Data.EsUnidadOpaquete + ' unidades'
    } else {
        quantity = 'Unidad'
    }

    const btnCart = () => {

        try {
            //console.log("entro al carrito")
            //*First search in Localstorage for 'cart'. If true, theCart contains the json cart
            //*if false, theCart is undefined. productJson is the current product json.
            const theCart = localStorage.getItem('cart')
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
        } catch (error) {
            console.log("error al enviar producto: ", error)
        }
    }

    return (
        <div
            className='theModalContainer'
            onClick={() => { onHide(); speechSynthesis.cancel(); setIsSpeaking(false) }}
        >
            <div
                className='theModal-content'
                style={{ width: '700px', height: Group.length > 1 ?'573.19px' : 'unset', position: 'relative' }}
                onClick={(e) => e.stopPropagation()} // Detiene la propagación
            >
                <i
                    className="_pagArrow desk bi bi-arrow-left-circle-fill"
                    style={{ fontSize: '32px', display: indexGroup > 0 ? 'block' : 'none' }}
                    onClick={() => { Move(-1) }}
                />
                <i
                    className="_pagArrow desk bi bi-arrow-right-circle-fill"
                    style={{ fontSize: '32px', display: indexGroup < Group.length - 1 ? 'block' : 'none' }}
                    onClick={() => { if (indexGroup < Group.length - 1) Move(1) }}
                />
                <div className='theModal-body' style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <button className='xButton' data-bs-dismiss="modal" aria-label="Close" onClick={() => { onHide(); speechSynthesis.cancel(); setIsSpeaking(false) }} style={{ position: 'absolute', top: '0px', right: '0px' }}>
                        <i className='bi bi-x-circle-fill' />
                    </button>
                    <div className='mainFeatures' style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
                        <div style={{ overflow: 'hidden', maxHeight: '88px', fontSize: `${getFontSize(Data.Descripcion, 2.2, 18)}` }}>
                            {Data.Descripcion}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                            <div className='smolText' style={{ display: 'flex' }}>
                                <div className="theLogo" style={{ marginRight: '5px' }}>
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
                                <span style={{ padding: '5px 0px' }}>Cod: {Data.Cod}</span>
                            </div>
                            <div>
                                {/*<button className='btnQuantity' style={{ lineHeight: '28px', fontSize: '2rem', backgroundColor: 'red' }}>
                                    <i className='bi bi-youtube'></i>
                                </button>*/}
                                <button className='btnQuantity' style={{ fontSize: '2rem', lineHeight: '28px', marginLeft: '5px' }}>
                                    <i
                                        onClick={toggleSpeech}
                                        className={`bi ${isSpeaking ? "bi-stop-circle" : "bi-volume-up"}`}>
                                    </i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="row row-cols-2">
                        <div className="col d-flex flex-column" style={{justifyContent:'center'}}>
                            <div className={`imgModal C${Data.Categoria}`}>
                                {Data.Agotado ?
                                    <div className='soldOutMod'>
                                        AGOTADO
                                    </div>
                                    :
                                    <></>
                                }
                                <picture style={{ position: 'relative', overflow: 'hidden' }}>
                                    <source
                                        type="image/avif"
                                        srcSet={Data.img}
                                    />
                                    <img
                                        src={Data.img}
                                        alt="productImg"
                                        decoding="async"
                                    />
                                </picture>
                            </div>
                            {/* <div className="commingsoon">
                                <img
                                    src={require("../../Assets/png/Proximamente.png")}
                                    alt="commingsoon"
                                    decoding="async"
                                />
                            </div> */}
                        </div>
                        <div className="col d-flex flex-column">
                            {/* <div className="mainFeatures">
                                <h1 id="productolLabel" style={{ fontSize: '2.2rem'}}>
                                    
                                </h1>
                            </div> */}
                            <div className="description scrollableY genFont">
                                {Data.Detalle}.<br />
                            </div>
                            <div style={{marginTop: '10px'}}>
                                <span className="smolText quantityText" style={{textDecoration:'underline', color: quantity === 'Unidad' ? 'transparent' : ''}}>
                                    {quantity}
                                </span>
                                <div className="unitPrice genFont">
                                    <span className='mainBlue fw-bold'>
                                        Und:&nbsp;
                                    </span>
                                    {logged && (
                                        <>
                                            <span className={Data.Porcentaje !== 0 && cant > Data.APartirDe ? "text-decoration-line-through" : "fw-bold"}
                                                //style={{ color: Data.Porcentaje !== 0 && cant > Data.APartirDe ? '#f37225' : '' }}
                                            >
                                                ${priceValue(Data.PVenta)}
                                            </span>
                                            {Data.Porcentaje !== 0 && cant > Data.APartirDe &&
                                                <span className='fw-bold'>
                                                    {'  '}${priceValue((Data.PVenta * (1 - Data.Porcentaje / 100)).toFixed(2))}
                                                </span>
                                            }
                                        </>
                                    )}
                                </div>
                                <div className='col' style={{ display: 'flex' }}>
                                    <div className="subTit fw-bold mainBlue" style={{ marginRight: '10px', marginTop: '5px' }}>
                                        Cantidad
                                    </div>
                                    <div className="quantityBox">
                                        <button className="btnQuantity" onClick={() => {
                                            if ((cant - Data.EsUnidadOpaquete) >= 0) {
                                                setCant(cant - Data.EsUnidadOpaquete)
                                                const discountValue = (Data.PVenta * (1 - Data.Porcentaje / 100)).toFixed(2)
                                                const Price = parseInt(cant) - Data.EsUnidadOpaquete > Data.APartirDe ? discountValue : Data.PVenta
                                                setTotalPrice({
                                                    Total: Price * (cant - Data.EsUnidadOpaquete),
                                                    Descuento: (Data.PVenta - Price) * (cant - Data.EsUnidadOpaquete)
                                                })
                                            }
                                        }}>
                                            -
                                        </button>
                                        <input
                                            className='quantity' type="number"
                                            min={1}
                                            value={cant}
                                            style={{ width: `${(String(cant).length * 14.4) + 24}px` }} //here i change the with in function of the length of the content plus 24 of padding                        
                                            onChange={(e) => { setCant(parseInt(e.target.value)); }}
                                            onBlur={(e) => {
                                                let theCant = parseInt(e.target.value)
                                                if (e.target.value % Data.EsUnidadOpaquete !== 0) {
                                                    theCant = parseInt(Math.ceil(e.target.value / Data.EsUnidadOpaquete) * Data.EsUnidadOpaquete)
                                                    setCant(theCant);
                                                }
                                                const discountValue = (Data.PVenta * (1 - Data.Porcentaje / 100)).toFixed(2)
                                                const Price = theCant > Data.APartirDe ? discountValue : Data.PVenta
                                                setTotalPrice({
                                                    Total: Price * theCant,
                                                    Descuento: (Data.PVenta - Price) * theCant
                                                })
                                            }}
                                        />
                                        <button className="btnQuantity" onClick={() => {
                                            setCant(parseInt(cant) + Data.EsUnidadOpaquete)
                                            const discountValue = (Data.PVenta * (1 - Data.Porcentaje / 100)).toFixed(2)
                                            const Price = parseInt(cant) + Data.EsUnidadOpaquete > Data.APartirDe ? discountValue : Data.PVenta
                                            setTotalPrice({
                                                Total: Price * (cant + Data.EsUnidadOpaquete),
                                                Descuento: (Data.PVenta - Price) * (cant + Data.EsUnidadOpaquete)
                                            })
                                        }}>
                                            +
                                        </button>
                                    </div>
                                </div>
                                {Data.Porcentaje !== 0 &&
                                    <div style={{ color: '#f37225' }}>
                                        <span className='fw-bold'>
                                            A partir de {Data.APartirDe + 1} obten {Data.Porcentaje}% de descuento&nbsp;
                                        </span>
                                    </div>
                                }
                                {logged &&
                                    <div className="totalPrice mainBlue">
                                        <div style={{display:'flex', alignItems:'center'}}>
                                            <span className='subTit fw-bold'>Total:</span>
                                            {logged && Data.Porcentaje !== 0 && cant > Data.APartirDe &&
                                                <span className='text-decoration-line-through' style={{ fontSize: '1.25rem', fontWeight: 'normal' }}>
                                                    &nbsp;${priceValue(totalPrice.Descuento + totalPrice.Total)}
                                                </span>
                                            }
                                            <span>
                                                <span className='text-black Tit' style={{ fontWeight: 'normal' }}>
                                                    &nbsp;${priceValue(totalPrice.Total)}
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                }
                                
                            </div>
                        </div>
                    </div>
                    <div>
                        {logged ?
                            <button
                                type="button"
                                className="btnAddCart boton"
                                disabled={(Data.Agotado || (cant === 0))}
                                onClick={() => {
                                    btnCart(); onHide()
                                }}>
                                Agregar al carrito
                                <i className="bi bi-cart3 ms-2"></i>
                            </button>
                            :
                            <button
                                className="modalBtnLogin boton"
                                onClick={() => { navigate('/inicio_sesion') }}
                            //data-bs-dismiss="modal"
                            >
                                Suscr&iacute;bete para m&aacute;s
                            </button>
                        }
                        {Group.length > 1 &&
                            <div className="_paginationGroup" ref={containerRef}>
                                <div
                                    className="_cajita-container"
                                    style={{ transform: `translateX(${offset}px)` }}
                                >
                                    {Group.map((item, i) => (
                                        <div
                                            key={i}
                                            ref={i === indexGroup ? activeItemRef : null}
                                            className={`cajita ${i === indexGroup ? 'active' : ''}`}
                                            onClick={() => { Move(i - indexGroup) }}
                                        >
                                            {item.Cod}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}
