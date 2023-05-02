import React from 'react';
import "./_Categories.scss";
import { useParams } from 'react-router-dom';
import list from "../../Assets/jpg/categorias/categorias.json";

export function Categories() {
    
    const { name } = useParams();
    const cat = list.find((i) => i.descripcion === name);

    return (
        <div>
            Categories
            
        </div>
    );
}
