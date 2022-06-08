import React, { useCallback, useState, useMemo, useEffect } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import StepWizard from "react-step-wizard";
import useEffectAsync from "../useEffectAsync";
import axios from "axios";
import { Provider } from "../MultiFormContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Detail from "../Detail";

interface IFormStepOne {
  
}
interface IFormStepTwo {
  
}
interface IFormStepThree {
  
}
interface IFormStepFour {
  
}
const MultiForm = () => {
  const [step1Data, setStep1Data] = useState<IFormStepOne>({});
  const [step2Data, setStep2Data] = useState<IFormStepTwo>({});
  const [step3Data, setStep3Data] = useState<IFormStepThree>({});
  const [step4Data, setStep4Data] = useState<IFormStepFour>({});
  const [lastData, setLastData] = useState<any>({});
  const [isSubmitted, setSubmit] = useState<boolean>(false);
  const [isCreated, setCreated] = useState<boolean>(false);

  const changeStep = (first: any, sec: any) => {
    console.log("chaneg", first, sec);
  };

  const dataSubmit = (value: any, step: number) => {
    if (step === 1) {
      setStep1Data(value);
    } else if (step === 2) {
      setStep2Data(value);
    } else if (step === 3) {
      setStep3Data(value);
    } else if (step === 4) {
      setStep4Data(value);
      if (value.agree === true) {
        setSubmit(true);
      }
    }
  };

  useEffectAsync(async () => {
    let finalData = { ...step1Data, ...step2Data, ...step3Data, ...step4Data };
   // setLastData(finalData);
    if (isSubmitted) {
      let response  = await axios.post("http://localhost:8000/posts", finalData);
        console.log("response",response)
        if(response?.status===201){
          setCreated(true)
        }
    }
  }, [isSubmitted]);

  

  const changeCreatedStatus = () =>{
    setCreated(false)
  }

  return (
    <>
      <Provider
        value={{
          step1Data,
          step2Data,     
          step3Data,
          step4Data,
          dataSubmit,
          isCreated,
          changeCreatedStatus
        }}
      >
        <StepWizard
          initialStep={1}
          isHashEnabled={false}
          onStepChange={() => changeStep}
        >
          <Step1 />
          <Step2 />
          <Step3 />
          <Step4 />
        </StepWizard>
        <Detail />
      </Provider>
      <ToastContainer />
    </>
  );
};

export default MultiForm;
