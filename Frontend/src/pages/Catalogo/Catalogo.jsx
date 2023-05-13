import { React, useState } from "react";
import { CategoryMenu } from "../../Componentes/Carruseles/CategoryMenu";
import "./_Catalogo.scss";

import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import pdfFile from "../../Assets/docs/Catalogo.pdf";

export function Catalogo() {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };
    
    window.scrollTo(0, 0);
    /*let { name } = useParams();
    const cat = list.find((i) => i.descripcion === name);*/

    return (
        <>
            <div className="categoria">

                <div className="row">
                    <div className="col pdfViewer">
                        <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess} >
                            <Page pageNumber={pageNumber}/>
                            <Page pageNumber={pageNumber+1}/>
                        </Document>
                    </div>
                </div>

                <div>
                    <CategoryMenu/>
                </div>
                
            </div>

        </>
    );
}
