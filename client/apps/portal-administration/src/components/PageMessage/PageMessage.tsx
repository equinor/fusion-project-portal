import { Icon, Typography } from "@equinor/eds-core-react";
import { tokens } from "@equinor/eds-tokens";
import { PropsWithChildren } from "react";
import styled from "styled-components";
import { MessageType } from "./types/types";

import { error_outlined } from "@equinor/eds-icons";
import { getMessageType } from "./utils/get-page-message-type";

const Styles = {
  Wrapper: styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    justify-content: center;
  `,
  Content: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    justify-content: center;
  `,
};

interface ErrorPageProps {
  title: string;
  body?: React.FC | string;
  type?: MessageType;
  color?: string;
}

export function PageMessage({
  title,
  type = "Info",
  color,
  children,
}: PropsWithChildren<ErrorPageProps>) {
  const currentType = getMessageType(type);
  return (
    <Styles.Wrapper>
      <Icon
        data-testid="icon"
        size={40}
        color={
          currentType?.color ||
          color ||
          tokens.colors.text.static_icons__tertiary.hex
        }
        data={currentType?.icon || error_outlined}
      />
      <Styles.Content>
        <Typography
          color={tokens.colors.text.static_icons__default.hex}
          variant={"h3"}
          aria-label={`Title for ${type} message`}
        >
          {title}
        </Typography>

        <Typography>{children && children}</Typography>
      </Styles.Content>
    </Styles.Wrapper>
  );
}
