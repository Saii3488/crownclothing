import { Outlet,Link} from "react-router-dom";
import { Fragment, } from "react";
import { useSelector,useDispatch } from "react-redux";
import CartIcon from "../../components/cart-icon/cart-icon.components";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { ReactComponent as Crwnlogo } from '../../assets/crown.svg'
import { signOutStart } from "../../store/user/user.action";

import { NavigationContainer,LogoContainer,NavLinks,NavLink } from "./navigation.styles.jsx";
const Navigation=()=>{
  const dispatch=useDispatch()
  const currentUser=useSelector(selectCurrentUser)
  const isCartOpen=useSelector(selectIsCartOpen)
  const signOutUser=()=>dispatch(signOutStart())
    return(
     <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <Crwnlogo className="crownlogo"/>
        </LogoContainer>
        <NavLinks>
          <NavLink to='/shop'>
            SHOP
          </NavLink>
          {currentUser?(
            <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
          ):(
            <NavLink to='/Authentication'>
              SIGN IN
            </NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
     </Fragment>
    );
  }
export default Navigation

