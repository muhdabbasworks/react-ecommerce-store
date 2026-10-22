import { Routes, Route } from "react-router-dom";
import { useEffect} from "react";
import ProductSection from "./components/ProductsSection";
import Home from "./components/Home";
import Footer from "./components/Footer";
import ProductDetails from "./components/ProductDetails";



import { useLocation } from "react-router-dom"
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import ContextProvider, { CartContextProvider } from "./components/context/context";
import HeaderNavigation from "./components/HeaderNavigation";

export default function App() {

    

    function ScrollToTop() {
        const { pathname } = useLocation()

        useEffect(() => {
            window.scrollTo(0, 0)
        }, [pathname])

        return null
    }

    
    
    return (
        <>
            {ScrollToTop()}
            <HeaderNavigation/>
            <ContextProvider>
                <CartContextProvider>
                    <Routes>
                        <Route path="/" element={<Home />}/>
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/products" element={<ProductSection  />} />
                            <Route path="/products/:id" element={<ProductDetails />}/>
                        <Route path="/checkout" element={<Checkout />}/>

                    </Routes>
                </CartContextProvider>
            </ContextProvider>
            <Footer />
        </>
    )
}