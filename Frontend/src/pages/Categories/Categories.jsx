import { React } from 'react';
import "./_Categories.scss";
import { useParams } from 'react-router-dom';
import list from "../../Assets/jpg/categorias/categorias.json";
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
                            //src="https://drive.google.com/file/d/1IPUFXtvUWSbA8gajjFVrrsk-Uqx12SH3/preview?usp=embed_googleplus"
                            src={`${cat.cat}`}
                            frameborder="0"
                        />
                    </div>
                </div>
                
            </div>

        </>
    );
}
