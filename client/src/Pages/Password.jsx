import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { passwordValidate } from '../Helper/Validate'
import useFetch from '../hooks/fetch'
import { useAuthStore } from '../Helper/store'
import { login } from '../Helper/helper'
import profileIcon from '/img/profile.png'
import '../Styles/card.css'
import Navbar from './Navbar'

export default function Password() {
  const { username } = useAuthStore((state) => state.auth)
  const [{ isLoading, error, status, apiData }] = useFetch(`user/${username}`)
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: { password: '' },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async ({ password }) => {
      let loginPromise = login({ username, password })

      toast.promise(loginPromise, {
        loading: 'Validating Password...',
        success: <b>Login Successfully...!</b>,
        error: <b>Password Not Match...!</b>,
      })

      loginPromise.then((res) => {
        let { token } = res.data
        localStorage.setItem('token', token)
        navigate('/')
      })
    },
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center flex-col mt-20">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <h1 className="text-2xl font-bold text-blue-500">Loading...</h1>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center flex-col mt-20">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <h1 className="text-2xl font-bold text-red-500">Server Error</h1>
        <p>{error?.message}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto">
      <Navbar />
      <div className="pt-24">
        <Toaster position="top-center" reverseOrder={false} />

        <div className="flex justify-center items-center py-10">
          <div className="card glass w-full max-w-md mx-auto p-5">
            <div className="title flex flex-col items-center">
              <h4 className="text-4xl font-bold">
                Hello {apiData?.firstName || apiData?.username}
              </h4>
              <span className="py-4 text-lg w-2/3 text-center text-gray-500">
                Explore more by connecting with us
              </span>
            </div>

            <form onSubmit={formik.handleSubmit} className="py1">
              <div className="profile justify-center items-center">
                <img
                  src={apiData?.profile || profileIcon}
                  alt="avatar"
                  className="profile-img"
                />
              </div>

              <div className="textbox flex flex-col items-center justify-center gap-6">
                <input
                  {...formik.getFieldProps('password')}
                  className="textbox-input"
                  type="password"
                  placeholder="password"
                />
                <button className="btn" type="submit">
                  Sign In
                </button>
              </div>

              <div className="text-center py-2">
                <span>
                  Forgot Password?{' '}
                  <Link to="/recovery" className="text-red-500 link">
                    Recover Now
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
