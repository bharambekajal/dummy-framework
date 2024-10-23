import './App.css';
import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import { ForgotPassword,UserLogin,Signup,Profile, ResetPassword} from './components/userPortal/index';
import { Dashboard,Login,ClientData,SearchUser} from './components/AdminPortal/index';
import ProtectedRoute from './components/ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminLogin from './views/AdminLogin';
import { ROUTES } from './constants/routePaths';


const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <AdminLogin/>
  },{
    path: ROUTES.ADMIN.LOGIN,
    element: < Login/>
  },
  {
    path: ROUTES.ADMIN.DASHBOARD,
    element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
    children: [
      { path: ROUTES.ADMIN.CLIENTFORM, element: <ClientData /> },
      { path: ROUTES.ADMIN.CLIENTLIST, element: <SearchUser /> }
    ],
  },
  {
    path: ROUTES.USER.SIGNUP,
    element: <Signup /> 
  },
  {
    path: ROUTES.USER.LOGIN,
    element: <UserLogin /> 
  },
  {
    path: ROUTES.USER.PROFILE,
    element:<Profile />
  },
  {
    path: ROUTES.USER.FORGOT_PASSWORD,
    element: <ForgotPassword /> 
  },
  {
    path: ROUTES.USER.RESET_PASSWORD,
    element: <ResetPassword /> 
  },

]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;