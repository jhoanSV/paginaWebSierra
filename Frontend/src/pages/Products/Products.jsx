import React, { useState, useEffect } from "react";
import "./_Products.scss";
import { ListItem } from "../../Componentes/Others";
//import arJason from "../../Assets/productos.json";//prueba jsjs
import secureLocalStorage from "react-secure-storage";
import { useTheContext } from "../../TheProvider";
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { ModalProductDesk, ModalProductMob } from "../../Componentes/Modals";
import imgPlaceHolder from '../../Assets/png/placeHolderProduct.png'

export function Products() {
  const location = useLocation();
  // Verifica si la ruta activa es 'productos/especiales'
  const isSpecialsRoute = location.pathname === "/productos/especiales";
  // const SBText = useText() //searchBarText
  // const queryEnded = useQState()
  const { sBText, queryEnded, categSelect } = useTheContext();
  const navigate = useNavigate();
  const [ lista, setLista ] = useState([]);
  const [ screenWidth, setScreenWidth ] = useState(window.innerWidth);
  const [ imgSrc, setImgSrc] = useState("");
  const [ limit, setLimit ] = useState(0);
  const [ Show1, setShow1 ] = useState(false);
  const [ isMobile, setIsMobile ] = useState(false);
  const { id } = useParams();
  const [ selecteditem, setSelecteditem ] = useState(null);


  useEffect(() => {
      if (id !== undefined) {
        selectProductModal(id)
      }
  }, [id]);

  useEffect(() => {
      if(screenWidth < 700 ){
          setIsMobile(true)
      }else{
          setIsMobile(false)
      }            
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenWidth])

  const resize_ob = new ResizeObserver(function() {
    setScreenWidth(window.innerWidth);
  });

  const selectProductModal = async (ProductCode) => {
    const pro = JSON.parse(secureLocalStorage.getItem('productsList'));
    let proData = pro //The whole table "products".
    
    // Define a case-insensitive text filter function
    const index = proData.findIndex(item => item.Cod.toLowerCase() === ProductCode.toLowerCase());
    if (index !== -1) { // Verificar si se encontró el producto
      
      const selectedItem = proData[index]; // Obtener el producto
      const imageUrl = `https://sivarwebresources.s3.amazonaws.com/AVIF/${selectedItem.ImgName}.avif`;
    
      let selectedProduct = { ...selectedItem };
      let img = imageUrl
      // Verificar el ETag del servidor
      fetch(imageUrl, { method: "HEAD", cache: "no-store"})
          .then((response) => {
            if (response.ok) {
                const eTag = response.headers.get("ETag"); // Obtener el ETag
              if (eTag) {
                  setImgSrc(`${imageUrl}?v=${eTag}`); // Agregar el ETag como versión
                  img = `${imageUrl}?v=${eTag}`
              } else {
                  setImgSrc(imageUrl); // Si no hay ETag, usar la URL normal
                  img = imageUrl
              }

            } else {
              console.error("La imagen no existe o hubo un error:", response.status);
              setImgSrc(imgPlaceHolder);
            }
          })
          .catch((error) => {
          console.error("Error verificando el ETag:", error);
          setImgSrc("imageUrl"); // En caso de error, mostrar la imagen igual
          img = imgPlaceHolder
          });
      // Asignar valores
      //selectedProduct.key = index; // Guardar el índice
      //selectedProduct.llave = index; // También puedes usar esto para identificar el modal
      //selectedProduct.img = selectedItem.ImgName;
      //selectedProduct.descripcion = selectedItem.Descripcion;
      //selectedProduct.descripcionComp = selectedItem.Detalle;
      //selectedProduct.codigo = selectedItem.Cod;
      //selectedProduct.category = selectedItem.Categoria.toLowerCase();
      //selectedProduct.unitPaq = selectedItem.EsUnidadOpaquete;
      //selectedProduct.unitPrice = selectedItem.PVenta;
      //selectedProduct.agotado = selectedItem.Agotado;

      let producto = {
          "Agotado": selectedItem.Agotado,
          "Categoria": selectedItem.Categoria.toLowerCase(),
          "Cod": selectedItem.Cod,
          "Descripcion": selectedItem.Descripcion,
          "Detalle": selectedItem.Detalle,
          "EsUnidadOpaquete": selectedItem.EsUnidadOpaquete,
          "ImgName": selectedProduct.ImgName,
          "Iva": selectedItem.Iva,
          "PVenta": selectedItem.PVenta,
          "img": img,
      }
      setSelecteditem(producto);
      setShow1(true);
      document.body.style.overflow = 'hidden';

      navigate(`/productos/${selectedItem.Cod}`);
    } else {
        console.log("Producto no encontrado con código:", ProductCode);
    }
  }

  const filterProduct = (text) => {
    if(!queryEnded){ setLista(false);return}
    //Searh the list of products that includes the text, either because it is in the "products" table or in the "alias" table  
    const pro = JSON.parse(secureLocalStorage.getItem('productsList'));
    const alias = JSON.parse(secureLocalStorage.getItem('aliasList'));
    let proData = pro//The whole table "products".
    let aliasData = alias//The whole table "alias".
    //If categSelect is different to empty then select only the productos with that category
    try {
        if (categSelect !== '') {
            proData = pro.filter(item => item.Categoria.toLowerCase() === categSelect.toLowerCase());
            aliasData = alias.filter(item => item.Categoria.toLowerCase() === categSelect.toLowerCase());
        }
        if (text === '' || text < 2) {
          setLista(proData);
        }else{
          // Define a case-insensitive text filter function
          const filterByText = (item) =>
          item.Cod.toLowerCase().includes(text) ||
          item.Descripcion.toLowerCase().includes(text);
          // Filter products based on the text
          const TFiltro1 = proData.filter(filterByText);
          // Filter aliases based on the text
          const TFiltro2 = aliasData.filter((item) => item.Alias.toLowerCase().includes(text));
          // Extract unique cod values from aliasData
          const CodAlias = [...new Set(TFiltro2.map((item) => item.Cod))];
          // Filter products based on unique cod values
          const aliasProducts = proData.filter((item) => CodAlias.includes(item.Cod));
          // Extract unique cod values from aliasProducts
          //const uniqueAliasProducts = [...new Set(aliasProducts.map((item) => item.cod))];
          // Combine the unique cod values from TFiltro1 and aliasProducts
          const filtro = [...new Set([...TFiltro1, ...aliasProducts])];
          // Convert the json into an array of objects to reorder by score
          const dataArray = filtro.map((value, key) => ({ key, ...value }));
          // Order the array deppending on the score
          dataArray.sort((a, b) => b.Score - a.Score);
          // Convert the array into a json object
          //!const sortedJson = JSON.stringify(dataArray);
          //sortedJson2 = sortedJson
          setLista(dataArray)
          //setFilteredProducts(sortedJson);
          // Desplaza la página al inicio después de ejecutar la lógica de filtrado
          window.scrollTo({ top: 0, behavior: 'smooth' }); // 'smooth' para una animación de desplazamiento suave
        }
    } catch (error) {
        //sortedJson2 = false
        //console.log('error-->' + error);
        setLista(false)
    }
  }

  const observePCFoot = () =>{
    const pcFoot = document.querySelector('.pcFoot')
    const observer = new IntersectionObserver((entry)=>{
      if(entry[0].isIntersecting){
        //console.log('intersecta con linea');
        setLimit(prevLim =>prevLim+10)
      }
    })
    observer.observe(pcFoot)
  }

  const closeModal = () => {
    setShow1(false);
    navigate(`/productos`); // Regresa a la vista general sin ID en la URL
    document.body.style.overflow = '';
  };

  useEffect(() => {
    filterProduct(sBText)
    setLimit(20)
    // eslint-disable-next-line
  }, [sBText, categSelect]);

  useEffect(() => {
    filterProduct(sBText)
    // eslint-disable-next-line
  }, [queryEnded]);

  useEffect(() => {
    if (!isSpecialsRoute && lista && lista.length !== 0) {
      observePCFoot();
    }
  }, [lista, isSpecialsRoute]);

  useEffect(() => {
    window.scrollTo(0,0)
    return () => {
      try {
          document.getElementsByTagName("body")[0].removeAttribute("style");
          document.getElementsByTagName("body")[0].classList.remove("modal-open")
          document.querySelector('.modal-backdrop').remove()
      } catch (error) {

      }
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    
    // Llamamos handleResize inmediatamente para inicializar el valor correctamente
    handleResize();

    return () => {
        window.removeEventListener("resize", handleResize);
    };
  }, []);

  /*
    useEffect(() => {
    if (Show1) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Limpieza al desmontar el componente
    return () => {
      document.body.style.overflow = '';
    };
  }, [Show1]);

  if (!Show1) return null;
  */

  return (
    <>
      {!isSpecialsRoute && (
        <section className='products' id={`#productWindows`}>
          <div className="pptn">
            Pensados para tu negocio
          </div>
          {/*Prueba de que se muestre el modal cuando cambie el link*/}
              { isMobile ? 
                  (Show1 && selecteditem) ? 
                    <ModalProductMob
                        //key={selecteditem.key}
                        //llave={selecteditem.llave}
                        //img={imgSrc}
                        //descripcion={selecteditem.descripcion}
                        //descripcionComp={selecteditem.descripcionComp}
                        //codigo={selecteditem.codigo}
                        //category={selecteditem.category}
                        //unitPaq={selecteditem.unitPaq}
                        //unitPrice={selecteditem.unitPrice}
                        //agotado={selecteditem.agotado}
                        //lista={lista}
                        onHide={closeModal}
                        //ImgName={selecteditem.ImgName}
                        Data = {selecteditem}
                        />
                        :
                        <></>
                  :
                  (Show1 && selecteditem) ?
                  <ModalProductDesk
                      //key={selecteditem.key}
                      //llave={selecteditem.llave}
                      //img={imgSrc}
                      //descripcion={selecteditem.descripcion}
                      //descripcionComp={selecteditem.descripcionComp}
                      //codigo={selecteditem.codigo}
                      //category={selecteditem.category}
                      //unitPaq={selecteditem.unitPaq}
                      //unitPrice={selecteditem.unitPrice}
                      //agotado={selecteditem.agotado}
                      //lista={lista}
                      onHide={closeModal}
                      //ImgName={selecteditem.ImgName}
                      Data = {selecteditem}
                  />
                  :
                  <></>
              }
          {/*Prueba de que se muestre el modal cuando cambie el link*/}
          <div className="productsContainer">
            { lista === null ?
              <div className='nFound'>
                Ocurrió un problema con el servidor
              </div>
            : ((!queryEnded) || lista===false) ?
              [1, 2, 3, 4, 5].map((index) =>
                <div className='caja' key={index}>
                  <div
                    className='loadingStls'
                    style={{
                      width: '100%',
                      height: 'auto',
                      background: '#d9d9d9',
                      aspectRatio: '1 / 1'
                    }}
                  />
                  <div className='dots'>...</div>
                  <div className='dots'>...</div>
                </div>
              )
            : (lista.length===0) ?//* here is in the case when everything is ok but there is no products
              <div className='nFound'>
                No se encontr&oacute; ninguna coincidencia
              </div>
            :
              <>
                {lista.slice(0,limit).map((item, index) =>
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
                    lista={lista}
                    Show1={Show1}
                    setShow1={setShow1}
                    callProduct ={selectProductModal}/>
                )}
                <div className="pcFoot"/>
              </>
            }
          </div>
        </section>
      )}
    </>
  );
}
