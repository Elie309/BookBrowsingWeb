import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout as LogoutRedux } from '../utils/userSlice';
import { useNavigate } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';

export default function LogoutPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {logout} = useAuth0()


  useEffect(() => {

    dispatch(LogoutRedux());
    logout();
    navigate('/login');
  }, [dispatch]);

  return (
    <div>
      <h1>Logging out...</h1>
    </div>
  );
}
