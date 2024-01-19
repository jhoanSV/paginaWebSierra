import React from 'react';
import { useParams } from 'react-router-dom';

export const SpecialCat = () => {

    const UrlId = useParams().espId
    let SpcCatalogue = null

    if (UrlId === 'llaves_agua'){
        SpcCatalogue = 'heyzine.com/flip-book/e6238d237d.html'
    }

    return (
        <section className='spcCatalogue'>
            <iframe
                title='Catalogo Especial'
                allowfullscreen="allowfullscreen"
                className="fp-iframe"
                style={{border: '1px solid lightgray', width: '100%', height: '800px'}}
                src={`https://${SpcCatalogue}`}
            />
        </section>
    );
}
