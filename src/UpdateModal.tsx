import React, { FC, Fragment, ReactNode, useEffect, useState } from "react";
import logo from "./logo.svg";
import { Modal, Button, Accordion } from "react-bootstrap";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import Select from "react-select";
import axios from "axios";

interface IModal {
  updatedData?: any;
  toggle?: any;
  showModal?: boolean;
  name?: string;
  max?: number | string;
  getUpdatedValue?:any;
  
}

const UpdateModal: FC<IModal> = ({
  updatedData,
  toggle,
  showModal,
  getUpdatedValue,
  name,
  max,
}) => {
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
  const [isDisable, setDisable] = React.useState<boolean>(false);
  const [weekCount, setWeekCount] = React.useState<number>(1);
  const [enableArrayOption, setEnableArrayOption] = React.useState<any>([]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    control,
  } = useForm();

  let {
    fields: varientFields,
    append: varientAppend,
    remove: varientRemove,
  } = useFieldArray({
    name: "varient",
    control,
  });

  const {
    fields: weekFields,
    append: weekAppend,
    remove: weekRemove,
  } = useFieldArray({
    name: "Week",
    control,
  });

 
  useEffect(() => {
    let defaultEnable: any = [];
    let newOptions = [...options];
    updatedData?.Week?.forEach((val: any, i: any) => {
      weekAppend({
        startTime: val?.startTime,
        endTime: val?.endTime,
        day: val?.day,
      });

      defaultEnable.push({
        value: val?.day,
        label: val?.day,
        isDisabled: true,
      });
    });
    updatedData?.varient?.forEach((val: any, i: any) => {
      varientAppend({
        feature: val?.feature,
        value: val?.value,
      });
    });

    newOptions.forEach((value,index)=>{
      defaultEnable.forEach((val:any,i:any)=>{
        if(value.value===val.value){
          newOptions[index].isDisabled = true;
        }
      })
    })
      setOptions(newOptions)
    
  }, [updatedData]);

  const disableOption = (e: any) => {
    // console.log("enableoption array",enableArrayOption,e)
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

  const onSubmit = async (data: any) => {
    console.log("submit function", data);
    await axios.patch("http://localhost:8000/posts/" + updatedData.id,data)
    closeModal()
  };
  const closeModal = () => {
    toggle();
   // setPropsData({})
    varientRemove()
    weekRemove()
    getUpdatedValue()
  };

  return (
  
    <>
    
      <Modal
        show={showModal}
        onHide={closeModal}
        backdrop="static"
        keyboard={false}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ position: "relative" }}
          >
            firstName{" "}
            <input
              {...register("firstName", {
                required: true,
                value: updatedData?.firstName,
              })}
            />
            <br />
            <br />
            Description{" "}
            <input
              {...register("description", {
                required: true,
                maxLength: 10,
                minLength: 4,
                value: updatedData?.description,
              })}
            />
            <br />
            <br />
            City{" "}
            <input
              {...register("city", {
                required: true,
                value: updatedData?.city,
              })}
            />
            <br />
            <br />
            <ul>
              {varientFields?.map((field: any, index: any) => {
                return (
                  <div key={field.id}>
                    <section className={"section"} key={field.id}>
                      <input
                        className="inline-block"
                        placeholder="feature"
                        type="text"
                        {...register(
                          `varient.${index}.feature` as "varient.0.keyValue",
                          {
                            required: true,
                            value: field?.feature,
                          }
                        )}
                      />
                      <input
                        className="mx-3"
                        placeholder="value"
                        type="text"
                        {...register(
                          `varient.${index}.value` as "varient.0.keyValue",
                          {
                            required: true,
                            value: field?.value,
                          }
                        )}
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
              <br />
            </ul>
            <ul>
              {weekFields.map((field, index) => {
                // console.log("field", field)
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
                      <input
                        placeholder="StartDate"
                        type="text"
                        {...register(
                          `Week.${index}.startTime` as "Week.0.keyValue",
                          {
                            required: true,
                            // value: field?.startTime
                          }
                        )}
                        className="mx-2"
                      />
                      <input
                        placeholder="EndDate"
                        type="text"
                        {...register(
                          `Week.${index}.endTime` as "Week.0.keyValue",
                          {
                            required: true,
                          }
                        )}
                        className="mx-2"
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          className=" mx-3 btn btn-warning"
                          onClick={() => {
                            weekRemove(index);
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
                              weekAppend({
                                startTime: "",
                                endTime: "",
                                day: "",
                              });
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
            {/* <input type="submit" /> */}
            <Button  type="submit" variant="secondary"  >
            Submit
          </Button>
          </form>{" "}
          <br />
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
};

export default UpdateModal;
