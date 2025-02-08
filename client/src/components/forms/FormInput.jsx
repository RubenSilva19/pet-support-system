import React from "react";
import { useField } from "formik";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
const FormInput = ({ label, ...props }) => {
  // useField connects the input to Formik state and returns field props and meta data.
  // useField() returns [field, meta] where:
  // - field contains { name, value, onChange, onBlur }
  // - meta contains information about the field state (error, touched, etc.)
  const [field, meta] = useField(props);
  //to avoid te warning on id its better the calculate the id here
  const inputId = props.id || `input-${props.name}`;
  const showError = meta.touched && !!meta.error;
  const showValid = meta.touched && !meta.error;
  return (
    <div className="mb-4">
      {label && (
        <label
          // htmlFor={props.id || props.name}
          htmlFor={inputId}
          className={`block mb-2  font-medium text-lg ${
            showError ? "text-red-500" : "text-black"
          }`}
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={inputId}
          {...field}
          {...props}
          className={`appearance-none border border-gray-300 py-3.5 px-3 rounded  w-full text-[#272727]
             placeholder:text-gray-400 placeholder:font-light
              font-medium focus:outline-none 
            ${
              showError
                ? "border-red-500 bg-red-50 text-red-500"
                : "border-gray-300"
            }
          `}
        />

        {showValid && (
          <span className="absolute inset-y-0 right-3 flex items-center">
            <CheckCircleIcon className="h-7 w-7 text-green-500" />
          </span>
        )}

        {showError && (
          <div className="text-red-500 text-sm mt-2 flex gap-2">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <span>{meta.error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormInput;
