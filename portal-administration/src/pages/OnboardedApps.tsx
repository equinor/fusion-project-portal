import styled from "styled-components";

import { Header } from "../components/Header";
import { Typography } from "@equinor/eds-core-react";
import { AppsList } from "../components/AppsList";

const Styles = {
  Content: styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
  `,
  Section: styled.section`
    display: flex;
    height: 100%;
  `,
  Wrapper: styled.div`
    display: block;
    height: 100%;
  `,
};
export const OnboardedApps = () => {
  return (
    <Styles.Wrapper>
      <Header />
      <Styles.Section>
        <Styles.Content>
          <Typography variant="h4">Onboarded Apps</Typography>
          <AppsList />
        </Styles.Content>
      </Styles.Section>
    </Styles.Wrapper>
  );
};
