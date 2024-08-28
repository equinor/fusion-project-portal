import {
  Button,
  Card,
  Icon,
  TextField,
  Typography,
} from "@equinor/eds-core-react";

import styled from "styled-components";

import { error_filled, info_circle } from "@equinor/eds-icons";
import { tokens } from "@equinor/eds-tokens";

import { useRouterConfigContext } from "../../context/RouterContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { route } from "../../schema/route";
import { Route } from "../../types/router-config";
import { RouterRoot } from "./RouterRoot";

const Style = {
  Wrapper: styled.div`
    gap: 1rem;
    display: flex;
    padding: 1rem;
    width: 100%;
    flex-direction: column;
  `,
  RouterWrapper: styled.div`
    gap: 0.5rem;
    display: flex;
    flex-direction: column;
  `,
  Content: styled.div`
    padding: 1rem;
    gap: 1rem;
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

  Router: styled.span`
    padding: 2rem;
    min-width: 350px;
    background-color: ${tokens.colors.ui.background__medium.hex};
    display: flex;
    flex-direction: column;
  `,
};

export const RouterEdit = ({ portalName }: { portalName?: string }) => {
  const { activeRoute, updateRoute, createNewRoute } = useRouterConfigContext();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<Route>({
    resolver: zodResolver(route),
    values: activeRoute,

    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<Route> = async (newRoute) => {
    updateRoute(newRoute);
  };

  return (
    <Style.Wrapper>
      <Typography variant="h4">
        {portalName
          ? `${portalName} - Routes Config`
          : "Postal - Routes Config"}
      </Typography>
      <RouterRoot />
      <form onSubmit={handleSubmit(onSubmit)} id="route">
        <Card>
          <Card.Header>
            <Typography variant="h4">Edit Route</Typography>
            <Icon data={info_circle} />
          </Card.Header>
          <Style.Content>
            <TextField
              id="id"
              label="Route Id"
              readOnly
              value={activeRoute?.id}
            />
            <TextField
              {...register("path")}
              id="path"
              label="Route Path"
              variant={errors.path && "error"}
              helperText={errors.path?.message}
              inputIcon={
                errors.description && <Icon data={error_filled} title="Error" />
              }
            />
            <TextField
              id="pageKey"
              {...register("pageKey")}
              label="Page Key"
              variant={errors.pageKey && "error"}
              helperText={errors.pageKey?.message}
              inputIcon={
                errors.description && <Icon data={error_filled} title="Error" />
              }
            />
            <TextField
              rows={3}
              multiline
              {...register("description")}
              id="description"
              variant={errors.description && "error"}
              helperText={errors.description?.message}
              inputIcon={
                errors.description && <Icon data={error_filled} title="Error" />
              }
              label="Description"
              maxLength={501}
            />
          </Style.Content>
          <Card.Header>
            <Typography variant="h4">Messages</Typography>
            <Icon data={info_circle} />
          </Card.Header>
          <Card.Content>
            <TextField
              {...register("messages.errorMessage")}
              id="errorMessage"
              label="Error Message"
              variant={errors.messages?.errorMessage && "error"}
              helperText={errors.messages?.errorMessage?.message}
              inputIcon={
                errors.description && <Icon data={error_filled} title="Error" />
              }
            />
          </Card.Content>
          <Card.Actions>
            <Button
              disabled={
                !activeRoute ||
                activeRoute?.id === "" ||
                Object.keys(touchedFields).length <= 0
              }
              type="submit"
              form="route"
            >
              Save Route
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                createNewRoute();
              }}
            >
              Add New route
            </Button>
          </Card.Actions>
        </Card>
      </form>
    </Style.Wrapper>
  );
};
