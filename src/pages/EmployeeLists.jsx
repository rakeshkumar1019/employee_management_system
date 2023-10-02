import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import NoEmp from "../assets/no-employee.svg";
import AddBtn from "../assets/btn-add.svg";
import Delete from "../assets/delete.svg";
import SecondaryHeader from "../components/SecondaryHeader";
import BottomHeader from "../components/BottomHeader";
import {
  deleteEmployeeById,
  getAllEmployees,
  addEmployee,
} from "../db/IndexedDBService";
const EmployeeLists = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentEmployees, setCurrentEmployees] = useState([]);
  const [previousEmployees, setPreviousEmployees] = useState([]);
  const [deletedEmployee, setDeletedEmployee] = useState(null);
  const [hoveredItemId, setHoveredItemId] = useState(null);

  useEffect(() => {
    async function fetchEmployees() {
      const employeeList = await getAllEmployees();
      const currentEmployees = employeeList?.filter(
        (employee) => employee?.fromDate !== " " && employee?.toDate === ""
      );
      const previousEmployees = employeeList?.filter(
        (employee) => employee?.fromDate !== " " && employee?.toDate !== ""
      );
      setCurrentEmployees(currentEmployees);
      setPreviousEmployees(previousEmployees);
    }
    fetchEmployees();
  }, [currentEmployees, previousEmployees]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleItemHover = (itemId) => {
    setHoveredItemId(itemId);
  };

  const handleItemLeave = () => {
    setHoveredItemId(null);
  };

  const deleteEmployee = async (employee) => {
    setDeletedEmployee(employee);
    await deleteEmployeeById(employee?.id);
    setTimeout(() => {
      setDeletedEmployee(null);
    }, 10000); //10 sec
  };
  const undoDeleteEmployee = () => {
    if (deletedEmployee) {
      addEmployee(deletedEmployee);
      setDeletedEmployee(null);
    }
  };
  const renderEmployeeItem = (employee) => {
    const isHovered = employee.id === hoveredItemId;
    return (
      <div
        key={employee.id}
        className={`p-[16px] border border-b-zinc-50 ${
          isHovered ? "hovered-item" : ""
        } relative`}
        onMouseEnter={() => handleItemHover(employee.id)}
        onMouseLeave={handleItemLeave}
      >
        {isHovered && (
          <div
            onClick={() => {
              deleteEmployee(employee);
            }}
            className="cursor-pointer absolute top-0 right-0 bg-red-500 h-full text-white"
          >
            <div className="w-20 flex justify-center   h-full">
              <img src={Delete} alt="delete" width={"30px"} className="w-30" />
            </div>
          </div>
        )}
        <Link to={`/employee/edit/${employee.id}`}>
          <h3 className="text-[16px] leading-[25px] font-[#323238]">
            {employee.employeeName}
          </h3>
          <h5 className="text-[14px] leading-[25px] text-secondary">
            {employee.role}
          </h5>
          <h6 className="text-[12px] font-light leading-[20px] text-secondary">
            From {employee.fromDate}
          </h6>
        </Link>
      </div>
    );
  };
  return (
    <>
      <Header heading="Employee List" />
      {currentEmployees?.length > 0 ? (
        <SecondaryHeader heading="Current Employee" />
      ) : null}
      {currentEmployees?.length <= 0 && previousEmployees?.length <= 0 ? (
        <div className="min-h-[94vh] flex items-center justify-center bg-gray-100">
          <img src={NoEmp} alt="Centered Image" className="w-64 h-64" />
        </div>
      ) : (
        <div
          className={`sm:${
            isMobile ? "overflow overflow-scroll h-[19rem]" : ""
          }`}
        >
          {currentEmployees?.map((employee) => renderEmployeeItem(employee))}
        </div>
      )}
      {previousEmployees?.length > 0 ? (
        <SecondaryHeader heading="Previous Employee" />
      ) : null}
      <div
        className={`sm:${
          isMobile ? "overflow overflow-scroll h-[19rem] " : ""
        }`}
      >
        {previousEmployees?.map((employee) => renderEmployeeItem(employee))}
      </div>
      {deletedEmployee && (
        <div className="fixed bottom-0 h-15 p-1 px-3 text-sm z-[2] w-screen bg-black text-white">
          <div className="flex justify-between">
            <h1>Employee data is deleted.</h1>
            <button className="text-employee-blue" onClick={undoDeleteEmployee}>
              Undo
            </button>
          </div>
        </div>
      )}
      <BottomHeader heading="Swipe left to delete" isMobile={isMobile} />
      <div className="fixed bottom-3 right-0 p-4">
        <Link to="/employee/add">
          <button className="w-12 h-12 " style={{ zIndex: 1 }}>
            <img src={AddBtn} alt="Button" className="w-50 h-50" />
          </button>
        </Link>
      </div>
    </>
  );
};

export default EmployeeLists;
