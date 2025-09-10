import React, { useState } from 'react';
import { Users, TrendingUp, DollarSign, Target, Calendar, Filter } from 'lucide-react';
import KPICard from './KPICard';
import LifecycleChart from './LifecycleChart';
import LTVChart from './LTVChart';
import CustomerSegmentation from './CustomerSegmentation';
import FunnelChart from './FunnelChart';
import RevenueProjection from './RevenueProjection';

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('6months');
  const [selectedSegment, setSelectedSegment] = useState('all');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">顧客生命週期分析</h1>
                <p className="text-sm text-gray-500">Customer Lifecycle & LTV Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-gray-400" />
                <select 
                  value={selectedTimeRange}
                  onChange={(e) => setSelectedTimeRange(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="1month">近1個月</option>
                  <option value="3months">近3個月</option>
                  <option value="6months">近6個月</option>
                  <option value="1year">近1年</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <select 
                  value={selectedSegment}
                  onChange={(e) => setSelectedSegment(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">全部客戶</option>
                  <option value="premium">高價值客戶</option>
                  <option value="regular">一般客戶</option>
                  <option value="new">新客戶</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="總客戶數"
            value="12,486"
            change="+8.2%"
            changeType="positive"
            icon={Users}
            color="blue"
          />
          <KPICard
            title="平均LTV"
            value="$2,340"
            change="+12.5%"
            changeType="positive"
            icon={DollarSign}
            color="green"
          />
          <KPICard
            title="客戶留存率"
            value="78.5%"
            change="-2.1%"
            changeType="negative"
            icon={Target}
            color="purple"
          />
          <KPICard
            title="月收益成長"
            value="$185K"
            change="+15.3%"
            changeType="positive"
            icon={TrendingUp}
            color="orange"
          />
        </div>

        {/* Main Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <LifecycleChart />
          <LTVChart />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <RevenueProjection />
          </div>
          <CustomerSegmentation />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FunnelChart />
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">客戶價值分布</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-green-800">高價值客戶 (LTV &gt; $5000)</p>
                  <p className="text-xs text-green-600">1,245 位客戶</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-900">35%</p>
                  <p className="text-xs text-green-600">總收益貢獻</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-blue-800">中價值客戶 (LTV $1000-5000)</p>
                  <p className="text-xs text-blue-600">4,832 位客戶</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-900">45%</p>
                  <p className="text-xs text-blue-600">總收益貢獻</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-800">一般客戶 (LTV &lt; $1000)</p>
                  <p className="text-xs text-gray-600">6,409 位客戶</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">20%</p>
                  <p className="text-xs text-gray-600">總收益貢獻</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;