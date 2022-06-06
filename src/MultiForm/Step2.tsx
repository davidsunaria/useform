import React, { useCallback, useState, useMemo ,useContext} from "react";
import { Modal, FormControl, Button, InputGroup } from "react-bootstrap";
import Input from "../component/Input";
import { useAuthValidation } from "../validation";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormContext from "../MultiFormContext"

const Step2 = ({ previousStep, nextStep }: any) => {
  console.log()
  const { formSchema2 } = useAuthValidation();
  const { step1Data, dataSubmit ,onNext,onBack}:any = useContext(FormContext);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    control,
  } = useForm({ resolver: yupResolver(formSchema2), mode: "all" });

  const onSubmit = (data: any) => {
    dataSubmit(data,2)
    nextStep()
   // onNext(2)
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-5">
            <h2>Personal Detail</h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ position: "relative" }}
            >
              <InputGroup className="mb-2">
                <Input
                  name="age"
                  register={register}
                  error={errors}
                  placeholder="age"
                />
              </InputGroup>
              <InputGroup className="mb-2">
                <Input
                  name="height"
                  register={register}
                  error={errors}
                  placeholder="height"
                />
              </InputGroup>
              <InputGroup className="mb-2">
                <Input
                  name="weight"
                  register={register}
                  error={errors}
                  placeholder="weight"
                />
              </InputGroup>
              <InputGroup className="mb-2">
                <button className="btn btn-info" onClick={() => previousStep()}>
                  Previous
                </button>
                <button
                  type="submit"
                  className="btn btn-info mx-5"
                >
                  Next
                </button>
              </InputGroup>
            </form>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </>
  );
};

export default Step2;
