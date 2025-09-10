import React, { useState } from 'react';
import { Rocket, User, Calendar } from 'lucide-react';

interface LoginGateProps {
  onLogin: (profile: {gender: string, birthDate: string}) => void;
}

const LoginGate: React.FC<LoginGateProps> = ({ onLogin }) => {
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (gender && birthDate) {
      onLogin({ gender, birthDate });
    }
  };

  return (
    <div className="min-h-screen bg-[#060914] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Starfield Background */}
      <div className="fixed inset-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-blue-900/30"></div>
        {[...Array(150)].map((_, i) => (
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
        {/* Glowing particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={`glow-${i}`}
            className="absolute w-2 h-2 bg-[#FBBF24] rounded-full animate-pulse opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              boxShadow: '0 0 15px #FBBF24'
            }}
          />
        ))}
      </div>

      {/* Floating cosmic rings */}
      <div className="absolute top-20 left-20 w-32 h-32 border border-[#FBBF24]/20 rounded-full animate-spin-slow"></div>
      <div className="absolute bottom-32 right-32 w-24 h-24 border border-purple-400/20 rounded-full animate-reverse-spin"></div>
      <div className="absolute top-1/2 right-20 w-16 h-16 border border-blue-400/30 rounded-full animate-pulse"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-gray-900/60 backdrop-blur-xl border border-[#FBBF24]/30 rounded-3xl p-8 shadow-2xl shadow-[#FBBF24]/10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-[#FBBF24] to-yellow-300 p-3 rounded-xl shadow-lg shadow-[#FBBF24]/50">
                <Rocket className="h-8 w-8 text-black" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  <span className="text-white">COSMO</span>
                  <span className="text-[#FBBF24]">SHOP</span>
                </div>
                <div className="text-xs text-gray-400 font-medium">Space Adventure</div>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">太空旅人登入</h1>
            <p className="text-gray-300 text-sm">準備開始您的宇宙冒險之旅</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Gender Field */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-300">
                <User className="h-4 w-4 text-[#FBBF24]" />
                <span>性別</span>
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FBBF24] focus:border-transparent transition-all"
                required
              >
                <option value="">請選擇性別</option>
                <option value="男">男</option>
                <option value="女">女</option>
              </select>
            </div>

            {/* Birth Date Field */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-300">
                <Calendar className="h-4 w-4 text-[#FBBF24]" />
                <span>出生日期</span>
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FBBF24] focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!gender || !birthDate}
              className="w-full bg-gradient-to-r from-[#FBBF24] to-yellow-300 hover:from-[#FBBF24]/90 hover:to-yellow-300/90 disabled:from-gray-600 disabled:to-gray-500 disabled:cursor-not-allowed text-black font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-[#FBBF24]/25 hover:shadow-[#FBBF24]/40 transform hover:scale-[1.02] disabled:transform-none"
            >
              進入太空電商
            </button>
          </form>

          {/* Privacy Note */}
          <div className="mt-6 p-4 bg-blue-900/20 border border-blue-400/30 rounded-xl">
            <p className="text-xs text-blue-200 text-center leading-relaxed">
              🔒 僅用於本地體驗，資料儲存在你的瀏覽器
              <br />
              我們重視您的隱私，不會收集任何個人資料
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-[#FBBF24]/10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"></div>
      </div>
    </div>
  );
};

export default LoginGate;