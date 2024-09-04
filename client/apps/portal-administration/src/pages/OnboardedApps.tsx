import { Link } from "react-router-dom";

import { useState } from "react";
import { Header } from "../components/Header";
import styled from "styled-components";
import { OnboardedContextsList } from "../components/OnboardedContexts/OnboradedContextsList";
import { OnboardedContextsTable } from "../components/OnboardedContexts/OnboradedContextsTable";
import { Button, Icon, Tabs, Tooltip } from "@equinor/eds-core-react";
import {
  add,
  list,
  view_agenda,
  view_list,
  view_module,
} from "@equinor/eds-icons";
import { AppsList } from "../components/OnboardedApps/AppsList";
import { AppsTable } from "../components/OnboardedApps/AppsTable";
import { useTabs } from "../hooks/use-tabs";
import { Message } from "../components/Message";
import { OnboardApp } from "../components/OnboardedApps/OnboardApp";

const Style = {
  TabsListWrapper: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    padding-bottom: 0px;
    align-items: flex-end;
  `,
};

export const OnboardedApps = () => {
  const { onTabChange, activeTab } = useTabs(["list", "table", "new"], "list");
  return (
    <>
      <Header title="Onboarded Apps" />
      <Tabs activeTab={activeTab} onChange={onTabChange}>
        <Style.TabsListWrapper>
          <Message
            title="Select application to edit"
            messages={[
              "You can onboard a new application by using the plus button",
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
            <AppsList />
          </Tabs.Panel>
          <Tabs.Panel>
            <AppsTable />
          </Tabs.Panel>
          <Tabs.Panel>
            <OnboardApp />
          </Tabs.Panel>
        </Tabs.Panels>
      </Tabs>
    </>
  );
};
