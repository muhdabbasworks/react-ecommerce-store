import { useContext, useState } from "react";

import { cartContext } from "./context/contextCreator";
import { Link} from "react-router-dom";

export default function Checkout() {

    const {cart, dispatch} = useContext(cartContext);

    const [isPlaced, setIsPlaced] = useState(false);

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        city: "",
        address: "",
        paymentMethod: ""
    });

    const [errors, setErrors] = useState({});

    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const total = subtotal + 5;

    function handleChange(e) {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    };

    function validate() {
        const newErrors = {};

        if (!form.fullName.trim()) newErrors.fullName = "Full name is required"
        if (!form.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = "Enter a valid email"
        }
        if (!form.phone.trim()) newErrors.phone = "Phone number is required"
        if (!form.city.trim()) newErrors.city = "City is required"
        if (!form.address.trim()) newErrors.address = "Complete address is required"
        if (!form.paymentMethod) newErrors.paymentMethod = "Select a payment method"

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    };

    function handlePlaceOrder() {
        if (!validate()) return
        setIsPlaced(true)
        dispatch({type: 'CLEAR'})
    };

    if (isPlaced) return   (
        <div className="order-placed"><h2>Order Placed Successfully</h2></div>
    )

    if (cart.length === 0) {
        return (
            <div className="cart-height">
                <div className="cart-empty">
                    <h2>No item in cart</h2>
                    <Link  to="/products">Back to Shopping</Link>
                </div>
            </div>
        )
    };



    return (
        <section className="checkout">
            <div className="container">
                <h1>Checkout</h1>

                <div className="cart-grid">
                    <form className="checkout__form" >
                        <div className="input-container">
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Full Name"
                                value={form.fullName}
                                onChange={handleChange}
                            />
                            {errors.fullName && <span className="field-error">{errors.fullName}</span>}
                        </div>

                        <div className="input-container">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={handleChange}
                            />
                            {errors.email && <span className="field-error">{errors.email}</span>}
                        </div>

                        <div className="input-container">
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone"
                                value={form.phone}
                                onChange={handleChange}
                            />
                            {errors.phone && <span className="field-error">{errors.phone}</span>}
                        </div>

                        <div className="input-container">
                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                value={form.city}
                                onChange={handleChange}
                            />
                            {errors.city && <span className="field-error">{errors.city}</span>}
                        </div>

                        <div className="input-container">
                            <textarea
                                name="address"
                                placeholder="Complete Address"
                                value={form.address}
                                onChange={handleChange}
                            ></textarea>
                            {errors.address && <span className="field-error">{errors.address}</span>}
                        </div>
                    </form>

                    <div className="order-summary">
                        <h3>Order Summary</h3>

                        {cart.map(item => (
                            <div className="order-summary__row" key={`${item.id}-${item.size}`}>
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
                            <button className="btn-primary1" type="button" onClick={handlePlaceOrder}>Place Order</button>
                        </div>
                    </div>

                    <div className="payment-container">
                        <h2>Payment method</h2>
                        <div className="payment-method__checkboxes">
                            <div className="payment-method__checkbox">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    id="easypaisa"
                                    value="easypaisa"
                                    checked={form.paymentMethod === "easypaisa"}
                                    onChange={handleChange}
                                />
                                <label htmlFor="easypaisa">Easypaisa</label>
                            </div>

                            <div className="payment-method__checkbox">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    id="jazz"
                                    value="jazz"
                                    checked={form.paymentMethod === "jazz"}
                                    onChange={handleChange}
                                />
                                <label htmlFor="jazz">Jazz Cash</label>
                            </div>

                            <div className="payment-method__checkbox">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    id="visa"
                                    value="visa"
                                    checked={form.paymentMethod === "visa"}
                                    onChange={handleChange}
                                />
                                <label htmlFor="visa">Visa</label>
                            </div>

                            <div className="payment-method__checkbox">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    id="cod"
                                    value="cod"
                                    checked={form.paymentMethod === "cod"}
                                    onChange={handleChange}
                                />
                                <label htmlFor="cod">Cash on delivery</label>
                            </div>
                        </div>
                        {errors.paymentMethod && <span className="field-error">{errors.paymentMethod}</span>}
                    </div>
                </div>
            </div>
        </section>
    )
};