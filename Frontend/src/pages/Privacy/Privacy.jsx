import React, { useState } from "react";
import "./_Privacy.scss";
import { ThePage } from "../../Componentes/PdfViewer/ThePage";

export function Privacy() {

  // eslint-disable-next-line
  const [pageWidth, setPageWidth] = useState(Math.floor(window.innerWidth*85/100))

  const pages = [];

  for (let i = 0; i < 15; i++) {
    //pages.push({ src: require(`../../Assets/docs/ImgsPdf/Pagina ${i}.jpg`) });
    pages.push({ src: require(`../../Assets/docs/ImgsPdf/PolDatos/Pagina ${i}.jpg`) });    
  }

  return (
    <>
      <div className="pol-datos">
        
        {/*<h1>Politica de tratamiento de datos personales</h1>*/}
        <ul>
          {
            pages.map((page, index) =>(
              <li key={index}>
                <div className="page">
                    <ThePage
                        //key={index}
                        the_src={page.src}
                        width={pageWidth}
                    />
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    </>
  )
}
