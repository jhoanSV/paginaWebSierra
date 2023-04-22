import React, { useState, useEffect } from "react";
import "./_CarruselInf.scss";
import { ListItem } from "./index";
//import FlatList from "flatlist-react/lib";

//import data from "../../Assets/jpg/Promociones/promociones.json";

//`../Assets/productosJpg/${data.cod}.jpg`

export function CarruselInf(props){//Aquí recibe la LIST1
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [lProductos, setLProductos] = useState(props.lista1.length); 
    const [charge, setCharge] = useState(5);//variable "SeVe"
    const [bef, setBef] = useState(0);
    const [move, setMove] = useState(0);
    const [back, setBack] = useState(0);
    var paso = 5;//lo que se agrega para cargar

    if(charge > lProductos) setCharge(lProductos);

    window.addEventListener('resize', function() {
        const item = document.querySelector("#pContainer");
        setScreenWidth(window.innerWidth);
        item.style.left = "0%";
    });

    useEffect(() => {
        check();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const check = () =>{
        if(screenWidth < 636 ){
            setBef(1);//show = 1;
            setMove(-100);
            setBack(-100);
        }else{
            setBef(5);//show = 5;
            setMove(-20);
            setBack(-20);
        }
    }

    useEffect(() => {
        console.log(bef);
        console.log(move);
        if(bef === charge && bef === lProductos){
            setMove(0);
        }else{
            if(screenWidth < 636 ){
                setMove(-100);
            }else{
                setMove(-20);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bef]);

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

    function lazy (){
        if ((charge + paso) >= lProductos && lProductos !== charge){
            paso = lProductos - charge;
        }
    }

    const Next = () => {
        const item = document.querySelector("#pContainer");
        var posX = (parseFloat(item.style.left));
        item.style.transition = "800ms";
        
        if (!item.style.left) posX = 0;
        
        if (bef === charge && bef < lProductos){
            lazy();
            setCharge(charge + paso);
        }
        if (bef !== lProductos){
            setBef(bef + 1);
        }
        item.style.left = (posX + move) + "%";
    }

    function Prev(){
        const item = document.querySelector("#pContainer");
        var posX = (parseFloat(item.style.left));
        if(!item.style.left || posX === 0){
            return console.log(posX + " después se acomoda estoxD");
        }
        setBef(bef - 1);
        console.log("back: " + back);
        item.style.left = (posX - back) + "%";
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