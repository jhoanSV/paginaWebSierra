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
    const [lengthArr,setLengthArr] = useState(9);
    //const [pageNumber, setPageNumber] = useState(1);
    const [catPage, setCatPage] = useState([]);

    var chrg = 4; 

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    useEffect(() => {
        //setPageNumber(bookmark);
        if(bookmark < 5) chrg = bookmark - 1 ;

        const initialArray = [];
        for (let i = 0; i < 9; i++) {
            initialArray.push(<Page
                className={"pagePdf"}
                pageNumber={(bookmark - chrg) + i}
                width={560}
            />);
        }
        setCatPage(initialArray);
    },[bookmark]);
    
    function previousPage() {
        const nPage = bookmark - lengthArr + chrg;
        const array = [];
        const item = document.querySelector('.pagesContainer');
        var posX = (parseFloat(item.style.left));

        if(nPage <= 2){
            return;
        }else if(posX === -100){
            item.style.left = (posX - 100) + "%";
            item.style.transition = '500ms';
            for (let i = 3; i >= 0; i--) {
                array.push(<Page
                    className={"pagePdf"}
                    pageNumber={nPage - i}
                    width={560}
                />);
                setCatPage([array,...catPage]);
            }
            setLengthArr(lengthArr + 4);
        }else{
            item.style.left = (posX + 100) + "%";
            item.style.transition = '2000ms';
        }
        console.log("2-->" + lengthArr);
        //changePage(-2);
    }
    
    function nextPage() {
        const nPage = bookmark + lengthArr - chrg;
        const array = [];
        const item = document.querySelector('.pagesContainer');
        var posX = (parseFloat(item.style.left));

        if(nPage >= numPages-1){
            return;
        }else if(-posX === (parseInt(lengthArr/2)-1)*100){
            item.style.left = (posX - 100) + "%";
            for (let i = 0; i < 4; i++) {
                array.push(<Page
                    className={"pagePdf"}
                    pageNumber={nPage + i}
                    width={560}
                />);
                setCatPage([...catPage,array]);
            }
            setLengthArr(lengthArr + 4);
        }else{
            item.style.left = (posX - 100) + "%";
            item.style.transition = '2000ms';
        }
        console.log("2-->" + lengthArr);
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
                        catPage.map((component, index) => (
                            <div className='d-flex' key={index}>
                                {component}
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
