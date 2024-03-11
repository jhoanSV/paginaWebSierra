import React, { useEffect, useState } from "react";
import "./_ListItem.scss";
import { ModalProductDesk, ModalProductMob } from "../Modals";
import imgPlaceHolder from '../../Assets/png/placeHolderProduct.png'

export const ListItem=({llave, codigo, descripcion, descripcionComp,
    unitPrice, category, unitPaq, lista})=>{

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [isMobile, setIsMobile] = useState();
    //const [Theimg, setTheimg] = useState(imgPlaceHolder);
    const [imgSrc, setImgSrc] = useState(`https://sivar.com.co/Imgs/ProductsAVIF/${codigo}.avif`)
    const [Show1, setShow1] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    
    const resize_ob = new ResizeObserver(function() {
        setScreenWidth(window.innerWidth);
    });

    const click_caja = () => {
        //this allow to lazy charge the modal content
        setShow1(true)
    }

    useEffect(() => {
        resize_ob.observe(document.querySelector('#box'+llave));
        setRefreshKey(prevKey => prevKey + 1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if(screenWidth < 700 ){
            setIsMobile(true)
        }else{
            setIsMobile(false)
        }            
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [screenWidth])

    const handleError = () =>{
        console.log('handleError in listItem');
        setImgSrc(imgPlaceHolder)
    }

    return(
        <>
            <div id={`box${llave}`} className='caja' data-bs-toggle="modal" data-bs-target={`#producto${llave}`} onClick={click_caja}>
                
                <div className="row">
                    <div className="col h-100">
                        <div className="row row-cols-1 g-0">

                            <div className={`col imgProducto C${category}`}>
                                <picture>
                                    <source
                                        type="image/avif"
                                        srcSet={imgSrc}
                                    />
                                    <img
                                        key={refreshKey}
                                        src={imgSrc}
                                        onError={handleError}
                                        alt="categoria"
                                        decoding="async"
                                    />
                                </picture>
                            </div>

                            <div className="col">
                                <div className="descFont titleFont">{descripcion}</div>
                                <div className="codFont">{codigo}</div>
                            </div>
                        </div>                        
                    </div>
                </div>
            </div>
            
            <div className="modal fade" id={`producto${llave}`} tabIndex="-1" aria-labelledby="productoLabel" aria-hidden="true">
                
                <div className="modal-dialog resizeModal">
                    { isMobile ? 
                        Show1 ? 
                        <ModalProductMob
                            llave={llave}
                            /*imgAvif={imgAvif}
                            imgpng={imgpng}*/
                            img={`https://sivar.com.co/Imgs/ProductsAVIF/${codigo}.avif`}
                            descripcion={descripcion}
                            descripcionComp={descripcionComp}
                            codigo={codigo}
                            category={category}
                            unitPaq={unitPaq}
                            unitPrice={unitPrice}
                            lista={lista}
                        />:<></>
                        :
                        Show1 ?
                        <ModalProductDesk
                            llave={llave}
                            /*imgAvif={imgAvif}
                            imgpng={imgpng}*/
                            img={`https://sivar.com.co/Imgs/ProductsAVIF/${codigo}.avif`}
                            descripcion={descripcion}
                            descripcionComp={descripcionComp}
                            codigo={codigo}
                            category={category}
                            unitPaq={unitPaq}
                            unitPrice={unitPrice}
                            lista={lista}
                        />
                        :
                        <></>
                    }
                </div>
            </div>
        </>        
    );
}