import {
  Card,
  Button,
  Icon,
  Typography,
  TextField,
  Autocomplete,
  Checkbox,
} from "@equinor/eds-core-react";

import { zodResolver } from "@hookform/resolvers/zod";

import styled from "styled-components";

import { useCreatePortal } from "../../hooks/use-portal-query";
import { PortalCreateInputs, portalInputSchema } from "../../schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { error_filled } from "@equinor/eds-icons";
import { useGetContextTypes } from "../../hooks/use-context-type-query";
import { useState } from "react";

const Style = {
  Wrapper: styled.div`
    gap: 1rem;
    display: flex;
    flex-direction: column;
  `,
  Card: styled(Card)`
    padding: 1rem;
  `,
  Form: styled.form`
    padding-bottom: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `,
  ErrorWrapper: styled.div`
    padding-top: 1rem;
    padding-bottom: 1rem;
  `,
};

export const CreatePortalForm = () => {
  const { mutateAsync: createPortal, reset: resetCreate } = useCreatePortal();
  const [contextEnabled, setContextEnabled] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<PortalCreateInputs>({
    resolver: zodResolver(portalInputSchema),
    defaultValues: {
      contextTypes: [],
      order: 1,
      icon: "home",
    },
  });

  const onSubmit: SubmitHandler<PortalCreateInputs> = async (newPortal) => {
    console.log(newPortal);
    const portal = await createPortal(newPortal);

    if (portal) {
      reset();
      resetCreate();
    }
  };

  const { data: ContextTypes } = useGetContextTypes();

  return (
    <Style.Wrapper>
      <Style.Form onSubmit={handleSubmit(onSubmit)} id="create">
        <Style.Card>
          <Typography variant="h3">Details</Typography>
          <TextField
            {...register("name")}
            id="textfield-name"
            variant={errors.name && "error"}
            helperText={errors.name?.message}
            inputIcon={
              errors.name && <Icon data={error_filled} title="Error" />
            }
            label="Portal Name *"
            maxLength={51}
          />
          <TextField
            {...register("shortName")}
            id="textfield-shortName"
            variant={errors.shortName && "error"}
            helperText={errors.shortName?.message}
            inputIcon={
              errors.subtext && <Icon data={error_filled} title="Error" />
            }
            label="Sub Text *"
            maxLength={151}
          />
          <TextField
            {...register("subtext")}
            id="textfield-subtext"
            variant={errors.subtext && "error"}
            helperText={errors.subtext?.message}
            inputIcon={
              errors.subtext && <Icon data={error_filled} title="Error" />
            }
            label="Sub Text *"
            maxLength={151}
          />
          <TextField
            {...register("description")}
            id="textfield-description"
            variant={errors.description && "error"}
            helperText={errors.description?.message}
            inputIcon={
              errors.description && <Icon data={error_filled} title="Error" />
            }
            label="Description *"
            maxLength={301}
          />
        </Style.Card>
        <Style.Card>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h3">Context</Typography>
            <div>
              <Checkbox
                label="Enable Context"
                onChange={() => {
                  setContextEnabled(!contextEnabled);
                }}
                checked={contextEnabled}
              />
            </div>
          </div>
          <Typography>
            Enabling context makes the portal context-driven, allowing users to
            select one or more supported context types. If a context type is
            unavailable, click the edit button to add or remove context types.
          </Typography>
          <Autocomplete
            id="textfield-context-types"
            multiple
            variant={errors.contextTypes && "error"}
            helperText={errors.contextTypes?.message}
            options={ContextTypes?.map((ct) => ct.type) || []}
            selectedOptions={watch().contextTypes}
            onOptionsChange={({ selectedItems }) => {
              setValue("contextTypes", selectedItems);
            }}
            itemCompare={(item, compare) => {
              return item === compare;
            }}
            disabled={!contextEnabled}
            label="Context Types"
          />
        </Style.Card>

        <Style.Card>
          <Button type="submit" disabled={isSubmitting} form="create">
            Create
          </Button>
        </Style.Card>
      </Style.Form>
    </Style.Wrapper>
  );
};
