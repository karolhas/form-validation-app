"use client";

//hooks
import { useState } from "react";

//components
import { Button } from "./button";
import { Input } from "./input";
import ButtonSwitcher from "../ButtonSwitcher";
import * as S from "./select";

interface FormData {
  name: string;
  password: string;
  country: string;
  duration: number;
}

export const Form = () => {
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

    // Loguj dane, które wysyłasz do API
    console.log("Data to send:", { ...formData, isPrivate });

    const response = await fetch("/api/validateForm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, isPrivate }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.message); // Walidacja zakończona sukcesem
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

  return (
    <form
      className="flex flex-col gap-6 mt-5 mx-auto w-full max-w-[600px]"
      onSubmit={handleSubmit}
    >
      <h3 className="text-2xl font-semibold">Example Form</h3>
      <ButtonSwitcher onSwitch={handleSwitch} />
      <div>
        <div className={"text-sm font-semibold text-gray-700 block mb-[6px]"}>
          Name
        </div>
        <Input
          id="name"
          placeholder={"Name..."}
          className="w-full"
          value={formData.name}
          onChange={handleInputChange}
        />
        {errors.name && <div className="text-red-500">{errors.name}</div>}
      </div>
      {isPrivate === "Private" && (
        <div>
          <div className={"text-sm font-semibold text-gray-700 block mb-[6px]"}>
            Password
          </div>
          <Input
            id="password"
            type="password"
            placeholder={"Password..."}
            className="w-full"
            value={formData.password}
            onChange={handleInputChange}
          />
          {errors.password && (
            <div className="text-red-500">{errors.password}</div>
          )}
        </div>
      )}
      <div>
        <div className={"text-sm font-semibold text-gray-700 block mb-[6px]"}>
          Country
        </div>
        <S.Select
          value={formData.country}
          onValueChange={(value) => handleCountryChange(value)}
        >
          <S.SelectTrigger className="w-full" id="country">
            <S.SelectValue
              placeholder={
                <span className="text-gray-500">{"Select Country..."}</span>
              }
            />
          </S.SelectTrigger>
          <S.SelectContent className="bg-white text-black">
            {allowedCountries.map((country) => (
              <S.SelectItem key={country} value={country}>
                {country}
              </S.SelectItem>
            ))}
          </S.SelectContent>
        </S.Select>
        {errors.country && <div className="text-red-500">{errors.country}</div>}
      </div>
      <div>
        <div className={"text-sm font-semibold text-gray-700 block mb-[6px]"}>
          Duration (Days)
        </div>
        <Input
          data-testId="duration"
          id="duration"
          type="number"
          className="w-full"
          value={formData.duration}
          onChange={handleInputChange}
        />
        {errors.duration && (
          <div className="text-red-500">{errors.duration}</div>
        )}
      </div>
      <div className="flex justify-center gap-4 mt-10">
        <Button>Reset</Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};
