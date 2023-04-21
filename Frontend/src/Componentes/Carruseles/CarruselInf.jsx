import React, { useState } from "react";
import "./_CarruselInf.scss";
import { ListItem } from "./index";
//import FlatList from "flatlist-react/lib";

//import data from "../../Assets/jpg/Promociones/promociones.json";

//`../Assets/productosJpg/${data.cod}.jpg`

export function CarruselInf(props){//Aquí recibe la LIST1
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [lProductos, setLProductos] = useState(props.lista1.length); 
    const [charge, setCharge] = useState(5);//variable "SeVe"
    var paso = 5;//lo que se agrega para cargar
    var show = 0;// lo que muestra
    var move = 0;
    var posMax = 0;

    if(charge > lProductos) setCharge(lProductos);

    window.addEventListener('resize', function() {
        const item = document.querySelector("#pContainer");
        setScreenWidth(window.innerWidth);
        console.log(screenWidth);
        if(screenWidth < 636 ){            
            item.style.translate = "0%";
            console.log("entra aquí?");
        }
    });

    if(screenWidth < 636 ){
        show = 1;
        move = -100;
        posMax = (-(lProductos + 1 * 100));
    }else{
        show = 5;
        move = -20;
        posMax = (-((lProductos) * 10));
    }

    function listItems (){      
        return (
            props.lista1.slice(0,charge).map((item) =>
                <>  
                    <ListItem key={(item.id).toString()}
                        llave = {item.id}
                        codigo = {item.cod}
                        descripcion = {item.descripcion}                    
                    />
                </>
            )
        )
    }

    const Next=()=>{
        const item = document.querySelector("#pContainer");
        var posX = (parseFloat(item.style.translate));
        item.style.transition = "800ms";

        if (!item.style.translate) posX = 0;
        
        console.log(charge + " , "+ lProductos + " , " + show);
        if (charge > show && posMax < posX){//si hay más por mostrar, mueva
            item.style.translate = (posX + move) + "%";            
        }else if(charge >= lProductos){//lo que carga es mayor al numero de productos?, disminuye paso
            paso = lProductos - show;
            setCharge(charge + paso);
            console.log(charge + " >= "+ lProductos);
        }else{
            setCharge(charge + paso);
            item.style.translate = (posX + move) + "%";
            console.log(charge + " <= "+ lProductos);
        }
        console.log(posMax + " , " + item.style.translate);
    }

    function Prev(){
        const item = document.querySelector("#pContainer");
        var posX = (parseFloat(item.style.translate));
        if(!item.style.translate || posX === 0){
            return console.log(posX + " después se acomoda estoxD");
        }
        item.style.translate = (posX - move) + "%";
    }


    return (
        <div className="containter px-0 py-4">
            <div className="cCarrusel">

                <button id="leftButton" onClick={() => Prev()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                    </svg>
                </button>

                <button id="rightButton" onClick={() => Next()}>
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