/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  addEmployee,
  getEmployeeById,
  updateEmployeeById,
} from "../db/IndexedDBService";
import Person from "../assets/person.svg";
import DateArrow from "../assets/simple-arrow.svg";
import DatePicker from "../elements/DatePicker";
import Dropdown from "../elements/Dropdown";

const EmployeeForm = ({ id = "" }) => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    id: `EMP-${uuidv4().substr(0, 8)}`,
    employeeName: "",
    role: "",
    fromDate: "",
    toDate: "",
  });
  useEffect(() => {
    async function fetchEmployee() {
      const employeeData = await getEmployeeById(id);
      setEmployee(employeeData);
    }
    if (id !== "") {
      fetchEmployee();
    }
  }, [id]);
  const [roles] = useState([
    "Product Designer",
    "Flutter Developer",
    "QA Tester",
    "Product Owner",
  ]);
  const handleDropDownValue = (value) => {
    setEmployee({
      ...employee,
      role: value,
    });
  };
  const handleDatePickerValue = ({ name, date }) => {
    setEmployee({
      ...employee,
      [name]: date,
    });
  };
  const handleInput = (e) => {
    setEmployee({
      ...employee,
      employeeName: e.target.value,
    });
  };
  const handleSave = async () => {
    if (window.location.pathname?.includes("edit")) {
      //edit employee
      await updateEmployeeById(id, employee);
    } else {
      //add employee
      await addEmployee(employee);
    }
    navigate("/");
  };
  const handleCancel = () => {
    navigate("/");
  };
  return (
    <div className="p-[16px]">
      <div className="relative w-full">
        <img
          src={Person}
          alt="Icon"
          className="absolute left-0 top-1/2 transform -translate-y-1/2 ml-2 w-6 h-6"
        />
        <input
          type="text"
          name="employeeName"
          className="rounded pl-10 w-full focus:outline-none focus:border-gray-50 focus:ring-2 focus:ring-employee-blue"
          value={employee.employeeName}
          onChange={handleInput}
          placeholder="Joseph Madan"
        />
      </div>
      <Dropdown
        options={roles}
        placeholder="Select role"
        initailValue={employee?.role || ""}
        handleDropDownValue={handleDropDownValue}
      />
      <div className="flex justify-between">
        <DatePicker
          placeholder="Today"
          name="fromDate"
          type="premium"
          initailValue={employee?.fromDate || ""}
          handleDatePickerValue={handleDatePickerValue}
        />
        <img className="mt-5" src={DateArrow} alt="date arrow" />
        <DatePicker
          placeholder="No date"
          name="toDate"
          type="standard"
          initailValue={employee?.toDate || ""}
          handleDatePickerValue={handleDatePickerValue}
        />
      </div>
      <div className="absolute bottom-0 w-screen mb-4 border-t-2 border-zinc-100 -mx-5 mt-10">
        <div className="flex gap-5 flex-row-reverse  w-full ">
          <button
            onClick={handleSave}
            className="mt-3 mr-3 px-4 py-2 w-[73px] bg-employee-blue text-white rounded hover:bg-employee-blue-dark"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="mt-3  px-3 py-2 w-[73px] bg-[#EDF8FF] text-[#1DA1F2] rounded hover:bg-employee-blue-dark"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
