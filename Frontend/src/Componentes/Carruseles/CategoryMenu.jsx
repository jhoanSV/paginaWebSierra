import React from "react";
import "./_CategoryMenu.scss";
import categs from "../../Assets/jpg/categorias/categorias.json";

export function CategoryMenu() {

    const items = categs;

    const Items = () => (
        <ul>
          {
            items.map((item, index) => (
                <li key={index}>
                    <img
                        className="logoMenuCat"
                        src={require(`../../Assets/jpg/categorias/${item.descripcion}.jpg`)}
                        alt="imgCategory"
                    />
                    {item.descripcion}
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
