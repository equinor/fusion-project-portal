import { Icon } from '@equinor/eds-core-react';
import { useEffect, useState } from 'react';

export function FullscreenIcon() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    function handleSetIsFullScreen() {
      setIsFullscreen(!!document.fullscreenElement);
    }
    document.addEventListener('fullscreenchange', handleSetIsFullScreen);
    return () =>
      document.removeEventListener('fullscreenchange', handleSetIsFullScreen);
  }, []);
  return <Icon name={isFullscreen ? 'fullscreen_exit' : 'fullscreen'} />;
}
