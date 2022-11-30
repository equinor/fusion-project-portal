import { useAppLoader } from '@equinor/portal-core';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface ModuleLoaderProps<TProps> {
  moduleId: string;
  props?: TProps;
}

const Wrapper = styled.div`
  overflow: hidden;
  > div {
    height: calc(100vh - 48px);
    width: 100vw;
  }
`;

export function ModuleLoader<TProps>({ moduleId }: ModuleLoaderProps<TProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const { loadModule, teardownModule } = useAppLoader();

  useEffect(() => {
    if (ref.current) loadModule(moduleId, ref.current);
    return () => {
      teardownModule && teardownModule();
    };
  }, []);

  return (
    <Wrapper>
      <div ref={ref} />;
    </Wrapper>
  );
}
