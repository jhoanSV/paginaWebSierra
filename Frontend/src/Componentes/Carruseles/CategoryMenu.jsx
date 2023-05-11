import React from "react";
import "./_CategoryMenu.scss";
import categs from "../../Assets/jpg/categorias/categorias.json";
import { Link } from "react-router-dom";

export function CategoryMenu() {

    const items = categs;

    const Items = () => (
        <ul className="lista-cat">
          {
            items.map((item, index) => (
                <li key={index}>
                    <Link to={`/categories/${item.descripcion}`}>
                        <img
                            className="logoMenuCat"
                            src={require(`../../Assets/png/Logos/${item.descripcion}.png`)}
                            alt="imgCategory"
                        />
                        <span>{item.descripcion}</span>
                    </Link>                    
                </li>
            ))
          }
        </ul>
    );

    return (
        <div className="container-menu">
            <div className="menu-category">
                <div className="menu-button" role="button">
                    <i className="bi bi-chevron-left"></i>
                </div>  
                <Items/>
            </div>            
        </div>
    );
}
