import React from 'react';
import { 
  Building2, 
  Users, 
  DollarSign, 
  AlertTriangle,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { label: 'Active Projects', value: '12', icon: Building2, color: 'bg-blue-500' },
    { label: 'Total Workers', value: '148', icon: Users, color: 'bg-green-500' },
    { label: 'Monthly Budget', value: '$2.4M', icon: DollarSign, color: 'bg-purple-500' },
    { label: 'Safety Incidents', value: '3', icon: AlertTriangle, color: 'bg-red-500' },
  ];

  const recentProjects = [
    { id: 1, name: 'Downtown Office Complex', progress: 75, status: 'On Track', dueDate: '2024-08-15' },
    { id: 2, name: 'Residential Tower A', progress: 45, status: 'Delayed', dueDate: '2024-09-30' },
    { id: 3, name: 'Shopping Center Phase 2', progress: 90, status: 'On Track', dueDate: '2024-07-10' },
    { id: 4, name: 'Highway Bridge Repair', progress: 60, status: 'On Track', dueDate: '2024-08-25' },
  ];

  const getStatusIcon = (status) => {
    return status === 'On Track' ? CheckCircle2 : XCircle;
  };

  const getStatusColor = (status) => {
    return status === 'On Track' ? 'text-green-500' : 'text-red-500';
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your projects.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map(({ label, value, icon: Icon, color }, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className={`${color} p-3 rounded-lg`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">{label}</p>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Project Status */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Projects</h2>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {recentProjects.map(({ id, name, progress, status, dueDate }) => {
              const StatusIcon = getStatusIcon(status);
              return (
                <div key={id} className="border-b border-gray-200 pb-4 last:border-b-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{name}</h3>
                    <div className="flex items-center">
                      <StatusIcon className={`h-4 w-4 mr-1 ${getStatusColor(status)}`} />
                      <span className={`text-sm ${getStatusColor(status)}`}>
                        {status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex-1 mr-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-500">{progress}% complete</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {new Date(dueDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'New Project', icon: Building2, color: 'blue' },
              { label: 'Add Worker', icon: Users, color: 'green' },
              { label: 'Track Expense', icon: DollarSign, color: 'purple' },
              { label: 'Safety Report', icon: AlertTriangle, color: 'orange' },
            ].map(({ label, icon: Icon, color }) => (
              <button key={label} className={`p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-${color}-500 hover:bg-${color}-50 transition-colors`}>
                <Icon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-700">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
