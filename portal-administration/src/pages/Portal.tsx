import { Outlet, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import SideMenu from "../components/SideMenu";
import { Header } from "../components/Header";
import { useEffect } from "react";
import { usePortalContext } from "../context/PortalContext";

const Styles = {
  Content: styled.div`
    display: flex;
    padding: 1rem;
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

export const Portal = () => {
  const { portalId } = useParams();
  const navigate = useNavigate();
  const { setActivePortalById, activePortalId } = usePortalContext();

  useEffect(() => {
    if (!portalId || portalId === "undefined") {
      navigate("/");
    } else {
      activePortalId !== portalId && setActivePortalById(portalId);
    }
  }, [portalId, activePortalId, setActivePortalById]);

  if (!portalId) {
    return <>No portalId provided</>;
  }

  return (
    <Styles.Wrapper>
      <Styles.Section>
        <Styles.Content>
          <Outlet />
        </Styles.Content>
      </Styles.Section>
    </Styles.Wrapper>
  );
};

export default Portal;
