import React, { useEffect, useRef, useState } from 'react'
import './_CategMenuMobile.scss';
import categs from "../../Assets/jpg/categorias/categorias.json";
import { Link, useNavigate } from 'react-router-dom';
import { useTheContext } from '../../TheProvider';
//import theIcon from '../../Assets/png/Logos/logoCatalogo.png'

export function CategMenuMobile() {

    const items = categs;

    const { setCategSelect } = useTheContext()
    const [imgSel, setImgSel] = useState('logoCatalogo');    
    const isActive = useRef()
    isActive.current = false
    const targetRef = useRef(null);
    const navigate = useNavigate()

    const showCats = () =>{
        const items = document.querySelectorAll('.items-menu-mob')
        if(isActive.current){
            isActive.current = false
            items.forEach(item =>{
                item.classList.toggle('show', (false))
            })
        }else{
            isActive.current = true
            
            items.forEach(item =>{
                item.classList.toggle('show', (true))
            })
        }
    }

    const handleCatSel = (a) =>{
        setImgSel(a)
        setCategSelect(`${a}`)
        navigate('/productos')
    }

    //Funcion para mostrar los logos en el menu desplegable
    const Items = () => (        
        <ul className='m-0 p-0'>
          {
            items.map((item, index) => (
                <li key={index} className='lstStylN items-menu-mob'>
                    <div onClick={()=>{handleCatSel(item.descripcion)}}>
                        <picture>
                            <source 
                                type="image/avif"
                                srcSet={require(`../../Assets/avif/Logos/${item.descripcion}.avif`)}
                            />
                            <img
                                className="logoMenuCat"
                                src={require(`../../Assets/png/Logos/${item.descripcion}.png`)}
                                alt="imgCategory"
                            />
                        </picture>
                    </div>
                </li>
            ))
          }
        </ul>
    );

    useEffect(() => {
        console.log(targetRef.current);
        const handleClickOutside = (event) => {
          if (targetRef.current && !targetRef.current.contains(event.target)) {            
            isActive.current = false
            const items = document.querySelectorAll('.items-menu-mob')
            items.forEach(item =>{
                item.classList.toggle('show', (false))
            })
            console.log('ahre');
          }
        };
    
        document.addEventListener('click', handleClickOutside);
    
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, [targetRef]);

    return (
        <>
            <div ref={targetRef} className='menu-mob' onClick={showCats}>

                <Items/>
                
                <label htmlFor='logoCat' className={ (imgSel==='logoCatalogo') ? ' ' : 'contain1'}>
                    <img
                        className='logoCatalogo'
                        src={require(`../../Assets/png/Logos/${imgSel}.png`)}
                        alt='LogoCatalogo'
                    />
                </label>
            </div>
        
        </>
    );
}
