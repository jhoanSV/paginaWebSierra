import React, { useEffect, useState } from 'react';
import './_itemCart.scss';
import { Formater } from '../../globals/otherFunctions';
import imgPlaceHolder from '../../Assets/png/placeHolderProduct.png';
import speak from '../../InternalFunctions';

export const ItemCart = ({id, onDelete, updtC, Data}) => {
    
    const [cant, setCant] = useState(parseInt(Data.Cant))
    const [totalPrice, setTotalPrice] = useState(Data.PVenta*cant)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [fontResize, setFontResize] = useState('');
    const [imgSrc, setImgSrc] = useState(`https://sivarwebresources.s3.amazonaws.com/AVIF/${Data.ImgName}.avif`);

    const handleDelete = () =>{        
        onDelete(id)
    }
    
    const resize_ob = new ResizeObserver(()=>{
        setScreenWidth(window.innerWidth);
    });

    useEffect(() => {
        const theId = 'a' + id
        resize_ob.observe(document.querySelector('#'+theId));
        console.table(Data)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {        
        if(screenWidth<431){
            //console.log(screenWidth);
            setFontResize('1.7rem')
        }else{
            setFontResize('')
        }
        // eslint-disable-next-line
    }, [screenWidth]);

    const handleError = () =>{
        //console.log(`img ${cod} not found`);
        setImgSrc(imgPlaceHolder)
    }


    //TODO: to update the image if this image is new
    useEffect(() => {
        const imageUrl = `https://sivarwebresources.s3.amazonaws.com/AVIF/${Data.ImgName}.avif`;
    
        // Verificar el ETag del servidor
        fetch(imageUrl, { method: "HEAD" })
          .then((response) => {
            const eTag = response.headers.get("ETag"); // Obtener el ETag
            if (eTag) {
              setImgSrc(`${imageUrl}?v=${eTag}`); // Agregar el ETag como versión
            } else {
              setImgSrc(imageUrl); // Si no hay ETag, usar la URL normal
            }
          })
          .catch((error) => {
            console.error("Error verificando el ETag:", error);
            setImgSrc(imageUrl); // En caso de error, mostrar la imagen igual
          });
        setCant(parseInt(Data.Cant));
        setTotalPrice(Data.PVenta * parseInt(Data.Cant));
      }, [Data.Cod]);
    //TODO: end of the todo

    return (
        <div className='itemCartStyle' id={`a${id}`} >
            <div className='delContainer' role='button' 
                data-bs-toggle="modal"
                data-bs-target={`#verifyDel${id}`}
            >
                <i className="bi bi-trash3"></i>
            </div>
            <div className='itemCartImgContainer'>
                <div className='smolText' style={{color: '#747474', textAlign: 'center'}}>{Data.Cod}</div>
                <div className={`imgProducto itemCartImg C${(Data.Categoria).toLowerCase()}`}>
                    <picture>
                        <source
                            type="image/avif"
                            srcSet={imgSrc}
                        />
                        <img
                            src={imgSrc}
                            onError={handleError}
                            alt="categoria"
                            decoding="async"
                        />
                    </picture>                    
                </div>
            </div>
            <div className='detailsItem'>
                <div className='subTit' style={{lineHeight: '1.1'}}><strong>{Data.Descripcion}</strong></div>
                <div style={{marginTop: '10px', display:'flex'}}>
                    <div style={{alignContent:'center'}}>
                        V.U:
                    </div>
                    <div>
                        <div className={parseInt(cant) > Data.APartirDe && Data.Porcentaje !== 0 ? 'text-decoration-line-through': ''}>$ {Formater(Data.PVenta)} </div>
                        {
                            <div>
                                {parseInt(cant) > Data.APartirDe && Data.Porcentaje !== 0 ?'$' + Formater((Data.PVenta * (1-Data.Porcentaje/100)).toFixed(2)): ''}
                            </div>
                        }
                    </div>
                </div>
                <div className="quantityBox">
                    <button className="btnQuantity" onClick={() => {
                        if((cant-Data.EsUnidadOpaquete)>0){
                            updtC(id, parseInt(cant)-Data.EsUnidadOpaquete)
                            setCant(cant-Data.EsUnidadOpaquete)
                            const discountValue = (Data.PVenta * (1-Data.Porcentaje/100)).toFixed(2)
                            const Price = parseInt(cant)-Data.EsUnidadOpaquete > Data.APartirDe ? discountValue: Data.PVenta
                            setTotalPrice(Price*(parseInt(cant)-Data.EsUnidadOpaquete))
                        }
                    }}>
                        -
                    </button>
                    <input
                        className='quantity' type="number"
                        min={1}
                        value={cant}
                        style={{width: `${(String(cant).length*14.4)+24}px`}} //here i change the with in function of the length of the content plus 24 of padding                        
                        onChange={(e)=>{setCant(parseInt(e.target.value));}}
                        onBlur={(e)=>{
                            let theCant = parseInt(e.target.value)                            
                            if(e.target.value%Data.EsUnidadOpaquete !== 0){
                                theCant = parseInt(Math.ceil(e.target.value / Data.EsUnidadOpaquete) * Data.EsUnidadOpaquete)
                                setCant(theCant);
                            }
                            const discountValue = (Data.PVenta * (1-Data.Porcentaje/100)).toFixed(2)
                            const Price = parseInt(cant) > Data.APartirDe ? discountValue: Data.PVenta
                            setTotalPrice(Price*theCant)
                            updtC(id, theCant)
                        }}
                    />
                    <button className="btnQuantity" onClick={() => {
                        updtC(id, parseInt(cant)+Data.EsUnidadOpaquete)
                        setCant(parseInt(cant)+Data.EsUnidadOpaquete)
                        const discountValue = (Data.PVenta * (1-Data.Porcentaje/100)).toFixed(2)
                        const Price = parseInt(cant)+Data.EsUnidadOpaquete > Data.APartirDe ? discountValue: Data.PVenta
                        setTotalPrice(Price*(parseInt(cant)+Data.EsUnidadOpaquete))
                    }}>
                        +
                    </button>
                </div>
                <div className="totalPrice inItemCart mainBlue">
                    <div className='subTit fw-bold'>Total:</div>
                    <h1>
                        <div className='Tit '
                            style={
                                parseInt(cant) > Data.APartirDe && Data.Porcentaje !== 0 ? 
                                {textDecoration: 'line-through', color: '#BF452E', fontSize:'1rem'}: {color: 'black'}
                            }>
                            ${Formater(parseInt(cant)*(Data.PVenta))}
                        </div>
                        {parseInt(cant) > Data.APartirDe && Data.Porcentaje !== 0 ? 
                            <div className='text-black Tit' style={{fontSize: `${fontResize}`}}>
                                ${Formater((parseInt(cant)*(Data.PVenta * (1-Data.Porcentaje/100))).toFixed(2))}
                            </div>: ''
                        }
                    </h1>
                </div>
            </div>
            <div className="modal fade" id={`verifyDel${id}`} tabIndex="-1" aria-labelledby="VerifyDel" aria-hidden="true">
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Desea eliminar este producto?</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-primary"
                                data-bs-dismiss="modal"
                                onClick={handleDelete}
                            >Aceptar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
