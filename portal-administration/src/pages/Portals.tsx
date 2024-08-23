import { Card, Icon, Tabs, Tooltip } from "@equinor/eds-core-react";
import { add, view_list, view_module } from "@equinor/eds-icons";

import { useEffect, useState } from "react";
import styled from "styled-components";

import { Header } from "../components/Header";
import { Link } from "react-router-dom";

import { Loading } from "../components/Loading";
import { usePortalsQuery } from "../hooks/use-portals-query";
import { PortalList } from "../components/Portals/PortalList";
import { PortalTable } from "../components/Portals/PortalTable";
import { Message } from "../components/Message";
import { CreatePortalForm } from "../components/PortalForm";
import { useTabs } from "../hooks/use-tabs";

const Style = {
  Wrapper: styled.div`
    height: 100%;
    width: 100%;
    position: absolute;
  `,
  TabsListWrapper: styled.div`
    display: flex;
    justify-content: space-between;

    align-items: flex-end;
  `,
  Content: styled.div`
    padding: 1rem;
  `,
};

export const Portals = () => {
  const { isLoading: portalIsLoading, data: portalsData } = usePortalsQuery();

  const { onTabChange, activeTab } = useTabs(["list", "table", "new"], "list");

  if (portalIsLoading) return <Loading detail="Loading Portals" />;

  return (
    <>
      <Header title="Portals" />
      <Style.Content>
        <Tabs activeTab={activeTab} onChange={onTabChange}>
          <Style.TabsListWrapper>
            <Message
              title="  Please select portal to manage."
              messages={[
                "You can create a new portal by pressing the plus button on the right ",
              ]}
            />
            <Tabs.List>
              <Tabs.Tab title="List View">
                <Tooltip title="List View">
                  <Icon data={view_list} />
                </Tooltip>
              </Tabs.Tab>
              <Tabs.Tab title="Table View">
                <Tooltip title="Table View">
                  <Icon data={view_module} />
                </Tooltip>
              </Tabs.Tab>
              <Tabs.Tab title="Create New Portal">
                <Tooltip title="Create New Portal">
                  <Icon data={add}></Icon>
                </Tooltip>
              </Tabs.Tab>
            </Tabs.List>
          </Style.TabsListWrapper>
          <Tabs.Panels>
            <Tabs.Panel>
              <PortalList portalsData={portalsData} />
            </Tabs.Panel>
            <Tabs.Panel>
              <Style.Wrapper>
                <PortalTable portalsData={portalsData} />
              </Style.Wrapper>
            </Tabs.Panel>
            <Tabs.Panel>
              <CreatePortalForm />
            </Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      </Style.Content>
    </>
  );
};
