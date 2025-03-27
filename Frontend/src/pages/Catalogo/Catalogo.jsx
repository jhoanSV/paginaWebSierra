import { React, useEffect, useState } from "react";
//import { useLocation } from "react-router-dom";
//import { PdfViewer } from "../../Componentes/PdfViewer/PdfViewer";
import { PdfViewer2 } from "../../Componentes/PdfViewer/PdfViewer2";
import categs from '../../Assets/jpg/categorias/categorias.json';
import "./_Catalogo.scss";
import { Link, useParams } from "react-router-dom";
import { CategoryPages } from "../../api"

export function Catalogo() {

    //const nCategoria = useLocation();
    const nCategoria = useParams()
    let Categoria = nCategoria.cat
    //const bookMark = nCategoria.state?.bookM;

    const [refreshKey, setRefreshKey] = useState(0);
    const [ numPage, setNumPage ] = useState(0);
    /*useEffect(() => {
        window.scrollTo(0, 0);
        console.log("ignorar: "+refreshKey)

        setRefreshKey(prevKey => prevKey + 1);
        // eslint-disable-next-line
    },[bookMark])*/
    useEffect(() => {
        const categoryPage = async()=> {
            const list = await CategoryPages(Categoria);
            console.log("CategoryPages: ", list);
            const categoria = list.find(cat => cat.Categoria.toUpperCase() === Categoria.toUpperCase());
            const numberCategorory = categoria ? categoria.Pag : 1;
            setNumPage(Number(numberCategorory))
        }
        categoryPage()
        window.scrollTo(0, 0);
        //console.log("ignorar: "+refreshKey)

        setRefreshKey(prevKey => prevKey + 1);
        // eslint-disable-next-line
    },[nCategoria])
    

    return (
        <>
            <div className="catalogo">

                <div className="row">
                    <div className="pdfViewer">{/*las clase antes era "col pdfViewer"*/}
                        {/*<PdfViewer
                            key={refreshKey}
                            prop={bookMark}
                        />*/}
                        <div className="catalogoMenu">
                            {
                            <ul className='m-0 catalogoMenuContainer'>
                                {categs.map((item, index) => (
                                    <li key={index} className='lstStylN' style={{margin: '6px 0px'}}>
                                        <Link to={`/catalogo/${item.descripcion}`} className={`btnMenuCatalogo ${item.color}`}>
                                            <span style={{color: 'black'}}>
                                                {item.descripcion.charAt(0).toUpperCase() + item.descripcion.slice(1)}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            }
                        </div>
                        <PdfViewer2
                            key={refreshKey}
                            route={'imgsCatalogo/CatalogoAVIF/'}
                            prop={Categoria}
                            dir={0}
                            numPage = {numPage}
                        />
                    </div>
                </div>
                
            </div>

        </>
    );
}
