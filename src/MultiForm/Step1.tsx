import React, { useState,useCallback, useEffect,useContext } from "react";
import logo from "./logo.svg";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import ErrorMessage from "../component/ErrorMessage";
import Input from "../component/Input";
import NestedArray from "../NestedArray";
import Detail from "../Detail";
import * as yup from "yup";
import axios from "axios";
import Select from "react-select";
//import TimePicker from "react-time-picker";
import { useAuthValidation } from "../validation";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import FormContext from "../MultiFormContext"

const Step1: React.FC = ({ previousStep, nextStep }: any): JSX.Element => {
  const { formSchema } = useAuthValidation();
  const { step1Data, dataSubmit ,onNext}:any = useContext(FormContext);

  const [value, setValue] = useState("10:00");
  const [selectedFile, setSelectedFile] = React.useState<any>(null);
  const [isDisable, setDisable] = React.useState<boolean>(false);
  const [weekCount, setWeekCount] = React.useState<number>(1);
  const [enableArrayOption, setEnableArrayOption] = React.useState<any>([]);
  const [isDataSubmit, DataSubmit] = React.useState<boolean>(false);
  const [timeError, setTimeError] = React.useState<any>([]);
  const [interValIndex, setInterValIndex] = React.useState<number>(1);
  const [totalbeforeSec, setTotalbeforeSec] = React.useState<number>(0);
  const [totalafterSec, setTotalafterSec] = React.useState<number>(0);
  const[dateEx4,setDateEx4]= useState("10:12")
  
  // const [payload, setPayload] = React.useSram@gmail.comtate<any>( {
  //   "id": 1,
  //   "firstName": "json-server",
  //   "lastName": "json-server",
  //   "city": "typicode",
  //   "file": "download.png"
  // },)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    control,
  } =  useForm({ resolver: yupResolver(formSchema), mode: "all" });
  
  

  const uploadImage = (e: any) => {
    setSelectedFile(e.target.files[0].name);
  };
  const onSubmit = async (data: any) => {
    delete data.intervalfields
    console.log("new data",data)
    dataSubmit(data,1)
    nextStep()
    //onNext(1)
    // let fd =new FormData()
    // fd.append("firstName", data.firstName);
    // fd.append("lastName", data.lastName);
    //  fd.append("city", data.city);
    // fd.append('image',selectedFile)
    // console.log("data", data)
    let payload = {
      firstName: data.firstName,
      description: data.description,
      city: data.city,
      // email: data.email,
      varient: data.varient,
      Week: data.Week,
      // price: number;
      // feature: number;
    };

    //let object=   JSON.stringify(Object.fromEntries(fd));
    //  let object ={}
    //   fd.forEach((value, key) => object[key] = value);
    //  var json = JSON.stringify(object)
    // console.log("payload", payload)
    // await axios.post("http://localhost:8000/posts", payload);
    DataSubmit(true);
  };

  const renderMethod = () => {
    DataSubmit(false);
  };

  const {
    fields: varientFields,
    append: varientAppend,
    remove: varientRemove,
  } = useFieldArray({
    name: "varient",
    control,
  });

  const {
    fields: WeekFields,
    append: WeekAppend,
    remove: WeekRemove,
  } = useFieldArray({
    name: "Week",
    control,
  });

  React.useEffect(() => {
    WeekAppend({
      startTime: "",
      endTime: "",
      day: "",
      intervalfields: [
        {
          firstInterval: "",
          secondInterval: "",
        },
      ],
    });
    varientAppend({
      feature: "",
      value: "",
    });
  }, []);

  const weekDays = [
    { value: "sunday", label: "Sunday" },
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tusesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thrushday", label: "Thrushday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
  ];

  const [options, setOptions] = React.useState<any>(weekDays);

  const disableOption = (e: any) => {
    let newOptions = [...options];
    let index = options.findIndex((val: any) => val.value === e.value);
    newOptions[index].isDisabled = true;
    setOptions(newOptions);
    let enableOption = [...enableArrayOption];
    enableOption.push(e);
    setEnableArrayOption(enableOption);
    setDisable(true);
  };

  const enableOption = (i: any) => {
    let newOptions = [...enableArrayOption];
    let newArray = [...options];
    let value = newOptions[i];
    let indexValue = options.findIndex(
      (val: any) => val.value === value?.value
    );
    newArray[indexValue].isDisabled = false;
    setOptions(newArray);
    // setDisable(true)
  };

  const changeTimeHandler = useCallback((event: any, type: string,i:number) => {
    setInterValIndex(i)
    let time = event.target.value;
    let [hour, min] = time.split(":");
    let hourSeconds = (hour * 3600);
    let minSeconds = (hour * 60);
    if (type === "after") {
      setTotalafterSec(hourSeconds+minSeconds)
    }
    if (type === "before") {
      setTotalbeforeSec(hourSeconds+minSeconds)
    }
}, [])

