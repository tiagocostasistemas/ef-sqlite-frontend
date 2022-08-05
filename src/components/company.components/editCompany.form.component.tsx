import React, { useState, useEffect } from "react";
import { ICompany } from "./company.interface";

import companyService from "../../services/company.service";

interface IProps {
  company: ICompany;
  onUpdateCompany: (id: number, company: ICompany) => void;
  setEdit: (bool: boolean) => void;
}

export default function EditCompanyForm(props: IProps) {
  const [company, setCompany] = useState(props.company);
  useEffect(() => setCompany(props.company), [props]);
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!company.name || !company.street) {      
      return false;      
    }
    putCompany(company);
    props.onUpdateCompany(Number(company.id), company);
  };
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCompany({ ...company, [name]: value });
  };

  const putCompany = async (company: ICompany) => {
    await companyService.putCompany(company);
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
            value={company.name}
            onChange={onInputChange}
          />
          <div className="form-error">too short</div>
        </div>

        <div className="form-row">
          <label>Zipcode</label>
          <input
            type="text"
            placeholder="please input zipcode"
            name="zipcode"
            value={company.zipcode}
            onChange={onInputChange}
          />
        </div>

        <div className="form-row">
          <label>Street</label>
          <input
            type="text"
            placeholder="please input street"
            name="street"
            value={company.street}
            onChange={onInputChange}
          />
        </div>
        <div className="form-row">
          <label>Number</label>
          <input
            type="number"
            placeholder="please input number"
            name="age"
            value={company.number}
            onChange={onInputChange}
          />
        </div>

        <div className="form-row">
          <label>Complement</label>
          <input
            type="text"
            placeholder="please input complement"
            name="complement"
            value={company.complement}
            onChange={onInputChange}
          />
        </div>

        <div className="form-row">
          <label>District</label>
          <input
            type="text"
            placeholder="please input district"
            name="district"
            value={company.district}
            onChange={onInputChange}
          />
        </div>

        <div className="form-row">
          <label>City</label>
          <input
            type="text"
            placeholder="please input city"
            name="city"
            value={company.city}
            onChange={onInputChange}
          />
        </div>

        <div className="form-row">
          <label>State</label>
          <input
            type="text"
            placeholder="please input state"
            name="state"
            value={company.state}
            onChange={onInputChange}
          />
        </div>

        <div className="form-row">
          <label>Phone</label>
          <input
            type="text"
            placeholder="please input phone"
            name="phone"
            value={company.phone}
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