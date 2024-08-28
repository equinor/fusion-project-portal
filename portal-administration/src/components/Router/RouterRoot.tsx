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
import { RootInput, rootInput } from "../../schema/route";

const Style = {
  Content: styled.div`
    padding: 1rem;
    gap: 1rem;
    display: flex;
    flex-direction: column;
  `,
};

export const RouterRoot = () => {
  const { root, updateRoot } = useRouterConfigContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RootInput>({
    resolver: zodResolver(rootInput),
    defaultValues: root,
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<RootInput> = async (root) => {
    updateRoot(root.pageKey);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <Card.Header>
          <Typography variant="h4">Edit Root</Typography>
          <Icon data={info_circle} />
        </Card.Header>
        <Style.Content>
          <TextField
            {...register("pageKey")}
            id="pageKey"
            variant={errors.pageKey && "error"}
            helperText={errors.pageKey?.message}
            inputIcon={
              errors.pageKey && <Icon data={error_filled} title="Error" />
            }
            label="Root Page Id"
          />
        </Style.Content>

        <Card.Actions>
          <Button disabled={!errors} type="submit">
            Save
          </Button>
        </Card.Actions>
      </Card>
    </form>
  );
};
