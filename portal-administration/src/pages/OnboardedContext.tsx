import { useState } from "react";
import { Header } from "../components/Header";
import styled from "styled-components";
import { OnboardedContextsList } from "../components/OnboardedContects/OnboradedContextsList";
import { OnboardedContextsTable } from "../components/OnboardedContects/OnboradedContextsTable";
import { Button, Card, Icon } from "@equinor/eds-core-react";
import { list, view_agenda } from "@equinor/eds-icons";
import { tokens } from "@equinor/eds-tokens";
import { AddContext } from "../components/OnboardedContects/AddContext";

const Styles = {
  Content: styled.div`
    padding: 0 1rem;
  `,
  Card: styled(Card)`
    padding: 1rem;
  `,
  ActionBar: styled.div`
    padding: 1rem;
    display: flex;
    justify-content: space-between;
  `,
};

export const OnboardedContext = () => {
  const [isList, setIsList] = useState(false);

  return (
    <div>
      <Header title="Onboarded Contexts" />
      <Styles.ActionBar>
        <div>
          <Button
            variant="ghost_icon"
            onClick={() => {
              setIsList(true);
            }}
          >
            <Icon
              data={view_agenda}
              color={isList ? tokens.colors.interactive.focus.hex : ""}
            />
          </Button>
          <Button
            variant="ghost_icon"
            onClick={() => {
              setIsList(false);
            }}
          >
            <Icon
              data={list}
              color={!isList ? tokens.colors.interactive.focus.hex : ""}
            />
          </Button>
        </div>
      </Styles.ActionBar>
      <AddContext />
      <Styles.Content>
        {isList ? <OnboardedContextsList /> : <OnboardedContextsTable />}
      </Styles.Content>
    </div>
  );
};
