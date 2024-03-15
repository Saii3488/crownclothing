import { useDispatch,useSelector } from 'react-redux'
import { selectIsCartOpen,selectCartCount } from '../../store/cart/cart.selector'
import { setIsCartOpen } from '../../store/cart/cart.action'

import { CartIconContainer,ItemCount, Shoppingsvg} from './cart-icon.styles'

const CartIcon=()=>{
    const dispatch=useDispatch()
    const cartCount=useSelector(selectCartCount)
    const isCartOpen=useSelector(selectIsCartOpen)
    const toggleIsCartOpen=()=>dispatch(setIsCartOpen(!isCartOpen))
    return(
     <CartIconContainer onClick={toggleIsCartOpen}>
        <Shoppingsvg className='shopping-icon'/>
        <ItemCount className='item-count'>{cartCount}</ItemCount>
     </CartIconContainer>
    )
}
export default CartIcon
