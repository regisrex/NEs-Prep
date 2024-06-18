import React, { useState } from "react";

import { Input } from "../Input";
import Button from "../button/button";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Student } from "../../pages/Dashboard";
import toast from "react-hot-toast";
interface StudentFormProps {
  onClose: () => void;
  onSubmit:
    | ((student: Student) => void)
    | ((student: Student) => void);
  initialData?: Student | null;
}

const StudentForm: React.FC<StudentFormProps> = ({
  onClose,
  onSubmit,
  initialData,
}) => {
  const [fullNames, setFullnames] = useState(initialData?.fullNames || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(
    initialData?.phoneNumber || ""
  );
  const [marks, setMarks] = useState(initialData?.marks || 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullNames || !email || !phoneNumber || !marks) {
      toast.error("Please fill out all fields.");
      return;
    }
    if (phoneNumber.length != 10) {
      toast.error("Invalid phone number");
      return;
    }
    onSubmit({ id : initialData?.id || "", fullNames, email, phoneNumber, marks });
    // onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-12 rounded shadow-lg w-full max-w-md relative">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl mb-4">
            {initialData ? "Edit Student" : "Add Student"}
          </h2>
          <button
            onClick={onClose}
            className="  text-gray-600 hover:text-gray-900"
          >
            <XMarkIcon className="stroke-slate-400" width={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input<string>
              type="text"
              placeholder="Enter names"
              _controller={{
                value: fullNames,
                setValue: setFullnames,
                initialValue: fullNames,
              }}
              label={"Names"}
            />
          </div>
          <div>
            <Input<string>
              type="email"
              placeholder="iris@example.com"
              _controller={{
                value: email,
                setValue: setEmail,
                initialValue: email,
              }}
              label={"Email address"}
            />
          </div>
          <div>
            <Input<string>
              type="text"
              placeholder="+2507889991010"
              _controller={{
                value: phoneNumber,
                setValue: setPhoneNumber,
                initialValue: phoneNumber,
              }}
              label={"Phone number"}
            />
          </div>
          <div>
            <Input<number>
              type="number"
              placeholder="00"
              _controller={{
                value: marks,
                setValue: setMarks,
                initialValue: marks,
              }}
              label={"Marks"}
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-button hover:bg-white hover:text-button text-white  py-2 px-4 rounded w-fit"
            >
              {initialData ? "Update" : "Add"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
