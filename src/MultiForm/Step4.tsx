import React, {useContext } from "react";
import { Form ,InputGroup} from "react-bootstrap";
import { useForm} from "react-hook-form";
import FormContext from "../MultiFormContext"
import {  toast } from 'react-toastify';

const Step4 = ({ previousStep, nextStep }: any) => {

  const {  dataSubmit}:any = useContext(FormContext);
  const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = (data: any) => {
    dataSubmit(data,4)
    if(data.agree===true){
      toast("successfully submitted")
    }
    
   // nextStep()
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <h4>Term & Condition</h4>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ position: "relative" }}
            >
            <Form.Check
               {...register("agree")}
              type={"checkbox"}
              label={"Do u agree with all term and condition"}
              id={`enabled-default-${"checkbox"}`}
            />
             <InputGroup className="mt-4">
              <button className="btn btn-info" onClick={() => previousStep()}>
                Previous
              </button>
              <button className="btn btn-info mx-5" >
                Submit
              </button>
            </InputGroup>
            </form>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </>
  );
  
};

export default Step4;
