import { Outlet, useParams } from "react-router-dom";
import styled from "styled-components";
import SideMenu from "../components/SideMenu";
import { PortalContextComponent } from "../context/PortalContext";
import { Snack } from "../components/Snack";

const Styles = {
  Content: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    position: relative;
  `,
  Section: styled.section`
    display: flex;

    height: inherit;
  `,
  Wrapper: styled.div`
    display: block;
    height: inherit;
    width: 100%;
  `,
};

export const Root = () => {
  return (
    <Styles.Wrapper>
      <PortalContextComponent>
        <Styles.Section>
          <Snack />
          <SideMenu />
          <Styles.Content>
            <Outlet />
          </Styles.Content>
        </Styles.Section>
      </PortalContextComponent>
    </Styles.Wrapper>
  );
};