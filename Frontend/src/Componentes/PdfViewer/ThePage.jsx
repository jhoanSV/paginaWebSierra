import { React/*, useEffect*/ } from "react";
import "./_Page.scss";

export const ThePage=({the_src, width}) =>{

    let src=null

    if (the_src){
        src = the_src
    }

    if (!the_src){
        //document.querySelector('.page').style.display = 'none'
        console.log("No se encontró recurso")
    }

    return(
        <div className="imgContainer">
            <picture>
                <source
                    type="image/avif"
                    srcSet={the_src}
                />
                <img
                    src={src}
                    alt="categoria"
                    decoding="async"
                    width={width}
                />
            </picture>
        </div>
    );
}