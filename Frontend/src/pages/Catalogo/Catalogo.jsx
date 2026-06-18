import { React, useEffect, useState } from "react";
import { PdfViewer2 } from "../../Componentes/PdfViewer/PdfViewer2";
import "./_Catalogo.scss";
import { useNavigate, useParams } from "react-router-dom";
import { CategoryPages } from "../../api"

export function Catalogo() {

    const { pag } = useParams();

    const navigate = useNavigate();

    const [theLastPage, setTheLastPage] = useState();

    const findLastPage = async() =>{
        const list = await CategoryPages();
        const FinalPague = Number(list.find(cate => cate.Categoria.toUpperCase() === 'HOJAFINAL').Pag)
        setTheLastPage(FinalPague);
        console.log(FinalPague)
    }

    useEffect(() => {
        findLastPage();
    }, [])
    
    useEffect(()=>{
        window.scrollTo(0,0)
        if(!pag){
            navigate('/catalogo/1');
        }
        // eslint-disable-next-line
    },[pag])

    if(!theLastPage || !pag){
        console.log('!theLastPage', !theLastPage, '!pag', !pag)
        return(
            <>
                Loading...
            </>
        )
    }

    return (
        <section className="catalogo">
            <div className="pdfViewer">
                <PdfViewer2
                    route={'imgsCatalogo/CatalogoAVIF/'}
                    //prop={Categoria}
                    //dir={0}
                    numPage = {parseInt(pag,10)}
                    lastP = {theLastPage}
                    cacheB = {'20260611'} //modif catalogue date
                />
            </div>
        </section>
    );
}
