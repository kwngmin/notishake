import { InputHTMLAttributes } from "react";

interface FormInputProps {
  name: string;
  label?: string;
  errors?: string[];
}

const Input = ({
  label,
  name,
  errors = [],
  ...rest
}: FormInputProps & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-semibold text-neutral-500">
          {label}
        </label>
      )}
      <input
        name={name}
        className="input-base placeholder:text-neutral-400 placeholder:text-sm"
        {...rest}
      />
      {errors && errors.length > 0 && (
        <div className="flex flex-col gap-1 mt-2">
          {errors.map((error, index) => (
            <div
              className="text-rose-500 text-sm font-medium flex items-center gap-1"
              key={index}
            >
              <span className="material-symbols-rounded material-fill text-lg">
                error
              </span>
              {error}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Input;
