import { Button, Icon, Typography, TextField } from "@equinor/eds-core-react";

import { zodResolver } from "@hookform/resolvers/zod";

import styled from "styled-components";

import { ContextTypeInputs, contextTypeSchema } from "../schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { error_filled, remove } from "@equinor/eds-icons";
import {
  useCreateContextType,
  useGetContextTypes,
  useRemoveContextType,
} from "../hooks/use-context-type-query";

const Style = {
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
};

export const EditContextTypeForm = ({ onClose }: { onClose: VoidFunction }) => {
  const {
    mutateAsync: createContextType,
    reset: resetCreate,
    data,
  } = useCreateContextType();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<ContextTypeInputs>({
    resolver: zodResolver(contextTypeSchema),
  });

  const onSubmit: SubmitHandler<ContextTypeInputs> = async (newContextType) => {
    console.log(newContextType);
    const contextType = await createContextType(newContextType);

    if (contextType) {
      reset();
      resetCreate();
      onClose();
    }
  };

  const { data: contextTypes } = useGetContextTypes();
  const { mutateAsync: removeContextType } = useRemoveContextType();

  return (
    <Style.From onSubmit={handleSubmit(onSubmit)} id="context-type-form">
      <Style.Heading variant="h3">Edit Context Types</Style.Heading>
      <Typography>
        If the desired context type is not available, you can add it here.
        Please note that only valid fusion context types are permitted.
      </Typography>
      <TextField
        {...register("type")}
        id="textfield-context-type"
        variant={errors.type && "error"}
        helperText={errors.type?.message}
        inputIcon={errors.type && <Icon data={error_filled} title="Error" />}
        label="Type *"
        maxLength={31}
      />
      <Button form="context-type-form" type="submit" disabled={isSubmitting}>
        Add
      </Button>
      <Button
        onClick={() => removeContextType(watch("type"))}
        disabled={!Boolean(contextTypes?.find((c) => c.type === watch("type")))}
      >
        Remove
      </Button>
      <Button onClick={() => onClose()}>Done</Button>
      {contextTypes?.map((t) => (
        <div key={t.type}>{t.type}</div>
      ))}
    </Style.From>
  );
};
