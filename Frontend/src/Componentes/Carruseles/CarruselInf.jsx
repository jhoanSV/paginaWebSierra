import React from "react";
import "./_CarruselInf.scss";
import { ListItem } from "./index";
import FlatList from "flatlist-react/lib";

//import data from "../../Assets/jpg/Promociones/promociones.json";

//`../Assets/productosJpg/${data.cod}.jpg`

export function CarruselInf(props){
    const Item=({item})=>{
        return (
            <>
                <ListItem
                    //elemento = {<>aloh</>}
                    elemento = {item}
                />
            </>                   
        );
    }
    
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

    return(
        <div>
            <li className="d-flex">
                <FlatList
                    list={props.lista1}//lista de elementos que usa para contar
                    renderItem={Item}
                />
            
            </li>

        </div>
        

    );
}