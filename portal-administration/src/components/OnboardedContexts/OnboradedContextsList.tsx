import { Button, Card, Icon, Typography } from "@equinor/eds-core-react";
import styled from "styled-components";

import { OnboardedContext } from "../../types";
import { delete_to_trash } from "@equinor/eds-icons";

const Style = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0 1rem;
    /* height: calc(100vh - 250px); */
    overflow: auto;
  `,
  CardList: styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    /* height: calc(100vh - 250px); */
    flex-grow: 1;
  `,
  Card: styled(Card)<{ col?: number }>`
    box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.2),
      0px 2px 4px -2px rgba(16, 24, 40, 0.2);
  `,
};

export function OnboardedContextsList({
  onboardedContexts,
}: {
  onboardedContexts?: OnboardedContext[];
}) {
  return (
    <Style.Wrapper>
      <Style.CardList>
        {onboardedContexts?.map((context) => (
          <Style.Card key={context.id}>
            <Card.Header>
              <Card.HeaderTitle>
                <Typography variant="h4">{context.title}</Typography>
              </Card.HeaderTitle>
              <Button variant="ghost_icon" onClick={() => {}}>
                <Icon data={delete_to_trash} />
              </Button>
            </Card.Header>
            <Card.Content>
              <strong>{context.type}</strong>
              <p>{context.externalId}</p>
            </Card.Content>
          </Style.Card>
        ))}
      </Style.CardList>
    </Style.Wrapper>
  );
}
