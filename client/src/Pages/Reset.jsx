import React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import { resetPasswordValidation } from '../Helper/Validate'
import { resetPassword } from '../Helper/helper'
import { useAuthStore } from '../Helper/store'
import { Navigate, useNavigate } from 'react-router-dom'
import '../Styles/card.css'
import useFetch from '../hooks/fetch'
import Navbar from './Navbar'

export default function Password() {
  const { username } = useAuthStore((state) => state.auth)
  const [{ isLoading, error, status }] = useFetch('create-reset-session')
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      password: '',
      confirm_password: '',
    },

    validate: resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async ({ password }) => {
      const resetPromise = resetPassword({ username, password })
      toast.promise(resetPromise, {
        loading: 'Resetting the Password...',
        success: <b>Password Reset Successfully...!</b>,
        error: <b>Could not reset the password...!</b>,
      })
      resetPromise.then(() => {
        navigate('/password')
      })
    },
  })

  if (status && status !== 201) {
    return <Navigate to={'/username'} replace={true}></Navigate>
  }

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
        <Toaster position="top-center" reverseOrder={false}></Toaster>

        <div className="flex justify-center items-center h-screen">
          <div className="glass w-full max-w-md mx-auto p-5">
            <div className="title flex flex-col items-center">
              <h4 className="text-4xl font-bold">Reset</h4>
              <span className="py-2 text-lg w-2/3 text-center text-gray-500">
                Enter new password.
              </span>
            </div>

            <form className="py-20" onSubmit={formik.handleSubmit}>
              <div className="textbox flex flex-col items-center gap-6">
                <input
                  {...formik.getFieldProps('password')}
                  className="textbox-input"
                  type="password"
                  placeholder="New Password"
                />
                <input
                  {...formik.getFieldProps('confirm_password')}
                  className="textbox-input"
                  type="password"
                  placeholder="Confirm Password"
                />
                <button className="btn" type="submit">
                  Reset
                </button>
                <span className="text-red-500">
                  Don't refresh or leave the Page.
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
