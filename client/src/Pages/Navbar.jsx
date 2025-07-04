import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../Styles/card.css'
import profileIcon from '/img/profile.png'
import useFetch from '../hooks/fetch'
import convertToBase64 from '../Helper/convert'
import { Shield } from 'lucide-react'

export default function Navbar() {
  const [{ isLoading, error, status, apiData }] = useFetch()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [file, setFile] = useState()
  const [profileImg, setProfileImg] = useState(profileIcon)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const dropdownRef = useRef(null)
  const mobileMenuRef = useRef(null)

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'))
    setProfileImg(file || apiData?.profile || profileIcon)

    const handleStorage = () => {
      setIsLoggedIn(!!localStorage.getItem('token'))
      setProfileImg(file || apiData?.profile || profileIcon)
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [file, apiData])

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false)
      }
    }
    if (dropdownOpen || mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [dropdownOpen, mobileMenuOpen])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    setDropdownOpen(false)
    setMobileMenuOpen(false)
    navigate('/')
  }

  const handleLogin = () => {
    setMobileMenuOpen(false)
    navigate('/username')
  }

  const handleSignUp = () => {
    setMobileMenuOpen(false)
    navigate('/register')
  }

  const handleProfile = () => {
    setDropdownOpen(false)
    setMobileMenuOpen(false)
    navigate('/profile')
  }

  const onUpload = async (ele) => {
    const uploadedImage = ele.target.files[0]
    if (uploadedImage) {
      const base64Image = await convertToBase64(uploadedImage)
      setFile(base64Image)
    }
  }

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white/60 backdrop-blur-md shadow-xl border-b border-gray-200/60">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        <Link to="/" className="flex items-center space-x-2 group select-none">
          <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 group-hover:scale-110 transition-transform" />
          <span className="text-lg sm:text-xl font-bold text-gray-900">Auth</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4 relative">
          {!isLoggedIn ? (
            <>
              <button onClick={handleLogin} className="px-6 py-2 rounded-full font-semibold text-base bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105">
                Login
              </button>
              <button onClick={handleSignUp} className="px-6 py-2 rounded-full font-semibold text-base bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 hover:border-indigo-600 hover:text-indigo-600 transition-all duration-300 transform hover:scale-105">
                Sign Up
              </button>
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                aria-label="User menu"
                onClick={() => setDropdownOpen((open) => !open)}
              >
                <img
                  src={profileImg}
                  alt="User avatar"
                  className="w-12 h-12 rounded-full border-2 border-blue-500 cursor-pointer object-cover shadow-lg hover:border-indigo-600 transition-all duration-200"
                />
              </button>
              <input
                onChange={onUpload}
                type="file"
                id="navbar-profile-upload"
                name="profile"
                accept=".jpg, .png, .jpeg"
                style={{ display: 'none' }}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl shadow-xl py-2 z-50 flex flex-col animate-fade-in">
                  <button onClick={handleProfile} className="px-4 py-2 text-left hover:bg-blue-50 w-full font-medium text-gray-700 rounded-t-xl">
                    Profile
                  </button>
                  <label htmlFor="navbar-profile-upload" className="px-4 py-2 text-left hover:bg-indigo-50 w-full font-medium text-gray-700 cursor-pointer">
                    Change Avatar
                  </label>
                  <button onClick={handleLogout} className="px-4 py-2 text-left hover:bg-red-50 w-full text-red-600 font-medium rounded-b-xl">
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            className="inline-flex items-center justify-center p-2 rounded-md text-blue-700 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            aria-label="Open menu"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div ref={mobileMenuRef} className="absolute top-full left-0 right-0 mt-2 mx-4 bg-white/95 backdrop-blur-md border border-gray-200 rounded-xl shadow-xl py-4 z-50 flex flex-col animate-fade-in md:hidden">
            {!isLoggedIn ? (
              <>
                <button onClick={handleLogin} className="mx-4 mb-2 px-6 py-3 rounded-full font-semibold text-base bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105">
                  Login
                </button>
                <button onClick={handleSignUp} className="mx-4 mb-2 px-6 py-3 rounded-full font-semibold text-base bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 hover:border-indigo-600 hover:text-indigo-600 transition-all duration-300 transform hover:scale-105">
                  Sign Up
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center gap-2 px-4">
                <img
                  src={profileImg}
                  alt="User avatar"
                  className="w-14 h-14 rounded-full border-2 border-blue-500 object-cover shadow-lg mb-2"
                />
                <button onClick={handleProfile} className="px-4 py-2 text-left hover:bg-blue-50 w-full font-medium text-gray-700 rounded-t-xl">
                  Profile
                </button>
                <label htmlFor="navbar-profile-upload-mobile" className="px-4 py-2 text-left hover:bg-indigo-50 w-full font-medium text-gray-700 cursor-pointer">
                  Change Avatar
                </label>
                <input
                  onChange={onUpload}
                  type="file"
                  id="navbar-profile-upload-mobile"
                  name="profile"
                  accept=".jpg, .png, .jpeg"
                  style={{ display: 'none' }}
                />
                <button onClick={handleLogout} className="px-4 py-2 text-left hover:bg-red-50 w-full text-red-600 font-medium rounded-b-xl">
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
} 