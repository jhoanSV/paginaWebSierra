import { React, useState } from "react";
import { PdfViewer2 } from "../../Componentes/PdfViewer/PdfViewer2";
import "./_Catalogo.scss";
import { useParams } from "react-router-dom";
import { CategoryPages } from "../../api"

export function Catalogo() {

    const { pag } = useParams();

    const [theLastPage, setTheLastPage] = useState();

    const findLastPage = async() =>{
        const list = await CategoryPages();
        
        setTheLastPage(Number(list.find(cate => cate.Categoria.toUpperCase() === 'HOJAFINAL').Pag));
    }

    findLastPage();

    if(!theLastPage){
        return(
            <>
                Loading...
            </>
        )
    }

    return (
        <>
            <section className="catalogo">
                <div className="pdfViewer">
                    <PdfViewer2
                        route={'imgsCatalogo/CatalogoAVIF/'}
                        //prop={Categoria}
                        //dir={0}
                        numPage = {parseInt(pag,10)}
                        lastP = {theLastPage}
                        cacheB = {'20260603'} //modif catalogue date
                    />
                </div>
            </section>

        </>
    );
}
