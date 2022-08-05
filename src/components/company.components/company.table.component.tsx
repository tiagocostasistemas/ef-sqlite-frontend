import React from "react";
import { ICompany } from "./company.interface";

interface IProps {
    companies: Array<ICompany>;
    onEdit: (company: ICompany) => void;
    onDelete: (company: ICompany) => void;
}

const CompanyTable: React.FunctionComponent<IProps> = props => {
  return (
    <div className="default-table">
      <h1>Companies</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Street</th>
            <th>Number</th>
            <th>Complement</th>
            <th>District</th>
            <th>City</th>
            <th>State</th>
            <th>Zipcode</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {props.companies.length > 0 ? (
            props.companies.map(x => (
              <tr key={x.id}>
                <td>{x["name"]}</td>
                <td>{x["street"]}</td>
                <td>{x["number"]}</td>
                <td>{x["complement"]}</td>
                <td>{x["district"]}</td>
                <td>{x["city"]}</td>
                <td>{x["state"]}</td>
                <td>{x["zipcode"]}</td>
                <td>{x["phone"]}</td>
                <td>
                  <button onClick={() => props.onEdit(x)}>edit</button>
                  <button onClick={() => props.onDelete(x)}>delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>no companies</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default CompanyTable;
