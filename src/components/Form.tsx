"use client";

//hooks
import { useState } from "react";
import { useForm } from "react-hook-form";

// components
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import * as S from "./ui/select";
import ButtonSwitcher from "./ButtonSwitcher";

//icons
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface FormData {
  name: string;
  password: string;
  country: string;
  duration: number;
}

export const Form = () => {
  const [isPrivate, setIsPrivate] = useState("Private");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FormData>();

  const allowedCountries =
    isPrivate === "Private"
      ? ["Poland", "Germany"]
      : ["Poland", "Germany", "France", "Spain"];

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const onSubmit = async (data: FormData) => {
    const response = await fetch("/api/validateForm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, isPrivate }),
    });

    const result = await response.json();
    if (response.ok) {
      console.log("Success:", result);
      reset();
      setValue("country", "");
    } else {
      console.log("Errors:", result.errors);
    }
  };

  const handleReset = () => {
    reset();
    setValue("country", "");
  };

  const selectedCountry = watch("country");

  return (
    <form
      className="flex flex-col gap-6 mt-5 mx-auto w-full max-w-[600px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="text-2xl font-semibold">Example Form</h3>
      <ButtonSwitcher onSwitch={setIsPrivate} />
      <div>
        <label className="text-sm font-semibold text-gray-700 block mb-[6px]">
          Name
        </label>
        <Input
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 3,
              message: "Name must be at least 3 characters",
            },
            maxLength: {
              value: 50,
              message: "Name must be less than 50 characters",
            },
          })}
          placeholder="Name..."
          className="w-full"
        />
        {errors.name && (
          <div className="text-red-500">{errors.name.message}</div>
        )}
      </div>

      {isPrivate === "Private" && (
        <div className="relative">
          <label className="text-sm font-semibold text-gray-700 block mb-[6px]">
            Password
          </label>
          <Input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must include uppercase, lowercase, number and special character",
              },
            })}
            type={showPassword ? "text" : "password"}
            placeholder="Password..."
            className="w-full pr-10"
          />
          <div
            className="absolute right-3 top-[38px] flex items-center cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </div>
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
        </div>
      )}

      <div>
        <label className="text-sm font-semibold text-gray-700 block mb-[6px]">
          Country
        </label>
        <S.Select
          value={selectedCountry}
          onValueChange={(value) =>
            setValue("country", value, { shouldValidate: true })
          }
        >
          <S.SelectTrigger className="w-full" id="country">
            <S.SelectValue placeholder="Select Country..." />
          </S.SelectTrigger>
          <S.SelectContent className="bg-white text-gray-700">
            {allowedCountries.map((country) => (
              <S.SelectItem
                key={country}
                value={country}
                className="hover:bg-gray-100 cursor-pointer"
              >
                {country}
              </S.SelectItem>
            ))}
          </S.SelectContent>
        </S.Select>
        {errors.country && (
          <div className="text-red-500">{errors.country.message}</div>
        )}
      </div>

      <div>
        <label className="text-sm font-semibold text-gray-700 block mb-[6px]">
          Duration (Days)
        </label>
        <Input
          {...register("duration", {
            required: "Duration is required",
            min: { value: 1, message: "Duration must be at least 1 day" },
            max:
              isPrivate === "Private"
                ? { value: 20, message: "Duration cannot exceed 20 days" }
                : undefined,
          })}
          type="number"
          className="w-full"
        />
        {errors.duration && (
          <div className="text-red-500">{errors.duration.message}</div>
        )}
      </div>

      <div className="flex justify-center gap-4 mt-10">
        <Button type="button" onClick={handleReset}>
          Reset
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};
