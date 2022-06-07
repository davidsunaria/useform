import React,{useCallback,useState,useMemo,useEffect}  from  "react"
import { useForm, useFieldArray, Controller } from "react-hook-form";
import Input from "./component/Input";

interface IProps {

     index:number,
     control:any,
     register:any
     errors?:any
}

const NestedArray = ({index, control, register,errors}:IProps) =>{


  
    const {
        fields: intervalFields,
        append: interValAppend,
        remove: intervalRemove,
      } = useFieldArray({
        name:  `intervalfields[${index}]`,
        control,
      });

      useEffect(() => {
        
        interValAppend({
          firstInterval: "",
          secondInterval: "",
        });
      }, []);



    return(
        <>
       {intervalFields.map((ifield, i) => {
                    return (
                      <div key={ifield?.id}>
                        <section className={"section wrap"} key={ifield.id}>
                          firstInterval
                          <Input
                            className="mx-3"
                            name={
                              `Week.${index}.intervalfields.${i}.firstInterval` as "intervals.0.keyValue"
                            }
                            register={register}
                            error={errors}
                          />
                          <Input
                            className="mx-3"
                            name={
                              `Week.${index}.intervalfields.${i}.secondInterval` as "intervals.0.keyValue"
                            }
                            register={register}
                            error={errors}
                          />
                          {i > 0 && (
                            <button
                              type="button"
                              className=" mx-3 btn btn-warning"
                              onClick={() => intervalRemove(i)}
                            >
                              -
                            </button>
                          )}
                          {i === 0 && (
                            <button
                              className="datebtn btn btn-primary"
                              type="button"
                              onClick={() => {
                                interValAppend({
                                  firstInterval: "",
                                  secondInterval: "",
                                });
                              }}
                            >
                              add interval
                            </button>
                          )}
                        </section>
                        <br />
                      </div>
                    );
                  })}
        
        
        </>
    )
}


export default NestedArray