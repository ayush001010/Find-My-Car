// src/App.jsx
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom'; // <-- Make sure these are imported

// Layout Components
import Header from './components/Header.jsx';
import HeroSlider from './components/HeroSlider.jsx'; // HeroSlider needed for the HomePage route element
import Footer from './components/Footer.jsx';

// Page Components (These handle the content for each route)
import HomePage from './pages/HomePage.jsx'; // Your main list page component
import CarDetailPage from './components/CarDetailPage.jsx'; // Your detail page component

// --- Define the paths to your hero images (can also be inside HomePageWithHero helper) ---
const heroImagePaths = [
    '/images/hero2.jpg',
    '/images/hero9.jpg',
    '/images/hero4.jpg',
];
// --- --- --- --- --- --- --- --- --- --- ---

// --- App Component: Layout and Routing ---
function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header is always visible */}
      <Header />

      {/* Main area where content changes based on route */}
      <main>
        {/* Defines which component to render based on URL path */}
        <Routes>
          {/* Route 1: Home Page */}
          <Route
            path="/"
            element={<HomePageWithHero />} // Use helper component below
          />

          {/* Route 2: Car Detail Page */}
          <Route path="/cars/:id" element={<CarDetailPage />} />

          {/* Route 3: Not Found Page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Footer is always visible */}
      <Footer />
    </div>
  );
}

// --- Helper Components for Route Elements ---

// Combines Hero Slider and HomePage content for the "/" route
const HomePageWithHero = () => (
    <>
        <HeroSlider images={heroImagePaths} interval={6000} />
        <HomePage />
    </>
);

// Component for the 404 Not Found route
const NotFoundPage = () => (
    <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold text-red-600">404 - Not Found</h1>
        <p className="text-gray-600 mt-4">Sorry, the page you're looking for doesn't exist.</p>
        <Link to="/" className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
           Go Back Home
        </Link>
    </div>
);

export default App;