import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, ChevronDown, Rocket, User, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  userProfile: {gender: string, birthDate: string} | null;
  setIsLoggedIn: (value: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ userProfile, setIsLoggedIn }) => {
  const [sortBy, setSortBy] = useState('featured');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [cartAnimation, setCartAnimation] = useState(false);
  const { cartItems, toggleCart } = useCart();
  
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // 購物車數量變化時的動畫效果
  useEffect(() => {
    if (cartItemCount > 0) {
      setCartAnimation(true);
      const timer = setTimeout(() => setCartAnimation(false), 600);
      return () => clearTimeout(timer);
    }
  }, [cartItemCount]);
  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowProfileMenu(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-[#FBBF24]/20 shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-[#FBBF24] to-yellow-300 p-2 rounded-xl shadow-lg shadow-[#FBBF24]/50">
                <Rocket className="h-6 w-6 text-black" />
              </div>
              <div>
                <div className="text-xl font-bold">
                  <span className="text-white">COSMO</span>
                  <span className="text-[#FBBF24]">SHOP</span>
                </div>
                <div className="text-xs text-gray-400 font-medium">Space Adventure</div>
              </div>
            </div>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="搜尋太空裝備..."
                className="bg-gray-800/50 border border-gray-600 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FBBF24] focus:border-transparent w-64 transition-all"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#FBBF24] appearance-none pr-8 transition-all"
              >
                <option value="featured">精選</option>
                <option value="price-low">價格由低到高</option>
                <option value="price-high">價格由高到低</option>
                <option value="rating">評分優先</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            {/* User Profile Button */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="bg-gray-800/50 hover:bg-[#FBBF24]/20 border border-gray-600 hover:border-[#FBBF24] rounded-xl px-4 py-2 transition-all duration-200 flex items-center space-x-2"
              >
                <User className="h-4 w-4 text-white" />
                <span className="text-sm text-white">太空旅人</span>
                <ChevronDown className="h-3 w-3 text-gray-400" />
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-gray-900/95 backdrop-blur-xl border border-gray-600 rounded-xl shadow-2xl py-2">
                  <div className="px-4 py-2 border-b border-gray-700">
                    <p className="text-xs text-gray-400">性別: {userProfile?.gender}</p>
                    <p className="text-xs text-gray-400">生日: {userProfile?.birthDate}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition-colors flex items-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>登出</span>
                  </button>
                </div>
              )}
            </div>

            {/* Cart Button */}
            <button
             data-cart-button
              onClick={toggleCart}
             className={`relative bg-gray-800/50 hover:bg-[#FBBF24]/20 border border-gray-600 hover:border-[#FBBF24] rounded-xl p-2 transition-all duration-200 group ${cartAnimation ? 'animate-pulse' : ''}`}
            >
              <ShoppingCart className="h-5 w-5 text-white group-hover:text-[#FBBF24] transition-colors" />
              {cartItemCount > 0 && (
               <span className={`absolute -top-2 -right-2 bg-[#FBBF24] text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg shadow-[#FBBF24]/50 transition-all duration-300 ${cartAnimation ? 'animate-bounce scale-125' : 'animate-pulse'}`}>
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;