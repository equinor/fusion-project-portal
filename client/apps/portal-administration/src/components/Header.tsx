import { Typography } from "@equinor/eds-core-react";
import styled from "styled-components";

const Style = {
  Content: styled.div`
    display: flex;
    padding: 0.5rem 1rem;
  `,
};

interface HeaderProps {
  title?: string;
}

export const Header = ({ title }: HeaderProps) => {
  return (
    <Style.Content>
      <Typography variant="h4">{title || "Portal Administration"}</Typography>
    </Style.Content>
  );
};
