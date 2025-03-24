import React, { useEffect, useRef, useState } from 'react'
import './_CategMenuMobile.scss';
import categs from "../../Assets/jpg/categorias/categorias.json";
import { useNavigate } from 'react-router-dom';
import { useTheContext } from '../../TheProvider';
//import theIcon from '../../Assets/png/Logos/logoCatalogo.png'

export function CategMenuMobile() {

    const items = categs;

    const { loading, setLoading, setCategSelect } = useTheContext()
    const [imgSel, setImgSel] = useState('logoCatalogo');
    const isActive = useRef()
    const mnpRef = useRef()
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

    const handleCatSel = (a) =>{//* handle category selection
        window.scrollTo(0,0)
        navigate('/productos')
        if(a===''){
            setImgSel('logoCatalogo')
        }else{
            setImgSel(a)
        }
        setCategSelect(`${a}`)
    }

    //* Funcion para mostrar los logos en el menu desplegable
    const Items = () => (
        <ul className='m-0 p-0'>
          {
            items.map((item, index) => (
                <li key={index} className='lstStylN items-menu-mob' onClick={()=>{handleCatSel(item.descripcion)}}>
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
                </li>
            ))
          }
            <li className='lstStylN items-menu-mob noContain1' onClick={()=>{handleCatSel('')}}>
                <picture>
                    <source 
                        type="image/avif"
                        srcSet={require(`../../Assets/avif/Logos/logocatalogo.avif`)}
                    />
                    <img                            
                        src={require(`../../Assets/png/Logos/logoCatalogo.png`)}
                        alt="imgCategory"
                        onLoad={()=>{setLoading(false)}}
                    />
                </picture>
            </li>
        </ul>
    );

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (targetRef.current && !targetRef.current.contains(event.target)) {
            isActive.current = false
            const items = document.querySelectorAll('.items-menu-mob')
            items.forEach(item =>{
                item.classList.toggle('show', (false))
            })
          }
        };
    
        document.addEventListener('click', handleClickOutside);
    
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
    }, [targetRef]);
    
    useEffect(() => {
        if(!loading){
            //console.log('dam');
            mnpRef.current.classList.add('mnp-animation')
        }
    }, [loading]);

    return (
        <>
            <div className='mnp-container'>
                <label className='mnp' ref={mnpRef}>
                    Mira nuestros productos
                </label>
            </div>
            <div ref={targetRef} className='menu-mob' onClick={showCats}>


                <Items/>
                
                <label htmlFor='logoCat' className={imgSel==='logoCatalogo' ? 'tbplx' : 'contain1 tbplx'}>
                    {<img
                        className='logoCatalogo'
                        src={require(`../../Assets/png/Logos/${imgSel}.png`)
                        }
                        alt='LogoCatalogo'
                    />}
                </label>

            </div>
        </>
    );
}
