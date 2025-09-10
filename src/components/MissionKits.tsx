import React, { useState } from 'react';
import { Package, ShoppingCart, Star, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';

const MissionKits: React.FC = () => {
  const { setCartOpen, showToast } = useCart();
  const [cart, setCart] = useState<Record<string, number>>({});

  const missionKits = [
    {
      id: 'kit-basic',
      title: '艙外漫步入門組',
      items: ['Nebula 透明頭盔', 'VOID 保溫飛行外套', '月塵可可能量棒 x5'],
      originalPrice: 18800,
      salePrice: 17900,
      savings: 900,
      description: '完美的艙外活動入門套組，包含基礎防護裝備與能量補給，讓您安全踏出太空艙的第一步。',
      rating: 4.8,
      reviews: 156
    },
    {
      id: 'kit-advanced',
      title: '行星勘測進階組',
      items: ['Astra MkII 太空服', 'PIX 勘探迷你球', '月塵可可能量棒 x10'],
      originalPrice: 50200,
      salePrice: 50200,
      savings: 0,
      description: '專業行星探索套組，配備完整的勘測工具與長效能量補給，適合深度探索未知星球。',
      rating: 4.9,
      reviews: 203
    }
  ];

  const handleAddBasicKit = () => {
    setCart((c) => {
      const next = { ...c };
      next["helm-neo"] = (next["helm-neo"] ?? 0) + 1;
      next["jacket-void"] = (next["jacket-void"] ?? 0) + 1;
      next["snack-moon"] = (next["snack-moon"] ?? 0) + 5;
      return next;
    });
    setCartOpen(true);
    showToast("已加入『艙外漫步入門組』：共 7 件");
  };

  const handleAddAdvancedKit = () => {
    setCart((c) => {
      const next = { ...c };
      next["suit-pro"] = (next["suit-pro"] ?? 0) + 1;
      next["droid-pix"] = (next["droid-pix"] ?? 0) + 1;
      next["snack-moon"] = (next["snack-moon"] ?? 0) + 10;
      return next;
    });
    setCartOpen(true);
    showToast("已加入『行星勘測進階組』：共 12 件");
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-gradient-to-r from-[#FBBF24] to-yellow-300 p-3 rounded-xl shadow-lg shadow-[#FBBF24]/50">
              <Package className="h-8 w-8 text-black" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">任務套組</h2>
              <span className="text-sm text-gray-400 font-medium">Mission Kits</span>
            </div>
          </div>
          <p className="text-gray-300 text-lg">精選組合，一次購足所有任務必需品</p>
        </div>

        {/* Mission Kits Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {missionKits.map((kit) => (
            <div
              key={kit.id}
              className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-[#FBBF24]/50 transition-all duration-300 group hover:shadow-2xl hover:shadow-[#FBBF24]/10 transform hover:scale-[1.02]"
            >
              {/* Kit Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-bold text-white group-hover:text-[#FBBF24] transition-colors">
                    {kit.title}
                  </h3>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(kit.rating)
                            ? 'text-[#FBBF24] fill-current'
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                    <span className="text-xs text-gray-400 ml-2">({kit.reviews})</span>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">{kit.description}</p>
              </div>

              {/* Kit Items */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-[#FBBF24] mb-3 flex items-center space-x-2">
                  <Zap className="h-4 w-4" />
                  <span>套組內容：</span>
                </h4>
                <ul className="space-y-2">
                  {kit.items.map((item, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-[#FBBF24] rounded-full mr-3 animate-pulse"></div>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pricing */}
              <div className="mb-6 p-4 bg-gray-800/30 rounded-xl border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl font-bold text-[#FBBF24]">
                    NT${kit.salePrice.toLocaleString()}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    NT${kit.originalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-400 font-medium">
                    省下 NT${kit.savings.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-400">
                    比單買便宜 {Math.round((kit.savings / kit.originalPrice) * 100)}%
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={kit.id === 'kit-basic' ? handleAddBasicKit : handleAddAdvancedKit}
               className="w-full bg-gradient-to-r from-[#FBBF24] to-yellow-300 hover:from-[#FBBF24]/90 hover:to-yellow-300/90 text-black font-bold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-[#FBBF24]/25 hover:shadow-[#FBBF24]/40 transform hover:scale-105 active:scale-95"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>一鍵加入</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionKits;