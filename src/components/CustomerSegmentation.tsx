import React from 'react';

const CustomerSegmentation: React.FC = () => {
  const segments = [
    { name: '冠軍客戶', count: 1245, color: 'bg-green-500', percentage: 35 },
    { name: '忠實客戶', count: 2234, color: 'bg-blue-500', percentage: 28 },
    { name: '潛力客戶', count: 1876, color: 'bg-purple-500', percentage: 22 },
    { name: '新客戶', count: 987, color: 'bg-orange-500', percentage: 15 }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">客戶分群分析</h3>
      
      <div className="relative w-48 h-48 mx-auto mb-6">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {segments.map((segment, index) => {
            let offset = 0;
            for (let i = 0; i < index; i++) {
              offset += segments[i].percentage;
            }
            const dashArray = `${segment.percentage} ${100 - segment.percentage}`;
            const dashOffset = -offset;
            
            return (
              <circle
                key={index}
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={segment.color.replace('bg-', '').includes('green') ? '#10b981' : 
                       segment.color.replace('bg-', '').includes('blue') ? '#3b82f6' :
                       segment.color.replace('bg-', '').includes('purple') ? '#8b5cf6' : '#f97316'}
                strokeWidth="8"
                strokeDasharray={dashArray}
                strokeDashoffset={dashOffset}
                className="transition-all duration-1000"
              />
            );
          })}
        </svg>
      </div>

      <div className="space-y-3">
        {segments.map((segment, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${segment.color}`}></div>
              <span className="text-sm font-medium text-gray-700">{segment.name}</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-gray-900">{segment.count}</span>
              <span className="text-xs text-gray-500 ml-1">({segment.percentage}%)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerSegmentation;