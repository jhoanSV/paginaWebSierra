import { React, useState, useEffect, useRef } from "react";
import "./_pdfViewer2.scss";
import { ThePage } from "../PdfViewer/ThePage"
import { useObserver } from "../UseObs";
//import "../../Assets/jpg/imgsCatalogo/Pagina 1.jpg"

export function PdfViewer2({ route, prop, dir, show='yes', numPage = 0}) {

    //const numRandom = Math.floor(Math.random() * 91) + 1
    //numero de pagina que lleva, hacer condicional para que
    //const jsjs = "Tornilleria"
    let claseDir = null
    const jsjs = prop
    console.log(numPage)
    //let numPag = numPage
    const numPag = useRef()
    numPag.current = numPage
    if (dir === 0){
        claseDir = 'dirRow'
    }else if(dir === 1){
        claseDir = 'dirColumn'
    }

    /*if (jsjs==="ebanisteria"){
        numPag = 112
    }else if(jsjs==="estudiantil"){
        numPag = 9
    }else if(jsjs==="gas"){
        numPag = 22
    }else if(jsjs==="griferia"){
        numPag = 34
    }else if(jsjs==="electricos"){
        numPag = 66
    }else if(jsjs==="tornilleria"||jsjs==="inicio"){
        numPag = 0
    }*/

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
        { src: `https://sivarwebresources.s3.amazonaws.com/${route}Pagina+${numPag.current}.avif`},
        { src: `https://sivarwebresources.s3.amazonaws.com/${route}Pagina+${numPag.current+1}.avif`},
        { src: `https://sivarwebresources.s3.amazonaws.com/${route}Pagina+${numPag.current+2}.avif`},
        { src: `https://sivarwebresources.s3.amazonaws.com/${route}Pagina+${numPag.current+3}.avif`},
        { src: `https://sivarwebresources.s3.amazonaws.com/${route}Pagina+${numPag.current+4}.avif`},
        { src: `https://sivarwebresources.s3.amazonaws.com/${route}Pagina+${numPag.current+5}.avif`},
    ]);

    useEffect(() => {
        numPag.current = numPage
        setPages([
            //this stupid shit needs to be more standard
            { src: `https://sivarwebresources.s3.amazonaws.com/${route}Pagina+${numPag.current}.avif`},
            { src: `https://sivarwebresources.s3.amazonaws.com/${route}Pagina+${numPag.current+1}.avif`},
            { src: `https://sivarwebresources.s3.amazonaws.com/${route}Pagina+${numPag.current+2}.avif`},
            { src: `https://sivarwebresources.s3.amazonaws.com/${route}Pagina+${numPag.current+3}.avif`},
            { src: `https://sivarwebresources.s3.amazonaws.com/${route}Pagina+${numPag.current+4}.avif`},
            { src: `https://sivarwebresources.s3.amazonaws.com/${route}Pagina+${numPag.current+5}.avif`},
        ])

    }, [numPage])
    


    const last_node = () => {
        //*Obtiene el ultimo nodo o ultima pagina de catalogo
        const pagesContainer = document.querySelector(".pagesContainer");
        const nodes = pagesContainer.childNodes.length
        setElements([pagesContainer.childNodes[nodes-1]])
    }

    const prevF = async() => {
        const thePdfViewer = document.querySelector(".thePdfViewer");
        const anchoVisor = (thePdfViewer.getBoundingClientRect().width)
        const minP = getMinPageNumber()
        //try to search the image before to put in the list
        const page1 = `https://sivarwebresources.s3.amazonaws.com/${route}Pagina+${minP - 1}.avif`;
        const page2 = `https://sivarwebresources.s3.amazonaws.com/${route}Pagina+${minP - 2 }.avif`;

        const [validPage1, validPage2] = await Promise.all([
            fetch(page1, { method: "HEAD", cache: "no-store" }).then(res => res.ok ? page1 : null),
            fetch(page2, { method: "HEAD", cache: "no-store" }).then(res => res.ok ? page2 : null)
        ]);

        if (validPage1 || validPage2) {
            await new Promise(resolve => {
                setPages(prevPages => {
                    const newPages = [
                        ...(validPage2 ? [{ src: validPage2 }] : []),
                        ...(validPage1 ? [{ src: validPage1 }] : []),
                        ...prevPages
                    ];
                    resolve(); // Asegura que la actualización del estado termine antes de seguir
                    return newPages;
                });
            });
        }
        //End of search

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

        /*setTimeout(() => {
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

    const getMinPageNumber = () => {
        if (pages.length === 0) return null;
    
        const pageNumbers = pages
            .map(page => {
                const match = page.src.match(/Pagina\+(\d+)\.avif/); // Buscar número después de "Pagina+"
                return match ? parseInt(match[1], 10) : null;
            })
            .filter(num => num !== null); // Filtrar valores nulos
    
        return Math.min(...pageNumbers);
    };

    const getMaxPageNumber = () => {
        if (pages.length === 0) return null;
    
        const pageNumbers = pages
            .map(page => {
                const match = page.src.match(/Pagina\+(\d+)\.avif/); // Buscar número después de "Pagina+"
                return match ? parseInt(match[1], 10) : null;
            })
            .filter(num => num !== null); // Filtrar valores nulos
    
        return Math.max(...pageNumbers);
    };      

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
        const maxP = getMaxPageNumber()
        console.log("Pagina maxima: ", maxP)
        entries.forEach(entry=>{
            if (entry.isIntersecting){
                observer.unobserve(entry.target)
                try {
                    //try to search the image before to put in the list
                    const page1 = `https://sivarwebresources.s3.amazonaws.com/${route}Pagina+${maxP + 1}.avif`;
                    const page2 = `https://sivarwebresources.s3.amazonaws.com/${route}Pagina+${maxP + 2 }.avif`;

                    Promise.all([
                        fetch(page1, { method: "HEAD", cache: "no-store" }).then(res => res.ok ? page1 : null),
                        fetch(page2, { method: "HEAD", cache: "no-store" }).then(res => res.ok ? page2 : null)
                    ])
                    .then(([validPage1, validPage2]) => {
                        const newPages = [...pages];
                        if (validPage1) newPages.push({ src: validPage1 });
                        if (validPage2) newPages.push({ src: validPage2 });

                        if (newPages.length > pages.length) {
                            setPages(newPages);
                            last_node()
                        }
                    })
                    .catch(error => console.error("Error verificando las imágenes:", error));
                    //End of search

                    
                    /*const newPages = [
                        ...pages,
                        { src: `https://sivarwebresources.s3.amazonaws.com/${route}Pagina+${numPag+pages.length}.avif`},
                        { src: `https://sivarwebresources.s3.amazonaws.com/${route}Pagina+${numPag+pages.length+1}.avif`},
                    ];
                    setPages(newPages)
                    last_node()*/
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
                                    key={index}
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
