import { React, useEffect, useState } from "react";
import { PdfViewer2 } from "../../Componentes/PdfViewer/PdfViewer2";
import "./_Catalogo.scss";
import { useNavigate, useParams } from "react-router-dom";
import { CategoryPages } from "../../api"

export function Catalogo() {

    const {cat} = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [ numPage, setNumPage ] = useState(1);
    useEffect(() => {
        
        const categoryPage = async () => {
            try {
                setLoading(true);
                
                const list = await CategoryPages(cat);
                
                const categoria = list.find(cate => cate.Categoria.toUpperCase() === cat.toUpperCase());
                const numberCategory = categoria ? categoria.Pag : 1;
                
                const nc = window.innerWidth < window.innerHeight ? 
                    Number(numberCategory) 
                    : Number(numberCategory) % 2 !== 0 ?  Number(numberCategory) : Number(numberCategory) + 1
                
                setNumPage(nc);
                navigate(`/catalogo/${cat}/${nc}`);
            
            } catch (error) {
                console.error("Error cargando categorías:", error);
            } finally {
                setLoading(false); 
            }
        };

        categoryPage();
        window.scrollTo(0, 0);
        //console.log("ignorar: "+refreshKey)

        //setRefreshKey(prevKey => prevKey + 1);
        // eslint-disable-next-line
    },[cat])

    if(loading){
        return <div>Loading...</div>
    }

    return (
        <>
            <div className="catalogo">
                <div className="pdfViewer">
                    <PdfViewer2
                        route={'imgsCatalogo/CatalogoAVIF/'}
                        //prop={Categoria}
                        //dir={0}
                        numPage = {numPage}
                        cacheB = {'20260528'} //modif catalogue date 
                    />
                </div>
            </div>

        </>
    );
}
