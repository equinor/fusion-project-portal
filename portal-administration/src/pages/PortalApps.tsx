import styled from "styled-components";

import { Header } from "../components/Header";
import { Typography } from "@equinor/eds-core-react";
import { AppsList } from "../components/AppsList";
import { useParams } from "react-router-dom";
import { useGetPortalApps } from "../hooks/use-portal-apps";

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
export const PortalApps = () => {
  const { portalId } = useParams();

  const { data } = useGetPortalApps(portalId);

  if (!portalId) {
    return <>No portalId provided</>;
  }
  console.log(data);
  return (
    <Styles.Wrapper>
      <Styles.Section>
        <Styles.Content>
          <Typography variant="h4">Portal Apps</Typography>

          <div>
            {data?.map((app) => (
              <div>{app.key}</div>
            ))}
          </div>
        </Styles.Content>
      </Styles.Section>
    </Styles.Wrapper>
  );
};
