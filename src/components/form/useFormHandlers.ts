"use client";

//hooks
import { useState } from "react";

interface FormData {
  name: string;
  password: string;
  country: string;
  duration: number;
}

export const useFormHandlers = () => {
  const [isPrivate, setIsPrivate] = useState("Private");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<FormData>({
    name: "",
    password: "",
    country: "",
    duration: 1,
  });

  const allowedCountries =
    isPrivate === "Private"
      ? ["Poland", "Germany"]
      : ["Poland", "Germany", "France", "Spain"];

  const handleSwitch = (value: string) => {
    setIsPrivate(value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const response = await fetch("/api/validateForm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, isPrivate }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.message);
      setErrors({});
    } else {
      const data = await response.json();
      setErrors(data.errors || {});
    }
  };

  const handleInputChange = (e: any) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: id === "duration" ? parseInt(value, 10) : value,
    }));
  };

  const handleCountryChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      country: value,
    }));

    setErrors((prevErrors) => {
      const { country, ...rest } = prevErrors;
      return rest;
    });
  };

  const resetForm = () => {
    setFormData({ name: "", password: "", country: "", duration: 1 });
    setErrors({});
  };

  return {
    isPrivate,
    errors,
    formData,
    allowedCountries,
    handleSwitch,
    handleSubmit,
    handleInputChange,
    handleCountryChange,
    resetForm,
  };
};
