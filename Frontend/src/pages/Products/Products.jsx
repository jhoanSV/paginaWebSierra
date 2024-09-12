import React, { useState, useEffect } from "react";
import "./_Products.scss";
import { ListItem } from "../../Componentes/Others";
//import arJason from "../../Assets/productos.json";//prueba jsjs
import secureLocalStorage from "react-secure-storage";
import { useTheContext } from "../../TheProvider";

export function Products() {
  
  // const SBText = useText() //searchBarText
  // const queryEnded = useQState()
  const { sBText, queryEnded, categSelect } = useTheContext()
  const [lista, setLista] = useState(false);
  const [limit, setLimit] = useState(0);

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
          console.log('ax2');
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
        }
    } catch (error) {
        //sortedJson2 = false
        console.log('error-->' + error);
        setLista(false)
    }
  }

  const observePCFoot = () =>{
    const pcFoot = document.querySelector('.pcFoot')
    const observer = new IntersectionObserver((entry)=>{
      if(entry[0].isIntersecting){
        console.log('intersecta con linea');
        setLimit(prevLim =>prevLim+10)
      }
    })
    observer.observe(pcFoot)
  }

  useEffect(() => {
    console.log('sBText='+sBText);
    
    filterProduct(sBText)
    setLimit(20)
    // eslint-disable-next-line
  }, [sBText, categSelect]);

  useEffect(() => {
    filterProduct(sBText)
    // eslint-disable-next-line
  }, [queryEnded]);

  useEffect(() => {
    if(lista && lista.length!==0)observePCFoot()
  }, [lista]);

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

  return (
    <>
      <section className='products'>
        <div className="pptn">
          Pensados para tu negocio
        </div>
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
          : /*(lista && lista.length!==0)*/
            <>
              {lista.slice(0,limit).map((item, index) =>
                <ListItem
                  key={index}
                  llave = {index}//Para apuntar a cada modal
                  codigo = {item.Cod}
                  descripcion = {item.Descripcion}
                  descripcionComp={item.Detalle}
                  unitPrice={item.PVenta}
                  unitPaq={item.EsUnidadOpaquete}
                  category={(item.Categoria).toLowerCase()}
                  agotado={item.Agotado}
                  lista={lista}/>
              )}
              <div className="pcFoot"/>
            </>
          }
        </div>
      </section>
    </>
  );
}
