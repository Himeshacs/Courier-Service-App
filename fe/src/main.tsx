import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import { getShipmentByID, getShipments } from './backend/api'
import Register from './components/Register'
import Login from './components/Login'
import Shipment from './components/Shipment'
import NotFound from './components/NotFound'
import ErrorPage from './components/ErrorPage'
import AuthProvider from './context/AuthProvider'
import ProfilePage from './components/ProfilePage'
import CreateShipment from './components/CreateShipment'
import SearchProvider from './context/SearchProvider'
import ShipmentStatusPage from './components/Track'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Navbar />
        <Outlet />
      </>
    ),

    children: [
      { path: '', element: <Dashboard />, loader: getShipments },
      { path: '/register', element: <Register /> },
      { path: '/login', element: <Login /> },
      { path: '/shipment/:id', element: <Shipment />, loader: ({ params }) => getShipmentByID(params.id), errorElement: <ErrorPage /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/write", element: <CreateShipment /> },
      { path: "/track", element: <ShipmentStatusPage /> },
      { path: "*", element: <NotFound /> }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <SearchProvider>
          <RouterProvider router={router} />
        </SearchProvider>
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
)