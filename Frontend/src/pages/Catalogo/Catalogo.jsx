import { React } from "react";
import { useLocation } from "react-router-dom";
import { PdfViewer } from "../../Componentes/PdfViewer/PdfViewer";
import "./_Catalogo.scss";

export function Catalogo() {

    const nCategoria = useLocation();
    const bookMark = nCategoria.state?.bookM;
    
    window.scrollTo(0, 0);

    return (
        <>
            <div className="catalogo">

                <div className="row">
                    <div className="col pdfViewer">
                        <PdfViewer
                            prop={bookMark}
                        />                        
                    </div>
                </div>
                
            </div>

        </>
    );
}
