import React, { useCallback, useState, useMemo ,useContext} from "react";
import { Modal, FormControl, Button, InputGroup } from "react-bootstrap";
import Input from "../component/Input";
import { useAuthValidation } from "../validation";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormContext from "../MultiFormContext"

const Step3 = ({ previousStep, nextStep }: any) => {
  const { formSchema3 } = useAuthValidation();
  const {  dataSubmit ,onNext,onBack}:any = useContext(FormContext);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    control,
  } = useForm({ resolver: yupResolver(formSchema3), mode: "all" });

  const onSubmit = (data: any) => {
    dataSubmit(data,3)
    nextStep()
    //onNext(3)
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-5">
            <h2>Professional Status</h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ position: "relative" }}
            >
            <InputGroup className="mb-2">
              <Input
                name="salary"
                register={register}
                error={errors}
                placeholder="salary"
              />
            </InputGroup>
            <InputGroup className="mb-2">
              <Input
                name="profile"
                register={register}
                error={errors}
                placeholder="profile"
              />
            </InputGroup>
            <InputGroup className="mb-2">
              <Input
                name="experience"
                register={register}
                error={errors}
                placeholder="experience"
              />
            </InputGroup>
            <InputGroup className="mb-2">
              <button className="btn btn-info" onClick={() => previousStep()}>
                Previous
              </button>
              <button className="btn btn-info mx-5">
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

export default Step3;
