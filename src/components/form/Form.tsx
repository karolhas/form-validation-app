"use client";

//components
import { FormHeader } from "./FormHeader";
import { FormFields } from "./FormFields";
import { FormButtons } from "./FormButtons";
import { useFormHandlers } from "./useFormHandlers";

export const Form = () => {
  const {
    isPrivate,
    errors,
    formData,
    allowedCountries,
    handleSwitch,
    handleSubmit,
    handleInputChange,
    handleCountryChange,
    resetForm,
  } = useFormHandlers();

  return (
    <form
      className="flex flex-col gap-6 mt-5 mx-auto w-full max-w-[600px]"
      onSubmit={handleSubmit}
    >
      <FormHeader isPrivate={isPrivate} handleSwitch={handleSwitch} />
      <FormFields
        formData={formData}
        errors={errors}
        allowedCountries={allowedCountries}
        isPrivate={isPrivate}
        handleInputChange={handleInputChange}
        handleCountryChange={handleCountryChange}
      />
      <FormButtons resetForm={resetForm} />
    </form>
  );
};
