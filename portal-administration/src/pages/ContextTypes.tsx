import { Link } from "react-router-dom";

import { useState } from "react";
import { Header } from "../components/Header";
import styled from "styled-components";
import { Card } from "@equinor/eds-core-react";
import { EditContextTypeForm } from "../components/ContextType";

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

export const ContextTypes = () => {
  const [isList, setIsList] = useState(false);

  return (
    <div>
      <Header title="Contexts Types" />
      <Styles.Content>
        <Styles.Card>
          <EditContextTypeForm />
        </Styles.Card>
      </Styles.Content>
    </div>
  );
};
