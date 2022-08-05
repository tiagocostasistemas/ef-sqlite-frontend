import React, { useRef, useState } from "react";
import { IEmployee} from "./employee.interface"
import validator, { noErrors, FormErrors } from "../../shared/validator";

import employeeService from "../../services/employee.service";

import { initEmployee } from "../../shared/constants";

interface IProps {
  onAddEmployee: (employee: IEmployee) => void;
}

const AddCompanyForm: React.FunctionComponent<IProps> = props => {
  const [formValue, setFormValue] = useState(initEmployee);
  const [errors, setErrors] = useState<FormErrors>({});

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const rules = [
      { key: "name", required: true, maxLength: 200, label: "Name" },
      { key: "position", required: true, label: "Position" },
      { key: "salary", required: true, label: "Salary" }
    ];
    validator(
      formValue,
      rules,
      (errors: any): any => {
        if (noErrors(errors)) {          
            postEmployee(formValue).then(props.onAddEmployee);
          return false;
        }
        setErrors(errors);
      }
    );
  };

  const postEmployee= async (employee: IEmployee) => {
    var response = await employeeService.postEmployee(employee);
    setFormValue(initEmployee);
    return response;
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <div className="default-form">
      <h1>Add Employees</h1>
      <form className="form-edit" onSubmit={onFormSubmit}>
        <div className="form-row">
          <label>Name</label>
          <input
            type="text"
            placeholder="please input name"
            name="name"
            value={formValue.name}
            onChange={onInputChange}
          />
          {errors["name"] && errors["name"].length > 0 && (
            <div className="form-error">{errors["name"].join(",")}</div>
          )}
        </div>

        <div className="form-row">
          <label>Position</label>
          <input
            type="number"
            placeholder="please input position"
            name="position"
            value={formValue.position}
            onChange={onInputChange}
          />
          {errors["position"] && errors["position"].length > 0 && (
            <div className="form-error">{errors["position"].join(",")}</div>
          )}
        </div>

        <div className="form-row">
          <label>Salary</label>
          <input
            type="number"
            placeholder="please input salary"
            name="salary"
            value={formValue.salary}
            onChange={onInputChange}
          />
          {errors["salary"] && errors["salary"].length > 0 && (
            <div className="form-error">{errors["salary"].join(",")}</div>
          )}
        </div> 

        <div className="form-row">
          <label>Company Id</label>
          <input
            type="number"
            placeholder="please input company id"
            name="companyId"
            value={formValue.companyId}
            onChange={onInputChange}
          />
          {errors["companyId"] && errors["companyId"].length > 0 && (
            <div className="form-error">{errors["companyId"].join(",")}</div>
          )}
        </div>

        <div className="form-row">
          <label>Company Name</label>
          <input
            type="text"
            placeholder="please input company name"
            name="companyName"
            value={formValue.companyName}
            onChange={onInputChange}
          />
          {errors["companyName"] && errors["companyName"].length > 0 && (
            <div className="form-error">{errors["companyName"].join(",")}</div>
          )}
        </div>   

        <div className="form-row">
          <button>Add new employee</button>
        </div>
      </form>
    </div>
  );
};
export default AddCompanyForm;
