import { React, useEffect, useState } from "react";
import { PdfViewer2 } from "../../Componentes/PdfViewer/PdfViewer2";
import "./_Catalogo.scss";
import { useNavigate, useParams } from "react-router-dom";
import { CategoryPages } from "../../api"

export function Catalogo() {

    const nCategoria = useParams();
    const navigate = useNavigate();
    
    let Categoria = nCategoria.cat;

    const [loading, setLoading] = useState(true);
    const [ numPage, setNumPage ] = useState(1);
    useEffect(() => {
        
        const categoryPage = async () => {
            try {
                setLoading(true);
                
                const list = await CategoryPages(Categoria);
                
                const categoria = list.find(cat => cat.Categoria.toUpperCase() === Categoria.toUpperCase());
                const numberCategory = categoria ? categoria.Pag : 1;
                
                setNumPage(Number(numberCategory));
                navigate(`/catalogo/${Categoria}/${Number(numberCategory)}`);
            
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
    },[Categoria])

    if(loading){
        return <div>Loading...</div>
    }

    return (
        <>
            <div className="catalogo">

                <div>
                    <div className="pdfViewer">
                        <PdfViewer2
                            route={'imgsCatalogo/CatalogoAVIF/'}
                            //prop={Categoria}
                            dir={0}
                            numPage = {numPage}
                        />
                    </div>
                </div>
                
            </div>

        </>
    );
}
