import { React, useEffect, useState } from "react";
import { PdfViewer2 } from "../../Componentes/PdfViewer/PdfViewer2";
import "./_Catalogo.scss";
import { useNavigate, useParams } from "react-router-dom";
import { CategoryPages } from "../../api"
import { useTheContext } from "../../TheProvider";

export function Catalogo() {

    const { pag } = useParams();
    //const { categSelect } = useTheContext();
    //const navigate = useNavigate();

    //const [loading, setLoading] = useState(true);
    //const [ numPage, setNumPage ] = useState(1);

    // useEffect(() => {
        
    //     console.log(categSelect);
        
    //     // const categoryPage = async () => {
    //     //     try {
    //     //         setLoading(true);
                
    //     //         const list = await CategoryPages();
                
    //     //         const categoria = list.find(cate => cate.Categoria.toUpperCase() === categSelect.Categoria.toUpperCase());
    //     //         console.log(list.find(cate => cate.Categoria.toUpperCase() === 'ebanisteria'.toUpperCase()));
                
    //     //         const numberCategory = categoria ? categoria.Pag : 1;

    //     //         console.log(numberCategory);
                
    //     //         const nc = window.innerWidth < window.innerHeight ? 
    //     //             Number(numberCategory) 
    //     //             : Number(numberCategory) % 2 !== 0 ?  Number(numberCategory) : Number(numberCategory) + 1
                
                
            
    //     //     } catch (error) {
    //     //         console.error("Error cargando categorías:", error);
    //     //     } finally {
    //     //         setLoading(false);
    //     //     }
    //     // };
    //     setNumPage(pag);
    //     navigate(`/catalogo/${categSelect.Pag}`);

    //     //categoryPage();
    //     window.scrollTo(0, 0);
    //     //console.log("ignorar: "+refreshKey)

    //     //setRefreshKey(prevKey => prevKey + 1);
    //     // eslint-disable-next-line
    // },[pag])

    // if(loading){
    //     return <section className="catalogo">Loading...</section>
    // }

    return (
        <>
            <section className="catalogo">
                <div className="pdfViewer">
                    <PdfViewer2
                        route={'imgsCatalogo/CatalogoAVIF/'}
                        //prop={Categoria}
                        //dir={0}
                        numPage = {parseInt(pag,10)}
                        cacheB = {'20260603'} //modif catalogue date 
                    />
                </div>
            </section>

        </>
    );
}
