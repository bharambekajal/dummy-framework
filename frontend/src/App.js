import "./App.css";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import {
  ForgotPassword,
  UserLogin,
  Signup,
  Profile,
  ResetPassword,
} from "./components/userPortal/index";
import {
  Dashboard,
  Login,
  ClientData,
  SearchUser,
  Home,
  SaveDraft,
} from "./components/AdminPortal/index";
import ProtectedRoute from "./components/ProtectedRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminLogin from "./views/AdminLogin";
import { ROUTES } from "./constants/routePaths";
import AdminLanding from "./components/Comman/AdminLanding";
import UserLanding from "./components/Comman/UserLanding";
import ProfileCard from "./components/AdminPortal/Dashboard/ProfileCard";

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <AdminLanding />,
    children: [
      {
        path: ROUTES.EMPTY,
        element: <AdminLogin />,
      },
      {
        path: ROUTES.ADMIN.LOGIN,
        element: <Login />,
      },
    ],
  },

  {
    path: ROUTES.USER.SIGNUP,
    element: <UserLanding />,
    children: [
      {
        path: ROUTES.EMPTY,
        element: <Signup />,
      },
    ],
  },

  {
    path: ROUTES.USER.LOGIN,
    element: <UserLanding />,
    children: [
      {
        path: ROUTES.EMPTY,
        element: <UserLogin />,
      },
    ],
  },
  {
    path: ROUTES.ADMIN.DASHBOARD,
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      { path: ROUTES.ADMIN.CLIENTFORM, element: <ClientData /> },
      { path: ROUTES.ADMIN.CLIENTLIST, element: <SearchUser /> },
      { path: ROUTES.ADMIN.HOME, element: <Home /> },
      { path: ROUTES.ADMIN.DRAFTS, element: <SaveDraft /> },
    ],
  },

  {
    path: ROUTES.HOME,
    element: <AdminLogin />,
  },
  {
    path: ROUTES.ADMIN.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTES.USER.PROFILE,
    element: <Profile />,
  },
  {
    path: ROUTES.USER.FORGOT_PASSWORD,
    element: <ForgotPassword />,
  },
  {
    path: ROUTES.USER.RESET_PASSWORD,
    element: <ResetPassword />,
  },
  {
    path: ROUTES.ADMIN.PROFILE_CARD,
    element: <ProfileCard />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
