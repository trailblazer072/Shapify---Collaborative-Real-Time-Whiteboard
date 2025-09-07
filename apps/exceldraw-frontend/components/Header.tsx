"use client"
import React, { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // This check ensures localStorage is only accessed on the client side
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token")
      if (token) {
        setIsLoggedIn(true)
      }
    }
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    router.push("/") // Redirect to home page after sign out
  }

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/95 backdrop-blur-sm shadow-sm border-b border-gray-800' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-white">Shapify</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-blue-400 transition-colors font-light">
              Features
            </a>
            <a href="#benefits" className="text-gray-300 hover:text-blue-400 transition-colors font-light">
              Use Cases
            </a>
            <a href="#pricing" className="text-gray-300 hover:text-blue-400 transition-colors font-light">
              Pricing
            </a>
            <a href="#contact" className="text-gray-300 hover:text-blue-400 transition-colors font-light">
              Contact
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
        <>
          <button className="text-gray-300 hover:text-blue-400 transition-colors font-light" onClick={() => router.push("/dashboard")}>
            Dashboard
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors font-light" onClick={handleSignOut}>
            Sign Out
          </button>
        </>
      ) : (
        <>
          <button className="text-gray-300 hover:text-blue-400 transition-colors font-light" onClick={() => router.push("/signin")}>
            Sign In
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors font-light" onClick={() => router.push("/signup")}>
            Sign Up
          </button>
        </>
      )}
          </div>

          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <div className="px-4 py-4 space-y-4">
            <a href="#features" className="block text-gray-300 hover:text-blue-400 transition-colors font-light">
              Features
            </a>
            <a href="#benefits" className="block text-gray-300 hover:text-blue-400 transition-colors font-light">
              Use Cases
            </a>
            <a href="#pricing" className="block text-gray-300 hover:text-blue-400 transition-colors font-light">
              Pricing
            </a>
            <a href="#contact" className="block text-gray-300 hover:text-blue-400 transition-colors font-light">
              Contact
            </a>
            <div className="pt-4 border-t space-y-2">
              <button className="block w-full text-left text-gray-300 hover:text-blue-400 transition-colors font-light" onClick={()=>{
              router.push("/signin")
            }}>
                Sign In
              </button>
              <button className="block w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors font-light" onClick={()=>{
              router.push("/signup")
            }}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}