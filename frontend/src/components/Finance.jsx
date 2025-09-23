import React, { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, CreditCard, Receipt, AlertCircle } from 'lucide-react';

const Finance = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const transactions = [
    { id: 1, type: 'expense', description: 'Cement and Concrete Materials', amount: -25000, category: 'Materials', date: '2024-01-15', project: 'Downtown Office Complex' },
    { id: 2, type: 'income', description: 'Phase 1 Payment', amount: 150000, category: 'Payment', date: '2024-01-10', project: 'Downtown Office Complex' },
    { id: 3, type: 'expense', description: 'Equipment Rental - Excavator', amount: -8500, category: 'Equipment', date: '2024-01-12', project: 'Residential Tower A' },
    { id: 4, type: 'expense', description: 'Worker Wages - Week 3', amount: -32000, category: 'Labor', date: '2024-01-20', project: 'Shopping Center Phase 2' },
    { id: 5, type: 'income', description: 'Milestone Payment', amount: 75000, category: 'Payment', date: '2024-01-25', project: 'Residential Tower A' },
  ];

  const projects = [
    { name: 'Downtown Office Complex', budget: 2500000, spent: 1875000, remaining: 625000 },
    { name: 'Residential Tower A', budget: 3200000, spent: 1440000, remaining: 1760000 },
    { name: 'Shopping Center Phase 2', budget: 1800000, spent: 1620000, remaining: 180000 },
  ];

  const totalBudget = projects.reduce((sum, project) => sum + project.budget, 0);
  const totalSpent = projects.reduce((sum, project) => sum + project.spent, 0);
  const totalRemaining = projects.reduce((sum, project) => sum + project.remaining, 0);

  const monthlyIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const monthlyExpenses = Math.abs(transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0));

  const stats = [
    { 
      label: 'Total Budget', 
      value: `$${(totalBudget / 1000000).toFixed(1)}M`, 
      icon: DollarSign, 
      color: 'bg-blue-500',
      change: '+5.2%'
    },
    { 
      label: 'Total Spent', 
      value: `$${(totalSpent / 1000000).toFixed(1)}M`, 
      icon: TrendingDown, 
      color: 'bg-red-500',
      change: '+12.3%'
    },
    { 
      label: 'Remaining', 
      value: `$${(totalRemaining / 1000000).toFixed(1)}M`, 
      icon: TrendingUp, 
      color: 'bg-green-500',
      change: '-8.1%'
    },
    { 
      label: 'Monthly Expenses', 
      value: `$${(monthlyExpenses / 1000).toFixed(0)}K`, 
      icon: Receipt, 
      color: 'bg-orange-500',
      change: '+3.7%'
    },
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className={`text-sm mt-2 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Project Budgets */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Project Budgets</h2>
        
        <div className="space-y-6">
          {projects.map((project, index) => {
            const progressPercentage = (project.spent / project.budget) * 100;
            const isOverBudget = progressPercentage > 90;
            
            return (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium text-gray-900">{project.name}</h3>
                  {isOverBudget && (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Budget</p>
                    <p className="font-semibold text-gray-900">${project.budget.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Spent</p>
                    <p className="font-semibold text-gray-900">${project.spent.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Remaining</p>
                    <p className={`font-semibold ${project.remaining < project.budget * 0.1 ? 'text-red-600' : 'text-green-600'}`}>
                      ${project.remaining.toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${isOverBudget ? 'bg-red-500' : 'bg-blue-600'}`}
                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {progressPercentage.toFixed(1)}% of budget used
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderTransactions = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {transaction.type === 'income' ? (
                      <TrendingUp className="h-5 w-5 text-green-500 mr-3" />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-red-500 mr-3" />
                    )}
                    <div className="font-medium text-gray-900">{transaction.description}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                    {transaction.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.project}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(transaction.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <span className={transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}>
                    {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'transactions', label: 'Transactions' },
    { id: 'budgets', label: 'Budgets' },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Finance</h1>
          <p className="text-gray-600">Track budgets, expenses, and project financial health</p>
        </div>
        
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center">
          <CreditCard className="h-5 w-5 mr-2" />
          Add Transaction
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'transactions' && renderTransactions()}
      {activeTab === 'budgets' && renderOverview()}
    </div>
  );
};

export default Finance;