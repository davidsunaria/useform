import React, { FC, Fragment, ReactNode, useEffect, useState } from "react";
import logo from "./logo.svg";
import { useForm } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";

interface InputProps {
  register:any
  method?: any;
  name?: any;
  required?: boolean;
  max?: number;
  email?: boolean;
  errMessage?: string;
  error?:any;
  className?:any;
  placeholder?:string
}

const Input: FC<InputProps> = ({ name ,register,errMessage,error,className,placeholder }) => {
  // const {
  //   register,
  //   formState: { errors },
  // } = useForm();
  return (
    <>
      <input
          {...register(name)}
          className={className}
          placeholder={placeholder}
        /> 
     
      {/* <ErrorMessage message={errMessage} /> */}
   <ErrorMessage message={error[name]?.message} /> 
    </>
  );
};

export default Input;
