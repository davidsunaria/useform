import React, { useMemo } from "react";
import { start } from "repl";
import * as Yup from "yup";
import { customMessage } from "./errorField";


const useAuthValidation = () => {
  const formSchema = useMemo(
    () =>
      Yup.object({
        description: Yup.string()
          .max(10, customMessage("description", { max: 10 }))
          .required(customMessage("description", { required: true })),
        firstName: Yup.string().required(
          customMessage("name", { required: true })
        ),
        city: Yup.string()
          .max(3, customMessage("city", { max: 3 }))
          .min(2, customMessage("city", { min: 2 }))
          .required(customMessage("city", { required: true })),

        varient: Yup.array().of(
          Yup.object().shape({
            feature: Yup.string()
              .required(customMessage("feature", { required: true }))
              .max(5, customMessage("feature", { max: 5 })),
              value: Yup.string()
              .required(customMessage("value", { required: true }))
              .max(2, customMessage("value", { max: 2 })),
          })
        ),
      }),
    []
  );

  const formSchema2 = useMemo(
    () =>
      Yup.object({
         age: Yup.number().required(customMessage("age", { number: true })),
         height: Yup.number().required(customMessage("height", { number: true })),
         weight: Yup.number().required(customMessage("weight", { number: true }))
       // age: Yup.number().integer( customMessage("age", { number: true }))
      }),
    []
  );

  const formSchema3 = useMemo(
    () =>
      Yup.object({
        salary: Yup.number().required(customMessage("salary", { number: true })),
        profile: Yup.string().required(
          customMessage("profile", { required: true })
        ),
        experience: Yup.string().required(customMessage("experience", { required: true }))
      }),
    []
  );
  

  return { formSchema ,formSchema2, formSchema3};
};

export { useAuthValidation };
