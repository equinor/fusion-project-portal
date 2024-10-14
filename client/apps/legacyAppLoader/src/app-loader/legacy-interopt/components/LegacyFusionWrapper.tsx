/* eslint-disable react/no-multi-comp */
import { PropsWithChildren, ReactNode, Suspense, useMemo, useRef } from "react";
import { FusionRoot } from "@equinor/fusion-components";
import { createLegacyContextComponent } from "./create-legacy-context-component";
import type { PortalFramework } from "../types";
import { FusionContextOptions } from "../create-fusion-context";
import { AppModulesInstance } from "@equinor/fusion-framework-react-app";
import { AppModule } from "@equinor/fusion-framework-module-app";
import { styled } from "styled-components";

export type LegacyFusionWrapperProps = {
  loader: NonNullable<ReactNode>;
  framework: PortalFramework;
  options?: FusionContextOptions;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  appFramework: AppModulesInstance<[AppModule]>;
};

// Fixing Fusion root style issues
const StyleFix = styled.span`
  width: 100%;
  > div > div {
    display: block !important;
  }
`;

export const LegacyFusionWrapper = (
  props: PropsWithChildren<LegacyFusionWrapperProps>
) => {
  const { framework, options, loader, appFramework } = props;
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
        <StyleFix>
          <FusionRoot rootRef={root} overlayRef={overlay} noHeader={true}>
            {props.children}
          </FusionRoot>
        </StyleFix>
      </LegacyContext>
    </Suspense>
  );
};

export default LegacyFusionWrapper;
