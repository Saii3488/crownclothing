import { useDispatch,useSelector } from 'react-redux'
import { selectCartItems } from '../../store/cart/cart.selector'
import {addItemToCart,clearItemFromCart,removeItemToCart} from '../../store/cart/cart.action'
import './checkout-item.styles.scss'
const CheckoutItem=({cartItem})=>{
    const{name,imageUrl,quantity,price}=cartItem
    const cartItems=useSelector(selectCartItems)
    const dispatch=useDispatch()

    const clearItemHandler=()=>dispatch(clearItemFromCart(cartItems,cartItem))
    const addItemHandler=()=>dispatch(addItemToCart(cartItems,cartItem))
    const removeItemHandler=()=>dispatch(removeItemToCart(cartItems,cartItem))

    return(
     <div className='checkout-item-container'>
        <div className='image-container'>
          <img src={imageUrl}/>
        </div>
        <span className='name'>{name}</span>
        <span className='quantity'>
          <div className='arrow' onClick={removeItemHandler}>&#10094;</div>
          <span className='value'>{quantity}</span>
          <div className='arrow' onClick={addItemHandler}>&#10095;</div>
        </span>
        <span className='price'>{price}</span>
        <div  className='remove-button' onClick={clearItemHandler}>&#10005;</div>

      </div>
    )
}
export default CheckoutItem
