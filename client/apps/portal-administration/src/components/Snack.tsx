import { Icon, Snackbar } from "@equinor/eds-core-react";
import styled from "styled-components";
import { useSnackBar } from "../hooks/use-snack-bar";

export const Snack = () => {
  const { messages, removeMessage } = useSnackBar();

  return (
    <>
      {Object.values(messages).map(({ message, type, id }, idx) => {
        return (
          <Styled.Snackbar
            key={id}
            open={true}
            $idx={idx}
            autoHideDuration={5000}
            onClose={() => {
              console.log("here", id);
              removeMessage(id);
            }}
          >
            <Styled.SnackContent>
              <Icon
                name={
                  type === "error" ? "error_filled" : "check_circle_outlined"
                }
                size={16}
              />
              <div>{message}</div>
            </Styled.SnackContent>
          </Styled.Snackbar>
        );
      })}
    </>
  );
};

const Styled = {
  Snackbar: styled(Snackbar).attrs<{ $idx?: number }>((props) => ({
    $idx: props.$idx || 0,
  }))`
    bottom: calc(16px + (${(props) => props.$idx} * 5em));
  `,
  SnackContent: styled.div`
    display: flex;
    align-items: flex-end;
    gap: 1em;
  `,
};
