import { React } from 'react';
import list from "../../Assets/jpg/categorias/categorias.json";
import "./_Categories.scss";
import { CategoryMenu } from '../../Componentes/Carruseles/CategoryMenu';
import { useParams } from 'react-router-dom';
//import aja from "../../Assets/gif/ebanisteria.png";

export function Categories() {
    
    window.scrollTo(0, 0);
    let { name } = useParams();
    const cat = list.find((i) => i.descripcion === name);

    return (
        <>
            <div className="categoria">
                <div className="row">
                    <div className="col imgCat">
                        <img
                            src={require(`../../Assets/gif/${cat.descripcion}.png`)}
                            alt={`${cat.descripcion} gif`}
                                            
                        />
                    </div>
                </div>
                
                <div className="row">
                    <div className={`col descripcion ${cat.color}`}>
                        <h1>{`${cat.descripcion}`}</h1>
                    </div>
                </div>

                <div className="row">
                    <div className="col pdfViewer">                        
                        <iframe 
                            title="pdf"
                            src={`${cat.cat}`}
                            frameborder="0"
                        />
                    </div>
                </div>

                <div>
                    <CategoryMenu/>
                </div>
                
            </div>

        </>
    );
}
