import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import IUser from "./IUser";

interface confirmProps {
  showConfirm?: boolean;
  deletedData?: IUser;
  confirmText?: string;
  closeText?: string;
  //deleteHandler: (payload: any) => Promise<void> ;
  deleteHandler: any ;
}

const CustomConfirm = ({
  showConfirm,
  deletedData,
  closeText = "No",
  confirmText,
  deleteHandler,
}: confirmProps) => {
  const handleClickDelete = async (data: IUser | undefined) => {
   await deleteHandler(data);
  };

  return (
    <>
      {confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <Alert variant={"info"}>
              <div className="custom-ui">
                <h1>Are you sure?</h1>
                <p>You want to delete this file?</p>
                <button onClick={onClose} className="btn-sm btn-warning mx-2">
                  {closeText}
                </button>
                <button
                  onClick={() => {
                    handleClickDelete(deletedData);
                    onClose();
                  }}
                  className="btn-sm btn-warning"
                >
                  {confirmText}
                </button>
              </div>
            </Alert>
          );
        },
      })}
    </>
  );
};

export default CustomConfirm;
