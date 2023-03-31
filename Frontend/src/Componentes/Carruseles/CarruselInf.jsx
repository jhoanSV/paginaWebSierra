import React from "react";
import "./_CarruselInf.scss";
import { ListItem } from "./index";
import FlatList from "flatlist-react/lib";

//import data from "../../Assets/jpg/Promociones/promociones.json";

//`../Assets/productosJpg/${data.cod}.jpg`

export function CarruselInf(props){
    
    /*function Item() {
        return (
            <>
                <ListItem
                    //elemento = {<>aloh</>}
                    elemento = {props.lista1.filter(cod => cod !== "CheemsOk")}
                />

            </>                      
        );
    }*/

    const listItems = props.lista1.map(item =>
        <>
            <ListItem 
                codigo = {item.cod}
                descripcion = {item.descripcion}
            
            />
        
        </>
    );

    return (
        <div>
            <ul className="d-flex">
                {listItems}
            </ul>
        </div>
    );

}