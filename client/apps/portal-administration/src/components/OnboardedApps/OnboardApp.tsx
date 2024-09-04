import {
  Card,
  Button,
  Typography,
  Autocomplete,
} from "@equinor/eds-core-react";

import { zodResolver } from "@hookform/resolvers/zod";

import styled from "styled-components";

import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { OnboardAppInputs, onboardAppInput } from "../../schema/app";
import {
  useAddOnboardedApp,
  useOnboardedApps,
} from "../../hooks/use-onboarded-apps";
import { useGetContextTypes } from "../../hooks/use-context-type-query";
import { AppSelector } from "./AppSelector";

const Style = {
  Wrapper: styled.div`
    padding: 1rem;
    gap: 1rem;
    display: flex;
    flex-direction: column;
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
};

export const OnboardApp = () => {
  const { mutateAsync: createApp, reset: resetCreate } = useAddOnboardedApp();
  const { data } = useOnboardedApps();

  const { data: contextTypes } = useGetContextTypes();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    watch,
    setValue,
    clearErrors,
  } = useForm<OnboardAppInputs>({
    resolver: zodResolver(onboardAppInput),
    defaultValues: {
      contextTypes: [],
    },
  });
  const appKey = watch().appKey;

  useEffect(() => {
    if (Boolean(data?.find((onboardedApp) => onboardedApp.appKey === appKey))) {
      setError("appKey", {
        message: `App with appKey ${appKey} is already onboarded.`,
      });
    }
  }, [data, appKey]);

  const onSubmit: SubmitHandler<OnboardAppInputs> = async (app) => {
    await createApp(app);
    resetCreate();
    setValue("appKey", "");
  };

  return (
    <Style.Wrapper>
      <Style.Card>
        <Style.Heading variant="h3">Onboard App</Style.Heading>
        <Style.From onSubmit={handleSubmit(onSubmit)} id="test">
          <AppSelector
            errors={errors.appKey}
            message={errors.appKey?.message}
            onChange={(app) => {
              clearErrors("appKey");
              if (app) {
                setValue("appKey", app.id);
              } else {
                setValue("appKey", "", { shouldDirty: true });
              }
            }}
          />
          <Autocomplete
            id="textfield-context-types"
            multiple
            variant={errors.contextTypes && "error"}
            helperText={errors.contextTypes?.message}
            options={contextTypes?.map((ct) => ct.type) || []}
            selectedOptions={watch().contextTypes}
            onOptionsChange={({ selectedItems }) => {
              setValue("contextTypes", selectedItems);
            }}
            itemCompare={(item, compare) => {
              return item === compare;
            }}
            label="Context Types"
          />
        </Style.From>
        <Button
          form="test"
          type="submit"
          disabled={isSubmitting || Boolean(errors.appKey)}
        >
          Save
        </Button>
      </Style.Card>
    </Style.Wrapper>
  );
};
