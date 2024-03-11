import { Fragment } from "react";
import { useSelector } from "react-redux";
import { selectCategoriesMap,selectCategoriesIsLoading } from "../../store/category/category.selector";
import CategoryPreview from "../../components/category-preview/category-prerview.components";
import Spinner from "../../components/spinner/spinner.components";

const CategoriesPreview=()=>{
    const categoriesmap=useSelector(selectCategoriesMap)
    const isLoading=useSelector(selectCategoriesIsLoading)
    return(
     <Fragment>

      {isLoading?(
       <Spinner />
      ):(
        Object.keys(categoriesmap).map((title)=>{
          const products=categoriesmap[title]
          return(
           <CategoryPreview key={title} title={title} products={products}/>
          )
  
        })
      )
      
      }
      
     </Fragment>
     
    )
}
export default CategoriesPreview;