import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockCars } from '../lib/data/mockCars.js';
import WishlistButton from './WishlistButton.jsx';

const CarDetailPage = () => {
    const { id } = useParams();
    const car = useMemo(() => mockCars.find(c => c.id === id), [id]);

    // --- Car Not Found State ---
    if (!car) {
        return (
            <div className="flex-grow flex flex-col items-center justify-center text-center px-4 py-12">
                <h2 className="text-2xl font-semibold text-red-600 mb-4">Car Not Found</h2>
                <p className="text-gray-600 mb-6">Sorry, we couldn't find details for the car you're looking for.</p>
                <Link to="/" className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" /></svg>
                    Back to Search
                </Link>
            </div>
        );
    }

    // --- Car Found State ---
    const formattedPrice = (car.price !== null && car.price !== undefined)
        ? `$${car.price.toLocaleString()}`
        : 'Price unavailable';

    const handleImageError = (event) => {
        event.currentTarget.src = '/images/placeholder.png';
    };

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
             {/* Back Link */}
             <div className="mb-8">
                 <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 group transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 group-hover:-translate-x-1 transition-transform duration-200 ease-in-out" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" /></svg>
                     Back to Search Results
                 </Link>
             </div>

            {/* Main Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12 items-start">

                {/* Image Column (NOT sticky anymore) */}
                <div className="md:col-span-2 w-full aspect-video md:aspect-auto rounded-lg overflow-hidden bg-gray-300 shadow-lg"> {/* Removed sticky classes */}
                    <img
                        src={car.imageUrl || '/images/placeholder.png'}
                        alt={`${car.year} ${car.brand} ${car.model}`}
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                        loading="eager"
                    />
                </div>

                {/* Details Column */}
                <div className="md:col-span-3 bg-white p-6 md:p-8 rounded-lg shadow-lg">
                    {/* Title */}
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{car.year} {car.brand} {car.model}</h1>
                    {/* Price */}
                    <p className="text-2xl lg:text-3xl font-semibold text-blue-700 mb-6 pb-6 border-b border-gray-200">{formattedPrice}</p>

                    {/* Specifications Section */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Specifications</h2>
                        <ul className="space-y-2">
                            <li className="flex justify-between border-b border-gray-100 py-2"><span className="text-gray-600">Brand</span><span className="font-medium text-gray-800">{car.brand}</span></li>
                            <li className="flex justify-between border-b border-gray-100 py-2"><span className="text-gray-600">Model</span><span className="font-medium text-gray-800">{car.model}</span></li>
                            <li className="flex justify-between border-b border-gray-100 py-2"><span className="text-gray-600">Year</span><span className="font-medium text-gray-800">{car.year}</span></li>
                            <li className="flex justify-between border-b border-gray-100 py-2"><span className="text-gray-600">Fuel Type</span><span className="font-medium text-gray-800">{car.fuelType}</span></li>
                            <li className="flex justify-between border-b border-gray-100 py-2"><span className="text-gray-600">Seating Capacity</span><span className="font-medium text-gray-800">{car.seatingCapacity}</span></li>
                        </ul>
                    </div>

                    {/* Description Section */}
                    {car.description && (
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Description</h2>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{car.description}</p>
                        </div>
                    )}

                    {/* Wishlist Button Area */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                         {/* Using simpler version */}
                         <div className="flex items-center space-x-2">
                           <WishlistButton car={car} />
                           <span className="text-sm text-gray-700">Add to Wishlist</span>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetailPage;