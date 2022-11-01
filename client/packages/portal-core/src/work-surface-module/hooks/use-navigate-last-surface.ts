import { useNavigate } from 'react-router-dom';
import { useCurrentWorkSurface } from './useCurrentWorkSurface';

//Navigates the user to where they last left off
export const useNavigateLastSurface = () => {
  const navigate = useNavigate();
  const workSurface = useCurrentWorkSurface();
  if (workSurface) {
    navigate(`/${workSurface.name}`);
  }
};
