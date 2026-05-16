import { React, useState, useEffect, useRef } from "react";
import "./_pdfViewer2.scss";
import { ThePage } from "../PdfViewer/ThePage"
import { GetCoordinatesPagesApi } from "../../api";
import { useObserver } from "../UseObs";
import secureLocalStorage from "react-secure-storage";
import imgPlaceHolder from '../../Assets/png/placeHolderProduct.png';
import { ModalProductDesk, ModalProductMob } from "../../Componentes/Modals";
//import "../../Assets/jpg/imgsCatalogo/Pagina 1.jpg"

export function PdfViewer2({ route, prop, dir, show = 'yes', numPage = 0 }) {
    const [filterGroup, setFilterGroup] = useState([]);
    const [actualNumber, setActualNumber] = useState(0);
    const [selecteditem, setSelecteditem] = useState({});
    const [show1, setShow1] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    //const numRandom = Math.floor(Math.random() * 91) + 1
    //numero de pagina que lleva, hacer condicional para que
    //const jsjs = "Tornilleria"
    let claseDir = null
    //const jsjs = prop
    //console.log(numPage)
    //let numPag = numPage
    const numPag = useRef()
    numPag.current = numPage
    if (dir === 0) {
        claseDir = 'dirRow'
    } else if (dir === 1) {
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
    const [visorWidth, setVisorWidth] = useState(Math.floor(window.innerWidth * 82 / 100));
    const [pageWidth, setPageWidth] = useState()
    const [observer, setElements, entries] = useObserver({
        treshhold: 0.25,
        rootMargin: 1,
        root: null
    });
    const ListCp = useRef([])
    const [pages, setPages] = useState([
        //this stupid shit needs to be more standard
        { src: `https://sivarwebresources.s3.amazonaws.com/${route}Pagina${numPag.current}.avif`, Npage: numPag.current },
        { src: `https://sivarwebresources.s3.amazonaws.com/${route}Pagina${numPag.current + 1}.avif`, Npage: numPag.current + 1 },
        { src: `https://sivarwebresources.s3.amazonaws.com/${route}Pagina${numPag.current + 2}.avif`, Npage: numPag.current + 2 },
        { src: `https://sivarwebresources.s3.amazonaws.com/${route}Pagina${numPag.current + 3}.avif`, Npage: numPag.current + 3 },
        { src: `https://sivarwebresources.s3.amazonaws.com/${route}Pagina${numPag.current + 4}.avif`, Npage: numPag.current + 4 },
        { src: `https://sivarwebresources.s3.amazonaws.com/${route}Pagina${numPag.current + 5}.avif`, Npage: numPag.current + 5 },
    ]);

    useEffect(() => {
        numPag.current = numPage
        const cacheBuster = Date.now();
        setPages([
            //this stupid shit needs to be more standard
            { src: `https://sivarwebresources.s3.amazonaws.com/${route}Pagina${numPag.current}.avif?${cacheBuster}`, Npage: numPag.current },
            { src: `https://sivarwebresources.s3.amazonaws.com/${route}Pagina${numPag.current + 1}.avif?${cacheBuster}`, Npage: numPag.current + 1 },
            { src: `https://sivarwebresources.s3.amazonaws.com/${route}Pagina${numPag.current + 2}.avif?${cacheBuster}`, Npage: numPag.current + 2 },
            { src: `https://sivarwebresources.s3.amazonaws.com/${route}Pagina${numPag.current + 3}.avif?${cacheBuster}`, Npage: numPag.current + 3 },
            { src: `https://sivarwebresources.s3.amazonaws.com/${route}Pagina${numPag.current + 4}.avif?${cacheBuster}`, Npage: numPag.current + 4 },
            { src: `https://sivarwebresources.s3.amazonaws.com/${route}Pagina${numPag.current + 5}.avif?${cacheBuster}`, Npage: numPag.current + 5 },
        ])

    }, [numPage])

    const getGetCP = async () => {
        const CPList = await GetCoordinatesPagesApi()
        ListCp.current = CPList
    }

    useEffect(() => {
        getGetCP()
    }, [])

    const last_node = () => {
        //*Obtiene el ultimo nodo o ultima pagina de catalogo
        const pagesContainer = document.querySelector(".pagesContainer");
        const nodes = pagesContainer.childNodes.length
        setElements([pagesContainer.childNodes[nodes - 1]])
    }

    const prevF = async () => {
        const thePdfViewer = document.querySelector(".thePdfViewer");
        const anchoVisor = (thePdfViewer.getBoundingClientRect().width)
        const minP = getMinPageNumber()
        const cacheBuster = Date.now();
        //try to search the image before to put in the list
        const page1 = `https://sivarwebresources.s3.amazonaws.com/${route}Pagina${minP - 1}.avif?${cacheBuster}`;
        const page2 = `https://sivarwebresources.s3.amazonaws.com/${route}Pagina${minP - 2}.avif?${cacheBuster}`;

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

    /*const nextF = () => {
        const thePdfViewer = document.querySelector(".thePdfViewer");
        const anchoVisor = thePdfViewer.getBoundingClientRect().width        
        
        return new Promise((resolve) => {
            thePdfViewer.scrollTo({
                left: (thePdfViewer.scrollLeft + anchoVisor),
                behavior: 'smooth'
            });

            setTimeout(resolve, 500);
        });
    }*/

    const nextF = () => {
        const thePdfViewer = document.querySelector(".thePdfViewer");
        const anchoVisor = thePdfViewer.getBoundingClientRect().width;

        return new Promise((resolve) => {
            const handleScrollEnd = () => {
                thePdfViewer.removeEventListener('scrollend', handleScrollEnd);
                resolve();
            };

            thePdfViewer.addEventListener('scrollend', handleScrollEnd);

            thePdfViewer.scrollTo({
                left: thePdfViewer.scrollLeft + anchoVisor,
                behavior: 'smooth'
            });
        });
    };

    // En tu componente:
    let isScrolling = false;

    const handleNextClick = () => {
        if (isScrolling) return; // Evita múltiples clics mientras se desplaza

        isScrolling = true;
        nextF().then(() => {
            isScrolling = false;
        });
    };

    const resize_ob = new ResizeObserver(function () {
        setScreenWidth(window.innerWidth);
    });

    useEffect(() => {
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
    }, [])

    const getMinPageNumber = () => {
        if (pages.length === 0) return null;

        const pageNumbers = pages
            .map(page => {
                const match = page.src.match(/Pagina(\d+)\.avif/); // Buscar número después de "Pagina+"
                return match ? parseInt(match[1], 10) : null;
            })
            .filter(num => num !== null); // Filtrar valores nulos

        return Math.min(...pageNumbers);
    };

    const getMaxPageNumber = () => {
        if (pages.length === 0) return null;

        const pageNumbers = pages
            .map(page => {
                const match = page.src.match(/Pagina(\d+)\.avif/); // Buscar número después de "Pagina+"
                return match ? parseInt(match[1], 10) : null;
            })
            .filter(num => num !== null); // Filtrar valores nulos

        return Math.max(...pageNumbers);
    };

    useEffect(() => {
        setVisorWidth(Math.floor(window.innerWidth * 82 / 100))
    }, [screenWidth])
    useEffect(() => {
        if (window.innerWidth > 502) {
            setPageWidth((visorWidth / 2) - 6)
        } else {
            setPageWidth((visorWidth - 6))
        }
    }, [visorWidth])

    useEffect(() => {
        last_node()
        // eslint-disable-next-line
    }, [setElements])

    useEffect(() => {
        const maxP = getMaxPageNumber()
        //console.log("Pagina maxima: ", maxP)
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                observer.unobserve(entry.target)
                const cacheBuster = Date.now();
                try {
                    //try to search the image before to put in the list
                    const page1 = `https://sivarwebresources.s3.amazonaws.com/${route}Pagina${maxP + 1}.avif?${cacheBuster}`;
                    const page2 = `https://sivarwebresources.s3.amazonaws.com/${route}Pagina${maxP + 2}.avif?${cacheBuster}`;

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
                } catch (error) {
                    console.log("no hay más imágenes jsjs")
                }
            }
        });
        // eslint-disable-next-line
    }, [entries, observer]);

    //ToDo: Select the product and open the modal to buy it
    useEffect(() => {
        if (screenWidth < 700) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [screenWidth]);

    const closeModal = () => {
        setShow1(false);
        document.body.style.overflow = "auto"
        //document.body.style.overflow = '';
    };

    const selectProductModal = async (ProductCode) => {
        const pro = JSON.parse(secureLocalStorage.getItem('productsList'));
        let proData = pro //The whole table "products".
        // Define a case-insensitive text filter function
        const index = proData.findIndex(item => item.Cod.toLowerCase() === ProductCode.toLowerCase());
        if (index !== -1) { // Verificar si se encontró el producto

            const selectedItem = proData[index]; // Obtener el producto
            const imageUrl = `https://sivarwebresources.s3.amazonaws.com/AVIF/${selectedItem.ImgName}.avif`;

            let img = imageUrl
            // Verificar el ETag del servidor
            fetch(imageUrl, { method: "HEAD", cache: "no-store" })
                .then((response) => {
                    if (response.ok) {
                        const eTag = response.headers.get("ETag"); // Obtener el ETag
                        if (eTag) {
                            //setImgSrc(`${imageUrl}?v=${eTag}`); // Agregar el ETag como versión
                            img = `${imageUrl}?v=${eTag}`
                        } else {
                            //setImgSrc(imageUrl); // Si no hay ETag, usar la URL normal
                            img = imageUrl
                        }

                    } else {
                        console.error("La imagen no existe o hubo un error:", response.status);
                        //setImgSrc(imgPlaceHolder);
                    }
                })
                .catch((error) => {
                    console.error("Error verificando el ETag:", error);
                    //setImgSrc("imageUrl"); // En caso de error, mostrar la imagen igual
                    img = imgPlaceHolder
                });

            let producto = {
                "Agotado": selectedItem.Agotado,
                "Categoria": selectedItem.Categoria.toLowerCase(),
                "Cod": selectedItem.Cod,
                "Descripcion": selectedItem.Descripcion,
                "Detalle": selectedItem.Detalle,
                "EsUnidadOpaquete": selectedItem.EsUnidadOpaquete,
                "ImgName": selectedItem.ImgName,
                "Iva": selectedItem.Iva,
                "PVenta": selectedItem.PVenta,
                "img": img,
                "Porcentaje": selectedItem.Porcentaje,
                "APartirDe": selectedItem.APartirDe
            }
            const filterGroups = proData.filter(item => item.Grupo === selectedItem.Grupo && item.Cod !== selectedItem.Cod && item.Grupo !== 0);
            setFilterGroup([selectedItem, ...filterGroups]);
            console.log("filterGroups: ", [selectedItem, ...filterGroups]);

            setActualNumber(0)
            setSelecteditem(producto);
            setShow1(true);
            document.body.style.overflow = 'hidden';

            //navigate(`/productos/${selectedItem.Cod}`);
        } else {
            console.log("Producto no encontrado con código:", ProductCode);
        }
    }

    const moveToGroup = (step) => {
        if (actualNumber + step < 0 || actualNumber + step > filterGroup.length) {
            return
        }
        const selectedItem = filterGroup[actualNumber + step]
        setActualNumber(actualNumber + step)
        const imageUrl = `https://sivarwebresources.s3.amazonaws.com/AVIF/${selectedItem.ImgName}.avif`;
        let img = imageUrl
        // Verificar el ETag del servidor
        fetch(imageUrl, { method: "HEAD", cache: "no-store" })
            .then((response) => {
                if (response.ok) {
                    const eTag = response.headers.get("ETag"); // Obtener el ETag
                    if (eTag) {
                        //setImgSrc(`${imageUrl}?v=${eTag}`); // Agregar el ETag como versión
                        img = `${imageUrl}?v=${eTag}`
                    } else {
                        //setImgSrc(imageUrl); // Si no hay ETag, usar la URL normal
                        img = imageUrl
                    }

                } else {
                    console.error("La imagen no existe o hubo un error:", response.status);
                    //setImgSrc(imgPlaceHolder);
                }
            })
            .catch((error) => {
                console.error("Error verificando el ETag:", error);
                //setImgSrc("imageUrl"); // En caso de error, mostrar la imagen igual
                img = imgPlaceHolder
            });

        let producto = {
            "Agotado": selectedItem.Agotado,
            "Categoria": selectedItem.Categoria.toLowerCase(),
            "Cod": selectedItem.Cod,
            "Descripcion": selectedItem.Descripcion,
            "Detalle": selectedItem.Detalle,
            "EsUnidadOpaquete": selectedItem.EsUnidadOpaquete,
            "ImgName": selectedItem.ImgName,
            "Iva": selectedItem.Iva,
            "PVenta": selectedItem.PVenta,
            "img": img,
            "Porcentaje": selectedItem.Porcentaje,
            "APartirDe": selectedItem.APartirDe
        }
        setSelecteditem(producto);
    }

    return (
        <>
            <div className="thePdfViewer" style={{ width: visorWidth }}>
                <div id='idPagesContainer' className={"pagesContainer " + claseDir} /*style={{ minWidth: "80000px"}}*/>
                    {
                        pages.map((page, index) => {
                            const Cp = ListCp.current.filter(item => item.Pag === page.Npage)
                            return (
                                <div className="page" key={index}>
                                    <ThePage
                                        key={index}
                                        the_src={page.src}
                                        width={pageWidth}
                                        Npage={page.Npage}
                                        CP={Cp}
                                        onselect={selectProductModal}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
                <button onClick={prevF} className={'prev ' + show}>
                    <i className="bi bi-arrow-left-circle-fill"></i>
                </button>
                <button onClick={handleNextClick} className={'next ' + show}>
                    <i className="bi bi-arrow-right-circle-fill"></i>
                </button>
                {isMobile ?
                    (show1 && selecteditem) ?
                        <ModalProductMob
                            onHide={closeModal}
                            Data={selecteditem}
                            Move={moveToGroup}
                            indexGroup={actualNumber}
                            Group={filterGroup}
                        />
                        :
                        <></>
                    :
                    (show1 && selecteditem) ?
                        <ModalProductDesk
                            onHide={closeModal}
                            Data={selecteditem}
                            Move={moveToGroup}
                            indexGroup={actualNumber}
                            Group={filterGroup}
                        />
                        :
                        <></>
                }
            </div>
        </>
    );
}
