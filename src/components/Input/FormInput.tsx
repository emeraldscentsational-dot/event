import React from "react";
import {
  UseFormRegister,
  FieldValues,
  FieldError,
  Path,
} from "react-hook-form";
import { LucideIcon } from "lucide-react";

interface FormInputProps<T extends FieldValues> {
  label?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
  type?: string;
  placeholder?: string;
  icon?: LucideIcon;
  required?: boolean;
  disabled?: boolean;
  validation?: object; // 👈 this allows dynamic validation like minLength
}


export function FormInput<T extends FieldValues>({
  label,
  name,
  register,
  error,
  type = "text",
  placeholder,
  icon: Icon,
  required = false,
  disabled = false,
  validation,
}: FormInputProps<T>) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-3.5 text-gray-400">
            <Icon className="h-5 w-5" />
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full rounded-lg border border-gray-300 bg-white
            ${Icon ? "pl-12" : "px-4"} pr-4 py-3
            focus:ring-2 focus:ring-teal-500 focus:border-teal-500
            disabled:bg-gray-50 disabled:text-gray-500
            ${
              error
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : ""
            }`}
          {...register(name, {
            required: required ? 'This field is required' : false,
            ...validation,
          })}
        />
      </div>
      {error && <p className="text-sm text-red-600 mt-1">{error.message}</p>}
    </div>
  );
}

