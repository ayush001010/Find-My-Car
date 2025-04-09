import React from 'react';
import PropTypes from 'prop-types';
import WishlistButton from './WishlistButton.jsx';
import { Link } from 'react-router-dom';

const CarCard = ({ car }) => {

  const handleImageError = (event) => {
        // Fallback to a placeholder image if the original fails to load
      event.currentTarget.src = '/images/placeholder.png';
      event.currentTarget.classList.add('image-load-error');
  };

  // Format price, handle potential null/undefined price
  const formattedPrice = (car.price !== null && car.price !== undefined)
    ? `$${car.price.toLocaleString()}`
    : 'Price unavailable';

  // Construct the URL for the detail page
  const carDetailUrl = `/cars/${car.id}`;

  return (
    <div className="group border rounded-lg overflow-hidden shadow-lg hover:shadow-xl bg-white flex flex-col h-full transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-gray-50">

        <Link to={carDetailUrl} className="block flex-grow">
            <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
                <img
                  src={car.imageUrl || '/images/placeholder.png'}
                  alt={car.model ? `${car.year} ${car.brand} ${car.model}` : 'Car image'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                  onError={handleImageError}
                  loading="lazy"
                />
            </div>

            <div className="p-4 flex flex-col flex-grow">
                <h3
                    className="text-lg font-semibold text-gray-800 group-hover:text-blue-700 truncate mb-1 transition-colors duration-200"
                    title={`${car.year} ${car.brand} ${car.model}`} // Tooltip for truncated text
                >
                    {car.year} {car.brand} {car.model}
                </h3>

                {/* Price */}
                <p className="text-xl font-bold text-blue-700 mt-1 mb-3"> {/* Adjusted margins */}
                    {formattedPrice}
                </p>

                {/* Key Specs - Push to bottom if content above varies */}
                <div className="text-sm text-gray-600 space-y-1 mt-auto pt-2 border-t border-gray-100"> {/* mt-auto pushes this down */}
                    {car.fuelType && <p><span className="font-medium">Fuel:</span> {car.fuelType}</p>}
                    {car.seatingCapacity && <p><span className="font-medium">Seats:</span> {car.seatingCapacity}</p>}
                    {/* Add other key specs if needed */}
                </div>
            </div>
        </Link> {/* ===== End Link component ===== */}
        <div className="p-4 pt-0 flex justify-end items-center">
           <WishlistButton car={car} />
        </div>
    </div>
  );
};

// PropTypes definition remains the same
CarCard.propTypes = {
    car: PropTypes.shape({
        id: PropTypes.string.isRequired,
        brand: PropTypes.string.isRequired,
        model: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
        price: PropTypes.number, // Allow price to be potentially null/undefined
        fuelType: PropTypes.string,
        seatingCapacity: PropTypes.number,
        imageUrl: PropTypes.string,
    }).isRequired,
};

export default CarCard;