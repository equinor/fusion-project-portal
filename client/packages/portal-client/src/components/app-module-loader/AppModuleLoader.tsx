import { useFramework } from '@equinor/fusion-framework-react/hooks';
import { useAppLoader } from '@equinor/portal-core';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { PortalProgressLoader } from '../portal-progress-loader/PortalProgressLoader';

interface ModuleLoaderProps<TProps> {
  moduleId: string;
  props?: TProps;
}

// Todo ask odin about this?
const Wrapper = styled.div`
  overflow: hidden;
  > div {
    height: calc(100vh - 48px);
    width: 100vw;
  }
`;

export function ModuleLoader<TProps>({ moduleId }: ModuleLoaderProps<TProps>) {
  const ref = useRef<HTMLDivElement>(null);
  const { isLoading, error, module } = useAppLoader(moduleId);
  const fusion = useFramework();

  useEffect(() => {
    console.log(module, ref.current);
    if (module && ref.current) {
      const renderFn = module.render || module.default;
      return renderFn(ref.current, {
        fusion,
        env: {
          basename: window.location.pathname,
        },
      });
    }
  }, [fusion, ref.current, module]);

  if (error) {
    return (
      <div>
        <ErrorViewer error={error} />;
      </div>
    );
  }
  return (
    <Wrapper>
      {isLoading && <PortalProgressLoader title="Loading App" />}
      <div ref={ref} />;
    </Wrapper>
  );
}

export const ErrorViewer = ({ error }: { error: Error }) => {
  return (
    <>
      <div style={{ marginTop: 20, border: '1px solid' }}>
        <h4
          style={{
            backgroundColor: 'rgb(153, 0, 37)',
            color: 'white',
            padding: 10,
            margin: 0,
          }}
        >
          {error.name} - {error.message}
        </h4>
        <section style={{ padding: 10 }}>
          {error.stack && <pre>{error.stack}</pre>}
        </section>
      </div>
      {error.cause && <ErrorViewer error={error.cause as Error} />}
    </>
  );
};
