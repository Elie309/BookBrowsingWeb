import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../utils/userSlice';
import { useNavigate } from 'react-router';

export default function LogoutPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());
    navigate('/login');
  }, [dispatch]);

  return (
    <div>
      <h1>Logging out...</h1>
    </div>
  );
}
