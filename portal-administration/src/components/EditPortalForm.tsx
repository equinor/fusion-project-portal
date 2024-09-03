import {
  Card,
  Button,
  Icon,
  Typography,
  TextField,
  Autocomplete,
  Checkbox,
  Label,
} from "@equinor/eds-core-react";

import { zodResolver } from "@hookform/resolvers/zod";

import * as AllIcons from "@equinor/eds-icons";
import styled from "styled-components";

import { useUpdatePortal } from "../hooks/use-portal-query";
import { PortalEditInputs, portalEditInputSchema } from "../schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { edit, error_filled } from "@equinor/eds-icons";
import { useEffect, useState } from "react";
import { EditContextTypeForm } from "./OnboardedContexts/ContextType";
import { ContextType, Portal } from "../types";

const Style = {
  Wrapper: styled.div`
    gap: 1rem;
    display: flex;
    flex-direction: column;
  `,
  Row: styled.div`
    gap: 1rem;
    display: flex;
    flex-direction: row;
  `,
  Card: styled(Card)`
    padding: 1rem;
  `,
  From: styled.form`
    padding-top: 1rem;
    padding-bottom: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `,
  ErrorWrapper: styled.div`
    padding-top: 1rem;
    padding-bottom: 1rem;
  `,
  Heading: styled(Typography)`
    padding: 0.5rem 0;
  `,
  IconWrapper: styled.div`
    background: #00707920;
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1 / 1;
    height: 90%;
  `,
  Icon: styled.span`
    > svg {
      width: 100px;
    }
  `,
};

export const EditPortalForm = (props: {
  portal: Portal;
  contextTypes: ContextType[];
}) => {
  const { id, contexts } = props.portal;
  const { mutateAsync: updatePortal } = useUpdatePortal(id);

  const [contextEnabled, setContextEnabled] = useState<boolean>();
  const [editContextTypes, setEditContextTypes] = useState<boolean>(false);

  useEffect(() => {
    if (contexts && contexts?.length > 0) setContextEnabled(true);
  }, [contexts]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<PortalEditInputs>({
    resolver: zodResolver(portalEditInputSchema),
    defaultValues: {
      ...props.portal,
      contextTypes: props.portal.contexts.map((a) => a.type),
    },
  });

  const onSubmit: SubmitHandler<PortalEditInputs> = async (editedPortal) => {
    await updatePortal(editedPortal);
  };

  return (
    <Style.Wrapper>
      <Style.Card>
        <Style.Heading variant="h3">Details</Style.Heading>
        <Style.From onSubmit={handleSubmit(onSubmit)} id="test">
          <TextField
            {...register("id")}
            id="textfield-id"
            readOnly
            variant={errors.name && "error"}
            helperText={errors.name?.message}
            inputIcon={
              errors.name && <Icon data={error_filled} title="Error" />
            }
            label="Portal ID *"
            maxLength={51}
          />

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
            label="Short Name *"
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
            rows={3}
            multiline
            {...register("description")}
            id="textfield-description"
            variant={errors.description && "error"}
            helperText={errors.description?.message}
            inputIcon={
              errors.description && <Icon data={error_filled} title="Error" />
            }
            label="Description"
            maxLength={501}
          />
        </Style.From>
      </Style.Card>

      <Style.Card>
        <Style.Heading variant="h3">Icon</Style.Heading>
        <Style.Row>
          <div>
            <Label label="Icon Preview" htmlFor="icon-preview" />
            <Style.IconWrapper id="icon-preview">
              {watch().icon && Object.keys(AllIcons).includes(watch().icon) ? (
                <Icon name={watch().icon} size={48} />
              ) : (
                <Style.Icon
                  dangerouslySetInnerHTML={{
                    __html: watch().icon.replace(/\s+/g, " ").trim(),
                  }}
                />
              )}
            </Style.IconWrapper>
          </div>
          <TextField
            rows={5}
            multiline
            {...register("icon")}
            id="textfield-icon"
            variant={errors.icon && "error"}
            helperText={errors.icon?.message}
            inputIcon={
              errors.icon && <Icon data={error_filled} title="Error" />
            }
            label="Icon"
          />
        </Style.Row>
      </Style.Card>
      <Style.Card>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Style.Heading variant="h3">Context</Style.Heading>
          <div>
            <Button
              onClick={() =>
                setEditContextTypes((value) => {
                  return !value;
                })
              }
              variant="ghost_icon"
            >
              <Icon data={edit} />
            </Button>
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
          options={props.contextTypes?.map((ct) => ct.type) || []}
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

      {editContextTypes && (
        <Style.Card>
          <EditContextTypeForm />
        </Style.Card>
      )}
      <Style.Card>
        <Button form="test" type="submit" disabled={isSubmitting}>
          Save
        </Button>
      </Style.Card>
    </Style.Wrapper>
  );
};
