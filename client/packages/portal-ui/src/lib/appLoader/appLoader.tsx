import { useEffect, useRef } from 'react';
import { AppLoaderService } from './appLoaderModule';

const appLoader = new AppLoaderService();

async function runApplication<TModules>(
  applicationId: string,
  ref: HTMLDivElement,
  cb: (teardown: () => void) => void,
  modules?: TModules
) {
  const appRun = await appLoader.loadApplication(applicationId, ref, modules);
  cb(appRun());
}

interface ApplicationLoaderProps<TModules> {
  applicationId: string;
  modules: TModules;
}

export function ApplicationLoader<TModules>({
  applicationId,
  modules,
}: ApplicationLoaderProps<TModules>) {
  const appRef = useRef<HTMLDivElement>(null);
  const cleanupFunction = useRef<VoidFunction | undefined>();

  useEffect(() => {
    if (appRef.current && applicationId) {
      runApplication(
        applicationId,
        appRef.current,
        (teardown) => {
          cleanupFunction.current = teardown;
        },
        modules
      );
    }

    return () => {
      if (cleanupFunction.current) {
        cleanupFunction.current();
      }
    };
  }, [applicationId, modules]);

  return <div ref={appRef} />;
}
