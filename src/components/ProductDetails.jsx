import {useContext, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { productContext, cartContext } from "./context/contextCreator";

export default function ProductDetails() {


    const {products, isLoading, error} = useContext(productContext)
    const {cart, dispatch} = useContext(cartContext)


    function currSize() {
        if (size === "m") return "Medium"
        if (size === "s") return "Small"
        if (size === "l") return "Large"
        if (size === "xl") return "Extra Large"
    }


    const { id } = useParams()
    const product = products.find(product => product.id === Number(id))

    const [count, setCount] = useState(1)

    const [size, setSize] = useState("m")

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading"></div>

            </div>
        )
    }

    if (error) return <h2>Unable to load products: {error}</h2>

    if (!product) {
        return (
            <div className="not-product">
                <h1>Product Not Found</h1>
                <p>Sorry, this product doesn't exist or is unavailable.</p>
                <Link to="/products">Back to Products</Link>
            </div>
        );
    }




    function addProduct(product) {
        const selectedSize = currSize()

        const existing = cart.find(
            cartItem =>
                cartItem.id === product.id &&
                cartItem.size === selectedSize
        )

        if (existing) {
            for (let i = 0; i < count; i++) {
                dispatch({
                    type: 'INCREASE',
                    payload: {
                        productId: product.id,
                        size: selectedSize
                    }
                })
            }
        } else {
            dispatch({
                type: 'ADD',
                payload: {
                    ...product,
                    quantity: count,
                    size: selectedSize
                }
            })
        }
    }

    

    const relatedProducts = products.filter(prod => (prod.id !== Number(id) && prod.category === product.category))

    
    return (
            <>    
                <div className="layout container">

                
                    <div className="gallery">
                        <div className="frame">
                            <img src={product.image} alt={product.title} id="mainImage" />
                        </div>
                    </div>
                
                    <div className="info">
                        <p className="eyebrow">{product.category}</p>
                    <h1>{product.title}</h1>
                
                    <div className="meta-row">
                        <span className="rating">{product.rating?.rate}</span>
                        <span className="review-count">{`${product.rating.count} reviews`}</span>
                    </div>
                
                    <p className="price">{product.price} <span className="was">{`$${(product.price + 10).toFixed(2)}`}</span></p>
                
                    <p className="lede">{product.description}</p>
                
                    <div className="field">
                        <div className="field-label">
                            <span>Size</span>
                            <span className="picked">{`${currSize()} Selected`}</span>
                        </div>
                        <div className="sizes">
                            <button onClick={() => setSize("s")} className={`size-btn ${size === "s"? "selected" : ""}` }>S</button>
                            <button onClick={() => setSize("m")} className={`size-btn ${size === "m"? "selected": ""}` }>M</button>
                            <button onClick={() => setSize("l")} className={`size-btn ${size === "l"? "selected": ""}` }>L</button>
                            <button onClick={() => setSize("xl")} className={`size-btn ${size === "xl"? "selected": ""}` }>XL</button>
                        </div>
                    </div>
                
                    <div className="qty-row">
                        <div className="stepper">
                            <button disabled={count === 1} onClick={() => setCount(prev => Math.max(1, prev -1))}>&#8722;</button>
                            <span className="count">{count}</span>
                            <button onClick={() => setCount(prev =>  prev +1)}>+</button>
                        </div>
                        <span className="stock">In stock &mdash; ships in 2 days</span>
                    </div>
                
                    <div className="actions">
                        <button onClick={() => addProduct(product)} className="btn-secondary1">Add to cart</button>
                        <Link to="/cart" className="btn-primary1" onClick={() => addProduct(product)} >Buy now</Link>
                    </div>
                
                    <div className="assurances">
                        <span>Free returns within 30 days</span>
                        <span>Ships worldwide</span>
                    </div>
                
                    <div className="accordion">
                        <details open>
                            <summary>Description</summary>
                            <p className="accordion-body">{product.description}</p>
                        </details>
                        
                        <details>
                            <summary>Shipping and returns</summary>
                            <p className="accordion-body">Orders placed before 2pm ship the same day. Free returns within 30 days if the jacket doesn't fit &mdash; print a label from your orders page.</p>
                        </details>
                    </div>
                    </div>
                
                </div>

                <div className="related">
                    <h2>You may also like</h2>
                    <div className="related-grid">
                        {relatedProducts.slice(0, 4).map(relProd => 
                            <Link key={relProd.id} to={`/products/${relProd.id}`}>

                                <div className="p-card">
                                    <div className="thumb-wrap">
                                        <span className="rating badge">{relProd.rating?.rate}</span>
                                        <img src={relProd.image} alt="" />
                                    </div>
                                    <div className="body">
                                        <p className="name">{relProd.title}</p>
                                        <p className="desc">{relProd.description}</p>
                                        <p className="price">{relProd.price}</p>
                                    </div>
                                </div>
                            </Link>
                        )}
                        
                    </div>
                </div>
            </>
    )
};