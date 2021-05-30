import { Route, Redirect } from 'react-router-dom';
import { LOGIN } from '../constants/Routes';
/* eslint-disable react/prop-types */

export default function ProtectedRoute({ user, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => {
        if (user) {
          return children;
        }
        if (!user) {
          return <Redirect to={{ pathname: LOGIN }} />;
        }
        return null;
      }}
    />
  );
}
