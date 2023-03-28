import React from "react";
import "./_ListItem.scss";

export const ListItem=(props)=>{
    return(
        //src={require(`../../Assets/jpg/Promociones/${data[0].cod}.jpg`)}
        <>
                <div className="caja">
                    {props.elemento}
                    Descripcion: jakskj
                    Cod: hola        
                </div>
        </>
        
    );
}