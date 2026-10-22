import { Link} from "react-router-dom"

import ContactForm from "./form";
import ProductCategories from "./ProductCategories";



export default function Home() {

    

    
    return (
        <>
            <section className="hero">
                
                <div className="hero-intro container">
                    <span className="eyebrow">Trending now</span>
                    <h1>Discover Products You'll Love</h1>
                    <p>Welcome to your new style destination. We bring you a curated collection of the latest trends, everyday wardrobe essentials, and standout pieces designed to elevate your look. Refresh your closet with high-quality fashion that expresses exactly who you are.</p>
                    <div className="btns">
                        <Link to="/products" className="btn-primary1">Shop Now</Link>
                    </div>
                </div>
            </section>

            <ProductCategories />

            <ContactForm />

        </>
    )
};