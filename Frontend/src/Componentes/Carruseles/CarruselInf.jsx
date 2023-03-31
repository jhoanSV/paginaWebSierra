import React from "react";
import "./_CarruselInf.scss";
import { ListItem } from "./index";
//import FlatList from "flatlist-react/lib";

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
        <div className="containter px-0 py-4 whcarrusel">
            <ul className="d-flex p-0 m-0">
                <svg id="leftButton" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                </svg>
                {listItems}
                <svg id="rightButton" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                </svg>
            </ul>
        </div>
    );

}