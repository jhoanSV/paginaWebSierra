import { React, useState } from "react";
import { useParams } from "react-router-dom";
import { CategoryMenu } from "../../Componentes/Carruseles/CategoryMenu";
import "./_Catalogo.scss";

import { Document, Outline, Page, pdfjs } from "react-pdf";

import pdfFile from "../../Assets/docs/Catalogo.pdf";//Catalogo.pdf

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export function Catalogo() {
    let { id } = useParams();
    const [numPages, setNumPages] = useState(null);
    const [bookmark, setBookmark] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const onLoadOutline = (outline) => {        
        
        const outlines = outline.filter(item => item.title === id.toUpperCase());
        outlines.map((item) => setBookmark(item.dest[0]));

    }
    
    window.scrollTo(0, 0);
    /*let { name } = useParams();
    const cat = list.find((i) => i.descripcion === name);*/

    return (
        <>
            <div className="catalogo">

                <div className="row">
                    <div className="col pdfViewer">
                        <Document className={"rctPdf"} file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
                            <Outline className={"hide-outline"} onLoadSuccess={ (outline) => onLoadOutline(outline)}
                            />
                            <div style={{ flex: 1 }}>
                                <Page pageIndex={bookmark} renderTextLayer={false} renderAnnotationLayer={false}                                    
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <Page pageIndex={bookmark+1} renderTextLayer={false} renderAnnotationLayer={false}/>
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
