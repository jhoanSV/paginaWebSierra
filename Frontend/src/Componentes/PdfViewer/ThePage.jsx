import { React, useState } from "react";
import "./_Page.scss";

export const ThePage = ({ the_src, Npage, CP, onselect }) => {
    const [positionList, setPositionList] = useState([])
    
    let src = null

    if (the_src) {
        src = the_src
    }

    if (!the_src) {
        //document.querySelector('.page').style.display = 'none'
        //console.log("No se encontró recurso")
    }

    const handleImgLoaded = () => {
        const thePositionList = CP.map(item => ({
            ...item,
            RelativeX: item.xPosition / document.getElementById(`thePageImg-${Npage}`).naturalWidth,
            RelativeY: item.yPosition / document.getElementById(`thePageImg-${Npage}`).naturalHeight
        }));
        setPositionList(thePositionList)
    }

    return (
        <div className="imgContainer">
            <picture style={{height:'100%', width: '100%'}}>
                <span style={{position:'absolute', top:'0.5%', left:'1%', fontSize:'0.6rem'}}>
                    Pag-{Npage}
                </span>
                {positionList.map((item, index) => (
                    <div key={index} onClick={() => { onselect(item.Cod) }}>
                        <img
                            src={require('../../Assets/gif/shopping-cart.gif')}
                            className="iconImg"
                            style={{
                                left: `${item.RelativeX * 100}%`,
                                top: `${item.RelativeY * 100}%`,
                            }}
                            alt="click me"
                        />
                    </div>
                ))}
                <a href="https://api.whatsapp.com/send/?phone=573134237538&text&type=phone_number&app_absent=0" target="_blank" rel="noreferrer">
                    <img
                        src={require('../../Assets/gif/clickHereWapp.gif')}
                        className="clickMeWapp"
                        style={{
                            left: `12%`,
                            bottom: `0%`
                        }}
                        alt="click me for "
                    />
                </a>
                <source
                    type="image/avif"
                    srcSet={the_src}
                />
                <img
                    className="laImg"
                    id={`thePageImg-${Npage}`}
                    onLoad={handleImgLoaded}
                    //ref={imgRef}
                    src={src}
                    alt={`Pagina: ${Npage}`}
                    decoding="async"
                />
            </picture>
        </div>
    );
}