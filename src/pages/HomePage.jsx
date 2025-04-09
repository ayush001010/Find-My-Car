// src/pages/HomePage.jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';

// Component Imports
import Filters from '../components/Filters.jsx'; // Note adjusted paths
import CarList from '../components/CarList.jsx';
import Pagination from '../components/Pagination.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';

// Data and Hooks
import { mockCars } from '../lib/data/mockCars.js'; // Note adjusted paths

// Simulate API delay function
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const ITEMS_PER_PAGE = 10;

// --- Popular Brands List --- (Can stay in App.jsx or move here if ONLY used here)
// --- Popular Brands List (MUST BE DEFINED HERE) ---
const carBrands = [
    { name: "Toyota", logo: "https://freepngimg.com/thumb/toyota_logo/6-2-toyota-logo-png-image.png" },
    { name: "Ferrari", logo: "https://pngimg.com/uploads/ferrari/ferrari_PNG102798.png" },
    { name: "BMW", logo: "https://pngimg.com/uploads/bmw_logo/bmw_logo_PNG19714.png" },
    { name: "Mercedes-Benz", logo: "https://freepngimg.com/thumb/mercedes_benz/24322-9-mercedes-benz-logo-file.png" },
    { name: "Audi", logo: "https://www.freepnglogos.com/uploads/audi-logo-1.png" },
    { name: "Tesla", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png" },
  ];
  // --- --- --- --- --- --- --- --- --- --- ---
// --- --- --- --- --- --- ---

const HomePage = () => {
  // --- All state related to filtering/pagination now lives here ---
  const [allCars] = useState(mockCars);
  const [displayedCars, setDisplayedCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    searchQuery: '',
    brand: '',
    minPrice: '',
    maxPrice: '',
    fuelType: '',
  });

  // --- Filtering Logic (Memoized) ---
  const filteredCars = useMemo(() => {
    let tempCars = allCars;
    const query = filters.searchQuery.toLowerCase();
    if (query) {
        tempCars = tempCars.filter(car =>
            car.brand.toLowerCase().includes(query) ||
            car.model.toLowerCase().includes(query)
        );
    }
    if (filters.brand) {
        tempCars = tempCars.filter(car => car.brand === filters.brand);
    }
    if (filters.fuelType) {
        tempCars = tempCars.filter(car => car.fuelType === filters.fuelType);
    }
    const minPriceNum = parseInt(filters.minPrice, 10);
    if (!isNaN(minPriceNum)) {
        tempCars = tempCars.filter(car => car.price >= minPriceNum);
    }
    const maxPriceNum = parseInt(filters.maxPrice, 10);
    if (!isNaN(maxPriceNum)) {
        tempCars = tempCars.filter(car => car.price <= maxPriceNum);
    }
    return tempCars;
  }, [allCars, filters]);

  // --- Pagination and Data Fetching Simulation Effect ---
  useEffect(() => {
    const processAndPaginate = async () => {
      setLoading(true);
      setError(null);
      try {
        await sleep(300);

        const totalItems = filteredCars.length;
        const calculatedTotalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
        setTotalPages(calculatedTotalPages > 0 ? calculatedTotalPages : 1);

        const newCurrentPage = Math.max(1, Math.min(currentPage, calculatedTotalPages || 1));
        if (newCurrentPage !== currentPage && calculatedTotalPages > 0) {
            setCurrentPage(newCurrentPage);
            return;
        } else if (newCurrentPage === currentPage || calculatedTotalPages === 0) {
            const startIndex = (newCurrentPage - 1) * ITEMS_PER_PAGE;
            const endIndex = startIndex + ITEMS_PER_PAGE;
            const paginatedCars = filteredCars.slice(startIndex, endIndex);
            setDisplayedCars(paginatedCars);
        }
      } catch (err) {
        console.error("Error processing car data:", err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setDisplayedCars([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };
    processAndPaginate();
  }, [filteredCars, currentPage]);

  // --- Event Handlers ---
  const handlePageChange = (page) => {
    setCurrentPage(page);
     window.scrollTo({ top: 400, behavior: 'smooth' }); // Scroll below hero/filters
  };

   const handleSearchChange = useCallback((event) => {
       setFilters(prev => ({ ...prev, searchQuery: event.target.value }));
       setCurrentPage(1);
   }, []);

   const handleFilterChange = useCallback((filterName, value) => {
       setFilters(prev => ({ ...prev, [filterName]: value }));
       setCurrentPage(1);
   }, []);

  return (
    <> {/* Use Fragment as we don't need an extra div */}
        {/* ===== SEARCH, FILTERS, RESULTS (Content Below the Fold) ===== */}
        <div className="container mx-auto px-4 pt-8 pb-12">
           <h2 className="text-2xl font-semibold mb-6 text-center md:text-left">Find Cars</h2>

           {/* Search Bar */}
           <div className="mb-6">
             <input
                type="text"
                placeholder="Search by brand or model..."
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                onChange={handleSearchChange}
                value={filters.searchQuery}
             />
           </div>

            {/* Filters Component */}
            <Filters onFilterChange={handleFilterChange} currentFilters={filters} />

            <section className="py-12 bg-white border-t border-gray-200">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">
                        Explore Popular Brands
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                        {carBrands.map((brand) => (
                            <a
                                href="#" // Placeholder link
                                key={brand.name}
                                className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-blue-500 transition-all duration-300 min-h-[120px] group bg-gray-50 hover:bg-white"
                                aria-label={`Explore ${brand.name} cars`}
                            >
                                <div className="w-16 h-16 mb-3 flex items-center justify-center overflow-hidden">
                                <img
                                    src={brand.logo}
                                    alt={`${brand.name} logo`}
                                    className="max-h-full max-w-full object-contain"
                                    loading="lazy"
                                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                />
                                </div>
                                <span className="font-medium text-gray-700 group-hover:text-blue-700 text-center">
                                    {brand.name}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

          {/* Loading and Error States */}
          {loading && <LoadingSpinner />}
          {error && <ErrorMessage message={`Failed to process cars: ${error}`} />}

          {/* Car List and Pagination */}
          {!loading && !error && (
            <>
              <CarList cars={displayedCars} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div> {/* End of search/filter/results container */}
        
    </>
  );
};

export default HomePage;