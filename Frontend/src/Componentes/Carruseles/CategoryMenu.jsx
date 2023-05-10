import React from "react";
import "./_CategoryMenu.scss";
import categs from "../../Assets/jpg/categorias/categorias.json";
import { Link } from "react-router-dom";

export function CategoryMenu() {

    const items = categs;

    const Items = () => (
        <ul>
          {
            items.map((item, index) => (
                <li key={index}>
                    <Link to={`/categories/${item.descripcion}`}>
                        <img
                            className="logoMenuCat"
                            src={require(`../../Assets/jpg/categorias/${item.descripcion}.jpg`)}
                            alt="imgCategory"
                        />
                        {item.descripcion}
                    </Link>                    
                </li>
            ))
          }
        </ul>
    );

    return (
        <div className="menu-category">
            <Items/>
        </div>        
    );
}
