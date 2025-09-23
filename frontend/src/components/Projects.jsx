import React, { useState } from 'react';
import { Plus, Calendar, MapPin, Users, DollarSign, X, Pencil, Trash2 } from 'lucide-react';

const Projects = () => {
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [editProject, setEditProject] = useState(null); // for editing
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Downtown Office Complex',
      description: '15-story mixed-use building with retail and office space',
      location: '123 Main St, Downtown',
      startDate: '2024-01-15',
      endDate: '2024-08-15',
      budget: 2500000,
      progress: 75,
      status: 'Active',
      manager: 'John Smith',
      workers: 25
    },
    {
      id: 2,
      name: 'Residential Tower A',
      description: '20-story residential apartment complex',
      location: '456 Oak Ave, Midtown',
      startDate: '2024-02-01',
      endDate: '2024-09-30',
      budget: 3200000,
      progress: 45,
      status: 'Active',
      manager: 'Sarah Johnson',
      workers: 32
    },
    {
      id: 3,
      name: 'Shopping Center Phase 2',
      description: 'Expansion of existing retail center',
      location: '789 Commerce Blvd, Suburbs',
      startDate: '2023-11-01',
      endDate: '2024-07-10',
      budget: 1800000,
      progress: 90,
      status: 'Active',
      manager: 'Mike Davis',
      workers: 18
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Planning': return 'bg-gray-100 text-gray-800';
      case 'Active': return 'bg-green-100 text-green-800';
      case 'On Hold': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Handle new project
  const handleNewProject = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newProject = {
      id: projects.length + 1,
      name: formData.get("name"),
      description: formData.get("description"),
      location: formData.get("location"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      budget: Number(formData.get("budget")),
      progress: 0,
      status: 'Planning',
      manager: formData.get("manager"),
      workers: Number(formData.get("workers"))
    };
    setProjects([...projects, newProject]);
    setShowNewProjectForm(false);
  };

  // Handle delete
  const handleDelete = (id) => {
    setProjects(projects.filter(p => p.id !== id));
    setSelectedProject(null);
  };

  // Handle edit save
  const handleEditSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedProject = {
      ...editProject,
      name: formData.get("name"),
      description: formData.get("description"),
      location: formData.get("location"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      budget: Number(formData.get("budget")),
      manager: formData.get("manager"),
      workers: Number(formData.get("workers"))
    };
    setProjects(projects.map(p => (p.id === editProject.id ? updatedProject : p)));
    setEditProject(null);
    setSelectedProject(updatedProject); // keep modal updated
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Projects</h1>
          <p className="text-gray-600">Manage and track your construction projects</p>
        </div>
        
        <button 
          onClick={() => setShowNewProjectForm(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Project
        </button>
      </div>

      {/* New Project Form Modal */}
      {showNewProjectForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-6">Create New Project</h2>
            <form onSubmit={handleNewProject} className="space-y-4">
              <input name="name" placeholder="Project Name" className="w-full border px-3 py-2 rounded" required />
              <input name="description" placeholder="Description" className="w-full border px-3 py-2 rounded" required />
              <input name="location" placeholder="Location" className="w-full border px-3 py-2 rounded" required />
              <input type="date" name="startDate" className="w-full border px-3 py-2 rounded" required />
              <input type="date" name="endDate" className="w-full border px-3 py-2 rounded" required />
              <input type="number" name="budget" placeholder="Budget" className="w-full border px-3 py-2 rounded" required />
              <input name="manager" placeholder="Manager" className="w-full border px-3 py-2 rounded" required />
              <input type="number" name="workers" placeholder="Workers" className="w-full border px-3 py-2 rounded" required />
              <div className="flex justify-end space-x-4 pt-4">
                <button type="button" onClick={() => setShowNewProjectForm(false)} className="px-4 py-2 text-gray-600">Cancel</button>
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Project Modal */}
      {editProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-6">Edit Project</h2>
            <form onSubmit={handleEditSave} className="space-y-4">
              <input name="name" defaultValue={editProject.name} className="w-full border px-3 py-2 rounded" required />
              <input name="description" defaultValue={editProject.description} className="w-full border px-3 py-2 rounded" required />
              <input name="location" defaultValue={editProject.location} className="w-full border px-3 py-2 rounded" required />
              <input type="date" name="startDate" defaultValue={editProject.startDate} className="w-full border px-3 py-2 rounded" required />
              <input type="date" name="endDate" defaultValue={editProject.endDate} className="w-full border px-3 py-2 rounded" required />
              <input type="number" name="budget" defaultValue={editProject.budget} className="w-full border px-3 py-2 rounded" required />
              <input name="manager" defaultValue={editProject.manager} className="w-full border px-3 py-2 rounded" required />
              <input type="number" name="workers" defaultValue={editProject.workers} className="w-full border px-3 py-2 rounded" required />
              <div className="flex justify-end space-x-4 pt-4">
                <button type="button" onClick={() => setEditProject(null)} className="px-4 py-2 text-gray-600">Cancel</button>
                <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 relative">
            <button onClick={() => setSelectedProject(null)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedProject.name}</h2>
            <p className="text-gray-600 mb-4">{selectedProject.description}</p>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-700"><MapPin className="h-4 w-4 mr-2" />{selectedProject.location}</div>
              <div className="flex items-center text-sm text-gray-700"><Calendar className="h-4 w-4 mr-2" />{new Date(selectedProject.startDate).toLocaleDateString()} - {new Date(selectedProject.endDate).toLocaleDateString()}</div>
              <div className="flex items-center text-sm text-gray-700"><Users className="h-4 w-4 mr-2" />{selectedProject.workers} workers</div>
              <div className="flex items-center text-sm text-gray-700"><DollarSign className="h-4 w-4 mr-2" />${selectedProject.budget.toLocaleString()}</div>
              <p className="text-sm text-gray-700">Manager: {selectedProject.manager}</p>
              <p className="text-sm text-gray-700">Status: {selectedProject.status}</p>
              <p className="text-sm text-gray-700">Progress: {selectedProject.progress}%</p>
            </div>
            {/* Action buttons */}
            <div className="flex justify-end space-x-4 mt-6">
              <button onClick={() => setEditProject(selectedProject)} className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                <Pencil className="h-4 w-4 mr-2" /> Edit
              </button>
              <button onClick={() => handleDelete(selectedProject.id)} className="flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                <Trash2 className="h-4 w-4 mr-2" /> Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{project.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Manager: {project.manager}</span>
                <button onClick={() => setSelectedProject(project)} className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
