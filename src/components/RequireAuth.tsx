import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function RequireAuth({
  children,
  disabled,
}: {
  children: JSX.Element;
  disabled?: boolean;
}) {
  const { user } = useAuth();

  const location = useLocation();

  if (!user && !disabled) {
    return (
      <Navigate
        to="/login"
        state={{
          from: location,
        }}
        replace
      />
    );
  }

  return children;
}
