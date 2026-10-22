import {useEffect, useReducer, useState } from "react";

import { productContext, cartContext } from "./contextCreator";


function cartReducer(state, action) {
    if (action.type === 'ADD') {
        return [...state, action.payload]
    }

    if (action.type === 'INCREASE') {
        return state.map(product => {
            if (
                product.id === action.payload.productId &&
                product.size === action.payload.size
            ) {
                return {
                    ...product,
                    quantity: product.quantity + 1
                }
            }

            return product
        })
    }

    if (action.type === 'DECREASE') {
        return state.map(product => {
            if (
                product.id === action.payload.productId &&
                product.size === action.payload.size &&
                product.quantity > 1
            ) {
                return {
                    ...product,
                    quantity: product.quantity - 1
                }
            }

            return product
        })
    }

    if (action.type === 'REMOVE') {
        return state.filter(product =>
            product.id !== action.payload.productId ||
            product.size !== action.payload.size
        )
    }

    if (action.type === 'CLEAR') {
        return []
    }

    return state
}

export function CartContextProvider({children}) {
    const [cart, dispatch] = useReducer(cartReducer, [])

    return (
        <cartContext.Provider value={{cart, dispatch}}>
            {children}
        </cartContext.Provider>
    )
}


export default function ContextProvider({children}) {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        async function fetchProducts() {
            try {
                setIsLoading(true)
                setError(null)
                const response = await fetch('https://fakestoreapi.com/products');
                if (!response.ok) {
                    throw new Error("Failed to fetch Products");
                }

                const data = await response.json();
                setProducts(data)
            }
            catch(err) {
                setError(err.message)
            } 
            finally {
                setIsLoading(false)
            }
        }

        fetchProducts()

    }, [])

    return (
        <productContext.Provider value={{products, setProducts, isLoading, error}}>
            {children}
        </productContext.Provider>
    )
};