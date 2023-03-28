import React from "react";
import "./_CarruselInf.scss";
import { ListItem } from "./index";
import FlatList from "flatlist-react/lib";

//import data from "../../Assets/jpg/Promociones/promociones.json";

//`../Assets/productosJpg/${data.cod}.jpg`

export function CarruselInf(props){
    const Item=({item})=>{
        return (                        
            <ListItem
                elemento = {item}
            />
        );
    }
    return(
        <div>
            <li className="d-flex">
                <FlatList
                    list={props.lista1}
                    renderItem={Item}
                />
            
            </li>

        </div>
        

    );
}