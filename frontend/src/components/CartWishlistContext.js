import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartWishlistContext = createContext();

export const useCartWishlist = () => {
    return useContext(CartWishlistContext);
};

export const CartWishlistProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0);
    const [wishlistCount, setWishlistCount] = useState(0);
    const userID = localStorage.getItem('userID');

    const fetchCounts = async () => {
        if (userID) {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/ecommerce/wishlist_cart_count/${userID}`);
                setCartCount(response.data.cart_count);
                setWishlistCount(response.data.wishlist_count);
            } catch (error) {
                console.error('Error fetching counts:', error);
            }
        }
    };

    useEffect(() => {
        fetchCounts();
        const interval = setInterval(fetchCounts, 1000);
        return () => clearInterval(interval);
    }, [userID]);

    return (
        <CartWishlistContext.Provider value={{ cartCount, wishlistCount, fetchCounts }}>
            {children}
        </CartWishlistContext.Provider>
    );
};
