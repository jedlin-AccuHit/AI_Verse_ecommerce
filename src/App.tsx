import React from 'react';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import MissionKits from './components/MissionKits';
import CartDrawer from './components/CartDrawer';
import QuickView from './components/QuickView';
import Footer from './components/Footer';
import LoginGate from './components/LoginGate';
import { CartProvider } from './context/CartContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<{gender: string, birthDate: string} | null>(null);
  const [cartState, setCartState] = useState<'empty' | 'single' | 'mission-basic' | 'mission-advanced'>('empty');

  const handleLogin = (profile: {gender: string, birthDate: string}) => {
    setUserProfile(profile);
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <LoginGate onLogin={handleLogin} />;
  }

  return (
    <CartProvider initialState="empty">
      <div className="min-h-screen bg-[#060914] text-white overflow-x-hidden">
        {/* Starfield Background */}
        <div className="fixed inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-blue-900/20"></div>
          {/* Animated stars */}
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
          {/* Larger glowing stars */}
          {[...Array(20)].map((_, i) => (
            <div
              key={`glow-${i}`}
              className="absolute w-2 h-2 bg-[#FBBF24] rounded-full animate-pulse opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
                boxShadow: '0 0 10px #FBBF24'
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          <Header userProfile={userProfile} setIsLoggedIn={setIsLoggedIn} />
          <Hero />
          <ProductGrid />
          <MissionKits />
          <Footer />
          <CartDrawer />
          <QuickView />
        </div>
      </div>
    </CartProvider>
  );
}

export default App;