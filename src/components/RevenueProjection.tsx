import React from 'react';

const RevenueProjection: React.FC = () => {
  const projectionData = [
    { month: 'Jan', actual: 125000, projected: null },
    { month: 'Feb', actual: 138000, projected: null },
    { month: 'Mar', actual: 152000, projected: null },
    { month: 'Apr', actual: 145000, projected: null },
    { month: 'May', actual: 168000, projected: null },
    { month: 'Jun', actual: 185000, projected: null },
    { month: 'Jul', actual: null, projected: 195000 },
    { month: 'Aug', actual: null, projected: 210000 },
    { month: 'Sep', actual: null, projected: 225000 },
    { month: 'Oct', actual: null, projected: 240000 },
    { month: 'Nov', actual: null, projected: 258000 },
    { month: 'Dec', actual: null, projected: 275000 }
  ];

  const maxValue = Math.max(...projectionData.map(d => d.actual || d.projected || 0));

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">收益預測分析</h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-gray-600">實際收益</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-600">預測收益</span>
          </div>
        </div>
      </div>
      
      <div className="relative h-64">
        <div className="absolute inset-0 flex items-end justify-between">
          {projectionData.map((item, index) => {
            const value = item.actual || item.projected || 0;
            const height = (value / maxValue) * 100;
            const isProjected = item.projected !== null;
            
            return (
              <div key={index} className="flex-1 flex flex-col items-center mx-1">
                <div className="relative group cursor-pointer">
                  <div 
                    className={`${isProjected ? 'bg-gradient-to-t from-green-600 to-green-400' : 'bg-gradient-to-t from-blue-600 to-blue-400'} rounded-t transition-all duration-500`}
                    style={{ height: `${height * 1.8}px`, width: '20px' }}
                  ></div>
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    ${(value / 1000).toFixed(0)}K
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
          <p className="text-xs text-gray-500">本月實際</p>
          <p className="text-sm font-semibold text-blue-600">$185K</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">下月預測</p>
          <p className="text-sm font-semibold text-green-600">$195K</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">年度目標</p>
          <p className="text-sm font-semibold text-gray-900">$2.8M</p>
        </div>
      </div>
    </div>
  );
};

export default RevenueProjection;