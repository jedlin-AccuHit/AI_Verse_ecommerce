import React from 'react';

const LTVChart: React.FC = () => {
  const monthlyData = [
    { month: 'Jan', ltv: 1850 },
    { month: 'Feb', ltv: 1920 },
    { month: 'Mar', ltv: 2100 },
    { month: 'Apr', ltv: 2280 },
    { month: 'May', ltv: 2340 },
    { month: 'Jun', ltv: 2450 }
  ];

  const maxLTV = Math.max(...monthlyData.map(d => d.ltv));

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">平均LTV趨勢</h3>
      
      <div className="relative h-64">
        <div className="absolute inset-0 flex items-end justify-between space-x-2">
          {monthlyData.map((item, index) => {
            const height = (item.ltv / maxLTV) * 100;
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="relative group cursor-pointer">
                  <div 
                    className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-500 hover:from-blue-700 hover:to-blue-500"
                    style={{ height: `${height * 2}px`, width: '40px' }}
                  ></div>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    ${item.ltv}
                  </div>
                </div>
                <span className="text-xs text-gray-500 mt-2">{item.month}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <p className="text-xs text-gray-500">最低LTV</p>
          <p className="text-sm font-semibold text-gray-900">$1,850</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">平均LTV</p>
          <p className="text-sm font-semibold text-gray-900">$2,157</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">最高LTV</p>
          <p className="text-sm font-semibold text-gray-900">$2,450</p>
        </div>
      </div>
    </div>
  );
};

export default LTVChart;