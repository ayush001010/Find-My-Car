import React from 'react';
import PropTypes from 'prop-types';
import { useWishlist } from '../lib/hooks/useWishlist.js';

const Header = () => {
  const { wishlistCount } = useWishlist();

  return (
    <header className="bg-blue-500 text-white shadow-md sticky top-0 z-10"> {/* Sticky header */}
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo/Title */}
        <a href="/" className="text-xl font-bold hover:text-blue-200 transition-colors"> {/* Use Link from router later */}
          Luxeer
        </a>

        {/* Navigation Links (Placeholder) */}
        <div className="flex items-center space-x-4">

          {/* Wishlist Indicator */}
          <a href="#" className="relative hover:text-blue-200 transition-colors"> {/* Make this a Link to wishlist page later */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </a>

          {/* Add other links or buttons here */}
        </div>
      </nav>
    </header>
  );
};

export default Header;