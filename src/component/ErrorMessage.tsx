import React, { FC, Fragment, ReactNode, useEffect, useState } from "react";
import logo from './logo.svg';


interface ErrorProps {
  message?:string
  }

const ErrorMessage: FC<ErrorProps> = ({message})=>{
   
    return(
        <>
       <p>{message}</p>
   </>
    )
}
  

export default ErrorMessage;
