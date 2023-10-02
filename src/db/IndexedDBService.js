import Dexie from 'dexie';

const db = new Dexie('EmployeeDB');
db.version(1).stores({
  employees: 'id,employeeName,role,fromDate,toDate',
});

export const addEmployee = async (employee) => {
  await db.employees.add(employee);
};

export const getAllEmployees = async () => {
  return db.employees.toArray();
};

export const getEmployeeById = async (id) => {
    return db.employees.get(id);
};

export const updateEmployeeById = async (id, updatedEmployeeData) => {
    await db.employees.update(id, updatedEmployeeData);
};

export const deleteEmployeeById = async (id) => {
    await db.employees.delete(id);
};