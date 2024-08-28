import {
  Button,
  Card,
  Icon,
  TextField,
  Typography,
} from "@equinor/eds-core-react";

import styled from "styled-components";

import { error_filled, info_circle } from "@equinor/eds-icons";

import { useRouterConfigContext } from "../../context/RouterContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { route } from "../../schema/route";
import { Route } from "../../types/router-config";

const Style = {
  Content: styled.div`
    padding: 1rem;
    gap: 1rem;
    display: flex;
    flex-direction: column;
  `,
};

export const RouteForm = () => {
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

  const disabled = Object.keys(touchedFields).length <= 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="route">
      <Card>
        <Card.Header>
          <Typography variant="h4">Route Config</Typography>
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
              errors.path && <Icon data={error_filled} title="Error" />
            }
          />
          <TextField
            id="pageKey"
            {...register("pageKey")}
            label="Page Key"
            variant={errors.pageKey && "error"}
            helperText={errors.pageKey?.message}
            inputIcon={
              errors.pageKey && <Icon data={error_filled} title="Error" />
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

          <Typography variant="h6">Route Messages</Typography>

          <TextField
            {...register("messages.errorMessage")}
            id="errorMessage"
            label="Error Message"
            variant={errors.messages?.errorMessage && "error"}
            helperText={errors.messages?.errorMessage?.message}
            inputIcon={
              errors.messages?.errorMessage && (
                <Icon data={error_filled} title="Error" />
              )
            }
          />
          <TextField
            {...register("messages.noPageMessage")}
            id="noPageMessage"
            label="No Page Message"
            variant={errors.messages?.noPageMessage && "error"}
            helperText={errors.messages?.noPageMessage?.message}
            inputIcon={
              errors.messages?.noPageMessage && (
                <Icon data={error_filled} title="Error" />
              )
            }
          />
        </Style.Content>
        <Card.Actions>
          <Button
            disabled={!activeRoute || activeRoute?.id === "" || disabled}
            type="submit"
            form="route"
          >
            Save
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
  );
};
