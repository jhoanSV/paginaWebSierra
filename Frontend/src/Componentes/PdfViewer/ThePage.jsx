import { React, useRef } from "react";
import "./_Page.scss";

export const ThePage = ({ the_src, width, Npage, CP, onselect }) => {
    const imgRef = useRef(null);
    const positionList = CP.map(item => ({
        ...item,
        RelativeX: item.xPosition / imgRef.current.naturalWidth,
        RelativeY: item.yPosition / imgRef.current.naturalHeight
    }));
    let src = null

    if (the_src) {
        src = the_src
    }

    if (!the_src) {
        //document.querySelector('.page').style.display = 'none'
        //console.log("No se encontró recurso")
    }

    return (
        <div className="imgContainer">
            <picture>
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
                <source
                    type="image/avif"
                    srcSet={the_src}
                />
                <img
                    ref={imgRef}
                    src={src}
                    alt="categoria"
                    decoding="async"
                    width={width}
                />
            </picture>
        </div>
    );
}