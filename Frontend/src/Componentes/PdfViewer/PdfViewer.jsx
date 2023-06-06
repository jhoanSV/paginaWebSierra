import { React, useState, useEffect, useRef } from "react";
import "./_pdfViewer.scss";

import { Document, Page, Outline, pdfjs } from "react-pdf";

import pdfFile from "../../Assets/docs/Catalogo.pdf";//Catalogo.pdf
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export function PdfViewer({ prop }) {

    const [numPages, setNumPages] = useState(null);
    const [bookmark, setBookmark] = useState();
    const [lengthArr,setLengthArr] = useState();
    const [pageNumber, setPageNumber] = useState();
    const [catPage, setCatPage] = useState([]);
    const chrg = useRef(null);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    useEffect(() => {
        setPageNumber(bookmark);
        
        if(bookmark < 5){ chrg.current = bookmark - 1 }else if(bookmark % 2 === 0){
            chrg.current = 5;
        }else{
            chrg.current = 4;
        };
        
        const initialArray = [];

        for (let i = 0; i < 10; i++) {
            initialArray.push(<Page
                className={"pagePdf"}
                pageNumber={((bookmark-chrg.current) + i)}
                width={560}
            />);
        }
        setLengthArr(10);
        setCatPage(initialArray);

    },[bookmark]);
    
    function previousPage() {
        const nPage = bookmark - lengthArr + chrg.current - 1;
        const item = document.querySelector('.pagesContainer');
        var posX = (parseFloat(item.style.left));
        console.log("viendo: "+pageNumber);
        if((pageNumber === 0) || (pageNumber === -1)){
            return;
        }else if(posX === -100){
            item.style.transition = '0ms';
            const array = catPage;
            for (let i = 0; i < (chrg.current-1); i++) {
                array.unshift(<Page
                    className={"pagePdf"}
                    pageNumber={nPage - i}
                    width={560}
                />);
            }
            setCatPage(array);
            setLengthArr(lengthArr + 4);
            item.style.left = (posX - 100) + "%";
            setPageNumber(pageNumber-2);
        }else{
            item.style.left = (posX + 100) + "%";
            setPageNumber(pageNumber-2);
            item.style.transition = '1000ms';
        }
    }
    
    function nextPage() {
        const nPage = bookmark + lengthArr - chrg.current + 1;
        const item = document.querySelector('.pagesContainer');
        var posX = (parseFloat(item.style.left));

        if((pageNumber === numPages) || (pageNumber === numPages+1)){
            return;
        }else if(-posX >= (parseInt(lengthArr/2)-2)*100){
            item.style.left = (posX - 100) + "%";
            setPageNumber(pageNumber+2);
            const array = catPage;
            for (let i = 0; i < (chrg.current-1); i++) {
                array.push(<Page
                    className={"pagePdf"}
                    pageNumber={nPage + i}
                    width={560}
                />);
            }
            setCatPage(array);
            setLengthArr(lengthArr + 4);
        }else{
            item.style.left = (posX - 100) + "%";
            setPageNumber(pageNumber+2);
            item.style.transition = '1000ms';
        }
    } 

    /*------------------------------------------*/
    return (
        <>
            <Document className={"rctPdf"} file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
                <Outline className={"hide-outline"} onLoadSuccess={ (outline) => {
                        const outlines = outline.filter(item => item.title === prop);
                        outlines.map((item) => setBookmark(item.dest[0]+1));
                    }}
                />

                {bookmark && <div className='pagesContainer'
                    style={ bookmark < 5 ? { left: '0%' } : {left: '-200%'}}>
                    {
                        catPage.map((paginasR, index) => (
                            <div className='d-flex' key={index}>
                                {paginasR}
                            </div>
                        ))
                    }
                </div>}

                {<button onClick={previousPage} className="prevPdf">
                    <i className="bi bi-arrow-left-circle-fill"></i>
                </button>}

                {
                <button onClick={nextPage} className="nextPdf">
                    <i className="bi bi-arrow-right-circle-fill"></i>
                </button>}

            </Document>
        </>
  )
}