useEffect(()=>{
  let cloneError = [...timeError]
    if(totalafterSec>totalbeforeSec){
       cloneError[interValIndex]=""
      setTimeError("");
    }
    else if(totalafterSec<totalbeforeSec){
      cloneError[interValIndex]="Start time must be lower than end time"
      setTimeError(cloneError);
    }
},[totalafterSec,totalbeforeSec])
console.log("check error",errors)


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} style={{ position: "relative" }}>
        FirstName <Input name="firstName" register={register} error={errors} />
        {/* firstName <input {...register("firstName", { required: true })} /> */}
        <br />
        {/* <ErrorMessage message={errors.firstName?.message} /> */}
        {/* {errors.firstName && errors.firstName.types && (
        <p>{errors.firstName.types.required}</p>
      )} */}
        {/* Email{" "}
      <input
        {...register("email", {
          maxLength: 20,
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "invalid email address",
          },
        })}
      />
      <br />
      <br /> */}
        {/* {console.log("error", errors)} */}
        {/* <ErrorMessage type={errors?.firstName?.type} name="FirstName" max="15" /> */}
        Description{" "}
        <Input name="description" register={register} error={errors} />
        {/* <input
          {...register("description")}
        /> */}
        {/* <ErrorMessage message={errors?.description?.message} />  */}
        City <Input name="city" register={register} error={errors} />
        {/* City <input {...register("city")} />
        <br />
        <ErrorMessage message={errors?.city?.message} /> */}
        <ul>
          {varientFields.map((field, index) => {
            return (
              <div key={field?.id}>
                <section className={"section wrap"} key={field.id}>
                  {/* <input
                    placeholder="feature"
                    type="text"
                    {...register(
                      `varient.${index}.feature` as "varient.0.keyValue"
                    )}
                  /> */}
                  feature{" "}
                  <Input
                    name={`varient.${index}.feature` as "varient.0.keyValue"}
                    className="mx-3"
                    register={register}
                    error={errors}
                  />
                  <Input
                    className="mx-3"
                    name={`varient.${index}.value` as "varient.0.keyValue"}
                    register={register}
                    error={errors}
                  />
                  {/* <input
                    className="mx-3"
                    placeholder="value"
                    type="text"
                    {...register(
                      `varient.${index}.value` as "varient.0.keyValue"
                    )}
                  /> */}
                  <ErrorMessage
                    message={errors?.varient?.[index]?.feature?.message}
                  />
                  <ErrorMessage
                    message={errors?.varient?.[index]?.value?.message}
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      className=" mx-3 btn btn-warning"
                      onClick={() => varientRemove(index)}
                    >
                      -
                    </button>
                  )}
                  {index === 0 && (
                    <button
                      className="datebtn btn btn-primary"
                      type="button"
                      onClick={() => {
                        varientAppend({
                          feature: "",
                          value: "",
                        });
                      }}
                    >
                      +
                    </button>
                  )}
                </section>
              </div>
            );
          })}

          <br />
        </ul>
        <ul>
          {WeekFields.map((field, index) => {
            return (
              <div key={field.id}>
                <section className={"section"} key={field.id}>
                  <Controller
                    control={control}
                    name={`Week.${index}.day` as "Week.0.keyValue"}
                    render={({ field: { onChange, value, name, ref } }) => (
                      <Select
                        // name={name}
                        // inputRef={ref}
                        classNamePrefix="addl-class"
                        options={options}
                        value={options.find((c: any) => c.value === value)}
                        onChange={(val: any) => {
                          isDisable === false && onChange(val.value);
                          isDisable === false && disableOption(val);
                        }}
                        isMulti={false}
                        className="optionClass"
                      />
                    )}
                  />
                  {/* <TimePicker onChange={()=>{}} value={value} /> */}
                  <input
                    placeholder="StartDate"
                    type="time"
                    {...register(
                      `Week.${index}.startTime` as "Week.0.keyValue",
                      {
                        required: true,
                      }
                    )}
                    onChange={(e) => changeTimeHandler(e, "before",index)}
                    className="mx-2"
                  />
                  {/* <TimePicker  value={value} />  */}
                  <input
                    placeholder="EndDate"
                    type="time"
                    {...register(`Week.${index}.endTime` as "Week.0.keyValue", {
                      required: true,
                    })}
                    onChange={(e) => changeTimeHandler(e, "after",index)}
                    className="mx-2"
                  />
                  <br />
                   <ErrorMessage
                    message={timeError?.[index]}
                  /> 
                  <NestedArray
                    index={index}
                    {...{ control, register }}
                    errors={errors}
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      className=" mx-3 btn btn-warning"
                      onClick={() => {
                        WeekRemove(index);
                        enableOption(index);
                      }}
                    >
                      -
                    </button>
                  )}

                  {index === 0 && (
                    <button
                      className="datebtn btn btn-primary"
                      type="button"
                      onClick={() => {
                        weekCount <= 7 &&
                          WeekAppend({
                            startTime: "",
                            endTime: "",
                            day: "",
                            // intervalfields: [],
                          });
                        // intervalRemove(index)
                        setWeekCount((_) => _ + 1);
                        setDisable(false);
                      }}
                    >
                      +
                    </button>
                  )}
                  <br />
                  <br />
                </section>
              </div>
            );
          })}
        </ul>
        {/* <input type="file" {...register('file', { required: true })} onChange={uploadImage} /><br/><br/> */}
        {/* Age <input {...register('age', { pattern: /\d+/ })} /><br/><br/>
    {errors.age && <p>Please enter number for age.</p>} */}
        {/* <div><img src={selectedFile} alt="error"/></div> */}
        {/* <button type="submit" className="btn btn-info" > Submit  </button> */}
        <button type="submit" className="btn btn-info mx-4"  > Next  </button>
      </form>{" "}
      <br />
      <Detail isDataSubmit={isDataSubmit} renderMethod={renderMethod} />
    </>
  );
};

export default Step1;
