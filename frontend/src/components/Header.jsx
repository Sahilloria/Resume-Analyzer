import React from "react";

const Header = () => {
    return (
        <header className="py-12 px-4 bg-white shadow-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50 opacity-70"></div>
        <div className="container mx-auto relative">
          <h1 className="text-5xl font-light text-center text-gray-800 tracking-tight">
            Resume <span className="font-semibold">Analyzer</span>
          </h1>
          <p className="text-center mt-4 text-gray-600 text-lg font-light">
            Elevate your application with AI-powered resume analysis
          </p>
        </div>
      </header>
    )
};

export default Header;