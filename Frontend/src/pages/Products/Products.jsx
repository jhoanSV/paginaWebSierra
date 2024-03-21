import React, { useState, useEffect } from "react";
import "./_Products.scss";
import { ListItem } from "../../Componentes/Others";
//import arJason from "../../Assets/png/Productos/productos.json";//prueba jsjs
//import { useLocation } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { useText } from "../../TextContext";
import { useQState } from "../../QStateContext";

export function Products() {
  
  const SBText = useText() //searchBarText
  const queryEnded = useQState()
  const [lista, setLista] = useState(null);
  const [limit, setLimit] = useState();
  // eslint-disable-next-line
  const [ category, setCategory] = useState('');//useState('ELECTRICOS');

  const filterProduct = async (text) => {
    //Searh the list of products that includes the text, either because it is in the "products" table or in the "alias" table  
    const pro = JSON.parse(secureLocalStorage.getItem('productsList'));
    const alias = JSON.parse(secureLocalStorage.getItem('aliasList'));
    let proData = pro//The whole table "products".
    let aliasData = alias//The whole table "alias".
    //If Category is different to empty then select only the productos with that category
    try {
        if (category !== '') {
            proData = pro.filter(item => item.Categoria.toLowerCase() === category.toLowerCase());
            aliasData = alias.filter(item => item.Categoria.toLowerCase() === category.toLowerCase());
        }
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
        const aliasProducts = proData.filter((item) => CodAlias.includes(item.cod));
        // Extract unique cod values from aliasProducts
        //const uniqueAliasProducts = [...new Set(aliasProducts.map((item) => item.cod))];
        // Combine the unique cod values from TFiltro1 and aliasProducts
        const filtro = [...new Set([...TFiltro1, ...aliasProducts])];
        // Convert the json into an array of objects to reorder by score
        const dataArray = filtro.map((value, key) => ({ key, ...value }));
        // Order the array deppending on the score
        dataArray.sort((a, b) => b.Score - a.Scote);
        // Convert the array into a json object
        //!const sortedJson = JSON.stringify(dataArray);
        //sortedJson2 = sortedJson
        setLista(dataArray)
        //setFilteredProducts(sortedJson);
    } catch (error) {
        //sortedJson2 = false
        console.log('error-->' + error);
        setLista(false)
    }
  }

  useEffect(() => {
    console.log(SBText);
    if(SBText!=='' && SBText.length > 2){
      filterProduct(SBText)
    }
    // eslint-disable-next-line
  }, [SBText]);

  useEffect(() => {
    setLista(JSON.parse(secureLocalStorage.getItem('productsList')))
    setLimit(10)
  }, [queryEnded]);

  return (
    <>
      <section className='products'>
        <div className="productsContainer">
          { lista!==null ?
            lista.slice(0,limit).map((item, index) =>
              <ListItem
                key={index}
                img={`https://sivar.com.co/Imgs/ProductsAVIF/${item.Cod}.avif`}
                llave = {index}//Para apuntar a cada modal
                codigo = {item.Cod}
                descripcion = {item.Descripcion}
                descripcionComp={item.Detalle}
                unitPrice={item.PVenta}
                unitPaq={item.EsUnidadOpaquete}
                category={(item.Categoria).toLowerCase()}
                agotado={item.Agotado}
                lista={lista}/>
            )
          :
            <>
            </>
          }
        </div>
      </section>
    </>
  );
}
