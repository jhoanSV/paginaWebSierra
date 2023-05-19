import { React, useState } from "react";
import "./_pdfViewer.scss";

import { Document, Page, Outline, pdfjs } from "react-pdf";

import pdfFile from "../../Assets/docs/Catalogo.pdf";//Catalogo.pdf

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export function PdfViewer( prop ) {

    const [numPages, setNumPages] = useState(null);
    const [bookmark, setBookmark] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        setPageNumber(bookmark);
        console.log("Pagina colocada: " + pageNumber);
    };

    const onLoadOutline = (outline) => {        
        
        const outlines = outline.filter(item => item.title === prop);
        console.log(outline, "marcadores");
        outlines.map((item) => setBookmark(item.dest[0]));
        setPageNumber(bookmark);
        alert("marcador: " + bookmark + "Pagina colocada: " + pageNumber);

    }

    /*------------------------------------------*/
    return (

    <Document className={"rctPdf"} file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
        <Outline className={"hide-outline"} onLoadSuccess={ (outline) => onLoadOutline(outline)}
        />
        <div style={{ flex: 1 }}>
            <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false}                                    
            />
        </div>
        <div style={{ flex: 1 }}>
            <Page pageNumber={pageNumber+1} renderTextLayer={false} renderAnnotationLayer={false}/>
        </div>
    </Document>
  )
}
