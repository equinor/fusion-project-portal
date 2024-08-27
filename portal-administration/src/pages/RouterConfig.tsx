import {
  Button,
  Card,
  Icon,
  Menu,
  TextField,
  Typography,
} from "@equinor/eds-core-react";
import { useParams } from "react-router-dom";
import { useGetPortal } from "../hooks/use-portal-query";
import { Loading } from "../components/Loading";
import styled from "styled-components";
import { useState } from "react";

import { Tree } from "../components/Tree";
import {
  add,
  edit,
  info_circle,
  more_vertical,
  remove_outlined,
} from "@equinor/eds-icons";
import { tokens } from "@equinor/eds-tokens";
import { uuidv4 } from "uuidv7";

const Style = {
  Wrapper: styled.div`
    gap: 1rem;
    display: flex;
    padding: 1rem;
    flex-direction: column;
  `,
  RouterWrapper: styled.div`
    gap: 0.5rem;
    display: flex;
    flex-direction: column;
  `,
  Route: styled.div`
    display: flex;
    flex-direction: row;
  `,
  Form: styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `,
  Routes: styled.span``,
  EditRoute: styled.span`
    position: relative;
    top: 0px;
    right: 0px;
    bottom: 0px;
  `,
  Router: styled.span`
    position: relative;
    left: 0px;
    top: 0px;
    bottom: 0px;
    padding: 2rem;
    width: 350px;
    background-color: ${tokens.colors.ui.background__medium.hex};
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `,
};

type Route = {
  id: string;
  name: string;
  path: string;
  pageKey: string;
  messages: {
    errorMessage: string;
    noPageMessage?: string;
  };
  children?: Route[];
};

export const RouterConfig = () => {
  const { portalId } = useParams();
  const [router, setRouter] = useState<{ routes: Route[] }>({
    routes: [
      {
        id: uuidv4(),
        name: "Project Root Page",
        path: "project/*",
        pageKey: "project",
        messages: {
          errorMessage: "Fail to load project page",
        },
        children: [
          {
            id: uuidv4(),
            name: "Project Page with context ID",
            messages: {
              errorMessage: "Fail to load project page",
            },
            path: ":contextId",
            pageKey: "project",
          },
        ],
      },
      {
        id: uuidv4(),
        name: "Facility Root Page",
        path: "facility/*",
        pageKey: "facility",
        messages: {
          errorMessage: "Fail to load facility page",
        },
        children: [
          {
            id: uuidv4(),
            name: "Facility Page with context Id",
            messages: {
              errorMessage: "Fail to load facility page",
            },
            path: ":contextId",
            pageKey: "facility",
          },
        ],
      },
    ],
  });

  const [selectedRoute, setRoute] = useState<Route | undefined>();

  const { data: portal, isLoading: portalIsLoading } = useGetPortal(portalId);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setRouter((prevRouter) => {
      const updatedRoutes = prevRouter.routes.map((route) => {
        if (route.id === selectedRoute?.id) {
          return {
            ...route,
            [id]: value,
          };
        }
        return route;
      });
      return {
        ...prevRouter,
        routes: updatedRoutes,
      };
    });
    setRoute((r) => {
      if (r) {
        return { ...r, [id]: value };
      }
      return r;
    });
  };

  if (portalIsLoading) return <Loading detail="Loading Portal Route Config" />;

  return (
    <>
      <Style.Router>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => {
            setRouter((r) => {
              const newRoute = {
                id: uuidv4(),
                name: "",
                path: "",
                pageKey: "",
                messages: {
                  errorMessage: "",
                },
              };
              r.routes.push(newRoute);
              setRoute(newRoute);
              return r;
            });
          }}
        >
          Add New webkit-ruby-position: Route
        </Button>

        {/* <Typography variant="h4">Routes</Typography>
        <Icon data={info_circle} /> */}
        <Style.RouterWrapper>
          {router.routes.map((route) => (
            <Route
              selected={selectedRoute}
              route={route}
              setRoute={(route) => {
                setRoute(route);
              }}
            />
          ))}
        </Style.RouterWrapper>
      </Style.Router>
      <Style.EditRoute>
        <Style.Wrapper>
          <Typography variant="h4">
            {portal
              ? `${portal.name} - Routes Config`
              : "Postal - Routes Config"}
          </Typography>
          <Card>
            <Card.Header>
              <Typography variant="h4">Edit Route</Typography>
              <Icon data={info_circle} />
            </Card.Header>
            <Card.Content>
              <Style.Form>
                <TextField
                  id="name"
                  label="Route Name"
                  value={selectedRoute?.name}
                  onChange={handleChange}
                />
                <TextField
                  id="path"
                  label="Route Path"
                  value={selectedRoute?.path}
                  onChange={handleChange}
                />
                <TextField
                  id="pageKey"
                  label="Page Key"
                  value={selectedRoute?.pageKey}
                  onChange={handleChange}
                />

                <TextField
                  id="messages.errorMessage"
                  label="Error Message"
                  value={selectedRoute?.messages.errorMessage}
                  onChange={handleChange}
                />
              </Style.Form>
            </Card.Content>
            <Card.Actions>
              <Button>Save</Button>
            </Card.Actions>
          </Card>
        </Style.Wrapper>
      </Style.EditRoute>
    </>
  );
};

const Route = ({
  route,
  setRoute,
  selected,
}: {
  route: Route;
  selected?: Route;
  setRoute: (route: Route) => void;
}) => {
  return (
    <Tree
      onClick={() => setRoute(route)}
      selected={
        selected?.id === route.id
          ? tokens.colors.ui.background__light.hex
          : undefined
      }
      title={route.name}
      key={route.path}
      Render={() => {
        return <RouteMenu route={route} setRoute={setRoute} />;
      }}
    >
      {route.children?.map((childRoute) => (
        <Route
          selected={selected}
          route={childRoute}
          setRoute={() => {
            setRoute(childRoute);
          }}
          key={childRoute.path}
        ></Route>
      ))}
    </Tree>
  );
};

const RouteMenu = ({
  route,
  setRoute,
}: {
  route: Route;
  setRoute: (route: Route) => void;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Button
        ref={setAnchorEl}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          openMenu();
        }}
        variant="ghost_icon"
      >
        <Icon data={more_vertical} />
      </Button>

      <Menu open={isOpen} onClose={closeMenu} anchorEl={anchorEl}>
        <Menu.Item onClick={() => setRoute(route)}>
          <Icon
            data={edit}
            size={16}
            color={tokens.colors.text.static_icons__tertiary.hex}
          />
          <Typography group="navigation" variant="menu_title" as="span">
            Edit
          </Typography>
        </Menu.Item>
        <Menu.Item>
          <Icon
            data={add}
            size={16}
            color={tokens.colors.text.static_icons__tertiary.hex}
          />
          <Typography group="navigation" variant="menu_title" as="span">
            Add
          </Typography>
        </Menu.Item>
        <Menu.Item>
          <Icon
            data={remove_outlined}
            size={16}
            color={tokens.colors.text.static_icons__tertiary.hex}
          />
          <Typography group="navigation" variant="menu_title" as="span">
            Remove
          </Typography>
        </Menu.Item>
      </Menu>
    </div>
  );
};
