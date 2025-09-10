import React from 'react';
import { X, Star, ShoppingCart, Zap, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';

const QuickView: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useCart();

  if (!quickViewProduct) return null;

  const handleAddToCart = () => {
    const product = {
      id: quickViewProduct.id,
      name: quickViewProduct.name,
      price: quickViewProduct.price,
      rating: quickViewProduct.rating,
      description: quickViewProduct.description,
      category: '裝備'
    };
    addToCart(product);
    setQuickViewProduct(null);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={() => setQuickViewProduct(null)}
      >
        {/* Modal */}
        <div
          className="bg-[#060914]/95 backdrop-blur-xl border border-[#FBBF24]/30 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-[#FBBF24]/10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-[#FBBF24] to-yellow-300 p-2 rounded-lg shadow-lg shadow-[#FBBF24]/50">
                <Zap className="h-5 w-5 text-black" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">快速查看</h2>
                <p className="text-xs text-gray-400">Quick View</p>
              </div>
            </div>
            <button
              onClick={() => setQuickViewProduct(null)}
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Product Image */}
              <div className="aspect-square bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-[#FBBF24]/20 rounded-2xl flex items-center justify-center relative overflow-hidden">
                {/* Cosmic background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FBBF24]/10 to-purple-600/10"></div>
                
                {/* Multiple rotating rings */}
                <div className="relative z-10">
                  <div className="w-40 h-40 border-2 border-[#FBBF24]/30 rounded-full animate-spin-slow">
                    <div className="absolute inset-4 border border-purple-400/20 rounded-full animate-reverse-spin">
                      <div className="absolute inset-4 border border-blue-400/30 rounded-full animate-pulse">
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-16 h-16 bg-gradient-to-r from-[#FBBF24] to-yellow-300 rounded-full flex items-center justify-center shadow-2xl shadow-[#FBBF24]/50">
                            <Shield className="h-8 w-8 text-black" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating particles */}
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-[#FBBF24] rounded-full animate-ping opacity-60"
                    style={{
                      top: `${20 + Math.sin(i * Math.PI / 6) * 30}%`,
                      left: `${50 + Math.cos(i * Math.PI / 6) * 30}%`,
                      animationDelay: `${i * 0.2}s`
                    }}
                  />
                ))}

                {/* Glowing aura */}
                <div className="absolute inset-0 bg-[#FBBF24]/5 rounded-2xl blur-2xl"></div>
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-3xl font-bold text-white">
                      {quickViewProduct.name}
                    </h3>
                    {quickViewProduct.badge && (
                      <span className="bg-gradient-to-r from-[#FBBF24] to-yellow-300 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        {quickViewProduct.badge}
                      </span>
                    )}
                  </div>
                  {quickViewProduct.subtitle && (
                    <p className="text-gray-400 text-lg">{quickViewProduct.subtitle}</p>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(quickViewProduct.rating)
                            ? 'text-[#FBBF24] fill-current'
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-400">{quickViewProduct.rating}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-400 text-sm">已售出 {Math.floor(Math.random() * 500 + 100)} 件</span>
                </div>

                {/* Price */}
                <div className="p-4 bg-gray-800/30 rounded-xl border border-gray-700">
                  <div className="text-4xl font-bold text-[#FBBF24] mb-2">
                    NT${quickViewProduct.price.toLocaleString()}
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-green-400">✓ 全館免運</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-blue-400">✓ 7天鑑賞期</span>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-white">產品描述</h4>
                  <p className="text-gray-300 leading-relaxed">
                    {quickViewProduct.description}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-white">產品特色</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center space-x-2 text-sm text-gray-300">
                      <div className="w-2 h-2 bg-[#FBBF24] rounded-full"></div>
                      <span>太空認證</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-300">
                      <div className="w-2 h-2 bg-[#FBBF24] rounded-full"></div>
                      <span>輻射防護</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-300">
                      <div className="w-2 h-2 bg-[#FBBF24] rounded-full"></div>
                      <span>零重力適用</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-300">
                      <div className="w-2 h-2 bg-[#FBBF24] rounded-full"></div>
                      <span>AI智能</span>
                    </div>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                 className="w-full bg-gradient-to-r from-[#FBBF24] to-yellow-300 hover:from-[#FBBF24]/90 hover:to-yellow-300/90 text-black font-bold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-[#FBBF24]/25 hover:shadow-[#FBBF24]/40 transform hover:scale-105 active:scale-95"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>加入艙儲</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickView;