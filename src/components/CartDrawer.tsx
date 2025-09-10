import React from 'react';
import { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartDrawer: React.FC = () => {
  const { cartItems, isCartOpen, toggleCart, updateQuantity, removeFromCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0; // 全館免運
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    
    // 模擬結帳流程
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 顯示成功訊息
    alert('🚀 結帳成功！您的太空裝備正在準備中，預計3個工作日內送達您的太空站！');
    
    setIsCheckingOut(false);
    toggleCart(); // 關閉購物車
  };
  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={toggleCart}
      />

      {/* Cart Drawer */}
      <div className="fixed right-0 top-0 h-full w-96 bg-[#060914]/95 backdrop-blur-xl border-l border-[#FBBF24]/30 z-50 transform transition-transform duration-300 shadow-2xl shadow-black/50">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-[#FBBF24] to-yellow-300 p-2 rounded-lg shadow-lg shadow-[#FBBF24]/50">
              <ShoppingBag className="h-5 w-5 text-black" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">艙儲清單</h2>
              <p className="text-xs text-gray-400">Space Inventory</p>
            </div>
          </div>
          <button
            onClick={toggleCart}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6" style={{ height: 'calc(100vh - 200px)' }}>
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-10 w-10 text-gray-600" />
              </div>
              <p className="text-gray-400 text-lg font-medium">艙儲清單是空的</p>
              <p className="text-sm text-gray-500 mt-2">開始添加一些太空裝備吧！</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 hover:border-[#FBBF24]/30 transition-all duration-200"
                >
                  <div className="flex items-start space-x-4">
                    {/* Product Image */}
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-600/20 to-[#FBBF24]/20 rounded-lg flex items-center justify-center relative overflow-hidden">
                      {/* Cosmic background effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#FBBF24]/10 to-purple-600/10"></div>
                      
                      {/* Rotating ring */}
                      <div className="relative z-10">
                        <div className="w-10 h-10 border border-[#FBBF24]/40 rounded-full animate-spin-slow">
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="w-6 h-6 bg-gradient-to-r from-[#FBBF24] to-yellow-300 rounded-full shadow-lg shadow-[#FBBF24]/50"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="text-white font-medium text-sm mb-1">{item.name}</h3>
                      <p className="text-[#FBBF24] font-semibold">
                        NT${item.price.toLocaleString()}
                      </p>

                   <p className="text-xs text-gray-400 mt-1">
                     小計: NT${(item.price * item.quantity).toLocaleString()}
                   </p>
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3 mt-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                         className="w-8 h-8 bg-gray-700 hover:bg-[#FBBF24]/20 hover:border-[#FBBF24] border border-gray-600 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90"
                        >
                          <Minus className="h-4 w-4 text-white" />
                        </button>
                        <span className="text-white font-medium w-8 text-center bg-gray-700/50 py-1 rounded">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                         className="w-8 h-8 bg-gray-700 hover:bg-[#FBBF24]/20 hover:border-[#FBBF24] border border-gray-600 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90"
                        >
                          <Plus className="h-4 w-4 text-white" />
                        </button>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                     className="text-gray-400 hover:text-red-400 transition-colors p-2 hover:bg-red-900/20 rounded-lg active:scale-90"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-700 p-6 bg-gray-900/50">
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300">商品小計</span>
                <span className="text-white font-medium">NT${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300">運費</span>
               <span className="text-green-400 font-medium">免費 🚀</span>
              </div>
             {cartItems.length >= 3 && (
               <div className="flex items-center justify-between text-sm">
                 <span className="text-gray-300">套組優惠</span>
                 <span className="text-green-400 font-medium">-NT$980</span>
               </div>
             )}
              <div className="border-t border-gray-600 pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">小計</span>
                  <span className="text-2xl font-bold text-[#FBBF24]">
                    NT${total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full bg-gradient-to-r from-[#FBBF24] to-yellow-300 hover:from-[#FBBF24]/90 hover:to-yellow-300/90 disabled:from-gray-600 disabled:to-gray-500 text-black font-bold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-[#FBBF24]/25 hover:shadow-[#FBBF24]/40 transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:transform-none"
            >
              <CreditCard className="h-5 w-5" />
              <span>{isCheckingOut ? '處理中...' : '結帳（模擬）'}</span>
            </button>
            
            <p className="text-xs text-gray-500 text-center mt-3">
              🚀 跨越整個銀河，全館免運費
            </p>
            
            {/* 購物提示 */}
            <div className="mt-4 p-3 bg-blue-900/20 border border-blue-400/30 rounded-xl">
              <p className="text-xs text-blue-200 text-center leading-relaxed">
                💫 安全結帳保證 • 🛡️ 7天鑑賞期 • 🚀 48小時內發貨
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;