import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DASHBOARD, LOGIN, SIGNUP } from '../constants/Routes';
import FirebaseContext from '../context/firebase';
import UserContext from '../context/user';

export default function Header() {
  const { user } = useContext(UserContext);
  const { firebase } = useContext(FirebaseContext);
  return (
    <header className="h-16 bg-white border-b border-gray-primary mb-8">
      <div className="container mx-auto h-full max-w-screen-lg">
        <div className="flex justify-between h-full">
          <div className="flex items-center text-gray-700 text-center cursor-pointer">
            <Link to={DASHBOARD}>
              <img src="/images/logo.png" alt="Instagram logo" className="mt-2 w-6/12" />
            </Link>
          </div>
          <div className="text-gray-700 text-center flex items-center align-items">
            {user ? (
              <>
                <Link to={DASHBOARD} aria-label="Dashboard">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 mr-6 text-black-light cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </Link>
                <button
                  type="button"
                  title="Sign out"
                  onClick={() => firebase.auth().signOut()}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      firebase.auth().signOut();
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 mr-6 text-black-light cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
                <div className="flex items-center cursor-pointer">
                  <Link to={`/p/${user.username}`}>
                    <img
                      src={`/images/avatar/${user.username}.jpeg`}
                      alt="User Profile"
                      className="rounded-full h-8 w-8 flex"
                    />
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link to={LOGIN}>
                  <button
                    type="button"
                    className="w-20 h-8 bg-blue-medium text-white rounded text-sm font-bold"
                  >
                    Log In
                  </button>
                </Link>
                <Link to={SIGNUP}>
                  <button
                    type="button"
                    className="w-20 h-8 text-blue-medium rounded text-sm font-bold "
                  >
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
