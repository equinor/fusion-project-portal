import { Outlet, useParams } from "react-router-dom";
import styled from "styled-components";
import SideMenu from "../components/SideMenu";
import { PortalContextComponent } from "../context/PortalContext";

const Styles = {
  Content: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
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

export const Root = () => {
  return (
    <Styles.Wrapper>
      <PortalContextComponent>
        <Styles.Section>
          <SideMenu />
          <Styles.Content>
            <Outlet />
          </Styles.Content>
        </Styles.Section>
      </PortalContextComponent>
    </Styles.Wrapper>
  );
};
