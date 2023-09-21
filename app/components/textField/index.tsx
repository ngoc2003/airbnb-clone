"use client";

import { HTMLInputTypeAttribute, useMemo } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface TextFieldProps {
  id: string;
  label?: string;
  type?: HTMLInputTypeAttribute;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  hasValue: boolean;
  rows?: number;
}

const TextField = ({
  rows,
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  register,
  required,
  errors,
  hasValue,
}: TextFieldProps) => {
  const inputClass = useMemo(
    () => `
  peer
  w-full
  p-4
  font-light 
  bg-white 
  border-2
  rounded-md
  outline-none
  transition
  disabled:opacity-70
  disabled:cursor-not-allowed
  ${label && "pt-6"}
  ${formatPrice ? "pl-9" : "pl-4"}
  ${errors[id] ? "border-rose-500" : "border-neutral-300"}
  ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
`,
    [errors, formatPrice, id, label]
  );
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="
            text-neutral-700
            absolute
            top-5
            left-2
          "
        />
      )}
      {rows ? (
        <textarea
          rows={rows}
          id={id}
          disabled={disabled}
          {...register(id, { required })}
          placeholder=""
          className={`${inputClass} resize-none`}
        />
      ) : (
        <input
          id={id}
          disabled={disabled}
          {...register(id, { required })}
          placeholder=""
          type={type}
          className={inputClass}
        />
      )}
      {label && (
        <label
          className={`
          absolute 
          text-md
          duration-150 
          transform 
          -translate-y-3 
          top-5 
          z-10 
          origin-[0] 
          ${formatPrice ? "left-9" : "left-4"}
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${
            hasValue
              ? "scale-75 -translate-y-4"
              : `peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4`
          }
          ${errors[id] ? "text-rose-500" : "text-zinc-400"}
        `}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default TextField;
