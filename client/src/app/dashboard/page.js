import React from 'react'
import ProtectedRoute from '../ProtectedRoute'

const page = () => {
  return (
    <ProtectedRoute>This is my Dashboad page.</ProtectedRoute>
  )
}

export default page