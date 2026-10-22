import { useContext } from "react";
import { Link, useSearchParams, Outlet } from "react-router-dom"
import { productContext } from "./context/contextCreator";

export default function ProductSection() {

    const {products} = useContext(productContext)

    const [searchParam] = useSearchParams();
    const category = searchParam.get('category')

    const filteredProducts = category
    ? products.filter(product => product.category === category)
    : products;

    return(
        <section className="products">
            <div className="container">
                <div className="products-header">
                    <span className="eyebrow">Catalog</span>
                    <h1>Featured products</h1>
                </div>

                <ul className="products-categories">
                    <li className={!category ? "active-category" : ""}><Link to="/products">All</Link></li>
                    <li className={category === "men's clothing" ? "active-category" : ""}><Link to="/products?category=men's clothing">Mens Clothing</Link></li>
                    <li className={category === "women's clothing" ? "active-category" : ""}><Link  to="/products?category=women's clothing">Womens Clothing</Link></li>
                    <li className={category === "jewelery" ? "active-category" : ""}><Link  to="/products?category=jewelery">Jewelery</Link></li>
                    <li className={category === "electronics" ? "active-category" : ""}><Link  to="/products?category=electronics">Electronics</Link></li>
                </ul>

                <div className="products-grid">
                    {filteredProducts.map(product => (
                        <Link key={product.id} to={`/products/${product.id}` }>
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
                <Outlet/>

            </div>

            
        </section>
    )
}