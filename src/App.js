import { useEffect,lazy,Suspense } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, Outlet } from "react-router-dom";
import Spinner from "./components/spinner/spinner.components";
import { checkUserSession } from "./store/user/user.action";
const Shop=lazy(()=>import("./routes/shop/shop.components"));
const Checkout=lazy(()=>import("./routes/checkout/checkout.components"));
const Navigation=lazy(()=>import("./routes/navigation/navigation.component"));
const Home=lazy(()=>import('./routes/home/home.component'))
const Authentication=lazy(()=>import('./routes/Authentication/Authentication.components'))
const App=()=>{
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(checkUserSession())
  },[dispatch]);
  return(
    <Suspense fallback={<Spinner />}>
     <Routes>
      <Route path='/' element={<Navigation />}>
       <Route index element={<Home />} />
       <Route path='shop/*' element={<Shop />} />
       <Route path='Authentication' element={<Authentication />} />
       <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
    </Suspense>
  );
      
};
export default App;

