/* eslint-disable @next/next/no-img-element */
import { ChangeEvent, useState } from "react";
import { AiFillEyeInvisible } from "react-icons/ai";

interface Props {
  type?: string;
  label: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  disabled?: boolean;
  icon?: string;
  name: string;
}

const FormInput = ({ type = 'text', label, disabled = false,
  placeholder, value, onChange, icon, name} : Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  
  return (
    <div className="w-full">
      <p
        className="text-[14px] text-appGray4 font-medium"
      >{label}</p>
      <div
        className="flex flex-row items-center h-[40px] border border-appGray1 rounded mt-[9px] px-[10px] focus-within:border-appBlue"
      >
        {icon && (
          <img 
            src={icon}
            alt=""
            className="w-[15px] h-[15px] mr-[10px]"
          />
        )}
        <input
          id={name}
          name={name}
          type={type !== "password" ? type : showPassword ? "text" : type}
          className="w-full text-appBlack text-[16px] ring-0 outline-none"
          placeholder={placeholder} 
          disabled={disabled}
          value={value}
          onChange={onChange}
        />
        {type === "password" && (
          <button
            className="ml-[10px]"
            onClick={() => setShowPassword(!showPassword)}
          >
            {!showPassword ? (
              <img 
                src="eye.svg"
                alt=""
                className="w-[18px] h-[24px]"
              />
            ) : (
              <AiFillEyeInvisible 
                size={20}
                color="#B7B9BF"
              />
            )}
          </button>
        )}
      </div>
    </div>
  )
}

export default FormInput;
