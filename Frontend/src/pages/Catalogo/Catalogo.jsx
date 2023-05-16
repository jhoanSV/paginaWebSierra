import { React, useState } from "react";
import { CategoryMenu } from "../../Componentes/Carruseles/CategoryMenu";
import "./_Catalogo.scss";

import { Document, Outline, Page, pdfjs } from "react-pdf";

import pdfFile from "../../Assets/docs/Catalogo.pdf";//Catalogo.pdf

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export function Catalogo() {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    //getContext('2d', { willReadFrequently: true });
    
    window.scrollTo(0, 0);
    /*let { name } = useParams();
    const cat = list.find((i) => i.descripcion === name);*/
    /*<Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess} >
        <Page pageNumber={pageNumber+1} renderTextLayer={false} renderAnnotationLayer={false}/>
    </Document>*/

    return (
        <>
            <div className="categoria">

                <div className="row">
                    <div className="col pdfViewer">
                        <Document className={"rctPdf"} file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
                            <Outline                          
                            />
                            <div style={{ flex: 1 }}>
                                <Page pageIndex={pageNumber} renderTextLayer={false} renderAnnotationLayer={false}/>
                            </div>
                            <div style={{ flex: 1 }}>
                                <Page pageNumber={pageNumber+1} renderTextLayer={false} renderAnnotationLayer={false}/>
                            </div>
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
