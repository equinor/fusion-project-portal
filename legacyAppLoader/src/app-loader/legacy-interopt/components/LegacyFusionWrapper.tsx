/* eslint-disable react/no-multi-comp */
import {
  PropsWithChildren,
  ReactChild,
  ReactElement,
  ReactNode,
  Suspense,
  useMemo,
  useRef,
} from "react";

import { createLegacyContextComponent } from "./create-legacy-context-component";
import type { PortalFramework } from "../types";
import { FusionContextOptions } from "../create-fusion-context";
import { AppModulesInstance } from "@equinor/fusion-framework-react-app";
import { AppModule } from "@equinor/fusion-framework-module-app";

export type LegacyFusionWrapperProps = {
  loader: NonNullable<ReactNode>;
  framework: PortalFramework;
  options?: FusionContextOptions;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  RootWrapper?: (props: { children: ReactChild }) => ReactElement<any, any>;
  appFramework: AppModulesInstance<[AppModule]>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FallThrewComponent = ({
  children,
}: {
  children: ReactChild;
}): ReactElement<any, any> => <>{children}</>;

export const LegacyFusionWrapper = (
  props: PropsWithChildren<LegacyFusionWrapperProps>
) => {
  const {
    framework,
    options,
    loader,
    RootWrapper = FallThrewComponent,
    appFramework,
  } = props;
  const root = useRef(null);
  const overlay = useRef(null);
  const headerContent = useRef<HTMLElement | null>(null);
  const headerAppAside = useRef<HTMLElement | null>(null);
  const LegacyContext = useMemo(
    () =>
      createLegacyContextComponent({
        framework,
        options,
        refs: { root, overlay, headerContent, headerAppAside },
        appFramework,
      }),
    [framework, options]
  );
  return (
    <Suspense fallback={loader}>
      <LegacyContext>
        <RootWrapper>
          {/* <FusionRoot rootRef={root} overlayRef={overlay}> */}
          <>{props.children}</>
          {/* </FusionRoot> */}
        </RootWrapper>
      </LegacyContext>
    </Suspense>
  );
};

export default LegacyFusionWrapper;
