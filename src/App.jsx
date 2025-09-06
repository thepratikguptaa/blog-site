// Import React and required hooks
import React, { useEffect } from 'react'
import { useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth' // Auth service for user authentication
import { login, logout} from './store/authSlice'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true) // Loading state for user data
  const dispatch = useDispatch()

  useEffect(() => {
    // Check if user is logged in on app load
    authService.getCurrentUser().then((userData) => {
      if (userData) {
        dispatch(login({ userData })) // Set user in redux
      } else {
        dispatch(logout()) // Remove user from redux
      }
    })
    .finally(() => {
      setLoading(false) // Stop loading after check
    })
  }, [dispatch])

  // Show app only after loading user data
  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet /> {/* Renders matched child route */}
        </main>
        <Footer />
      </div>
    </div>
  ) : null // Return null while loading to avoid rendering the app before user data is fetched
}

export default App