import { FormProvider, useForm } from "react-hook-form";
import JobFormFields from "./JobFormField";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function JobForm({ mode = "create", initialValues = {}, onSubmit, loading }) {
  const methods = useForm({ defaultValues: {} }); // keep empty for create

  // When initialValues change (edit mode), reset form
  useEffect(() => {
    if (mode === "edit" && Object.keys(initialValues).length > 0) {
      methods.reset(initialValues);
    }
  }, [mode, initialValues, methods]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        <JobFormFields />
        <Button type="submit"  disabled={loading} className=" w-full">
          {loading ? "Saving..." : mode === "create" ? "Post Job" : "Update Job"}
        </Button>
      </form>
    </FormProvider>
  );
}
