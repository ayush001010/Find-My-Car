import { useState, useEffect, useCallback } from 'react';

const WISHLIST_STORAGE_KEY = 'carWishlist';

export function useWishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false); 

  useEffect(() => {
    if (typeof window !== 'undefined') {
        const storedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
        if (storedWishlist) {
          try {
            setWishlist(JSON.parse(storedWishlist));
          } catch (error) {
            console.error("Failed to parse wishlist from localStorage", error);
            localStorage.removeItem(WISHLIST_STORAGE_KEY); // Clear corrupted data
          }
        }
        setIsLoaded(true); 
    }
  }, []); 
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    }
  }, [wishlist, isLoaded]);
  const addToWishlist = useCallback((car) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.some((item) => item.id === car.id)) {
        return prevWishlist;
      }
      return [...prevWishlist, car];
    });
  }, []);
  const removeFromWishlist = useCallback((carId) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== carId));
  }, []);

  const isInWishlist = useCallback((carId) => {
    return wishlist.some((item) => item.id === carId);
  }, [wishlist]); 
  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    wishlistCount: wishlist.length,
    isWishlistLoaded: isLoaded, 
  };
}