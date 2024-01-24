import React from 'react';
import { PdfViewer2 } from '../../Componentes/PdfViewer/PdfViewer2';

export const SpecialCat = () => {

    return (
        <section className='catalogo'>
            
            <div className="row">
                <div className="pdfViewer">
                    <PdfViewer2
                        route={'Assets/imgsCatalogo/spc1/'}
                        prop={'inicio'}
                        dir={0}
                    />
                </div>
            </div>

        </section>
    );
}
