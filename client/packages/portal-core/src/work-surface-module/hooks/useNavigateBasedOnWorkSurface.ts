import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkSurface } from '..';

export function useNavigateBasedOnWorkSurface() {
  const navigate = useNavigate();
  const { currentWorkSurface$ } = useWorkSurface();
  useEffect(() => {
    const sub = currentWorkSurface$.subscribe((s) => {
      if (location.pathname.includes('apps')) return;
      if (!s) {
        navigate('/');
        return;
      }
      if (location.pathname.includes(s?.name)) return;
      navigate(`/${s.name}`);
      return () => sub.unsubscribe();
    });
  }, []);
}
