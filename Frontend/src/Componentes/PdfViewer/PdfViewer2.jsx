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
        { src: require(`../../Assets/jpg/imgsCatalogo/Pagina 1.jpg`)},
        { src: require(`../../Assets/jpg/imgsCatalogo/Pagina 2.jpg`)},
        { src: require(`../../Assets/jpg/imgsCatalogo/Pagina 3.jpg`)},
        { src: require(`../../Assets/jpg/imgsCatalogo/Pagina 4.jpg`)},
    ]);

    const resize_ob = new ResizeObserver(function() {
        setScreenWidth(window.innerWidth);
    });

    useEffect(()=>{        
        const pagesContainer = document.querySelector(".pagesContainer");
        resize_ob.observe(document.querySelector(".catalogo"));

        setPageWidth(pagesContainer.clientWidth/2)
    },[])

    useEffect(()=>{
        const pagesContainer = document.querySelector(".pagesContainer");
        
        setPageWidth(pagesContainer.clientWidth/2)
    },[screenWidth])

    useEffect(() => {
        const pagesContainer = document.querySelector(".pagesContainer");
        const nodes = pagesContainer.childNodes.length
        setElements([pagesContainer.childNodes[nodes-1]])
    }, [setElements])

    useEffect(() => {
        entries.forEach(entry=>{
            if (entry.isIntersecting){                
                /*const elmt = entry.target;
                const elSrcValue = elmt.getAttribute('elsrc')
                elmt.srcset = elSrcValue
                observer.unobserve(elmt)
                //!ahora falta ver cómo obtener el numero de pagina correspondiente
                */
                const newPages = [
                    ...pages,
                    { src: require(`../../Assets/jpg/imgsCatalogo/Pagina ${5}.jpg`)},
                    { src: require(`../../Assets/jpg/imgsCatalogo/Pagina ${6}.jpg`)},
                ];
                setPages(newPages)
                console.log("interectajsjs")
            }
        });
    }, [entries, observer])

    return (
        <>
            <div className="pagesContainer">
                {
                    pages.map((page, index) =>(
                        <ThePage
                            key={index}
                            the_src={page.src}
                            width={pageWidth}
                        />
                    ))
                }

            </div>
        </>
    );
}
