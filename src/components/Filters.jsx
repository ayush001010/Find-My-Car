import React from 'react';
import PropTypes from 'prop-types';

// List of brands and fuel types for dropdowns
const carBrands = ["Toyota", "Honda", "Tesla", "Ford", "BMW", "Mercedes-Benz", "Audi", "Chevrolet", "Nissan", "Hyundai", "Kia", "Subaru", "Volkswagen", "Mazda", "Jeep", "Lexus", "Volvo", "Porsche", "Jaguar", "Land Rover"];
const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid"];

const Filters = ({ onFilterChange, currentFilters }) => {

  // Helper to call the parent handler more cleanly from inputs/selects
  const handleChange = (event) => {
      const { name, value } = event.target;
      onFilterChange(name, value); 
  };

  return (
    <div className="flex flex-wrap gap-4 mb-6 p-4 border rounded border-gray-200 bg-gray-50 items-center">
      {/* Brand Filter */}
      <div>
        <label htmlFor="brand-filter" className="sr-only">Brand</label> {/* Screen reader label */}
        <select
          id="brand-filter"
          name="brand"
          className="p-2 border border-gray-300 rounded"
          value={currentFilters.brand} // Controlled component
          onChange={handleChange} // Use unified handler
        >
          <option value="">All Brands</option>
          {carBrands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
      </div>

      {/* Price Range Filter */}
      <div className="flex items-center gap-2">
         <label htmlFor="min-price-filter" className="sr-only">Minimum Price</label>
         <input
           id="min-price-filter"
           name="minPrice" // Important: 'name' matches state key
           type="number"
           placeholder="Min Price"
           className="p-2 border border-gray-300 rounded w-28 appearance-none" // appearance-none for some browsers
           value={currentFilters.minPrice} // Controlled
           onChange={handleChange}
           min="0"
         />
         <span>-</span>
         <label htmlFor="max-price-filter" className="sr-only">Maximum Price</label>
         <input
           id="max-price-filter"
           name="maxPrice" // Important: 'name' matches state key
           type="number"
           placeholder="Max Price"
           className="p-2 border border-gray-300 rounded w-28 appearance-none"
           value={currentFilters.maxPrice} // Controlled
           onChange={handleChange}
           min="0"
         />
      </div>

      {/* Fuel Type Filter */}
      <div>
        <label htmlFor="fuel-filter" className="sr-only">Fuel Type</label>
        <select
          id="fuel-filter"
          name="fuelType" // Important: 'name' matches state key
          className="p-2 border border-gray-300 rounded"
          value={currentFilters.fuelType} // Controlled
          onChange={handleChange}
        >
          <option value="">All Fuel Types</option>
           {fuelTypes.map(fuel => (
              <option key={fuel} value={fuel}>{fuel}</option>
          ))}
        </select>
      </div>

      {/* Add Seating Capacity Filter similarly if needed */}

    </div>
  );
};

// Define PropTypes for runtime checking
Filters.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
    currentFilters: PropTypes.shape({
        searchQuery: PropTypes.string, // Include even if not directly controlled here
        brand: PropTypes.string.isRequired,
        minPrice: PropTypes.string.isRequired,
        maxPrice: PropTypes.string.isRequired,
        fuelType: PropTypes.string.isRequired,
    }).isRequired,
};

export default Filters;