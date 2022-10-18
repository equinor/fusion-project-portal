import { useEffect, useRef } from 'react';
import {
  ModuleLoaderProps,
  runModule,
} from '../modules/module-loader/run-module';

export function ModuleLoader<TModules>({
  moduleId,
  modules,
}: ModuleLoaderProps<TModules>) {
  const appRef = useRef<HTMLDivElement>(null);
  const cleanupFunction = useRef<VoidFunction | undefined>();

  useEffect(() => {
    if (appRef.current && moduleId) {
      runModule(
        moduleId,
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
  }, [moduleId, modules]);

  return <div ref={appRef} />;
}
