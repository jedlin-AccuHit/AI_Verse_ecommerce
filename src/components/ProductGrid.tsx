import React from 'react';
import { useState, useMemo } from 'react';
import { Star, ShoppingCart, Eye, Zap, Shield, Cpu } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS, CATEGORIES, Category, Product } from '../data/products';

const ProductGrid: React.FC = () => {
  const { addToCart, setQuickViewProduct } = useCart();
  const [category, setCategory] = useState<Category>('全部');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('featured');

  const items = useMemo(() => {
    let list = PRODUCTS.filter((p) =>
      (category === "全部" || p.category === category) &&
      (query.trim() === "" ||
       `${p.name} ${p.subtitle ?? ""} ${p.description}`.toLowerCase()
         .includes(query.toLowerCase()))
    );
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [query, category, sort]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const handleQuickView = (product: Product) => {
    setQuickViewProduct({
      id: product.id,
      name: product.name,
      subtitle: product.subtitle,
      price: product.price,
      rating: product.rating,
      description: product.description,
      badge: product.badge,
      image: `https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?w=600&h=600&fit=crop`
    });
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Category Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                category === cat
                  ? 'bg-gradient-to-r from-[#FBBF24] to-yellow-300 text-black shadow-lg shadow-[#FBBF24]/25 transform scale-105'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700 hover:border-[#FBBF24]/50 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {items.length === 0 && (
          <div className="col-span-full text-sm text-slate-400 text-center py-8">
            沒有符合條件的商品，試試其他關鍵字或分類。
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((product) => {
            const IconComponent = product.icon;
            return (
              <div
                key={product.id}
                className="group bg-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-[#FBBF24]/50 hover:shadow-2xl hover:shadow-[#FBBF24]/10 transition-all duration-300 transform hover:scale-[1.02]"
              >
                {/* Product Image */}
                <div className="relative mb-6 overflow-hidden rounded-xl">
                  <div className="aspect-square bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-[#FBBF24]/20 flex items-center justify-center relative">
                    {/* Cosmic background effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FBBF24]/10 to-purple-600/10 rounded-xl"></div>
                    
                    {/* Rotating cosmic ring */}
                    <div className="relative z-10">
                      <div className="w-24 h-24 border border-[#FBBF24]/30 rounded-full animate-spin-slow">
                        <div className="w-full h-full border border-purple-400/20 rounded-full animate-reverse-spin flex items-center justify-center">
                          <div className="w-12 h-12 bg-gradient-to-r from-[#FBBF24] to-yellow-300 rounded-full flex items-center justify-center shadow-lg shadow-[#FBBF24]/50">
                            <IconComponent className="h-6 w-6 text-black" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Glowing particles */}
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-[#FBBF24] rounded-full animate-ping"
                        style={{
                          top: `${30 + Math.sin(i * Math.PI / 3) * 20}%`,
                          left: `${50 + Math.cos(i * Math.PI / 3) * 20}%`,
                          animationDelay: `${i * 0.3}s`
                        }}
                      />
                    ))}
                  </div>
                  
                  {product.badge && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-[#FBBF24] to-yellow-300 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      {product.badge}
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-[#FBBF24] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-400">{product.subtitle}</p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-[#FBBF24] fill-current'
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-400 ml-2">{product.rating}</span>
                  </div>

                  {/* Price */}
                  <div className="text-2xl font-bold text-[#FBBF24]">
                    NT${product.price.toLocaleString()}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-300 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={() => handleAddToCart(product)}
                     className="flex-1 bg-gradient-to-r from-[#FBBF24] to-yellow-300 hover:from-[#FBBF24]/90 hover:to-yellow-300/90 text-black font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-[#FBBF24]/25 hover:shadow-[#FBBF24]/40 transform hover:scale-105 active:scale-95"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>加入艙儲</span>
                    </button>
                    <button
                      onClick={() => handleQuickView(product)}
                      className="bg-transparent hover:bg-gray-800/50 text-gray-300 hover:text-[#FBBF24] border border-gray-600 hover:border-[#FBBF24] py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;