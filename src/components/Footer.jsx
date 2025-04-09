import React from 'react';

const FooterLink = ({ href = "#", children }) => (
    <a href={href} className="text-gray-400 hover:text-gray-200 transition-colors text-sm mb-2 block">
        {children}
    </a>
);

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-400 pt-12 pb-8">
            <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-8">
                {/* Company Column */}
                <div className="col-span-1">
                    <h3 className="text-white font-semibold mb-4 text-base">Company</h3>
                    <FooterLink>About Us</FooterLink>
                    <FooterLink>Careers</FooterLink>
                    <FooterLink>Press kit</FooterLink>
                    <FooterLink>Blog</FooterLink>
                    <FooterLink>Article</FooterLink>
                    <FooterLink>News</FooterLink>
                    <FooterLink>Privacy Policy</FooterLink>
                    <FooterLink>Sustainability</FooterLink>
                    <FooterLink>Testimonials</FooterLink>
                </div>

                {/* Discover Column */}
                <div className="col-span-1">
                    <h3 className="text-white font-semibold mb-4 text-base">Discover</h3>
                    <FooterLink>Buy used car</FooterLink>
                    <FooterLink>Sell used car</FooterLink>
                    <FooterLink>Used car valuation</FooterLink>
                    <FooterLink>Motor insurance</FooterLink>
                    <FooterLink>Check & pay challan</FooterLink>
                    <FooterLink>Check vehicle details</FooterLink>
                    <FooterLink>Explore new cars</FooterLink>
                    <FooterLink>Scrap your car</FooterLink>
                </div>

                {/* Help & Support Column */}
                <div className="col-span-1">
                    <h3 className="text-white font-semibold mb-4 text-base">Help & support</h3>
                    <FooterLink>FAQs</FooterLink>
                    <FooterLink>Security</FooterLink>
                    <FooterLink>Contact us</FooterLink>
                    <FooterLink>Become a partner</FooterLink>
                    <FooterLink>RC transfer status</FooterLink>
                    <FooterLink>Terms & conditions</FooterLink>
                </div>

                 {/* Social & Apps Column (Combine for medium screens if needed) */}
                 <div className="col-span-1 md:col-span-1 lg:col-span-1">
                     <h3 className="text-white font-semibold mb-4 text-base">Social Links</h3>
                     <div className="flex space-x-3 mb-6">
                        {/* Replace with actual icons later */}
                        <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white"><span className="text-2xl">[FB]</span></a>
                        <a href="#" aria-label="X (Twitter)" className="text-gray-400 hover:text-white"><span className="text-2xl">[X]</span></a>
                        <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white"><span className="text-2xl">[IG]</span></a>
                        <a href="#" aria-label="Youtube" className="text-gray-400 hover:text-white"><span className="text-2xl">[YT]</span></a>
                        <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-white"><span className="text-2xl">[LI]</span></a>
                     </div>

                     <h3 className="text-white font-semibold mb-4 text-base">Get the App</h3>
                     <div className="flex flex-col space-y-2">
                        <a href="#" aria-label="Download on the App Store"><img src="/images/app-store-badge.svg" alt="App Store" className="h-10" /></a> {/* Placeholder path */}
                        <a href="#" aria-label="Get it on Google Play"><img src="/images/google-play-badge.png" alt="Google Play" className="h-10" /></a> {/* Placeholder path */}
                     </div>
                 </div>

                {/* Global Presence Column */}
                 <div className="col-span-2 md:col-span-2 lg:col-span-2"> {/* Wider column */}
                     <h3 className="text-white font-semibold mb-4 text-base">We are global</h3>
                     {/* Example - can be styled better */}
                     <div className="flex items-center space-x-4 mb-2">
                         {/* Add flag SVGs or images if desired */}
                         <span>🇦🇺</span> <FooterLink>Australia</FooterLink>
                     </div>
                     <div className="flex items-center space-x-4 mb-2">
                         <span>🇦🇪</span> <FooterLink>UAE</FooterLink>
                     </div>
                 </div>

            </div>

            {/* Copyright Notice */}
            <div className="text-center text-sm border-t border-gray-700 pt-6 mt-6">
                 Car Finder © {new Date().getFullYear()} | Better drives, better lives {/* Added tagline */}
                 {/* Maybe add a reference: "Footer structure inspired by Cars24" if appropriate */}
            </div>
        </footer>
    );
};

// No props needed currently
// Footer.propTypes = {};

export default Footer;

// Note: You will need to:
// 1. Create placeholder images (or use actual ones) for the app store badges
//    in `public/images/app-store-badge.svg` and `public/images/google-play-badge.png`
// 2. Optionally install `react-icons` (`npm install react-icons`) and replace the
//    text placeholders like "[FB]" with actual icon components (`<FaFacebookF />` etc.)
//    and adjust styling/sizing.