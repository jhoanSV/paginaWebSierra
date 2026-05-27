import { React, useState, useEffect, useRef } from "react";
import "./_pdfViewer2.scss";
import { ThePage } from "../PdfViewer/ThePage"
import { GetCoordinatesPagesApi } from "../../api";
import { useObserver } from "../UseObs";
import secureLocalStorage from "react-secure-storage";
import imgPlaceHolder from '../../Assets/png/placeHolderProduct.png';
import { ModalProductDesk, ModalProductMob } from "../../Componentes/Modals";
//import "../../Assets/jpg/imgsCatalogo/Pagina 1.jpg"

export function PdfViewer2({ route, /*prop, */dir, /*show = 'yes',*/ numPage = 1 }) {
    const cacheBuster = Date.now();
    const [filterGroup, setFilterGroup] = useState([]);
    const [actualNumber, setActualNumber] = useState(0);
    const [selecteditem, setSelecteditem] = useState({});
    const [loading1, setLoading1] = useState(true);
    const [show1, setShow1] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < window.innerHeight);
    const [headerSize, setHeaderSize] = useState(["120px","502px"]);
    //const numRandom = Math.floor(Math.random() * 91) + 1
    //numero de pagina que lleva, hacer condicional para que
    //const jsjs = "Tornilleria"
    let claseDir = null
    //const jsjs = prop
    //console.log(numPage)
    //let numPag = numPage
    const loading2 = useRef(false);
    const numPag = useRef()
    numPag.current = numPage
    if (dir === 0) {
        claseDir = 'dirRow'
    } else if (dir === 1) {
        claseDir = 'dirColumn'
    }

    //const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    // const [observer, setElements, entries] = useObserver({
    //     treshhold: 0.25,
    //     rootMargin: 1,
    //     root: null
    // });
    // const [observer2, setElements2, entries2] = useObserver({
    //     treshhold: 1,
    //     rootMargin: '0px -25% 0px -25%',
    //     root: null
    // });
    const ListCp = useRef([])
    const [pages, setPages] = useState([
        //( ._.)
        { src: `https://sivarwebresources.s3.amazonaws.com/${route}Pagina${numPag.current}.avif?${cacheBuster}`, Npage: numPag.current },
        { src: `https://sivarwebresources.s3.amazonaws.com/${route}Pagina${numPag.current + 1}.avif?${cacheBuster}`, Npage: numPag.current + 1 },
        { src: `https://sivarwebresources.s3.amazonaws.com/${route}Pagina${numPag.current + 2}.avif?${cacheBuster}`, Npage: numPag.current + 2 },
        { src: `https://sivarwebresources.s3.amazonaws.com/${route}Pagina${numPag.current + 3}.avif?${cacheBuster}`, Npage: numPag.current + 3 },
        { src: `https://sivarwebresources.s3.amazonaws.com/${route}Pagina${numPag.current + 4}.avif?${cacheBuster}`, Npage: numPag.current + 4 },
        { src: `https://sivarwebresources.s3.amazonaws.com/${route}Pagina${numPag.current + 5}.avif?${cacheBuster}`, Npage: numPag.current + 5 },
    ]);

    // useEffect(() => {
    //     console.log('render2.1');
        
    //     numPag.current = numPage
    //     const cacheBuster = Date.now();
    //     setPages([
    //         //( ._.)
    //         { src: `https://sivarwebresources.s3.amazonaws.com/${route}Pagina${numPag.current}.avif?${cacheBuster}`, Npage: numPag.current },
    //         { src: `https://sivarwebresources.s3.amazonaws.com/${route}Pagina${numPag.current + 1}.avif?${cacheBuster}`, Npage: numPag.current + 1 },
    //         { src: `https://sivarwebresources.s3.amazonaws.com/${route}Pagina${numPag.current + 2}.avif?${cacheBuster}`, Npage: numPag.current + 2 },
    //         { src: `https://sivarwebresources.s3.amazonaws.com/${route}Pagina${numPag.current + 3}.avif?${cacheBuster}`, Npage: numPag.current + 3 },
    //         { src: `https://sivarwebresources.s3.amazonaws.com/${route}Pagina${numPag.current + 4}.avif?${cacheBuster}`, Npage: numPag.current + 4 },
    //         { src: `https://sivarwebresources.s3.amazonaws.com/${route}Pagina${numPag.current + 5}.avif?${cacheBuster}`, Npage: numPag.current + 5 },
    //     ])

    // }, [numPage])

    const getGetCP = async () => {
        const CPList = await GetCoordinatesPagesApi()
        setLoading1(false);
        ListCp.current = CPList
    }

    // const last_node = () => {
    //     //*Obtiene el ultimo nodo o ultima pagina de catalogo
    //     const pagesContainer = document.querySelector(".pagesContainer");
    //     const nodes = pagesContainer.childNodes.length
    //     setElements([pagesContainer.childNodes[nodes - 1]])
    // }

    // const first_node = () => {
    //     const pagesContainer = document.querySelector(".pagesContainer");
    //     setElements2([pagesContainer.childNodes[0]])
    // }

    const resize_ob = new ResizeObserver(function () {
        const header = document.getElementById('theHeader');
        if (!header) return;
        
        setIsMobile(window.innerWidth < window.innerHeight);

        setHeaderSize([`${header.clientHeight}px`, `${header.clientWidth}px`]);
    });

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

    // useEffect(() => {
    //     if(!loading1){
    //         last_node()
    //         first_node()
    //     }
    //     // eslint-disable-next-line
    // }, [setElements, setElements2, loading1])

    const handleTryAdd = (entry, opt) =>{
        const maxP = getMaxPageNumber()
        const minP = getMinPageNumber()
        console.log("Pagina maxima: ", maxP)
        console.log("pagina minima: ", minP)
        console.log(loading2.current);
        
        if (!loading2.current) return;
        loading2.current = true;
        // if(opt===1){observer.unobserve(entry.target)}
        // if(opt===2){observer2.unobserve(entry.target)}
        
        const cacheBuster = Date.now();
        try {
            //try to search the image before to put in the list
            let page1, page2
            if(opt===1){
                page1 = `https://sivarwebresources.s3.amazonaws.com/${route}Pagina${maxP + 1}.avif?${cacheBuster}`;
                page2 = `https://sivarwebresources.s3.amazonaws.com/${route}Pagina${maxP + 2}.avif?${cacheBuster}`;
            }
            if(opt===2){
                page1 = `https://sivarwebresources.s3.amazonaws.com/${route}Pagina${minP - 1}.avif?${cacheBuster}`;
                page2 = `https://sivarwebresources.s3.amazonaws.com/${route}Pagina${minP - 2}.avif?${cacheBuster}`;
            }

            Promise.all([
                fetch(page1, { method: "HEAD", cache: "no-store" }).then(res => res.ok ? page1 : null),
                fetch(page2, { method: "HEAD", cache: "no-store" }).then(res => res.ok ? page2 : null),
            ])
                .then(([validPage1, validPage2]) => {
                    const newPages = [...pages];
                    if (validPage1&&opt===1) newPages.push({ src: validPage1, Npage: maxP + 1 });
                    if (validPage2&&opt===1) newPages.push({ src: validPage2, Npage: maxP + 2 });
                    if (validPage1&&opt===2) newPages.unshift({ src: validPage1, Npage: minP - 1 });
                    if (validPage2&&opt===2) newPages.unshift({ src: validPage2, Npage: minP - 2 });

                    if (newPages.length > pages.length) {
                        console.log(newPages);
                        setPages(newPages);
                        // if(opt===1){last_node()}
                        // if(opt===2){first_node()}
                    }
                })
                .catch(error => console.error("Error verificando las imágenes:", error));
            //End of search
        } catch (error) {
            console.log("no hay más imágenes jsjs")
        }
        setTimeout(() => {
            loading2.current = false;
        }, 100);
        // if (entry.isIntersecting) {
        // }
    }
    // useEffect(() => {
    //     entries.forEach(entry => {handleTryAdd(entry, 1)});
    //     // eslint-disable-next-line
    // }, [entries]);
    
    // useEffect(() => {
    //     entries2.forEach(entry => {handleTryAdd(entry, 2)});
    //     // eslint-disable-next-line
    // }, [entries2]);

    useEffect(() => {

        if(loading1)return
        const pagesContainer = document.querySelector(".pagesContainer");
        const nodes = pagesContainer.childNodes.length
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !loading2.current) {
                    
                    const nPage = Number(entry.target.getAttribute('data-page'));
                    console.log(nPage);
                    
                    const fstP = pages[0].Npage;
                    console.log(fstP);
                    const lstPage = pages[pages.length - 1].Npage;

                    if (nPage === fstP || nPage === 0) {
                        console.log("¡Es la PRIMERA página! Cargando hacia atrás...");
                        loading2.current = true;
                        observer.unobserve(entry.target);
                        
                        handleTryAdd(entry, 2); // Tu función para hacer unshift
                    }else if (nPage === lstPage) {
                        console.log("¡Es la ÚLTIMA página! Cargando hacia adelante...");
                        loading2.current = true;
                        observer.unobserve(entry.target);
                        
                        handleTryAdd(entry, 1); // Tu función para hacer push
                    }
                }
            });
        }, { threshold: 0.25 });

        if (nodes > 0) {
            console.log(pagesContainer.childNodes[nodes - 1]);
            observer.observe(pagesContainer.childNodes[nodes - 1]);
            observer.observe(pagesContainer.childNodes[1]);
        }
        return () => {
            observer.disconnect();
        };
        
    }, [loading1, pages])
    
    useEffect(() => {
        resize_ob.observe(document.getElementById("theHeader"));

        getGetCP()
    }, [])

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
            const imageUrl = `https://sivarwebresources.s3.amazonaws.com/AVIF/${selectedItem.ImgName}.avif?${cacheBuster}`;

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
            const filterGroups = proData.filter(item => item.Grupo === selectedItem.Grupo && item.Grupo !== 0).sort((a, b) => a.Cod.localeCompare(b.Cod));
            setFilterGroup([...filterGroups])

            setActualNumber(filterGroups.findIndex(item => item.Cod === selectedItem.Cod))
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
            <div className={isMobile? "thePdfViewer pdfVMobile" : "thePdfViewer pdfVDesk"} style={{ '--header-height': `${headerSize[0]}`, '--header-width': `${headerSize[1]}`,}}>
                <div id='idPagesContainer' className={ isMobile? 
                        `pagesContainer ${claseDir} _mobile` :
                         `pagesContainer ${claseDir} _desk`
                        }>
                        {pages[0]?.Npage > 1 && (
                            <div className="centinela-atras" data-page={0} style={{ minWidth: '10px', height: '100%' }} />
                        )}
                    {!loading1 ? 
                        pages.map((page, index) => {
                            const Cp = ListCp.current.filter(item => item.Pag === page.Npage)
                            return (
                                <div className="page" key={page.Npage} data-page={page.Npage}>
                                    <ThePage
                                        key={page.Npage}
                                        the_src={page.src}
                                        Npage={page.Npage}
                                        CP={Cp}
                                        onselect={selectProductModal}
                                    />
                                </div>
                            )
                        }) : 
                        <>
                            ...cargando
                        </>
                    }
                </div>
                {parseInt(headerSize[1],10) < 502 ?
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
