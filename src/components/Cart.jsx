import { useContext } from "react"
import { Link } from "react-router-dom"
import { cartContext } from "./context/contextCreator";

export default function Cart() {


    const {cart, dispatch} = useContext(cartContext)

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    
    const total = subtotal + 5
    
    if (cart.length === 0) {
        return (
            <div className="cart-height">
                <div className="cart-empty">
                    <h2>No item in cart</h2>
                    <Link  to="/products">Back to Shopping</Link>
                </div>
            </div>
        )
    }

    return (
        <section className="cart">
            <div className="container">
                <h1>Cart</h1>
                <div className="cart-grid">
                    <div className="cart-items">
                        {cart.map(item => (
                            <div className="cart-item" key={`${item.id}-${item.size}`}>
                                <img className="cart-item__image" src={item.image} alt={item.title} />
                                <div className="cart-item__body">
                                    <h3>{item.title}</h3>
                                    <span>{`Size: ${item.size}`}</span>
                                    <p className="cart-item__qty">Qty: {item.quantity}</p>
                                    <div className="qty-row">
                                        <div className="stepper">
                                            <button disabled={item.quantity === 1} onClick={() => dispatch({type:'DECREASE',  payload: {productId: item.id, size: item.size}})}>&#8722;</button>
                                            <span className="count">{item.quantity}</span>
                                            <button
                                                onClick={() => dispatch({
                                                    type: 'INCREASE',
                                                    payload: {
                                                        productId: item.id,
                                                        size: item.size
                                                    }
                                                })}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <p className="cart-item__price">${(item.price * item.quantity).toFixed(2)}</p>
                                        <button
                                            className="cart__remove-item"
                                            onClick={() => dispatch({
                                                type: 'REMOVE',
                                                payload: {
                                                    productId: item.id,
                                                    size: item.size
                                                }
                                            })}
                                        ></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="order-summary">
                        <h3>Order Summary</h3>
                        
                        {cart.map(item => (
                            <div key={`${item.id}-${item.size}`} className="order-summary__row">
                                <p className="cart-item__title">{item.title}</p>
                                <p className="cart-item__price">{`${(item.price * item.quantity).toFixed(2)}$ (${item.quantity})`}</p>
                            </div>
                        ))}

                        <div className="order-summary__row">
                            <p className="cart-item__title">Shipping</p>
                            <p className="cart-item__price">5$</p>
                        </div>

                        <hr />

                        <div className="order-summary__row">
                            <h3>Total</h3>
                            <h3>{`${total.toFixed(2)}$`}</h3>
                        </div>

                        <div className="order-summary__btns">
                            <Link className="btn-secondary1" to="/products">Continue Shopping</Link>

                            <Link className="btn-primary1" to="/checkout">Checkout</Link>
                        </div>
                        
                    </div>
                </div>

                
            </div>
            
        </section>
        
    )
}