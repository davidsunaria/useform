import React, { useCallback, useState, useMemo, useEffect } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import StepWizard from "react-step-wizard";
import useEffectAsync from "../useEffectAsync";
import axios from "axios";
import { Provider } from "../MultiFormContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const MultiForm = () => {
  const [step1Data, setStep1Data] = useState<any>({}
  //   {
  //   firstName: "",
  //   description: "",
  //   city: "",
  //   varient: [
  //     {
  //       feature: "",
  //       value: "",
  //     },
  //   ],
  //   Week: [
  //     {
  //       startTime: "",
  //       endTime: "",
  //       day: "",
  //       intervalfields: [
  //         {
  //           firstInterval: "",
  //           secondInterval: "",
  //         },
  //       ],
  //     },
  //   ],
  // }
  );
  const [step2Data, setStep2Data] = useState<any>({});
  const [step3Data, setStep3Data] = useState<any>({});
  const [step4Data, setStep4Data] = useState<any>({});
  const [isSubmitted, setSubmit] = useState<boolean>(false);
  const [position, setPosition] = useState<number>(1);
  const [finalStep, setFinalStep] = useState<any>({});

  const changeStep = (first: any, sec: any) => {
    console.log("chaneg", first, sec);
  };

  const dataSubmit = (value: any,step:number) => {
  console.log("inputdata",value)
    if(step===1){
      setStep1Data(value);
    }
    else if(step===2){
      setStep2Data(value);
    }
    else if(step===3){
      setStep3Data(value);
    }

    else if(step===4){
      setStep4Data(value);
      if(value.agree===true){
        setSubmit(true)
      }
       
    }
  };

 

  useEffectAsync(async () => {
    let finalData = {...step1Data,...step2Data,...step3Data,...step4Data}
    if(isSubmitted){
      await axios.post("http://localhost:8000/posts", finalData);
      
    }
  }, [isSubmitted]);

  console.log("finalData",finalStep)
  console.log("step1Data",step1Data)
  console.log("step2Data",step2Data)
  console.log("step3Data",step3Data)
  console.log("step4Data",step4Data)
  const onNext = (value: number) => {
    if(value!==4){
      setPosition(value+1)
    }
  };

  const onBack = (value: number) => {
    console.log("value",value)
    if(value!==1){
      setPosition(value-1)
    }
  };
  console.log("position",position)
  return (
    <>
      <Provider
        value={{ step1Data, step2Data, step3Data, step4Data, dataSubmit ,onNext,onBack}}
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
       {/* {position ===1 && <Step1 />}   
       {position ===2 && <Step2 />}   
       {position ===3 && <Step3 />}   
       {position ===4 && <Step4 />}    */}
        </StepWizard>
      </Provider>
      <ToastContainer />
    </>
  );
};

export default MultiForm;
