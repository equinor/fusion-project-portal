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
  TabsListWrapper: styled.div`
    display: flex;
    justify-content: space-between;

    align-items: flex-end;
  `,
  Content: styled.div`
    padding: 1rem;
  `,
  CardList: styled.div`
    padding-top: 1rem;
    display: flex;

    flex-wrap: wrap;
    gap: 2rem;
  `,
  Menu: styled.div`
    display: flex;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  Card: styled(Card)<{ col?: number }>`
    box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.2),
      0px 2px 4px -2px rgba(16, 24, 40, 0.2);
    width: ${({ col }) => `calc(calc(100vw / ${col || 3} ) - 10rem)`};
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
                  <Icon data={view_module} />
                </Tooltip>
              </Tabs.Tab>
              <Tabs.Tab title="Table View">
                <Tooltip title="Table View">
                  <Icon data={view_list} />
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
              <PortalTable portalsData={portalsData} />
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
