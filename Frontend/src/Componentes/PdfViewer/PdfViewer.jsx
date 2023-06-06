import { React, useState, useEffect } from "react";
import "./_pdfViewer.scss";

import { Document, Page, Outline, pdfjs } from "react-pdf";

import pdfFile from "../../Assets/docs/Catalogo.pdf";//Catalogo.pdf
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export function PdfViewer({ prop }) {

    const [numPages, setNumPages] = useState(null);
    const [bookmark, setBookmark] = useState();
    const [lengthArr1,setLengthArr1] = useState();
    const [lengthArr2,setLengthArr2] = useState();
    //const [pageNumber, setPageNumber] = useState(1);
    const [catPageL, setCatPageL] = useState([]);
    const [revCatPageL, setRevCatPageL] = useState([]);
    const [catPageR, setCatPageR] = useState([]);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    useEffect(() => {
        //setPageNumber(bookmark);
        //if(bookmark < 5) chrg = bookmark - 1 ;

        //console.log("bookmark: " + bookmark + " charge: " + chrg); 
        const initialArray1 = [];
        const initialArray2 = [];

        for (let i = 0; i < 5; i++) {
            initialArray1.push(<Page
                className={"pagePdf"}
                pageNumber={((bookmark-1) - i)}
                width={560}
            />);
            initialArray2.push(<Page
                className={"pagePdf"}
                pageNumber={(bookmark + i)}
                width={560}
            />);
        }
        setLengthArr1(5);
        setCatPageL(initialArray1);

        setLengthArr2(5);
        setCatPageR(initialArray2);

    },[bookmark]);
    
    function previousPage() {
        const nPage = bookmark - lengthArr1 - 1;
        const item = document.querySelector('.pagesContainer');
        var posX = (parseFloat(item.style.left));
        /*if(nPage <= 2){
            return;
        }else */if(posX === -100){
            item.style.transition = '0ms';
            const array = catPageL;
            for (let i = 0; i < 4; i++) {
                array.push(<Page
                    className={"pagePdf"}
                    pageNumber={nPage - i}
                    width={560}
                />);
            }
            setCatPageL(array);
            setLengthArr1(lengthArr1 + 4);
            item.style.left = (posX - 100) + "%";
        }else{
            item.style.left = (posX + 100) + "%";
            item.style.transition = '1000ms';
        }
        //changePage(-2);
    }
    
    function nextPage() {
        const nPage = bookmark + lengthArr2 + 1;
        const array = [];
        const item = document.querySelector('.pagesContainer');
        var posX = (parseFloat(item.style.left));

        if(nPage >= numPages-1){
            return;
        }else if(-posX >= ((((lengthArr2+lengthArr1)/2)-2)*100)){
            item.style.left = (posX - 100) + "%";
            for (let i = 0; i < 4; i++) {
                array.push(<Page
                    className={"pagePdf"}
                    pageNumber={nPage + i}
                    width={560}
                />);
                setCatPageR([...catPageR,array]);
            }
            setLengthArr2(lengthArr2 + 4);
        }else{
            item.style.left = (posX - 100) + "%";
            item.style.transition = '1000ms';
        }
    }

    const reversedArray = catPageL.slice().reverse();

    const mappedArray = reversedArray.map((paginasL, index) => {
        return <div className='d-flex' key={index}>{paginasL}</div>;
    }); 

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
                        mappedArray
                    }
                    {
                        catPageR.map((paginasR, index) => (
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
