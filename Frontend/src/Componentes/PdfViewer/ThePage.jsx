import { React, useEffect } from "react";
import "./_Page.scss";

export const ThePage=({the_src, width}) =>{

    let src=null

    if (the_src){
        src = the_src
    }

    if (!the_src){
        document.querySelector('.page').style.display = 'none'
    }

    return(
        <div className="page">
            <picture>
                {/*<source
                    type="image/avif"
                    srcSet={the_src}
                />Esto para cuando tenga las AVIF c:*/}
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