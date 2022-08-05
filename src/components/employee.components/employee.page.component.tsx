import React, { useEffect, useState } from 'react';

import { IEmployee } from './employee.interface';

import EmployeeTable from "./employee.table.component";
import AddEmployeeForm from "./addEmployee.form.component";
import EditEmployeeForm from "./editEmployee.form.compenent";

import employeeService from '../../services/employee.service';

import { initEmployee } from "../../shared/constants";

const PageEmploye: React.FunctionComponent = props => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);

  const [editEmployee, setEditEmployee] = useState(initEmployee);
  const [editing, setEdit] = useState(false);

  useEffect(() => {
    getEmployees();
  }, []);

  const onAddEmployee = (newEmployee: IEmployee) => {
    const id = employees.length + 1;
    setEmployees([...employees, { ...newEmployee, id }]);
  };

  const onEditEmployee = (currentEmployee: IEmployee) => {
    setEditEmployee(currentEmployee);
    setEdit(true);
  };

  const onUpdateEmployee = (id: number, newEmployee: IEmployee) => {
    setEdit(false);
    setEmployees(employees.map(x => (x.id === id ? newEmployee : x)));
  };

  const onDeleteEmployee = (currentEmployee: IEmployee) => {
    var id = Number(currentEmployee.id);
    deleteEmployee(id);
  };

  const deleteEmployee = async (id: number) => {
    await employeeService.deleteEmployee(id);
    getEmployees();
  }

  const getEmployees = async () => {
    var response = await employeeService.getEmployees();
    setEmployees(response);
  }
  
  return (
      <div>
        {editing ? (
          <EditEmployeeForm
            employee={editEmployee}
            onUpdateEmployee={onUpdateEmployee}
            setEdit={setEdit}
          />
        ) : (
          <AddEmployeeForm onAddEmployee={onAddEmployee} />
        )}
        <EmployeeTable
          employees={employees}
          onEdit={onEditEmployee}
          onDelete={onDeleteEmployee}
        />        
      </div>
  );
}

export default PageEmploye;


