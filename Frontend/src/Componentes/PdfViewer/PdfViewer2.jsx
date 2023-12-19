import { React, useState, useEffect } from "react";
import "./_pdfViewer2.scss";
import { ThePage } from "../PdfViewer/ThePage"
import { useObserver } from "../UseObs";
//import "../../Assets/jpg/imgsCatalogo/Pagina 1.jpg"

export function PdfViewer2() {

    //const numRandom = Math.floor(Math.random() * 91) + 1
    //numero de pagina que lleva, hacer condicional para que    
    const jsjs = "Tornilleria"
    let num = null
    if (jsjs==="Ebanisteria"){
        num = 94
    }else if(jsjs==="Estudiantil"){
        num = 136
    }else if(jsjs==="Gas"){
        num = 52
    }else if(jsjs==="Griferia"){
        num = 64
    }else if(jsjs==="Electricos"){
        num = 6
    }else if(jsjs==="Tornilleria"){
        num = 0
    }
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [visorWidth, setVisorWidth] = useState(Math.floor(window.innerWidth*82/100));
    const [pageWidth, setPageWidth] = useState()
    const [observer, setElements, entries] = useObserver({
        treshhold: 0.25,
        rootMargin: 1,
        root: null
    });
    const [pages, setPages] = useState([
        { src: require(`../../Assets/imgsCatalogo/main/Pagina ${num}.jpg`)},
        { src: require(`../../Assets/imgsCatalogo/main/Pagina ${num+1}.jpg`)},
        { src: require(`../../Assets/imgsCatalogo/main/Pagina ${num+2}.jpg`)},
        { src: require(`../../Assets/imgsCatalogo/main/Pagina ${num+3}.jpg`)},
        { src: require(`../../Assets/imgsCatalogo/main/Pagina ${num+4}.jpg`)},
        { src: require(`../../Assets/imgsCatalogo/main/Pagina ${num+5}.jpg`)},
    ]);

    const last_node = () => {
        const pagesContainer = document.querySelector(".pagesContainer");
        const nodes = pagesContainer.childNodes.length
        console.log("Nodos: "+nodes)
        setElements([pagesContainer.childNodes[nodes-1]])
    }

    const prevF = () => {
        const thePdfViewer = document.querySelector(".thePdfViewer");
        const anchoVisor = (thePdfViewer.getBoundingClientRect().width)
        thePdfViewer.scrollBy({
            left: (-anchoVisor),
            behavior: 'smooth'
        });
    }

    const nextF = () => {
        const thePdfViewer = document.querySelector(".thePdfViewer");
        const anchoVisor = thePdfViewer.getBoundingClientRect().width
        thePdfViewer.scrollBy({
            left: (anchoVisor),
            behavior: 'smooth'
        });
    }

    const resize_ob = new ResizeObserver(function() {
        setScreenWidth(window.innerWidth);
    });

    useEffect(()=>{        
        const thePdfViewer = document.querySelector(".thePdfViewer");
        resize_ob.observe(document.querySelector(".catalogo"));
        //* se configura este Timeout a 0 ms para que calcule el tamaño adecuadamente antes de asignarlo
        setTimeout(() => {
            if(window.innerWidth > 502){
                setPageWidth((visorWidth / 2)-6)
            }else{
                setPageWidth((visorWidth - 6))
            }
            console.log("posición inicial: "+visorWidth)
            if(num!==0){
                thePdfViewer.scrollTo({
                    left: visorWidth,
                    behavior: "auto"
                });
            }
        }, 0);
        // eslint-disable-next-line
    },[])

    useEffect(()=>{
        setVisorWidth(Math.floor(window.innerWidth*82/100))
        console.log("ancho de nav: " + window.innerWidth)        
    },[screenWidth])
    useEffect(() => {        
        if(window.innerWidth > 502){
            setPageWidth((visorWidth / 2)-6)
        }else{
            setPageWidth((visorWidth - 6))
        }
    }, [visorWidth])

    useEffect(() => {
        last_node()
        // eslint-disable-next-line
    }, [setElements])

    useEffect(() => {
        entries.forEach(entry=>{
            if (entry.isIntersecting){
                observer.unobserve(entry.target)
                try {
                    const newPages = [
                        ...pages,
                        { src: require(`../../Assets/imgsCatalogo/main/Pagina ${num+pages.length}.jpg`)},
                        { src: require(`../../Assets/imgsCatalogo/main/Pagina ${num+pages.length+1}.jpg`)},
                    ];
                    setPages(newPages)
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
            <div className="thePdfViewer" style={{ width: visorWidth}}>
                <div className="pagesContainer" style={{ minWidth: "80000px"}}>
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
                <button onClick={nextF} className="next">
                        <i className="bi bi-arrow-right-circle-fill"></i>
                </button>
            </div>
        </>
    );
}
