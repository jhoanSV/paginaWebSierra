import { React, useState, useEffect } from "react";
import "./_pdfViewer2.scss";
import { ThePage } from "../PdfViewer/ThePage"
import { useObserver } from "../UseObs";
//import "../../Assets/jpg/imgsCatalogo/Pagina 1.jpg"

export function PdfViewer2() {

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [pageWidth, setPageWidth] = useState()
    const [observer, setElements, entries] = useObserver({
        treshhold: 0.25,
        rootMargin: 1,
        root: null
    });
    const [pages, setPages] = useState([
        { src: require(`../../Assets/imgsCatalogo/main/Pagina 0.jpg`)},
        { src: require(`../../Assets/imgsCatalogo/main/Pagina 1.jpg`)},
        { src: require(`../../Assets/imgsCatalogo/main/Pagina 2.jpg`)},
        { src: require(`../../Assets/imgsCatalogo/main/Pagina 3.jpg`)},
    ]);

    const last_node = () => {
        const pagesContainer = document.querySelector(".pagesContainer");
        const nodes = pagesContainer.childNodes.length
        console.log("Nodos: "+nodes)
        setElements([pagesContainer.childNodes[nodes-1]])
    }

    const prevF = () => {
        const pagesContainer = document.querySelector(".pagesContainer");
        //console.log(pagesContainer.clientWidth)
        console.log(pagesContainer.scrollLeft)
    }

    const resize_ob = new ResizeObserver(function() {
        setScreenWidth(window.innerWidth);
    });

    useEffect(()=>{        
        const thePdfViewer = document.querySelector(".thePdfViewer");
        const pagesContainer = document.querySelector(".pagesContainer");
        resize_ob.observe(document.querySelector(".catalogo"));
        //* se configura este Timeout a 0 ms para que calcule el tamaño adecuadamente antes de asignarlo
        setTimeout(() => {
            setPageWidth((thePdfViewer.getBoundingClientRect().width-2) / 2);
            pagesContainer.scrollLeft = 1063;
        }, 0);
        // eslint-disable-next-line
    },[])

    useEffect(()=>{
        const thePdfViewer = document.querySelector(".thePdfViewer");
        
        console.log("ancho de nav: " + window.innerWidth)
        if(window.innerWidth > 502){
            setPageWidth((thePdfViewer.getBoundingClientRect().width-2)/2)
        }else{
            setPageWidth((thePdfViewer.getBoundingClientRect().width-2))
        }
    },[screenWidth])

    useEffect(() => {
        last_node()
        // eslint-disable-next-line
    }, [setElements])

    useEffect(() => {
        entries.forEach(entry=>{
            if (entry.isIntersecting){
                observer.unobserve(entry.target)
                console.log(pages.length+1)
                console.log(pages.length+2)
                try {
                    const newPages = [
                        ...pages,
                        { src: require(`../../Assets/imgsCatalogo/main/Pagina ${pages.length+1}.jpg`)},
                        { src: require(`../../Assets/imgsCatalogo/main/Pagina ${pages.length+2}.jpg`)},
                    ];
                    setPages(newPages)
                    console.log("interectajsjs")
                    last_node()
                } catch (error) {
                    console.log("no hay más imágenes jsjs")
                }
            }
        });
        // eslint-disable-next-line
    }, [entries, observer])

    return (
        <>
            <div className="thePdfViewer">
                <div className="pagesContainer" style={{ minWidth: "6000px"}}>
                    {
                        pages.map((page, index) =>(
                            <div className="page" key={index}>
                                <ThePage
                                    //key={index}
                                    the_src={page.src}
                                    width={pageWidth}
                                />
                            </div>
                        ))
                    }
                </div>
                <button onClick={prevF} className="prev">
                        <i className="bi bi-arrow-left-circle-fill"></i>
                </button>
                <button /*onClick={nextPage}*/ className="next">
                        <i className="bi bi-arrow-right-circle-fill"></i>
                </button>
            </div>
        </>
    );
}
