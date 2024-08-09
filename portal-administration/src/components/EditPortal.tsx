import { Card, Tabs } from "@equinor/eds-core-react";
import { useState } from "react";

import styled from "styled-components";
import { Portal } from "./PortalSideSheet";

const Style = {
  Wrapper: styled.div`
    padding-top: 1rem;
  `,
  Menu: styled.div`
    display: flex;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  CardList: styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 1rem;
  `,
  Card: styled(Card)<{ col?: number }>`
    box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.2),
      0px 2px 4px -2px rgba(16, 24, 40, 0.2);
    width: ${({ col }) => `calc(calc(100vw / ${col || 3} ) - 3rem)`};
  `,
};
export const EditPortal = (props: {
  activePortal?: Portal;
  onClose: VoidFunction;
}) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Style.Wrapper>
      <Tabs activeTab={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab>Info</Tabs.Tab>
          <Tabs.Tab>Contexts</Tabs.Tab>
          <Tabs.Tab>Apps</Tabs.Tab>
          <Tabs.Tab>Contexts Apps Matrix</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panels>
          <Tabs.Panel>info</Tabs.Panel>
          <Tabs.Panel>
            <div>Contexts</div>
          </Tabs.Panel>
          <Tabs.Panel>
            <div>Apps</div>
          </Tabs.Panel>
          <Tabs.Panel>{/* <ContextAppsMatrix /> */}</Tabs.Panel>
        </Tabs.Panels>
      </Tabs>
    </Style.Wrapper>
  );
};
