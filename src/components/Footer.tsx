import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8 bg-gray-900/20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          {/* Copyright */}
          <div className="text-gray-400 text-sm">
            © 2025 COSMOSHOP — 太空冒險電商體驗
          </div>

          {/* Links */}
          <div className="flex items-center space-x-6 text-sm">
            <a
              href="#"
              className="text-gray-400 hover:text-[#FBBF24] transition-colors duration-200 hover:underline"
            >
              運送政策
            </a>
            <span className="text-gray-600">｜</span>
            <a
              href="#"
              className="text-gray-400 hover:text-[#FBBF24] transition-colors duration-200 hover:underline"
            >
              退換貨
            </a>
            <span className="text-gray-600">｜</span>
            <a
              href="#"
              className="text-gray-400 hover:text-[#FBBF24] transition-colors duration-200 hover:underline"
            >
              聯絡我們
            </a>
          </div>
        </div>

        {/* Additional Footer Content */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-xs text-gray-500 leading-relaxed">
            🚀 探索無限宇宙，發現未知可能 • 🌟 每一件商品都經過嚴格的太空環境測試 • 🛡️ 提供銀河系最完善的售後服務
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;