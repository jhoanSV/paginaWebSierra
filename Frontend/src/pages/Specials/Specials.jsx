import React from 'react';
import "./_Specials.scss";
import { Link } from 'react-router-dom';

export const Specials = () => {
    return (
        <>
            <section className='SpecialProducts'>
                <div className="ImgBtnContainer">
                    <Link to={'/llaves_agua'} style={{color: 'black'}}>
                        <picture>
                            <source
                                type="image/avif"
                                srcSet={require('../../Assets/avif/CatEspecial1.avif')}
                            />
                            <img
                                src={require('../../Assets/jpg/CatEspecial1.jpg')}
                                alt="categoria"
                                decoding="async"
                            />
                        </picture>
                    </Link>                    
                </div>                
            </section>
        </>
    );
}