import { FunctionComponent, StrictMode, Suspense } from 'react';
import * as ReactDOM from 'react-dom/client';
import { HomePage } from './pages/HomePage/HomePage';

const re = { ...ReactDOM };

function createApp(Component: FunctionComponent) {
  function renderer<TModules>(el: Element, modules: TModules): VoidFunction {
    const root = re.createRoot(el);

    root.render(
      <StrictMode>
        <Suspense fallback={<div>Loading Homepage</div>}>
          <Component />
        </Suspense>
      </StrictMode>
    );
    return () => {
      root.unmount();
    };
  }
  return renderer;
}

export const render = createApp(HomePage);

export default render;
