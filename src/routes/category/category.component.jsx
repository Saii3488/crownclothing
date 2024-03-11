import { useState,useEffect,Fragment} from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import ProductCard from '../../components/product-card/product-card.component'
import { selectCategoriesMap,selectCategoriesIsLoading } from '../../store/category/category.selector'


import './category.styles.scss'
import Spinner from '../../components/spinner/spinner.components'
const Category=()=>{
  const{category}=useParams();
  const categoriesmap=useSelector(selectCategoriesMap)
  const isLoading=useSelector(selectCategoriesIsLoading)
  const[products,setProducts]=useState(categoriesmap[category])
  useEffect(()=>{
   setProducts(categoriesmap[category])
  }, [category,categoriesmap])
  return(
    
    <Fragment>
        <h2 className='category-title'>{category.toUpperCase()}</h2>
        {isLoading?(
          <Spinner />
        ):(
        <div className='category-container'>
        
         {products &&
          products.map((product)=>( 
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        )}
        
    </Fragment>
  )
}
export default Category

