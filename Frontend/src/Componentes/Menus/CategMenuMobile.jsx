import React from 'react'
import './_CategMenuMobile.scss';
import categs from "../../Assets/jpg/categorias/categorias.json";
import { Link } from 'react-router-dom';

export function CategMenuMobile() {

    const items = categs;

    const Items = () => (
        <ul className='p-0 m-0'>
          {
            items.map((item, index) => (
                <li key={index} className='lstStylN items-menu-mob'>
                    <Link to={'catalogo'} state={{ bookM: `${item.descripcion.toUpperCase()}` }}>
                        <img
                            className='logoCatMob'
                            src={require(`../../Assets/png/Logos/${item.descripcion}.png`)}
                            alt='imgCategory'
                        />
                    </Link>
                </li>
            ))
          }
        </ul>
    );

    return (
        <>
            <div className='menu-mob'>
                <input type='checkbox' id='logoCat'/>

                <Items/>
                
                <label htmlFor='logoCat'>
                    <img
                        className='logoCatalogo'
                        src={require('../../Assets/png/Logos/logoCatalogo.png')}
                        alt='LogoCatalogo'
                    />
                </label>
            </div>
        
        </>
    );
}
