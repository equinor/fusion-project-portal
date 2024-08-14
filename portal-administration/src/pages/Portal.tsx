import { Outlet, useParams } from "react-router-dom";
import styled from "styled-components";
import SideMenu from "../components/SideMenu";
import { Header } from "../components/Header";

const Styles = {
  Content: styled.div`
    display: flex;
    padding: 1rem;
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

export const Portal = () => {
  const { portalId } = useParams();

  if (!portalId) {
    return <>No portalId provided</>;
  }

  return (
    <Styles.Wrapper>
      <Header />
      <Styles.Section>
        <SideMenu />
        <Styles.Content>
          <Outlet />
        </Styles.Content>
      </Styles.Section>
    </Styles.Wrapper>
  );
};

export default Portal;
