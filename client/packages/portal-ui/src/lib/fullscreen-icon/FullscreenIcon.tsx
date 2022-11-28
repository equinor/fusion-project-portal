import { Icon } from '@equinor/eds-core-react';
import { useEffect, useState } from 'react';

export function FullscreenIcon() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  useEffect(() => {
    const eventSubscription = document.addEventListener(
      'fullscreenchange',
      () => {
        setIsFullscreen(!!document.fullscreenElement);
      }
    );
    return eventSubscription;
  }, []);
  return <Icon name={isFullscreen ? 'fullscreen_exit' : 'fullscreen'} />;
}
