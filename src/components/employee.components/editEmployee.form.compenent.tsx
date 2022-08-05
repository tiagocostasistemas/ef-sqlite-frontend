import React, { useState, useEffect } from "react";
import { IEmployee } from "./employee.interface";

import employeeService from "../../services/employee.service";

interface IProps {
  employee: IEmployee;
  onUpdateEmployee: (id: number, employee: IEmployee) => void;
  setEdit: (bool: boolean) => void;
}

export default function EditEmployeeForm(props: IProps) {
  const [employee, setEmployee] = useState(props.employee);
  useEffect(() => setEmployee(props.employee), [props]);
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!employee.name) {      
      return false;      
    }
    putEmployee(employee);
    props.onUpdateEmployee(Number(employee.id), employee);
  };
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const putEmployee = async (employee: IEmployee) => {
    await employeeService.putEmployee(employee);
  };

  return (
    <div className="default-form">
      <h1>Edit Companies</h1>
      <form className="form-edit" onSubmit={onFormSubmit}>
        <div className="form-row">
          <label>Name</label>
          <input
            type="text"
            placeholder="please input name"
            name="name"
            value={employee.name}
            onChange={onInputChange}
          />
          <div className="form-error">too short</div>
        </div>

        <div className="form-row">
          <label>Position</label>
          <input
            type="number"
            placeholder="please input position"
            name="position"
            value={employee.position}
            onChange={onInputChange}
          />
        </div>

        <div className="form-row">
          <label>Salary</label>
          <input
            type="number"
            placeholder="please input salary"
            name="salary"
            value={employee.salary}
            onChange={onInputChange}
          />
        </div>

        <div className="form-row">
          <label>Company Id</label>
          <input
            type="number"
            placeholder="please input company id"
            name="companyId"
            value={employee.companyId}
            onChange={onInputChange}
          />
        </div>

        <div className="form-row">
          <label>Company Name</label>
          <input
            type="text"
            placeholder="please input company name"
            name="companyName"
            value={employee.companyName}
            onChange={onInputChange}
          />
        </div>

        <div className="form-row">
          <button>Update</button>
          <button onClick={() => props.setEdit(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
}