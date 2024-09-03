//hooks
import { useState } from "react";

//components
import { Input } from "../ui/input";
import * as S from "../ui/select";

//icons
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface FormFieldsProps {
  formData: any;
  errors: Record<string, string>;
  allowedCountries: string[];
  isPrivate: string;
  handleInputChange: (e: any) => void;
  handleCountryChange: (value: string) => void;
}

export const FormFields: React.FC<FormFieldsProps> = ({
  formData,
  errors,
  allowedCountries,
  isPrivate,
  handleInputChange,
  handleCountryChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
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
        <div className="relative">
          <div className={"text-sm font-semibold text-gray-700 block mb-[6px]"}>
            Password
          </div>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder={"Password..."}
            className="w-full pr-10"
            value={formData.password}
            onChange={handleInputChange}
          />
          <div
            className="absolute right-3 top-[38px] flex items-center cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </div>
          {errors.password && (
            <div className="text-red-500">{errors.password}</div>
          )}
        </div>
      )}

      <div>
        <div className={"text-sm font-semibold text-gray-700 block mb-[6px]"}>
          Country
        </div>
        <S.Select value={formData.country} onValueChange={handleCountryChange}>
          <S.SelectTrigger className="w-full" id="country">
            <S.SelectValue
              placeholder={
                <span className="text-gray-500">{"Select Country..."}</span>
              }
            />
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
    </>
  );
};
