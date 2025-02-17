import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyToken } from './verifyToken';
import { Loading } from './Loading';

interface PrivateRouteProps {
  element: JSX.Element;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  let token = localStorage.getItem('token');

  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'authToken') {
        window.location.reload();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    verifyToken().then((authenticated) => {
      if (authenticated === false && location.pathname !== '/') {
        localStorage.removeItem('authToken')
        navigate('/');
      } else {
        setIsAuthenticated(authenticated);
      }
    });
  }, [navigate, token]);

  // console.log(isAuthenticated);

  if (isAuthenticated === null) {
    return <Loading />
  }

  return isAuthenticated ? element : null;
};
