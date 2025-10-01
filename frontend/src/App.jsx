"use client"

import { useState, useEffect } from "react"
import Sidebar from "./components/Sidebar"
import Dashboard from "./components/Dashboard"
import Projects from "./components/Projects"
import Resources from "./components/Resources"
import Documents from "./components/Documents"
import Finance from "./components/Finance"
import Reports from "./components/Reports"

import ClientDashboard from "./components/ClientDashboard"
import Login from "./components/LOGIN.JSX"


function App() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem("user")
    const token = localStorage.getItem("token")

    if (savedUser && token) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Error parsing saved user:", error)
        localStorage.removeItem("user")
        localStorage.removeItem("token")
      }
    }
    setIsLoading(false)
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    if (userData.role === "client") {
      setActiveSection("client-dashboard")
    } else {
      setActiveSection("dashboard")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setUser(null)
    setActiveSection("dashboard")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return <Login onLogin={handleLogin} />
  }

  // Client view
  if (user.role === "client") {
    return <ClientDashboard user={user} onLogout={handleLogout} />
  }

  // Admin view
  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />
      case "projects":
        return <Projects />
      case "resources":
        return <Resources />
      case "documents":
        return <Documents />
      case "finance":
        return <Finance />
      case "reports":
        return <Reports />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} user={user} onLogout={handleLogout} />
      <div className="flex-1">{renderContent()}</div>
    </div>
  )
}

export default App
