"use client"

import { useState } from "react"
import { Upload, Download, Eye, Folder, Search, Filter } from "lucide-react"

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Foundation_Blueprint_v3.pdf",
      type: "drawing",
      size: "2.4 MB",
      uploadDate: "2024-01-15",
      project: "Downtown Office Complex",
      uploadedBy: "John Smith",
    },
    {
      id: 2,
      name: "Construction_Contract_2024.pdf",
      type: "contract",
      size: "1.8 MB",
      uploadDate: "2024-01-10",
      project: "Downtown Office Complex",
      uploadedBy: "Legal Team",
    },
    {
      id: 3,
      name: "Building_Permit_RES001.pdf",
      type: "permit",
      size: "0.5 MB",
      uploadDate: "2024-02-01",
      project: "Residential Tower A",
      uploadedBy: "Sarah Johnson",
    },
    {
      id: 4,
      name: "Site_Safety_Report_Q1.pdf",
      type: "report",
      size: "3.2 MB",
      uploadDate: "2024-03-01",
      project: "Shopping Center Phase 2",
      uploadedBy: "Mike Davis",
    },
    {
      id: 5,
      name: "Electrical_Schematic_Floor1-5.dwg",
      type: "drawing",
      size: "5.1 MB",
      uploadDate: "2024-02-15",
      project: "Residential Tower A",
      uploadedBy: "Sarah Chen",
    },
    {
      id: 6,
      name: "Material_Specifications.docx",
      type: "other",
      size: "0.8 MB",
      uploadDate: "2024-01-20",
      project: "Downtown Office Complex",
      uploadedBy: "Procurement",
    },
  ])

  const documentTypes = [
    { value: "all", label: "All Documents", count: documents.length },
    { value: "drawing", label: "Drawings", count: documents.filter((d) => d.type === "drawing").length },
    { value: "contract", label: "Contracts", count: documents.filter((d) => d.type === "contract").length },
    { value: "permit", label: "Permits", count: documents.filter((d) => d.type === "permit").length },
    { value: "report", label: "Reports", count: documents.filter((d) => d.type === "report").length },
    { value: "other", label: "Other", count: documents.filter((d) => d.type === "other").length },
  ]

  const getTypeIcon = (type) => {
    switch (type) {
      case "drawing":
        return "📐"
      case "contract":
        return "📋"
      case "permit":
        return "🏛️"
      case "report":
        return "📊"
      default:
        return "📄"
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case "drawing":
        return "bg-blue-100 text-blue-800"
      case "contract":
        return "bg-green-100 text-green-800"
      case "permit":
        return "bg-purple-100 text-purple-800"
      case "report":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleUploadDocument = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const newDocument = {
      id: documents.length + 1,
      name: formData.get("name"),
      type: formData.get("type"),
      size: "1.2 MB", // Mock size
      uploadDate: new Date().toISOString().split("T")[0],
      project: formData.get("project"),
      uploadedBy: "Current User",
    }
    setDocuments([...documents, newDocument])
    setShowUploadModal(false)
  }

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.project.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || doc.type === selectedType
    return matchesSearch && matchesType
  })

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Documents</h1>
          <p className="text-gray-600">Store and manage project documents, drawings, and contracts</p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
        >
          <Upload className="h-5 w-5 mr-2" />
          Upload Document
        </button>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-6">Upload Document</h2>
            <form onSubmit={handleUploadDocument} className="space-y-4">
              <input name="name" placeholder="Document Name" className="w-full border px-3 py-2 rounded" required />
              <select name="type" className="w-full border px-3 py-2 rounded" required>
                <option value="">Select Type</option>
                <option value="drawing">Drawing</option>
                <option value="contract">Contract</option>
                <option value="permit">Permit</option>
                <option value="report">Report</option>
                <option value="other">Other</option>
              </select>
              <input name="project" placeholder="Project Name" className="w-full border px-3 py-2 rounded" required />
              <input type="file" name="file" className="w-full border px-3 py-2 rounded" required />
              <div className="flex justify-end space-x-4 pt-4">
                <button type="button" onClick={() => setShowUploadModal(false)} className="px-4 py-2 text-gray-600">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Types</h3>

            <div className="space-y-2">
              {documentTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setSelectedType(type.value)}
                  className={`w-full text-left p-3 rounded-lg transition-colors flex items-center justify-between ${
                    selectedType === type.value
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span>{type.label}</span>
                  <span className="text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{type.count}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Search and Filters */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>
          </div>

          {/* Documents Grid */}
          <div className="space-y-4">
            {filteredDocuments.map((doc) => (
              <div key={doc.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{getTypeIcon(doc.type)}</div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{doc.name}</h3>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(doc.type)}`}>
                          {doc.type.charAt(0).toUpperCase() + doc.type.slice(1)}
                        </span>
                        <span className="text-sm text-gray-500">{doc.size}</span>
                        <span className="text-sm text-gray-500">
                          Uploaded {new Date(doc.uploadDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="mt-2">
                        <span className="text-sm text-gray-600">
                          Project: <span className="font-medium">{doc.project}</span>
                        </span>
                        <span className="text-sm text-gray-600 ml-4">
                          By: <span className="font-medium">{doc.uploadedBy}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Eye className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Download className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredDocuments.length === 0 && (
            <div className="text-center py-12">
              <Folder className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
              <p className="text-gray-600">Try adjusting your search terms or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Documents
