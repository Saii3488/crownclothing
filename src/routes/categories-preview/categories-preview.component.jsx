import { useContext,Fragment } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import CategoryPreview from "../../components/category-preview/category-prerview.components";

const CategoriesPreview=()=>{
    const {categoriesmap}=useContext(CategoriesContext);
    return(
     <Fragment>
      {Object.keys(categoriesmap).map((title)=>{
        const products=categoriesmap[title]
        return(
         <CategoryPreview key={title} title={title} products={products}/>
        )

      })
      
      }
      
     </Fragment>
     
    )
}
export default CategoriesPreview;