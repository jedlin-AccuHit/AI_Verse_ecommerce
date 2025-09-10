import React from 'react';

const LifecycleChart: React.FC = () => {
  const data = [
    { stage: '新客戶', count: 2846, percentage: 23, color: 'bg-blue-500' },
    { stage: '活躍客戶', count: 5234, percentage: 42, color: 'bg-green-500' },
    { stage: '沉睡客戶', count: 2891, percentage: 23, color: 'bg-yellow-500' },
    { stage: '流失客戶', count: 1515, percentage: 12, color: 'bg-red-500' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">顧客生命週期分布</h3>
      
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">{item.stage}</span>
              <div className="text-right">
                <span className="text-sm font-bold text-gray-900">{item.count.toLocaleString()}</span>
                <span className="text-xs text-gray-500 ml-2">({item.percentage}%)</span>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full ${item.color} transition-all duration-1000 ease-out`}
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          * 基於過去6個月的客戶行為數據分析
        </p>
      </div>
    </div>
  );
};

export default LifecycleChart;