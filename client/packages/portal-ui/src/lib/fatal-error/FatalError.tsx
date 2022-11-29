import { Dialog } from '@equinor/eds-core-react';
import { ReactNode } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
type FatalErrorProps = {
  title: string;
  description: string;
  actions?: ReactNode;
};
export function FatalError({ description, title, actions }: FatalErrorProps) {
  return (
    <>
      <Wrapper>
        <Dialog style={{ width: '50vw' }} open={true}>
          <Dialog.Header>
            <Dialog.Title>{title}</Dialog.Title>
          </Dialog.Header>
          <Dialog.Content>{description}</Dialog.Content>
          <Dialog.Actions>{actions}</Dialog.Actions>
        </Dialog>
      </Wrapper>
    </>
  );
}
