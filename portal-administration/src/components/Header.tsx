import { Typography } from "@equinor/eds-core-react";
import styled from "styled-components";

const Style = {
  Content: styled.div`
    background-color: #fff;
    display: flex;
    padding: 1rem;
  `,
};

export const Header = () => {
  return (
    <Style.Content>
      <Typography variant="h4">Portal Administration</Typography>
    </Style.Content>
  );
};
