import React from "react";
import { IEmployee } from "./employee.interface";

interface IProps {
    employees: Array<IEmployee>;
    onEdit: (employee: IEmployee) => void;
    onDelete: (employee: IEmployee) => void;
}

const EmployeeTable: React.FunctionComponent<IProps> = props => {
  return (
    <div className="default-table">
      <h1>Employees</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {props.employees.length > 0 ? (
            props.employees.map(x => (
              <tr key={x.id}>
                <td>{x["name"]}</td>
                <td>{x["position"]}</td>
                <td>{x["salary"]}</td>
                <td>{x["companyName"]}</td>
                <td>
                  <button onClick={() => props.onEdit(x)}>edit</button>
                  <button onClick={() => props.onDelete(x)}>delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>no employees</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default EmployeeTable;
