/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import Event from "../assets/event.svg";
import Pervious from "../assets/left-arrow.svg";
import Next from "../assets/right-arrow.svg";

const DatePicker = ({
  placeholder,
  name,
  type,
  initailValue,
  handleDatePickerValue,
}) => {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);
  const currentDate = new Date();
  const [date, setDate] = useState(currentDate);
  const [calendarCells, setCalendarCells] = useState([]);
  const [showDate, setShowDate] = useState("");
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    date: currentDate.getDate(),
    month: currentDate.toLocaleString("default", { month: "short" }),
    year: currentDate.getFullYear(),
  });

  const generateCalendar = (year, month) => {
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const startDay = firstDay.getDay();
    const numberOfDays = lastDay.getDate();
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const blankCells = Array.from({ length: startDay }, (_, index) => ({
      value: "",
      key: `blank-${index}`,
    }));
    const dayCells = Array.from({ length: numberOfDays }, (_, day) => ({
      value: day + 1,
      key: `day-${day}`,
    }));

    return [...dayNames, ...blankCells, ...dayCells];
  };
  useEffect(() => {
    if (initailValue !== "") {
      setShowDate(initailValue);
    }
  }, [initailValue]);

  useEffect(() => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const newCalendar = generateCalendar(year, month + 1);
    setCalendarCells(newCalendar);
  }, [date, showDate]);

  const prevMonth = () => {
    const prevMonthDate = new Date(
      date.getFullYear(),
      date.getMonth() - 1,
      selectedDate.date
    );
    setDate(prevMonthDate);
    updateSelectedDate(prevMonthDate);
  };

  const nextMonth = () => {
    const nextMonthDate = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      selectedDate.date
    );
    setDate(nextMonthDate);
    updateSelectedDate(nextMonthDate);
  };

  const updateSelectedDate = (newDate) => {
    setSelectedDate({
      date: newDate.getDate(),
      month: newDate.toLocaleString("default", { month: "short" }),
      year: newDate.getFullYear(),
    });
  };

  const handleSelectedDate = (day) => {
    setIsDateSelected(true);
    setSelectedDate({
      date: day,
      month: date.toLocaleString("default", { month: "short" }),
      year: date.getFullYear(),
    });
  };

  const handleInputClick = () => {
    setShowModal(!showModal);
  };

  const closeModal = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (showModal) {
      document.addEventListener("mousedown", closeModal);
    } else {
      document.removeEventListener("mousedown", closeModal);
    }
    return () => {
      document.removeEventListener("mousedown", closeModal);
    };
  }, [showModal, showDate]);

  const handleToday = () => {
    setSelectedDate({
      date: currentDate.getDate(),
      month: currentDate.toLocaleString("default", { month: "short" }),
      year: currentDate.getFullYear(),
    });
    setDate(currentDate);
    setIsDateSelected(true);
  };

  const handleNextMonday = () => {
    const today = new Date();
    const daysUntilNextMonday = (7 - today.getDay() + 1) % 7;
    const nextMondayDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + daysUntilNextMonday
    );
    setSelectedDate({
      date: nextMondayDate.getDate(),
      month: nextMondayDate.toLocaleString("default", { month: "short" }),
      year: nextMondayDate.getFullYear(),
    });
    setDate(nextMondayDate);
  };

  const handleNextTuesday = () => {
    const today = new Date();
    const daysUntilNextTuesday = (7 - today.getDay() + 2) % 7;
    const nextTuesdayDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + daysUntilNextTuesday
    );
    setSelectedDate({
      date: nextTuesdayDate.getDate(),
      month: nextTuesdayDate.toLocaleString("default", { month: "short" }),
      year: nextTuesdayDate.getFullYear(),
    });
    setDate(nextTuesdayDate);
  };

  const handleAfter1Week = () => {
    const today = new Date();
    const after1WeekDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 7
    );
    setSelectedDate({
      date: after1WeekDate.getDate(),
      month: after1WeekDate.toLocaleString("default", { month: "short" }),
      year: after1WeekDate.getFullYear(),
    });
    setDate(after1WeekDate);
  };
  const handleSave = () => {
    if (
      isDateSelected ||
      (currentDate.date === showDate.date &&
        currentDate.month === showDate.month &&
        currentDate.year === showDate.year)
    ) {
      const date = `${selectedDate.date} ${selectedDate.month} ${selectedDate.year}`;
      setShowDate(date);
      handleDatePickerValue({
        name: name,
        date: date,
      });
    }
    setShowModal(false);
  };
  const handleCancel = () => {
    setShowDate(placeholder);
    handleDatePickerValue({ name: name, date: placeholder });
    setIsDateSelected(false);
    setShowModal(false);
  };
  const handleNoDate = () => {
    setShowDate(placeholder);
    handleDatePickerValue({ name: name, date: placeholder });
    setIsDateSelected(false);
  };
  return (
    <>
      <div className="relative w-[45%] mt-5">
        <img
          src={Event}
          alt="Icon"
          className="absolute left-0 top-1/2 transform -translate-y-1/2 ml-2 w-6 h-6 cursor-pointer"
          onClick={handleInputClick}
        />
        <input
          type="text"
          className="rounded pl-10 w-full focus:outline-none focus:border-gray-50 focus:ring-2 focus:ring-employee-blue"
          placeholder={placeholder}
          value={showDate}
          onClick={handleInputClick}
          readOnly
        />
      </div>

      {showModal && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center"
          style={{ zIndex: 1 }}
        >
          <div
            className="bg-white p-4 w-[396px] rounded-lg shadow-lg"
            ref={modalRef}
          >
            {type === "premium" ? (
              <>
                <div className="flex justify-around gap-3">
                  <button
                    className="mt-2 px-4 py-2 w-[174px] bg-[#EDF8FF] text-[#1DA1F2] rounded hover:bg-employee-blue-dark"
                    onClick={handleToday}
                  >
                    Today
                  </button>
                  <button
                    className="mt-2 px-4 py-2 w-[174px] bg-employee-blue text-white rounded hover:bg-employee-blue-dark"
                    onClick={handleNextMonday}
                  >
                    Next Monday
                  </button>
                </div>
                <div className="flex justify-around gap-3">
                  <button
                    className="mt-2 px-4 py-2 w-[174px] bg-[#EDF8FF] text-[#1DA1F2] rounded hover:bg-employee-blue-dark"
                    onClick={handleNextTuesday}
                  >
                    Next Tuesday
                  </button>
                  <button
                    className="mt-2 px-4 py-2 w-[174px] bg-[#EDF8FF] text-[#1DA1F2] rounded hover:bg-employee-blue-dark"
                    onClick={handleAfter1Week}
                  >
                    After 1 Week
                  </button>
                </div>
              </>
            ) : null}

            {type === "standard" ? (
              <>
                <div className="flex justify-around gap-3">
                  <button
                    className="mt-2 px-4 py-2 w-[174px] bg-employee-blue text-white rounded hover:bg-employee-blue-dark"
                    onClick={handleNoDate}
                  >
                    No Date
                  </button>
                  <button
                    className="mt-2 px-4 py-2 w-[174px] bg-[#EDF8FF] text-[#1DA1F2] rounded hover:bg-employee-blue-dark"
                    onClick={handleToday}
                  >
                    Today
                  </button>
                </div>
              </>
            ) : null}

            {/* header buttons */}
            <div>
              <div className="my-4 flex justify-center  items-center">
                <button onClick={prevMonth}>
                  <img src={Pervious} alt="left" />
                </button>
                <h2>
                  {date.toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                </h2>
                <button onClick={nextMonth}>
                  <img src={Next} alt="left" />
                </button>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {calendarCells.map((cell, index) => (
                  <div
                    key={cell.key || index}
                    className={` text-center w-[32px] h-[32px] leading-loose
                    ${cell.value ? "cursor-pointer" : ""}  
                    ${
                      cell.value === currentDate.getDate() &&
                      date.getMonth() === currentDate.getMonth() &&
                      date.getFullYear() === currentDate.getFullYear()
                        ? " border border-employee-blue rounded-full"
                        : ""
                    }
                    ${
                      cell.value === selectedDate.date
                        ? " bg-employee-blue rounded-full text-white"
                        : ""
                    }
                    `}
                    onClick={() => {
                      if (cell.key) {
                        handleSelectedDate(cell.value);
                      }
                    }}
                  >
                    {cell.key ? cell.value : cell}
                  </div>
                ))}
              </div>
            </div>

            {/* footer buttons */}
            <div className="-mx-4 mt-14 border-t-2 border-zinc-100">{""}</div>
            <div className="flex justify-between mt-1  ">
              <div className="mt-4 flex w-[182px] gap-3">
                <img src={Event} alt="Icon" className="" />
                <span className="mt-1">
                  {isDateSelected
                    ? `${selectedDate.date} ${selectedDate.month} ${selectedDate.year}`
                    : placeholder}
                </span>
              </div>
              <div className="flex gap-5 justify-around">
                <button
                  className="mt-2 px-3 py-2 w-[73px] bg-[#EDF8FF] text-[#1DA1F2] rounded hover:bg-employee-blue-dark"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  className="mt-2 px-4 py-2 w-[73px] bg-employee-blue text-white rounded hover:bg-employee-blue-dark"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DatePicker;
