import React from 'react';
import PropTypes from 'prop-types'; 
import CarCard from './CarCard.jsx'; 

const CarList = ({ cars }) => {
  // Handle cases where cars might be null or not an array briefly during loading/error
  if (!Array.isArray(cars) || cars.length === 0) {
    return <p className="text-center text-gray-500 py-8">No cars found matching your criteria.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {cars.map((car) => (
        // Ensure each car object has a unique 'id' for the key
        car && car.id ? <CarCard key={car.id} car={car} /> : null
      ))}
    </div>
  );
};

// Define PropTypes for runtime checking
CarList.propTypes = {
    // Expect 'cars' to be an array of objects, each matching the CarCard's expected shape
    cars: PropTypes.arrayOf(PropTypes.shape(CarCard.propTypes.car.isRequired)).isRequired,
};

export default CarList;