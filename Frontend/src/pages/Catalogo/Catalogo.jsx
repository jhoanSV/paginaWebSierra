import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
//import { PdfViewer } from "../../Componentes/PdfViewer/PdfViewer";
import { PdfViewer2 } from "../../Componentes/PdfViewer/PdfViewer2";
import "./_Catalogo.scss";

export function Catalogo() {

    const nCategoria = useLocation();
    const bookMark = nCategoria.state?.bookM;

    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
        console.log("ignorar: "+refreshKey)

        setRefreshKey(prevKey => prevKey + 1);
        // eslint-disable-next-line
    },[bookMark])

    return (
        <>
            <div className="catalogo">

                <div className="row">
                    <div className="pdfViewer">{/*las clase antes era "col pdfViewer"*/}
                        {/*<PdfViewer
                            key={refreshKey}
                            prop={bookMark}
                        />*/}
                        <PdfViewer2/>
                    </div>
                </div>
                
            </div>

        </>
    );
}
