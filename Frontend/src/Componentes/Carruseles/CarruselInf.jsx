import React, { useState, useEffect, useRef } from "react";
import "./_CarruselInf.scss";
import secureLocalStorage from "react-secure-storage";
import { ListItem } from "../Others";
import { ModalProductDesk, ModalProductMob } from "../../Componentes/Modals";

export function CarruselInf(props){//Aquí recibe la LIST1 que es la lista de productos.json
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [charge, setCharge] = useState(5);//variable "SeVe"
    const [bef, setBef] = useState(0);
    const [move, setMove] = useState(0);
    const [back, setBack] = useState(0);
    const [ imgSrc, setImgSrc] = useState("");
    const [Show1, setShow1] = useState(false);
    const [ isMobile, setIsMobile ] = useState(false);
    const [ selecteditem, setSelecteditem ] = useState(null);
    const lProductos = props.lista1.length;
    const pConte = useRef();
    var paso = 5;//lo que se agrega para cargar

    const closeModal = () => {
        setShow1(false);
        //navigate(`/`); // Regresa a la vista general sin ID en la URL
        document.body.style.overflow = '';
      };

    useEffect(() => {
        if(screenWidth < 700 ){
            setIsMobile(true)
        }else{
            setIsMobile(false)
        }            
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [screenWidth])


    if(charge > lProductos) setCharge(lProductos);

    const resize_ob = new ResizeObserver(function() {
        setScreenWidth(window.innerWidth);
    });

    useEffect(() => {
        resize_ob.observe(document.querySelector("#pContainer"));
        check();//este check va acá adentro de useEffect porque si no causa re-renders
        //console.log(props.lista1)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if(screenWidth < 701 ){
            pConte.current.style.left = "0%";
            setBef(1);//show = 1;
            setMove(-100);
            setBack(-100);
        }else{
            pConte.current.style.left = "0%";
            setBef(5);//show = 5;
            setMove(-20);
            setBack(-20);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [screenWidth]);

    const check = () =>{
        if(screenWidth < 701 ){
            setBef(1);//show = 1;
            setMove(-100);
            setBack(-100);
        }else{
            setBef(5);//show = 5;
            setMove(-20);
            setBack(-20);
        }
    }

    useEffect(() => {
        //console.log(bef);
        //console.log(move);
        if(bef === charge && bef === lProductos){
            setMove(0);
        }else{
            if(screenWidth < 701 ){
                setMove(-100);
            }else{
                setMove(-20);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bef]);

    const selectProductModal = async (ProductCode) => {
        const pro = JSON.parse(secureLocalStorage.getItem('productsList'));
        let proData = pro //The whole table "products".
        
        // Define a case-insensitive text filter function
        const index = proData.findIndex(item => item.Cod.toLowerCase() === ProductCode.toLowerCase());
        if (index !== -1) { // Verificar si se encontró el producto
          const selectedItem = proData[index]; // Obtener el producto
    
          let selectedProduct = { ...selectedItem };
    
          // Asignar valores
          selectedProduct.key = index; // Guardar el índice
          selectedProduct.llave = index; // También puedes usar esto para identificar el modal
          selectedProduct.img = selectedItem.ImgName;
          selectedProduct.descripcion = selectedItem.Descripcion;
          selectedProduct.descripcionComp = selectedItem.Detalle;
          selectedProduct.codigo = selectedItem.Cod;
          selectedProduct.category = selectedItem.Categoria.toLowerCase();
          selectedProduct.unitPaq = selectedItem.EsUnidadOpaquete;
          selectedProduct.unitPrice = selectedItem.PVenta;
          selectedProduct.agotado = selectedItem.Agotado;
          setSelecteditem(selectedProduct);
          setShow1(true);
          document.body.style.overflow = 'hidden';
    
          const imageUrl = `https://sivarwebresources.s3.amazonaws.com/AVIF/${selectedItem.ImgName}.avif`;
        
          // Verificar el ETag del servidor
          fetch(imageUrl, { method: "HEAD", cache: "no-store"})
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
          //navigate(`/${selectedItem.Cod}`);
        } else {
            //console.log("Producto no encontrado con código:", ProductCode);
        }
      }

    const listItems = () => {
        return(
            props.lista1.slice(0,charge).map((item, index) =>
                <ListItem
                    key={index}
                    llave = {index}//Para apuntar a cada modal
                    codigo = {item.Cod}
                    ImgName = {item.ImgName}
                    descripcion = {item.Descripcion}
                    descripcionComp={item.Detalle}
                    unitPrice={item.PVenta}
                    unitPaq={item.EsUnidadOpaquete}
                    category={(item.Categoria).toLowerCase()}
                    agotado={item.Agotado}
                    lista={props.lista1}
                    Show1={Show1}
                    setShow1={setShow1}
                    callProduct ={selectProductModal}
                />
            )
        );
    }

    function lazy (){
        if ((charge + paso) >= lProductos && lProductos !== charge){
            paso = lProductos - charge;
        }
    }

    const Next = () => {
        const item = document.querySelector("#pContainer");
        var posX = (parseFloat(item.style.left));
        item.style.transition = "800ms";
        
        if (!item.style.left) posX = 0;//Si en los estilos en linea no tiene posición, asigna posX a 0
        
        if (bef === charge && bef < lProductos){
            lazy();
            setCharge(charge + paso);//setea lo que carga a un valor mayor si se da el caso
        }
        if (bef !== lProductos){
            setBef(bef + 1);
        }
        item.style.left = (posX + move) + "%";
    }

    function Prev(){
        const item = document.querySelector("#pContainer");
        var posX = (parseFloat(item.style.left));
        if(!item.style.left || posX === 0){
            return console.log(posX + " después se acomoda estoxD");
        }
        setBef(bef - 1);
        item.style.left = (posX - back) + "%";
    }


    return (
        <>
        {/*Prueba de que se muestre el modal cuando cambie el link*/}
            { isMobile ? 
                (Show1 && selecteditem) ? 
                <ModalProductMob
                    key={selecteditem.key}
                    llave={selecteditem.llave}
                    img={imgSrc}
                    descripcion={selecteditem.descripcion}
                    descripcionComp={selecteditem.descripcionComp}
                    codigo={selecteditem.codigo}
                    category={selecteditem.category}
                    unitPaq={selecteditem.unitPaq}
                    unitPrice={selecteditem.unitPrice}
                    agotado={selecteditem.agotado}
                    lista={props.lista1}
                    onHide={closeModal}
                    ImgName={selecteditem.ImgName}
                    />
                    :
                    <></>
                :
                (Show1 && selecteditem) ?
                <ModalProductDesk
                    key={selecteditem.key}
                    llave={selecteditem.llave}
                    img={imgSrc}
                    descripcion={selecteditem.descripcion}
                    descripcionComp={selecteditem.descripcionComp}
                    codigo={selecteditem.codigo}
                    category={selecteditem.category}
                    unitPaq={selecteditem.unitPaq}
                    unitPrice={selecteditem.unitPrice}
                    agotado={selecteditem.agotado}
                    lista={props.lista1}
                    onHide={closeModal}
                    ImgName={selecteditem.ImgName}
                />
                :
                <></>
            }
        {/*Prueba de que se muestre el modal cuando cambie el link*/}
        <div className="containter px-0 py-4">
            <div className="cCarrusel">

                <button id="leftButton" onClick={() => Prev()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                    </svg>
                </button>

                <button id="rightButton" onClick={() => Next()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                    </svg>
                </button>

                <ul id="pContainer" className="d-flex py-3 px-0 m-0" ref={pConte}>

                    {listItems()}
                    
                </ul>
                
            </div>
        </div>
        </>
    );

}