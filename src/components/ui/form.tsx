import { Button } from "./button";
import ButtonSwitcher from "../ButtonSwitcher";
import { Input } from "./input";
import * as S from "./select";

export const Form = () => {
  return (
    <form className="flex flex-col gap-6 mt-5 mx-auto w-full max-w-[600px]">
      <h3 className="text-2xl font-semibold">Example Form</h3>
      <ButtonSwitcher />
      <div>
        <div className={"text-sm font-semibold text-gray-700 block mb-[6px]"}>
          Name
        </div>
        <Input id="name" placeholder={"Name..."} className="w-full" />
      </div>
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
