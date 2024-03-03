import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/Authentication/Authentication.components";
import Shop from "./routes/shop/shop.components";
import Checkout from "./routes/checkout/checkout.components";
const App=()=>{
  return(
    <Routes>
      <Route path='/' element={<Navigation />}>
       <Route index element={<Home />} />
       <Route path='shop/*' element={<Shop />} />
       <Route path='Authentication' element={<Authentication />} />
       <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  );
      
};


export default App;

