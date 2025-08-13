import { Button } from "@/components/ui/button";
import Input from "@/UI-Components/Input";
import TextEditor from "@/UI-Components/TextEditor";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";


const TeamMemberForm = ({ onSubmit, onCancel, defaultValues, loading }) => {
  const methods = useForm({
    defaultValues: {
      name: "",
      description: "",
      photo: null,
      ...defaultValues,
    },
  });

  const { handleSubmit, register } = methods;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-lg p-4"
      >
        <Input
          label="Name"
          {...register("name", { required: "Name is required" })}
        />

        <div className="mt-4">
          <TextEditor
            name="description"
            label="Description"
            placeholder="Enter description..."
            rules={{ required: "Description is required" }}
            maxLength={500}
            minLength={10}
          />
        </div>

        <div className="mt-4">
          <label className="app-text-label font-medium text-blue-900">
            Upload Photo
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("photo")}
            className="mt-2"
          />
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <Button
            type="submit"
            variant="success"
            className={`${
              loading ? "opacity-50" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={onCancel}
            className=""
            disabled={loading}
          >
            Cancel
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default TeamMemberForm;
