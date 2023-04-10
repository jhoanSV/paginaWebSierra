import React from "react";
import "./_CarruselInf.scss";
import { ListItem } from "./index";
//import FlatList from "flatlist-react/lib";

//import data from "../../Assets/jpg/Promociones/promociones.json";

//`../Assets/productosJpg/${data.cod}.jpg`

export function CarruselInf(props){


    /*const listItems = props.lista1.slice(1,4).map((item, index) => //el 3 no lo toca
        <>  
            <ListItem
                key={index}//para que cada item tenga como llave el index
                codigo = {item.cod}
                descripcion = {item.descripcion}
            
            />
        
        </>
    );*/

    function listItems (){      
        return (
            props.lista1.map((item, index) => //el 3 no lo toca
                <>  
                    <ListItem
                        key={index}//para que cada item tenga como llave el index
                        codigo = {item.cod}
                        descripcion = {item.descripcion}                    
                    />
                </>
            )
        )
    }

    function next(){
        const item = document.querySelector("#pContainer");
        var posX = item.style.left;
        if(parseFloat(posX) === 0 || !parseFloat(posX)){
            item.style.left = "0%";
            posX = item.style.left;
            item.style.left = (parseFloat(posX) - 100) + "%";
            item.style.transition = "800ms";
        }else if((props.lista1.length/5) > ((parseFloat(posX)-100)/(-100))){            
            item.style.left = (parseFloat(posX) - 100) + "%";
        }
    }

    function prev(){
        const item = document.querySelector("#pContainer");
        var posX = item.style.left;
        if(parseFloat(posX) == null || !parseFloat(posX)){
            return console.log(posX + " después se acomoda estoxD");
        }
        item.style.left = (parseFloat(posX) + 100) + "%";
    }


    return (
        <div className="containter px-0 py-4">
            <div className="cCarrusel">

                <button id="leftButton" onClick={() => prev()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                    </svg>
                </button>

                <button id="rightButton" onClick={() => next()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                    </svg>
                </button>

                <ul id="pContainer" className="d-flex py-3 px-0 m-0">

                    {listItems()}
                    
                </ul>
            </div>
        </div>
    );

}