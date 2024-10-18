import './App.css';
import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import AdminLogin from './components/adminPortal/Login';
import UserLogin from './components/userPortal/Login';
import BusinessScreen1 from './components/adminPortal/BusinessScreen1';
import BusinessScreen2 from './components/adminPortal/BusinessScreen2';
import BusinessScreen3 from './components/adminPortal/BusinessScreen3';
import Dashboard from './components/adminPortal/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import RegistrationPage from './components/userPortal/RegistrationPage';

const router = createBrowserRouter([
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin/dashboard",
    element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
    children: [
      { path: "business1", element: <BusinessScreen1 /> },
      { path: "business2", element: <BusinessScreen2 /> },
      { path: "business3", element: <BusinessScreen3 /> },
    ],

  },
  {
    path: '/register/:userId',
    element: <RegistrationPage /> 
    },
    {
      path: '/user/login/:userId',
      element: <UserLogin /> 
      }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;