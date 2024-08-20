import { Outlet, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useEffect } from "react";
import { usePortalContext } from "../context/PortalContext";
import { PageMessage } from "../components/PageMessage/PageMessage";

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
      navigate("portals");
    } else {
      activePortalId !== portalId && setActivePortalById(portalId);
    }
  }, [portalId, activePortalId, setActivePortalById]);

  if (!portalId) {
    return <PageMessage title="No Portal ID" type="Error" />;
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
