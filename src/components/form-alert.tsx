"use client";

import { Alert, Fade } from "@mui/material";
import { useMemo, type ComponentPropsWithRef } from "react";
import { useFormContext } from "react-hook-form";

/**
 * Props for {@link FormAlert}
 *
 * @category FormAlert
 * @since 1.0.0
 * @author Simon Kovtyk
 */
type FormAlertProps = Omit<ComponentPropsWithRef<typeof Fade>, "children"> &
  Partial<{
    slotProps: Partial<{
      alert: ComponentPropsWithRef<typeof Alert>;
    }>;
  }>;

/**
 * Component for displaying global form errors
 * @param props - {@link FormAlertProps}
 * @returns A `ReactNode`
 *
 * @example
 * ```tsx
 * import { z } from "zod";
 * import { useForm } from "react-hook-form";
 * import { zodResolver } from "@hookform/resolvers/zod";
 *
 * function MyForm () {
 *   const schema = useMemo(() => z.object({
 *     field: z.string().nonempty()
 *   }), []);
 *
 *   const form = useForm({
 *     resolver: zodResolver(schema),
 *     defaultValues: {
 *       field: ""
 *     }
 *   });
 *
 *   const handleSubmit = useCallback((data: z.infer<typeof schema>) => {
 *     // Your validation logic...
 *     form.setError("root", {
 *       message: "Form Alert"
 *     });
 *   }, [form]);
 *
 *   return (
 *     <FormProvider {...form}>
 *       <form onSubmit={form.handleSubmit(handleSubmit)}>
 *         <FormAlert />
 *         <button type="submit">Show alert</button>
 *       </form>
 *     </FormProvider>
 *   );
 * }
 * ```
 *
 * @category FormAlert
 * @since 1.0.0
 * @author Simon Kovtyk
 */
function FormAlert({ slotProps, ...props }: FormAlertProps) {
  const form = useFormContext();
  const error = useMemo(() => form.formState.errors["root"], [form]);

  return (
    <Fade in={Boolean(error)} unmountOnExit appear {...props}>
      <Alert severity="error" {...slotProps?.alert}>
        {error?.message}
      </Alert>
    </Fade>
  );
}

export type { FormAlertProps };

export { FormAlert };
