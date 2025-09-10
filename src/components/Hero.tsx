import React, { useState } from 'react';
import { Rocket, Zap } from 'lucide-react';
import { CATEGORIES, Category } from '../data/products';

const Hero: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('全部');

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Promotional Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#FBBF24]/20 to-yellow-300/20 border border-[#FBBF24]/50 rounded-full px-4 py-2">
              <Zap className="h-4 w-4 text-[#FBBF24]" />
              <span className="text-sm font-medium text-[#FBBF24]">全館免運｜跨越整個銀河</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                啟動你的{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FBBF24] to-yellow-300">
                  AI-Verse冒險
                </span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                從艙外漫步到行星勘測，挑選探索AI-Verse的裝備與補給，打造您的專屬艙儲清單。
              </p>
            </div>

            {/* Category Filter Buttons */}
            <div className="flex flex-wrap gap-3">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                    activeCategory === category
                      ? 'bg-gradient-to-r from-[#FBBF24] to-yellow-300 text-black shadow-lg shadow-[#FBBF24]/25 transform scale-105'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700 hover:border-[#FBBF24]/50 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Right - Animated Ring */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Outer rotating ring */}
              <div className="w-80 h-80 rounded-full border-2 border-gradient-to-r from-[#FBBF24] to-purple-500 animate-spin-slow opacity-60">
                <div className="absolute inset-4 rounded-full border border-blue-400/30 animate-pulse"></div>
                <div className="absolute inset-8 rounded-full border border-purple-400/20"></div>
              </div>
              
              {/* Inner rotating ring */}
              <div className="absolute inset-12 w-56 h-56 rounded-full border-2 border-[#FBBF24]/40 animate-reverse-spin">
                <div className="absolute inset-6 rounded-full border border-purple-400/20 animate-pulse"></div>
              </div>

              {/* Center rocket */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-gradient-to-r from-[#FBBF24] to-yellow-300 p-8 rounded-full shadow-2xl shadow-[#FBBF24]/50 animate-pulse">
                  <Rocket className="h-16 w-16 text-black" />
                </div>
              </div>

              {/* Orbiting particles */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 bg-[#FBBF24] rounded-full animate-ping opacity-75"
                  style={{
                    top: `${50 + Math.sin(i * Math.PI / 6) * 35}%`,
                    left: `${50 + Math.cos(i * Math.PI / 6) * 35}%`,
                    animationDelay: `${i * 0.15}s`,
                    animationDuration: '2s'
                  }}
                />
              ))}

              {/* Glowing aura */}
              <div className="absolute inset-0 bg-[#FBBF24]/5 rounded-full blur-3xl animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;