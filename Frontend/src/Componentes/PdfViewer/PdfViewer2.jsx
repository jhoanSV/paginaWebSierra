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

    const resize_ob = new ResizeObserver(function() {
        setScreenWidth(window.innerWidth);
    });

    useEffect(()=>{        
        const pagesContainer = document.querySelector(".pagesContainer");
        resize_ob.observe(document.querySelector(".catalogo"));

        console.log("ancho: "+(pagesContainer.getBoundingClientRect().width))
        setPageWidth(pagesContainer.getBoundingClientRect().width/2)
        // eslint-disable-next-line
    },[])

    useEffect(()=>{
        const pagesContainer = document.querySelector(".pagesContainer");
        
        setPageWidth(pagesContainer.getBoundingClientRect().width/2)
    },[screenWidth])

    useEffect(() => {
        last_node()
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
