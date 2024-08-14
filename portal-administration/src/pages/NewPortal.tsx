import styled from "styled-components";
import { CreatePortalForm } from "../components/CreatePortalForm";
import { Header } from "../components/Header";
import { Typography } from "@equinor/eds-core-react";

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
export const NewPortal = () => {
  return (
    <Styles.Wrapper>
      <Header />
      <Styles.Section>
        <Styles.Content>
          <Typography variant="h4">Create New Portal</Typography>
          <CreatePortalForm />
        </Styles.Content>
      </Styles.Section>
    </Styles.Wrapper>
  );
};
