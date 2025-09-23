import React, { useState } from 'react';
import { Users, Wrench, Package, Plus, Search } from 'lucide-react';

const Resources = () => {
  const [activeTab, setActiveTab] = useState('workers');
  const [searchTerm, setSearchTerm] = useState('');

  const workers = [
    { id: 1, name: 'John Martinez', role: 'Site Manager', project: 'Downtown Office Complex', status: 'Assigned', hourlyRate: 45 },
    { id: 2, name: 'Sarah Chen', role: 'Electrical Engineer', project: 'Residential Tower A', status: 'Assigned', hourlyRate: 55 },
    { id: 3, name: 'Mike Johnson', role: 'Carpenter', project: 'Shopping Center Phase 2', status: 'Assigned', hourlyRate: 32 },
    { id: 4, name: 'Lisa Rodriguez', role: 'Safety Inspector', project: 'Unassigned', status: 'Available', hourlyRate: 38 },
    { id: 5, name: 'David Kim', role: 'Heavy Equipment Operator', project: 'Unassigned', status: 'Available', hourlyRate: 42 },
  ];

  const equipment = [
    { id: 1, name: 'CAT 320 Excavator', type: 'Heavy Machinery', location: 'Downtown Site', status: 'In Use', dailyRate: 650 },
    { id: 2, name: 'Tower Crane TC-6020', type: 'Crane', location: 'Residential Tower A', status: 'In Use', dailyRate: 1200 },
    { id: 3, name: 'Concrete Mixer Truck', type: 'Transport', location: 'Equipment Yard', status: 'Available', dailyRate: 450 },
    { id: 4, name: 'Scissor Lift JLG-2630ES', type: 'Lift Equipment', location: 'Shopping Center', status: 'Maintenance', dailyRate: 180 },
    { id: 5, name: 'Bulldozer D6T', type: 'Heavy Machinery', location: 'Equipment Yard', status: 'Available', dailyRate: 800 },
  ];

  const materials = [
    { id: 1, name: 'Portland Cement', category: 'Concrete', quantity: 500, unit: 'bags', cost: 12.50, supplier: 'BuildCorp Supplies' },
    { id: 2, name: 'Rebar Grade 60', category: 'Steel', quantity: 2000, unit: 'lbs', cost: 0.65, supplier: 'Steel Solutions Inc' },
    { id: 3, name: 'Plywood Sheets 4x8', category: 'Wood', quantity: 150, unit: 'sheets', cost: 45.00, supplier: 'Timber Mart' },
    { id: 4, name: 'Electrical Wire 12 AWG', category: 'Electrical', quantity: 1000, unit: 'feet', cost: 1.25, supplier: 'ElectroSupply Co' },
    { id: 5, name: 'Insulation Fiberglass', category: 'Insulation', quantity: 200, unit: 'rolls', cost: 28.00, supplier: 'Insulation Plus' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Assigned': case 'In Use': return 'bg-blue-100 text-blue-800';
      case 'Off Duty': case 'Maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const tabs = [
    { id: 'workers', label: 'Workers', icon: Users, count: workers.length },
    { id: 'equipment', label: 'Equipment', icon: Wrench, count: equipment.length },
    { id: 'materials', label: 'Materials', icon: Package, count: materials.length },
  ];

  const renderWorkers = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hourly Rate</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {workers.map((worker) => (
            <tr key={worker.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-gray-900">{worker.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{worker.role}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{worker.project}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(worker.status)}`}>
                  {worker.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${worker.hourlyRate}/hr</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderEquipment = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Equipment</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Daily Rate</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {equipment.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-gray-900">{item.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.type}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.location}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.dailyRate}/day</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderMaterials = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Cost</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {materials.map((material) => (
            <tr key={material.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-gray-900">{material.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{material.category}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {material.quantity} {material.unit}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${material.cost.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{material.supplier}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'workers': return renderWorkers();
      case 'equipment': return renderEquipment();
      case 'materials': return renderMaterials();
      default: return renderWorkers();
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Resources</h1>
          <p className="text-gray-600">Manage workers, equipment, and materials</p>
        </div>
        
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center">
          <Plus className="h-5 w-5 mr-2" />
          Add Resource
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {tab.label}
                <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full md:w-96 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  );
};

export default Resources;