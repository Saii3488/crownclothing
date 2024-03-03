import { createContext, useContext } from 'react'
import './cart-icon.styles.jsx'
import { CartIconContainer,ItemCount, Shoppingsvg} from './cart-icon.styles.jsx'
import { CartContext } from '../../contexts/cart.context'
const CartIcon=()=>{
    const{isCartOpen,setIsCartOpen,cartCount}=useContext(CartContext)
    const toggleIsCartOpen=()=>setIsCartOpen(!isCartOpen)
    return(
     <CartIconContainer onClick={toggleIsCartOpen}>
        <Shoppingsvg className='shopping-icon'/>
        <ItemCount className='item-count'>{cartCount}</ItemCount>
     </CartIconContainer>
    )
}
export default CartIcon
