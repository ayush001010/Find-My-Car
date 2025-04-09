import React from 'react';
import PropTypes from 'prop-types'; 
import { useWishlist } from '../lib/hooks/useWishlist.js'; 

const WishlistButton = ({ car }) => {
  const { isInWishlist, addToWishlist, removeFromWishlist, isWishlistLoaded } = useWishlist();
  const isWishlisted = isWishlistLoaded ? isInWishlist(car.id) : false;
  const toggleWishlist = (event) => {
    event.stopPropagation(); 
    if (!isWishlistLoaded) return;

    if (isWishlisted) {
      removeFromWishlist(car.id);
    } else {
      addToWishlist(car);
    }
  };
  const buttonDisabled = !isWishlistLoaded;

  return (
    <button
      onClick={toggleWishlist}
      disabled={buttonDisabled}
      className={`p-2 rounded transition-colors duration-200 ${
        isWishlisted
          ? 'text-red-500 hover:text-red-700'
          : 'text-gray-400 hover:text-red-500'
      } ${buttonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'} // Tooltip
    >
      {/* SVG Heart Icon */}
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={isWishlisted ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    </button>
  );
};

// Define PropTypes for runtime checking
WishlistButton.propTypes = {
    // Require a 'car' object with at least an 'id'
    car: PropTypes.shape({
        id: PropTypes.string.isRequired,
    }).isRequired,
};

export default WishlistButton;