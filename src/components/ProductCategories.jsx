import { Link } from "react-router-dom";
import { useContext } from "react";
import { productContext } from "./context/contextCreator";

export default function ProductCategories() {

    
    const {products} = useContext(productContext)
    
    

    function filteredProducts(category) {
        const newProducts = products.filter(product => product.category === category);
        return newProducts
    }

    return (

        <div className="container">
            <section id="products" className="products-home">
                <div className="outer-container">
                    <div className="products-home__header">
                        <h2>Men's Clothing</h2>
                        <Link className="btn-secondary1" to="/products?category=men's clothing"> See All</Link>
                    </div>
                    <div className="products-grid">
                        {filteredProducts("men's clothing").slice(0,4).map(product => (
                            <Link key={product.id} to={`/products/${product.id}`}>
                                <div className="product" >
                                    <img className="product__image" src={product.image} alt="Product Image" />
                                    <div className="product__body">
                                        <h3>{product.title}</h3>
                                        <p className="product__description">{product.description}</p>
                                        <p className="product__price">{product.price}</p>
                                        <span className="rating">{product.rating?.rate}</span>
                                    </div>
                                </div>
                            </Link>
                                
                        ))}
                    </div>
                </div>

                <div className="outer-container">
                        <div className="products-home__header">
                        <h2>Women's Clothing</h2>
                    <Link className="btn-secondary1" to="/products?category=women's clothing"> See All</Link>
                    </div>
                    <div className="products-grid">
                        {filteredProducts("women's clothing").slice(0,4).map(product => (
                            <Link key={product.id} to={`/products/${product.id}`}>
                                <div className="product">
                                    <img className="product__image" src={product.image} alt="Product Image" />
                                    <div className="product__body">
                                        <h3>{product.title}</h3>
                                        <p className="product__description">{product.description}</p>
                                        <p className="product__price">{product.price}</p>
                                        <span className="rating">{product.rating?.rate}</span>
                                    </div>
                                </div>
                            </Link>
                            ))}
                    </div>
                </div>

                <div className="outer-container">
                        <div className="products-home__header">
                        <h2>Electronics</h2>
                    <Link className="btn-secondary1" to="/products?category=electronics"> See All</Link>
                    </div>
                    <div className="products-grid">
                        {filteredProducts("electronics").slice(0,4).map(product => (
                            <Link key={product.id} to={`/products/${product.id}`}>
                                <div className="product">
                                    <img className="product__image" src={product.image} alt="Product Image" />
                                    <div className="product__body">
                                        <h3>{product.title}</h3>
                                        <p className="product__description">{product.description}</p>
                                        <p className="product__price">{product.price}</p>
                                        <span className="rating">{product.rating?.rate}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                
                <div className="outer-container">
                        <div className="products-home__header">
                        <h2>Jewelery</h2>
                    <Link className="btn-secondary1" to="/products?category=jewelery"> See All</Link>
                    </div>
                    <div className="products-grid">
                        {filteredProducts("jewelery").slice(0,4).map(product => (
                            <Link key={product.id} to={`/products/${product.id}`}>
                                <div className="product">
                                    <img className="product__image" src={product.image} alt="Product Image" />
                                    <div className="product__body">
                                        <h3>{product.title}</h3>
                                        <p className="product__description">{product.description}</p>
                                        <p className="product__price">{product.price}</p>
                                        <span className="rating">{product.rating?.rate}</span>
                                    </div>
                                </div>
                            </Link>
                            
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}