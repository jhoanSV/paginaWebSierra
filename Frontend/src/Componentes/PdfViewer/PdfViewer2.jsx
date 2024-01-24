import { React, useState, useEffect } from "react";
import "./_pdfViewer2.scss";
import { ThePage } from "../PdfViewer/ThePage"
import { useObserver } from "../UseObs";
//import "../../Assets/jpg/imgsCatalogo/Pagina 1.jpg"

export function PdfViewer2({ route, prop, dir, show='yes' }) {

    //const numRandom = Math.floor(Math.random() * 91) + 1
    //numero de pagina que lleva, hacer condicional para que
    //const jsjs = "Tornilleria"
    let claseDir = null
    const jsjs = prop
    let numPag = null
    if (dir === 0){
        claseDir = 'dirRow'
    }else if(dir === 1){
        claseDir = 'dirColumn'
    }

    if (jsjs==="ebanisteria"){
        numPag = 94
    }else if(jsjs==="estudiantil"){
        numPag = 136
    }else if(jsjs==="gas"){
        numPag = 52
    }else if(jsjs==="griferia"){
        numPag = 64
    }else if(jsjs==="electricos"){
        numPag = 6
    }else if(jsjs==="tornilleria"||jsjs==="inicio"){
        numPag = 0
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
        //this stupid shit needs to be more standard
        { src: require(`../../${route}Pagina ${numPag}.jpg`)},
        { src: require(`../../${route}Pagina ${numPag+1}.jpg`)},
        { src: require(`../../${route}Pagina ${numPag+2}.jpg`)},
        { src: require(`../../${route}Pagina ${numPag+3}.jpg`)},
        { src: require(`../../${route}Pagina ${numPag+4}.jpg`)},
        { src: require(`../../${route}Pagina ${numPag+5}.jpg`)},
    ]);

    const last_node = () => {
        //*Obtiene el ultimo nodo o ultima pagina de catalogo
        const pagesContainer = document.querySelector(".pagesContainer");
        const nodes = pagesContainer.childNodes.length
        setElements([pagesContainer.childNodes[nodes-1]])
    }

    const prevF = () => {
        const thePdfViewer = document.querySelector(".thePdfViewer");
        const anchoVisor = (thePdfViewer.getBoundingClientRect().width)
        thePdfViewer.scrollTo({
            left: (thePdfViewer.scrollLeft - anchoVisor),
            behavior: 'smooth'
        });
    }

    const nextF = () => {
        const thePdfViewer = document.querySelector(".thePdfViewer");
        const anchoVisor = thePdfViewer.getBoundingClientRect().width        
        thePdfViewer.scrollTo({
            left: (thePdfViewer.scrollLeft + anchoVisor),
            behavior: 'smooth'
        });
    }

    const resize_ob = new ResizeObserver(function() {
        setScreenWidth(window.innerWidth);
    });

    useEffect(()=>{        
        const thePdfViewer = document.querySelector(".thePdfViewer");
        resize_ob.observe(document.querySelector(".catalogo"));
        //let movejsjs = 0
        //* se configura este Timeout a 0 ms para que calcule el tamaño adecuadamente antes de asignarlo
        //*Notes: there are "-6" on setPageWidth, this is because the pages has a border width=3

        /*document.getElementById('idPagesContainer').addEventListener('wheel', function(e) {
            if (e.deltaY === 0) { // Verifica que el desplazamiento sea horizontal
              e.preventDefault(); // Evita el scroll vertical por defecto
              this.scrollLeft += e.deltaX; // Aplica el desplazamiento horizontal
            }
          });*/

        setTimeout(() => {
            if(window.innerWidth > 502){//*Pc
                setPageWidth((visorWidth / 2)-6)
                if(numPag!==0){
                    thePdfViewer.scrollTo({
                        left: visorWidth,
                        behavior: "auto"
                    });
                }
            }else{//*Celular
                setPageWidth((visorWidth - 6))
                if(numPag===0){
                    thePdfViewer.scrollTo({
                        left: visorWidth,
                        behavior: "auto"
                    });
                }else if(numPag===52 || numPag===6){
                    thePdfViewer.scrollTo({
                        left: visorWidth*3,
                        behavior: "auto"
                    });
                }else{
                    thePdfViewer.scrollTo({
                        left: visorWidth*2,
                        behavior: "auto"
                    });
                }
            }
        }, 0);

        /*return () => {
            document.getElementById('idPagesContainer').removeEventListener('wheel')
        };*/

        // eslint-disable-next-line
    },[])

    useEffect(()=>{
        setVisorWidth(Math.floor(window.innerWidth*82/100))
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
                        { src: require(`../../${route}Pagina ${numPag+pages.length}.jpg`)},
                        { src: require(`../../${route}Pagina ${numPag+pages.length+1}.jpg`)},
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
                <div id='idPagesContainer' className={"pagesContainer "+ claseDir} /*style={{ minWidth: "80000px"}}*/>
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
                <button onClick={prevF} className={'prev '+ show}>
                        <i className="bi bi-arrow-left-circle-fill"></i>
                </button>
                <button onClick={nextF} className={'next ' + show}>
                        <i className="bi bi-arrow-right-circle-fill"></i>
                </button>
            </div>
        </>
    );
}
