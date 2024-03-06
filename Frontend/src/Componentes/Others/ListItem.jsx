import React, { useEffect, useState } from "react";
import "./_ListItem.scss";
import { ModalProductDesk, ModalProductMob } from "../Modals";
import { getGlobal } from "../../globals/globals";

import imgPlaceHolder from '../../Assets/png/placeHolderProduct.png'
import { getStorageUrl } from "../../firebase/config";

export const ListItem=({llave, codigo, descripcion, descripcionComp,
    unitPrice, category, unitPaq, lista})=>{

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [isMobile, setIsMobile] = useState();
    const [Theimg, setTheimg] = useState(imgPlaceHolder);
    const [Show1, setShow1] = useState(false);    

    /*let imgpng = 0
    let imgAvif = 0*/
    let urlImg
    
    const searchImg = async(avif) =>{
        if(avif){//Este try deberia ir en firebase/config.js
            try {
                urlImg = await getStorageUrl(`productsAVIF/${codigo}.avif`)
                setTheimg(urlImg)
            } catch (error) {
                console.log("Aparentemente no existe esta imgAVIF en la red: " +codigo, error);
                setTheimg(imgPlaceHolder)
            }
        }else{
            try {
                urlImg = await getStorageUrl('productsPNG/'+codigo+'.png')
                setTheimg(urlImg)
            } catch (error) {
                console.log("Aparentemente no existe esta imgPNG en la red: " +codigo, error);
                setTheimg(imgPlaceHolder)
            }
        }
    }
    searchImg(getGlobal('AVIF'));
    
    const resize_ob = new ResizeObserver(function() {
        setScreenWidth(window.innerWidth);
    });
    
    /*try {//intenta buscar la imagen png
        imgpng = require(`../../Assets/png/Productos/${codigo}.png`)
    } catch (error) {
        imgpng = 0
    }
    try {//intenta buscar la imagen AVIF
        imgAvif = require(`../../Assets/avif/Productos/${codigo}.avif`)
    } catch (error) {
        imgAvif = 0
    }*/

    const click_caja = () => {
        //this allow to lazy charge the modal content
        setShow1(true)
    }

    useEffect(() => {
        resize_ob.observe(document.querySelector('#box'+llave));
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

    return(
        <>
            <div id={`box${llave}`} className='caja' data-bs-toggle="modal" data-bs-target={`#producto${llave}`} onClick={click_caja}>
                
                <div className="row">
                    <div className="col h-100">
                        <div className="row row-cols-1 g-0">

                            <div className={`col imgProducto C${category}`}>
                                { getGlobal('AVIF') ?
                                    <picture>
                                        <source
                                            type="image/avif"
                                            srcSet={Theimg}
                                        />
                                        <img
                                            src={Theimg}
                                            alt="categoria"
                                            decoding="async"
                                        />
                                    </picture>
                                    :
                                    <img
                                        src={Theimg}
                                        alt="categoria"
                                        decoding="async"
                                    />
                                }
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