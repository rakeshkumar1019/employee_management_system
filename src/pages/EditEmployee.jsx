import { useParams } from "react-router-dom"
import EmployeeForm from "../components/EmployeeForm"
import Header from "../components/Header"

const EditEmployee = () => {
  const {id}=useParams()
  return (
    <div>
      <Header heading={"Edit Employee Details"}/>
      <EmployeeForm id={id} />
    </div>
  )
}

export default EditEmployee
