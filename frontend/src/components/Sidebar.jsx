import React from 'react';
import { 
  BarChart3, 
  Building2, 
  Users, 
  FileText, 
  DollarSign, 
  ClipboardList,
  HardHat
} from 'lucide-react';

const Sidebar = ({ activeView, onViewChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'projects', label: 'Projects', icon: Building2 },
    { id: 'resources', label: 'Resources', icon: Users },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'finance', label: 'Finance', icon: DollarSign },
    { id: 'reports', label: 'Reports', icon: ClipboardList },
  ];

  return (
    <div className="w-64 bg-blue-900 text-white p-6">
      <div className="flex items-center mb-8">
        <HardHat className="h-8 w-8 mr-3 text-yellow-400" />
        <h1 className="text-xl font-bold">WorksiteX</h1>
      </div>
      
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                    activeView === item.id
                      ? 'bg-blue-800 text-yellow-400'
                      : 'text-blue-100 hover:bg-blue-800 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;