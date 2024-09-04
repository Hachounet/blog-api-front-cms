import { useState, useEffect } from 'react';
import { useAuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
// This is a variant of authFetch from blog-api-front-users. Main difference is it will redirect to /login from users frontend.

export default function useAuth(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setLogged, token } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      setLogged(false);
      navigate('/login');

      return;
    }

    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          localStorage.removeItem('accessToken');
          setLogged(false);
          navigate('/login');

          return;
        }

        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [token, url]);

  return { data, loading, error };
}
