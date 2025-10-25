import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AppLayout from './components/layout/AppLayout.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignIn from './features/auth/page/SignIn.tsx'
import Signup from './features/auth/page/Signup.tsx'
import ErrorPage from './components/ui/ErrorPage.tsx'
import Dashboard from './features/dashboard/page/Dashboard.tsx'
import CreateTicket from './features/dashboard/page/CreateTicket.tsx'
import Tickets from './features/dashboard/page/Tickets.tsx'
import ViewAndEditTicket from './features/dashboard/page/ViewAndEditTicket.tsx'
import AuthVerifiedRoute from './components/layout/AuthVerifiedRoute.tsx'
import NonVerifiedRoute from './components/layout/NonVerifiedRoute.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppLayout />
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <App /> },
      { path: "signin", element: <NonVerifiedRoute><SignIn /></NonVerifiedRoute> },
      { path: "signup", element: <NonVerifiedRoute><Signup /></NonVerifiedRoute> },
      { path: "dashboard", element: <AuthVerifiedRoute><Dashboard /></AuthVerifiedRoute> },
      { path: "tickets", element: <AuthVerifiedRoute><Tickets /></AuthVerifiedRoute> },
      { path: "tickets/:id", element: <AuthVerifiedRoute><ViewAndEditTicket /></AuthVerifiedRoute> },
      { path: "create-ticket", element: <AuthVerifiedRoute><CreateTicket /></AuthVerifiedRoute> },
    ],
  },
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
