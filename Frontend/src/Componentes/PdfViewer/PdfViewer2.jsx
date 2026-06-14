import { React, useState, useEffect, useRef } from "react";
import "./_pdfViewer2.scss";
import { ThePage } from "../PdfViewer/ThePage"
import { GetCoordinatesPagesApi } from "../../api";
import secureLocalStorage from "react-secure-storage";
import imgPlaceHolder from '../../Assets/png/placeHolderProduct.png';
import { ModalProductDesk, ModalProductMob } from "../../Componentes/Modals";
import { useNavigate, useParams } from "react-router-dom";
//import "../../Assets/jpg/imgsCatalogo/Pagina 1.jpg"

export function PdfViewer2({ route, /*dir, show = 'yes',*/ numPage = 1, cacheB, lastP }) {
    const cacheBuster = Date.now()
    
    const [filterGroup, setFilterGroup] = useState([]);
    const [actualNumber, setActualNumber] = useState(0);
    const [selecteditem, setSelecteditem] = useState({});
    const [loading1, setLoading1] = useState(true);
    const [show1, setShow1] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < window.innerHeight);
    const [headerSize, setHeaderSize] = useState(["120px","502px"]);
    const [anchoHoja, setAnchoHoja] = useState(362.2);
    //let claseDir = null
    const containerRef = useRef(null);
    const timeoutUrlRef = useRef(null);

    const currentPage = useRef(null);
    
    const navigate = useNavigate();
    const { pag } = useParams();

    const ListCp = useRef([])
    const [pages, setPages] = useState([
        //( ._.)
        { src: `https://d1w9pov8bh9gl7.cloudfront.net/${route}Pagina${numPage}.avif`, Npage: numPage },
        { src: `https://d1w9pov8bh9gl7.cloudfront.net/${route}Pagina${numPage + 1}.avif`, Npage: numPage + 1 },
        { src: `https://d1w9pov8bh9gl7.cloudfront.net/${route}Pagina${numPage + 2}.avif`, Npage: numPage + 2 },
        { src: `https://d1w9pov8bh9gl7.cloudfront.net/${route}Pagina${numPage + 3}.avif`, Npage: numPage + 3 },
        { src: `https://d1w9pov8bh9gl7.cloudfront.net/${route}Pagina${numPage + 4}.avif`, Npage: numPage + 4 },
        { src: `https://d1w9pov8bh9gl7.cloudfront.net/${route}Pagina${numPage + 4}.avif`, Npage: numPage + 5 }//{ src: `https://sivarwebresources.s3.amazonaws.com/${route}Pagina${numPage + 5}.avif`, Npage: numPage + 5 },
    ]);

    const getGetCP = async () => {
        const CPList = await GetCoordinatesPagesApi()
        setLoading1(false);
        ListCp.current = CPList
    }

    const resize_ob = new ResizeObserver(function () {
        const header = document.getElementById('theHeader');
        if (!header) return;
        
        setIsMobile(window.innerWidth < window.innerHeight);

        setHeaderSize([`${header.clientHeight}px`, `${header.clientWidth}px`]);
    });

    const resize_ob2 = new ResizeObserver(function() {
        
        const theVisor = document.querySelector('.thePdfViewer')
        if(theVisor){
            const anchoVisor = theVisor.clientWidth;
            const nuevoAnchoHoja = (window.innerWidth < window.innerHeight) ? anchoVisor : anchoVisor / 2;
            
            setAnchoHoja(nuevoAnchoHoja);
        }
    });

    useEffect(() => {
        const visor = document.querySelector('.thePdfViewer');
        if (visor) {
            visor.classList.add('is-navigating');

            let destPage

            if(window.innerWidth < window.innerHeight){
                destPage = pag
            }else{
                if(pag%2!==0){
                    destPage = pag
                }else{
                    destPage = pag - 1
                }
            }
            
            const posicionDestino = (destPage - 1) * anchoHoja;
            
            currentPage.current = destPage;
            visor.scrollLeft = posicionDestino;

            setTimeout(() => {
                visor.classList.remove('is-navigating');
            }, 50);
        }
        // eslint-disable-next-line
    }, [pag]);
    
    useEffect(() => {
        resize_ob.observe(document.getElementById("theHeader"));
        resize_ob2.observe(document.querySelector('.thePdfViewer'));

        getGetCP()
        // eslint-disable-next-line
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
            const imageUrl = `https://sivarwebresources.s3.amazonaws.com/AVIF/${selectedItem.ImgName}.avif?${cacheB}`;

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

    const moveScroll = (opt) =>{
        if (containerRef.current) {
            if(opt===0){
                containerRef.current.scrollBy({
                    left: -anchoHoja,         //iz
                    top: 0,
                    behavior: 'smooth'
                });
            }
            if(opt===1){
                containerRef.current.scrollBy({
                    left: anchoHoja,         //der
                    top: 0,
                    behavior: 'smooth'
                });
            }
        }
        
    }

    const handleVirtualScroll = async(e) => {
            
        const container = e.target;

        const scrollActual = container.scrollLeft;

        let theCurrentPage;

        if (isMobile) {
            theCurrentPage = Math.round(scrollActual / anchoHoja) + 1;
        } else {
            const PageIndex = Math.round(scrollActual / anchoHoja);
            
            const theActualPage = PageIndex + 1;
            theCurrentPage = theActualPage % 2 === 0 ? theActualPage - 1 : theActualPage;
        }

        currentPage.current = theCurrentPage;
        

        const sidePages = isMobile ? 2 : 4;

        let paginaInicio = theCurrentPage - sidePages;
        let paginaFin = theCurrentPage + (isMobile ? 3 : 5);

        if (paginaInicio < 1) {
            paginaInicio = 1;
            paginaFin = Math.min(isMobile ? 6 : 10, lastP);
        }
        if (paginaFin > lastP) {
            paginaFin = lastP;
            paginaInicio = Math.max(1, lastP - (isMobile ? 5 : 9));
        }

        const nuevasPaginas = [];
        const cacheBuster = cacheB;

        for (let p = paginaInicio; p <= paginaFin; p++) {
            nuevasPaginas.push({
                src: `https://d1w9pov8bh9gl7.cloudfront.net/${route}Pagina${p}.avif`,
                Npage: p
            });
        }
        
        setPages((prevPages) => {
            if (prevPages.length === nuevasPaginas.length && prevPages[0]?.Npage === nuevasPaginas[0]?.Npage) {
            return prevPages;
            }
            return nuevasPaginas;
        });
        if (timeoutUrlRef.current) {clearTimeout(timeoutUrlRef.current)};
        
        timeoutUrlRef.current = setTimeout(() => {
            navigate(`/catalogo/${theCurrentPage}`, { replace: true });
        }, 400);
    };

    const ANCHO_TOTAL_CONTAINER = lastP * anchoHoja;

    return (
        <>
            <div ref={containerRef} className={
                isMobile? "thePdfViewer pdfVMobile" : "thePdfViewer pdfVDesk"}
                style={{ '--header-height': `${headerSize[0]}`, '--header-width': `${headerSize[1]}`}}
                onScroll={handleVirtualScroll}
            >
                <div 
                    id='idPagesContainer' 
                    className='pagesContainer'
                    style={{
                        position: 'relative',
                        width: `${ANCHO_TOTAL_CONTAINER}px`,
                    }}
                >
                    {!loading1 ? 
                        pages.map((page, index) => {
                            const Cp = ListCp.current.filter(item => item.Pag === page.Npage);
                            
                            const posicionLeft = (page.Npage - 1) * anchoHoja;

                            return (
                                <div 
                                    className="page" 
                                    key={page.Npage} 
                                    data-page={page.Npage}
                                    style={{
                                        position: 'absolute',
                                        width: `${anchoHoja}px`,
                                        left: `${posicionLeft}px`,
                                        //height: '100%',
                                        scrollSnapAlign: (window.innerWidth < window.innerHeight) ? 
                                            'start'
                                        :
                                            page.Npage % 2 !== 0 ? 'start' : 'none'
                                    }}
                                    >
                                    <ThePage
                                        key={page.Npage}
                                        the_src={page.src}
                                        Npage={page.Npage}
                                        CP={Cp}
                                        onselect={selectProductModal}
                                    />
                                </div>
                            );
                        })
                        :
                        <>
                            ...cargando
                        </>
                    }
                </div>
                <div>
                    <div className='ele tpdfab' onClick={()=>moveScroll(0)}>
                        <i className="bi bi-arrow-left-circle-fill"></i>
                    </div>
                    <div className='erre tpdfab' onClick={()=>moveScroll(1)}>
                        <i className="bi bi-arrow-right-circle-fill"></i>
                    </div>
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
