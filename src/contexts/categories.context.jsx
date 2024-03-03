import { createContext,useState,useEffect } from "react";
import { getCollectionAndDocuments } from "../utils/firebase/firebase.utils";
import SHOP_DATA from "../shop";
export const CategoriesContext=createContext({
    categoriesmap:{}
})
export const CategoriesProvider=({children})=>{
    const[categoriesmap,setCategoriesMap]=useState({});
    useEffect(()=>{
     const getCategoriesMap=async()=>{
        const categoryMap=await getCollectionAndDocuments();
        
        setCategoriesMap(categoryMap)
     }
     getCategoriesMap();
    },[])
    const value={categoriesmap};
    return(
     <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    );
}
