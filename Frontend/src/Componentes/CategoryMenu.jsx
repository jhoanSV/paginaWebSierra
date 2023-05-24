import React, { useRef } from "react";
import "./_CategoryMenu.scss";
import categs from "../Assets/jpg/categorias/categorias.json";
import { Link } from "react-router-dom";

export function CategoryMenu() {

    const menuCategory = useRef();
    const menuButton = useRef();
    const items = categs;

    const Items = () => (
        <ul className="lista-cat">
          {
            items.map((item, index) => (
                <li key={index} className={`${item.color}`}>
                    <Link to={`/categories/${item.descripcion}`}>
                        <img
                            className="logoMenuCat"
                            src={require(`../Assets/png/Logos/${item.descripcion}.png`)}
                            alt="imgCategory"
                        />
                        <span>{item.descripcion}</span>
                    </Link>
                </li>
            ))
          }
        </ul>
    );

    const move = () => {
        
        const menuWidth = menuCategory.current.offsetWidth;
        const contentWidth = menuCategory.current.offsetWidth;

        if (menuWidth === 66) {
            // Establecer un ancho inicial fijo
            menuCategory.current.style.maxWidth = "300px";
            menuCategory.current.style.transition = "700ms"
            //menuButton.current.style.left = "182px";
        } else {
            // Establecer el ancho al valor real del contenido
            menuCategory.current.style.maxWidth = 66 + "px";
            //menuButton.current.style.left = "82px";
        }
    }

    /*--------------------return----------------------*/

    return (
        <div className="container-menu">
            <div className="menu-category" ref={menuCategory}>
                <div className="menu-button" role="button" ref={menuButton} onClick={move}>
                    <i className="bi bi-chevron-left"></i>
                </div>  
                <Items/>
            </div>            
        </div>
    );
}
