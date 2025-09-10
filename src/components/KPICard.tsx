import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: LucideIcon;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

const KPICard: React.FC<KPICardProps> = ({ title, value, change, changeType, icon: Icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-500 text-blue-50',
    green: 'bg-green-500 text-green-50',
    purple: 'bg-purple-500 text-purple-50',
    orange: 'bg-orange-500 text-orange-50'
  };

  const changeColorClasses = changeType === 'positive' 
    ? 'text-green-600 bg-green-50' 
    : 'text-red-600 bg-red-50';

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${changeColorClasses}`}>
          {change}
        </div>
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
        <p className="text-sm text-gray-600">{title}</p>
      </div>
    </div>
  );
};

export default KPICard;