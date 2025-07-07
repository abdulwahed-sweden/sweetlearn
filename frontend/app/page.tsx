// app/page.tsx - Professional Clean Design
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Server, 
  Users, 
  BookOpen, 
  Star, 
  CheckCircle, 
  XCircle, 
  Loader2, 
  User, 
  Mail, 
  Lock,
  Activity,
  Database,
  Globe,
  Code2
} from "lucide-react"

export default function Home() {
  const [backendStatus, setBackendStatus] = useState<string>("Checking...")
  const [users, setUsers] = useState<any[]>([])
  const [newUser, setNewUser] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  // Check Backend Connection
  useEffect(() => {
    checkBackendConnection()
  }, [])

  const checkBackendConnection = async () => {
    try {
      const response = await fetch('http://localhost:8080/health')
      if (response.ok) {
        setBackendStatus("Connected")
      } else {
        setBackendStatus("Error")
      }
    } catch (error) {
      setBackendStatus("Offline")
    }
  }

  // Fetch Users
  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:8080/api/users')
      if (response.ok) {
        const data = await response.json()
        setUsers(data)
        setMessage("Users loaded successfully")
      } else {
        setMessage("Failed to fetch users")
      }
    } catch (error) {
      setMessage("Connection error")
    } finally {
      setLoading(false)
    }
  }

  // Register User
  const registerUser = async () => {
    if (!newUser.email || !newUser.password) {
      setMessage("Please fill all fields")
      return
    }

    try {
      setLoading(true)
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser)
      })

      if (response.ok) {
        const data = await response.json()
        setMessage("User registered successfully!")
        setNewUser({ email: "", password: "" })
        fetchUsers() // Refresh user list
      } else {
        const error = await response.text()
        setMessage(`Registration failed: ${error}`)
      }
    } catch (error) {
      setMessage("Connection error during registration")
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = () => {
    if (backendStatus === "Connected") return <CheckCircle className="h-4 w-4 text-green-500" />
    if (backendStatus === "Checking...") return <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
    return <XCircle className="h-4 w-4 text-red-500" />
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookOpen className="h-10 w-10 text-gray-800" />
              <h1 className="text-3xl font-semibold text-gray-900">
                SweetLearn Platform
              </h1>
            </div>
            <p className="text-gray-600">Simple Frontend + Rust Backend Connection</p>
          </div>
          
          <div className="flex justify-center">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${backendStatus === "Connected" ? 'bg-green-50 text-green-800' : backendStatus === "Checking..." ? 'bg-gray-50 text-gray-800' : 'bg-red-50 text-red-800'} border ${backendStatus === "Connected" ? 'border-green-200' : backendStatus === "Checking..." ? 'border-gray-200' : 'border-red-200'}`}>
              {getStatusIcon()}
              <span className="font-medium">Backend: {backendStatus}</span>
            </div>
          </div>
        </div>

        {/* Message Alert */}
        {message && (
          <Alert className={`rounded-lg border ${message.includes("success") ? "border-green-200 bg-green-50 text-green-800" : "border-red-200 bg-red-50 text-red-800"}`}>
            <Activity className="h-4 w-4" />
            <AlertDescription className="font-medium">{message}</AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Courses</CardTitle>
              <div className="p-2 bg-gray-100 rounded-lg">
                <BookOpen className="h-5 w-5 text-gray-700" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">24</div>
              <p className="text-xs text-gray-500">Available courses</p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Students</CardTitle>
              <div className="p-2 bg-gray-100 rounded-lg">
                <Users className="h-5 w-5 text-gray-700" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">1,247</div>
              <p className="text-xs text-gray-500">Registered students</p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Rating</CardTitle>
              <div className="p-2 bg-gray-100 rounded-lg">
                <Star className="h-5 w-5 text-gray-700" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">4.8</div>
              <p className="text-xs text-gray-500">Out of 5 stars</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="shadow-sm border border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <Server className="h-5 w-5 text-gray-700" />
              Quick Actions
            </CardTitle>
            <CardDescription className="text-gray-600">Test your backend connection</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-3">
            <Button 
              onClick={checkBackendConnection} 
              variant="outline" 
              className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              <Activity className="h-4 w-4" />
              Check Backend
            </Button>
            <Button 
              onClick={fetchUsers} 
              disabled={loading} 
              className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Database className="h-4 w-4" />}
              {loading ? "Loading..." : "Fetch Users"}
            </Button>
          </CardContent>
        </Card>

        {/* User Registration */}
        <Card className="shadow-sm border border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <User className="h-5 w-5 text-gray-700" />
              Register New User
            </CardTitle>
            <CardDescription className="text-gray-600">Test user registration endpoint</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
                <Mail className="h-4 w-4 text-gray-500" />
                Email
              </label>
              <Input
                type="email"
                placeholder="user@example.com"
                value={newUser.email}
                onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                className="border border-gray-300 focus:border-gray-400 focus-visible:ring-0"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2 text-gray-700">
                <Lock className="h-4 w-4 text-gray-500" />
                Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={newUser.password}
                onChange={(e) => setNewUser(prev => ({ ...prev, password: e.target.value }))}
                className="border border-gray-300 focus:border-gray-400 focus-visible:ring-0"
              />
            </div>
            <Button 
              onClick={registerUser} 
              disabled={loading} 
              className="w-full flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <User className="h-4 w-4" />}
              {loading ? "Registering..." : "Register User"}
            </Button>
          </CardContent>
        </Card>

        {/* Users List */}
        {users.length > 0 && (
          <Card className="shadow-sm border border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Users className="h-5 w-5 text-gray-700" />
                Registered Users ({users.length})
              </CardTitle>
              <CardDescription className="text-gray-600">Users from backend database</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {users.map((user, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <User className="h-4 w-4 text-gray-500" />
                      <div>
                        <div className="font-medium text-gray-900">{user.email || user.username || `User ${index + 1}`}</div>
                        <div className="text-sm text-gray-500">ID: {user.id}</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(user.created_at || Date.now()).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* API Info */}
        <Card className="shadow-sm border border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <Globe className="h-5 w-5 text-gray-700" />
              API Endpoints
            </CardTitle>
            <CardDescription className="text-gray-600">Available backend endpoints</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-3 font-mono text-sm p-2 bg-gray-50 rounded">
                <div className="px-2 py-1 bg-gray-200 rounded text-xs">GET</div>
                <Code2 className="h-4 w-4 text-gray-500" />
                <code className="text-gray-900">/health</code>
                <span className="text-gray-500">Health check</span>
              </div>
              <div className="flex items-center gap-3 font-mono text-sm p-2 bg-gray-50 rounded">
                <div className="px-2 py-1 bg-gray-200 rounded text-xs">GET</div>
                <Code2 className="h-4 w-4 text-gray-500" />
                <code className="text-gray-900">/api/users</code>
                <span className="text-gray-500">Get all users</span>
              </div>
              <div className="flex items-center gap-3 font-mono text-sm p-2 bg-gray-50 rounded">
                <div className="px-2 py-1 bg-gray-200 rounded text-xs">POST</div>
                <Code2 className="h-4 w-4 text-gray-500" />
                <code className="text-gray-900">/api/register</code>
                <span className="text-gray-500">Register user</span>
              </div>
              <div className="flex items-center gap-3 font-mono text-sm p-2 bg-gray-50 rounded">
                <div className="px-2 py-1 bg-gray-200 rounded text-xs">POST</div>
                <Code2 className="h-4 w-4 text-gray-500" />
                <code className="text-gray-900">/api/login</code>
                <span className="text-gray-500">Login user</span>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}