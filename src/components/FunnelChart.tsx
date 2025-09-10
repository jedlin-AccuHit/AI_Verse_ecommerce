import React from 'react';

const FunnelChart: React.FC = () => {
  const funnelData = [
    { stage: '訪客', count: 50000, percentage: 100, color: 'bg-blue-500' },
    { stage: '註冊用戶', count: 15000, percentage: 30, color: 'bg-green-500' },
    { stage: '首次購買', count: 7500, percentage: 15, color: 'bg-yellow-500' },
    { stage: '重複購買', count: 3750, percentage: 7.5, color: 'bg-orange-500' },
    { stage: '忠實客戶', count: 1875, percentage: 3.75, color: 'bg-red-500' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">客戶轉換漏斗</h3>
      
      <div className="space-y-3">
        {funnelData.map((item, index) => (
          <div key={index} className="relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">{item.stage}</span>
              <div className="text-right">
                <span className="text-sm font-bold text-gray-900">{item.count.toLocaleString()}</span>
                <span className="text-xs text-gray-500 ml-2">({item.percentage}%)</span>
              </div>
            </div>
            
            <div className="relative">
              <div 
                className={`${item.color} rounded transition-all duration-1000 ease-out`}
                style={{ 
                  width: `${item.percentage * 3}%`,
                  height: '24px',
                  clipPath: index === 0 ? 'none' : `polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%, 8px 50%)`
                }}
              ></div>
              
              {index < funnelData.length - 1 && (
                <div className="absolute top-6 left-0 text-xs text-red-500 font-medium">
                  -{((funnelData[index].count - funnelData[index + 1].count) / funnelData[index].count * 100).toFixed(1)}% 流失
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-xs text-gray-500">整體轉換率</p>
            <p className="text-lg font-bold text-gray-900">3.75%</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">平均客獲成本</p>
            <p className="text-lg font-bold text-gray-900">$125</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FunnelChart;