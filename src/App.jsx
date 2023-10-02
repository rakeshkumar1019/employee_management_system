import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeLists from './pages/EmployeeLists';
import EditEmployee from './pages/EditEmployee';
import AddEmployee from './pages/AddEmployee';
function App() {
  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<EmployeeLists/>} />
        <Route path="/employee/add" element={<AddEmployee/>} />
        <Route path="/employee/edit/:id" element={<EditEmployee/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
