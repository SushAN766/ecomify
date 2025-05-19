import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">

        {/* Removed the main grid div here */}

        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} eBazaar. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-600 hover:text-ebazaar-primary">
              Terms of Service
            </a>
            <a href="#" className="text-gray-600 hover:text-ebazaar-primary">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 hover:text-ebazaar-primary">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
