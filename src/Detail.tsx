import React, { FC, Fragment, ReactNode, useEffect, useState } from "react";
import logo from "./logo.svg";
import axios from "axios";
import useEffectAsync from "./useEffectAsync";
import { Accordion } from "react-bootstrap";
import UpdateModal from "./UpdateModal";
import CustomConfirm from "./CustomConfirm";
import IUser from "./IUser";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { IconContext } from "react-icons";
import { BsFillXDiamondFill } from "react-icons/bs";

interface ErrorProps {
  type?: string;
  name?: string;
  max?: number | string;
  isDataSubmit?: boolean;
  renderMethod?: any;
}

const Detail: FC<ErrorProps> = ({ isDataSubmit, renderMethod }) => {
  const [data, setData] = useState<any>([]);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [propsData, setPropsData] = useState<any>();
  const [isRender, setRender] = useState<boolean>(false);
  const [isConfirm, setConfirm] = useState<boolean>(false);
  const [deletedData, setDeletedData] = useState<IUser>();
  // const [tableRender] = useState<boolean>(true);

  const getUpdatedValue = () => {
    setRender(true);
  };
  useEffect(() => {
    if (isDataSubmit) {
      setRender(true);
    }
  }, [isDataSubmit]);

  useEffectAsync(async () => {
    let detail = await axios.get("http://localhost:8000/posts");
    setData(detail.data);
    setRender(false);
  }, [isRender]);
  //      useEffect( async ()=>{
  //    await axios.get("http://localhost:8000/posts");
  //     },[])
  // console.log("data", data);

  const setModal = (data: any) => {
    setPropsData(data);
    setOpen(true);
  };
  const toggle = () => {
    setOpen(!isOpen);
  };

  const confirmModal = (data: any) => {
    console.log("conform");
    setConfirm(true);
    setDeletedData(data);
  };
  const deleteHandler = (value: IUser) => {
    axios.delete("http://localhost:8000/posts/" + value?.id);
    //console.log("response",response)
    // if(response.status===200){
    //   console.log("two times")
    //   const filterData = [...data];
    //   let index = filterData.findIndex((val: any) => val.id === value?.id);
    //   filterData.splice(index, 1);
    //   setData([...filterData]);
    // }
    const filterData = [...data];
    let index = filterData.findIndex((val: any) => val.id === value?.id);
    filterData.splice(index, 1);
    setData([...filterData]);
    setConfirm(false);
  };

  const reorder = (list: any, startIndex: any, endIndex: any) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(data, result.source.index, result.destination.index);
    setData(items);
  };

  const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "",

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th colSpan={2}>Firstname</th>
            <th>Description</th>
            <th>City</th>
            <th>Varient</th>
            <th>Time</th>
            <th colSpan={2}>Action</th>
          </tr>
        </thead>
        {isOpen && (
          <UpdateModal
            updatedData={propsData}
            getUpdatedValue={getUpdatedValue}
            showModal={isOpen}
            toggle={toggle}
          />
        )}

        {isConfirm && (
          <CustomConfirm
            showConfirm={isConfirm}
            confirmText={"yes"}
            deleteHandler={deleteHandler}
            deletedData={deletedData}
          />
        )}

        <DragDropContext onDragEnd={onEnd}>
          <Droppable droppableId="droppable-1">
            {(provided, snapshot) => (
              <tbody ref={provided.innerRef} {...provided.droppableProps}>
                {data &&
                  data?.length > 0 &&
                  data?.map((value: any, i: number) => {
                    return (
                      <Draggable
                        draggableId={value.id.toString()}
                        key={value.id}
                        index={i}
                      >
                        {(provided, snapshot) => (
                          <tr
                            key={i}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <IconContext.Provider value={{ style: {fontSize: '30px', color: "rgb(0, 123, 255)"}}}>
                              <BsFillXDiamondFill />
                            </IconContext.Provider>
                            <td>{value?.firstName}</td>
                            <td>{value?.description}</td>
                            <td>{value?.city}</td>
                            <td>
                              <Accordion>
                                <Accordion.Item eventKey="0">
                                  <Accordion.Header>varient</Accordion.Header>
                                  <Accordion.Body>
                                    <table className="table table-bordered">
                                      <tr>
                                        <th>Feature</th>
                                        <th>Value</th>
                                      </tr>
                                      {value?.varient?.length > 0 &&
                                        value?.varient?.map(
                                          (val: any, idx: number) => {
                                            return (
                                              <tr
                                                className="table-bordered"
                                                key={idx}
                                              >
                                                <td>{val?.feature}</td>
                                                <td>{val?.value}</td>
                                              </tr>
                                            );
                                          }
                                        )}
                                    </table>
                                  </Accordion.Body>
                                </Accordion.Item>
                              </Accordion>
                            </td>
                            <td>
                              <Accordion>
                                <Accordion.Item eventKey="0">
                                  <Accordion.Header>Time</Accordion.Header>
                                  <Accordion.Body>
                                    <table className="table table-bordered">
                                      <tr>
                                        <th>Start Time</th>
                                        <th>End Time</th>
                                        <th>Day</th>
                                      </tr>
                                      {value?.Week?.length > 0 &&
                                        value?.Week?.map(
                                          (val: any, idx: number) => {
                                            return (
                                              <tr
                                                className="table-bordered"
                                                key={idx}
                                              >
                                                <td>{val?.startTime}</td>
                                                <td>{val?.endTime}</td>
                                                <td>{val?.day}</td>
                                              </tr>
                                            );
                                          }
                                        )}
                                    </table>
                                  </Accordion.Body>
                                </Accordion.Item>
                              </Accordion>
                            </td>

                            <td>
                              {" "}
                              <button
                                className="btn btn-info"
                                onClick={() => setModal(value)}
                              >
                                Update
                              </button>
                            </td>
                            <td>
                              {" "}
                              <button
                                className="btn btn-danger text-light"
                                onClick={() => confirmModal(value)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        )}
                      </Draggable>
                    );
                  })}
              </tbody>
            )}
          </Droppable>
        </DragDropContext>
      </table>
    </>
  );
};

export default Detail;
