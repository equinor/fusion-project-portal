import {
  Card,
  Button,
  Icon,
  Tooltip,
  Input,
  InputWrapper,
  Typography,
} from "@equinor/eds-core-react";

import { useAppModules } from "@equinor/fusion-framework-react-app";
import SideSheet from "@equinor/fusion-react-side-sheet";
import { useQuery } from "react-query";
import styled from "styled-components";

const Style = {
  Wrapper: styled.div`
    display: flex;
    gap: 2rem;
    flex-direction: column;
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
    width: ${({ col }) => `calc(calc(100vw / ${col || 3} ) - 3rem)`};
  `,
};

export type Portal = {
  name: string;
  shortName: string;
  subtext: string;
  id: string;
  key: string;
  type: string;
  icon: string;
  isDefault: boolean;
  description: string;
  contexts: { type: string }[];
};

export function PortalSideSheet({
  activePortalId,
  onClose,
}: {
  activePortalId?: string;
  onClose: () => void;
}) {
  const client = useAppModules().http.createClient("portal-client");

  const { isLoading, data } = useQuery<Portal>("portal", {
    enabled: Boolean(activePortalId),
    initialData: undefined,
    queryFn: async () =>
      await client
        .fetch(`api/portals/${activePortalId}`)
        .then((res) => res.json()),
  });
  const { data: apps } = useQuery<any>("apps", {
    enabled: Boolean(activePortalId),
    initialData: undefined,
    queryFn: async () =>
      await client
        .fetch(`api/portals/${activePortalId}/apps`)
        .then((res) => res.json()),
  });

  return (
    <Style.CardList>
      {activePortalId && (
        <SideSheet
          isOpen={Boolean(activePortalId)}
          onClose={() => {
            onClose();
          }}
          isDismissable={true}
        >
          <SideSheet.Title title="Portal" />
          <SideSheet.SubTitle subTitle="Edit portal information" />
          <SideSheet.Actions></SideSheet.Actions>
          <SideSheet.Content>
            <Style.Wrapper>
              {data && (
                <div>
                  <Typography variant="h4">Base</Typography>
                  <form>
                    <InputWrapper label="Portal Id">
                      <Input id="title" value={data?.id} readOnly={true} />
                    </InputWrapper>
                    <InputWrapper label="Title">
                      <Input
                        id="title"
                        value={data?.name}
                        onChange={(e) => {
                          console.log(e);
                        }}
                      />
                    </InputWrapper>
                    <InputWrapper label="Short Name">
                      <Input
                        id="short-name"
                        value={data?.shortName}
                        onChange={(e) => {
                          console.log(e);
                        }}
                      />
                    </InputWrapper>
                    <InputWrapper label="Description">
                      <Input
                        id="description"
                        value={data?.description}
                        onChange={(e) => {
                          console.log(e);
                        }}
                      />
                    </InputWrapper>
                  </form>
                </div>
              )}
              <div>
                <Typography variant="h4">Context</Typography>

                {data?.contexts?.map((c) => (
                  <div>{c.type}</div>
                ))}
              </div>
              <div>
                <Typography variant="h4">Onboarded Applications</Typography>

                {apps?.map((c: any) => (
                  <div>{c.key}</div>
                ))}
              </div>
              <Button.Group aria-label="primary">
                <Button onClick={() => onClose()}>Save</Button>
                <Button variant="outlined" onClick={() => onClose()}>
                  Close
                </Button>
              </Button.Group>
            </Style.Wrapper>
          </SideSheet.Content>
        </SideSheet>
      )}
    </Style.CardList>
  );
}
