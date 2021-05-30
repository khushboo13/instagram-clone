import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { DASHBOARD, LOGIN, PROFILE, SIGNUP } from './constants/Routes';
import './styles/app.css';
import useAuthListener from './hooks/use-auth-listener';
import UserContext from './context/user';
import ProtectedRoute from './helpers/protected.route';
import IsUserLoggedIn from './helpers/is-user-logged-in';

const Login = lazy(() => import('./pages/login'));
const Signup = lazy(() => import('./pages/signup'));
const NotFound = lazy(() => import('./pages/not-found'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const Profile = lazy(() => import('./pages/profile'));

function App() {
  const { user } = useAuthListener();
  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <IsUserLoggedIn loggedInPathName={DASHBOARD} user={user} path={LOGIN}>
              <Login />
            </IsUserLoggedIn>
            <IsUserLoggedIn loggedInPathName={DASHBOARD} user={user} path={SIGNUP}>
              <Signup />
            </IsUserLoggedIn>
            <ProtectedRoute user={user} path={DASHBOARD} exact>
              <Dashboard />
            </ProtectedRoute>
            <Route path={PROFILE} component={Profile} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
