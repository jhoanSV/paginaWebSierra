import { React } from 'react';
//import list from "../../Assets/jpg/categorias/categorias.json";
import "./_Catalogo.scss";
import { CategoryMenu } from "../../Componentes/Carruseles/CategoryMenu";
import { Document, Page } from "react-pdf";
//import { useParams } from 'react-router-dom';
//import aja from "../../Assets/gif/ebanisteria.png";

export function Catalogo() {
    
    window.scrollTo(0, 0);
    /*let { name } = useParams();
    const cat = list.find((i) => i.descripcion === name);*/

    return (
        <>
            <div className="categoria">                

                <div className="row">
                    <div className="col pdfViewer">                      
                        <Document file="../../Assets/docs/Catalogo.pdf">
                            <Page/>
                        </Document>
                    </div>
                </div>

                <div>
                    <CategoryMenu/>
                </div>
                
            </div>

        </>
    );
}
