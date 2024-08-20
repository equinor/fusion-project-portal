import { Card } from "@equinor/eds-core-react";
import styled from "styled-components";

import { OnboardedContext } from "../../types";

const Style = {
  Padding: styled.div`
    padding: 1rem;
  `,
  Wrapper: styled.div`
    height: 100%;
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
    width: ${({ col }) => `calc(calc(100vw / ${col || 3} ) - 10rem)`};
  `,
};

export function OnboardedContextsList({
  onboardedContexts,
}: {
  onboardedContexts?: OnboardedContext[];
}) {
  return (
    <Style.CardList>
      {onboardedContexts?.map((context) => (
        <Style.Card key={context.id}>
          <Card.Header>
            <Card.HeaderTitle>
              <h3>{context.title}</h3>
            </Card.HeaderTitle>
            <strong>{context.type}</strong>
          </Card.Header>
          <Card.Content>
            <p>{context.externalId}</p>
            <br></br>
            <strong>{context.description}</strong>
          </Card.Content>
        </Style.Card>
      ))}
    </Style.CardList>
  );
}
