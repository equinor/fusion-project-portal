import { useState } from "react";
import { Header } from "../components/Header";
import styled from "styled-components";
import { OnboardedContextsList } from "../components/OnboardedContects/OnboradedContextsList";
import { OnboardedContextsTable } from "../components/OnboardedContects/OnboradedContextsTable";
import { Button, Card, Icon } from "@equinor/eds-core-react";
import { list, view_agenda } from "@equinor/eds-icons";
import { tokens } from "@equinor/eds-tokens";
import { AddContext } from "../components/OnboardedContects/AddContext";
import { Loading } from "../components/Loading";
import { ussOnboardedContexts } from "../hooks/use-onboarded-context";

const Styles = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `,
  Content: styled.div`
    padding: 0 1rem;
    margin-bottom: 1rem;
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
  const { isLoading, error, data: onboardedContexts } = ussOnboardedContexts();

  if (isLoading) return <Loading detail="Loading Onboarded Contexts" />;

  return (
    <>
      <Header title="Onboarded Contexts" />
      <Styles.Content>
        <AddContext />
      </Styles.Content>
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
      <Styles.Content>
        {isList ? (
          <OnboardedContextsList onboardedContexts={onboardedContexts} />
        ) : (
          <OnboardedContextsTable onboardedContexts={onboardedContexts} />
        )}
      </Styles.Content>
    </>
  );
};
