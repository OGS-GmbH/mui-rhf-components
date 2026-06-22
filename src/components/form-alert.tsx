"use client"

import { Alert, Fade } from "@mui/material";
import { useMemo, type ComponentPropsWithRef } from "react";
import { useFormContext } from "react-hook-form";

type FormAlertProps = Omit<ComponentPropsWithRef<typeof Fade>, "children"> & Partial<{
  slotProps: Partial<{
    alert: ComponentPropsWithRef<typeof Alert>
  }>
}>;

function FormAlert({
  slotProps,
  ...props
}: FormAlertProps) {
  const form = useFormContext();
  const error = useMemo(() => form.formState.errors["root"], [form]);

  return (
    <Fade
      in={Boolean(error)}
      unmountOnExit
      appear
      {...props}
    >
      <Alert severity="error" {...slotProps?.alert}>
        {error?.message}
      </Alert>
    </Fade>
  );
}

export type {
  FormAlertProps
}

export { FormAlert };
