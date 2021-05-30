import { Route, Redirect } from 'react-router-dom';
/* eslint-disable react/prop-types */

export default function IsUserLoggedIn({ user, loggedInPathName, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (!user) {
          return children;
        }
        if (user) {
          return <Redirect to={{ pathname: loggedInPathName, state: { from: location } }} />;
        }
        return null;
      }}
    />
  );
}
