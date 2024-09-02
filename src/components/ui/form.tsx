"use client";

//hooks
import { useState } from "react";

//components
import { Button } from "./button";
import { Input } from "./input";
import ButtonSwitcher from "../ButtonSwitcher";
import * as S from "./select";

export const Form = () => {
  const [isPrivate, setIsPrivate] = useState("Private");

  const handleSwitch = (value: string) => {
    setIsPrivate(value);
  };

  return (
    <form className="flex flex-col gap-6 mt-5 mx-auto w-full max-w-[600px]">
      <h3 className="text-2xl font-semibold">Example Form</h3>
      <ButtonSwitcher onSwitch={handleSwitch} />
      <div>
        <div className={"text-sm font-semibold text-gray-700 block mb-[6px]"}>
          Name
        </div>
        <Input id="name" placeholder={"Name..."} className="w-full" />
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
          />
        </div>
      )}
      <div>
        <div className={"text-sm font-semibold text-gray-700 block mb-[6px]"}>
          Country
        </div>
        <S.Select>
          <S.SelectTrigger className="w-full" id={"country"}>
            <S.SelectValue
              placeholder={
                <span className="text-gray-500">{"Select Country..."}</span>
              }
            />
          </S.SelectTrigger>
          <S.SelectContent>
            {[].map(({ value, div }) => (
              <S.SelectItem key={value} value={value}>
                {div}
              </S.SelectItem>
            ))}
          </S.SelectContent>
        </S.Select>
      </div>
      <div>
        <div className={"text-sm font-semibold text-gray-700 block mb-[6px]"}>
          Duration (Days)
        </div>
        <Input
          data-testId="duration"
          id="name"
          type="number"
          defaultValue={1}
          className="w-full"
        />
      </div>
      <div className="flex justify-center gap-4 mt-10">
        <Button>Reset</Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};
