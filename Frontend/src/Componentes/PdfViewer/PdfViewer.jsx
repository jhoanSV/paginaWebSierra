import { React, useState, useEffect } from "react";
import "./_pdfViewer.scss";

import { Document, Page, Outline, pdfjs } from "react-pdf";

import pdfFile from "../../Assets/docs/Catalogo.pdf";//Catalogo.pdf
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export function PdfViewer({ prop }) {

    const [numPages, setNumPages] = useState(null);
    const [bookmark, setBookmark] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);

    const [catPag, setCatPage] = useState([]);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    useEffect(() => {
        setPageNumber(bookmark);
        const initialArray = [];
        for (let i = 0; i < 9; i++) {
            initialArray.push(<Page
                className={"pagePdf"}
                pageNumber={(bookmark - 4) + i}
            />);
        }
        setCatPage(initialArray);
    },[bookmark]);

    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }
    
    function previousPage() {
        const newPage = <Page
            className={"pagePdf"}
            pageNumber={82}
        />;
        setCatPage([newPage,...catPag]);
        //changePage(-2);
    }
    
    function nextPage() {
        const newPage = <Page
            className={"pagePdf"}
            pageNumber={82}
        />;
        setCatPage([...catPag, newPage]);
        //changePage(2);

    }

    /*------------------------------------------*/
    return (

    <Document className={"rctPdf"} file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
        <Outline className={"hide-outline"} onLoadSuccess={ (outline) => {
                const outlines = outline.filter(item => item.title === prop);
                outlines.map((item) => setBookmark(item.dest[0]+1));
            }}
        />
        {/*<Page className={"pagePdf"} pageNumber={pageNumber}/>
        <Page  className={"pagePdf"} pageNumber={pageNumber+1}/>*/}

        {/*Array.from(
            new Array(9),
            (el, index) => (
                <>
                    <Page
                        key={`page_${index + 1}`}
                        className={"pagePdf"}
                        pageNumber={(pageNumber)}
                    />
                </>
            ),
        )*/
        }

        {
            catPag.map((component, index) => (
                <div key={index}>{component}</div>
            ))
        }

        {<button onClick={previousPage} className="prevPdf">
            <i className="bi bi-arrow-left-circle-fill"></i>
        </button>}

        {
        <button onClick={nextPage} className="nextPdf">
            <i className="bi bi-arrow-right-circle-fill"></i>
        </button>}

    </Document>
  )
}
