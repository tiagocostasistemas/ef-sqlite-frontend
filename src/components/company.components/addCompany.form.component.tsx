import React, { useRef, useState } from "react";
import { ICompany } from "./company.interface"
import validator, { noErrors, FormErrors } from "../../shared/validator";

import addressService from '../../services/address.service';
import companyService from "../../services/company.service";

import { initCompany } from "../../shared/constants";

interface IProps {
  onAddCompany: (company: ICompany) => void;
}

const AddCompanyForm: React.FunctionComponent<IProps> = props => {
  const [formValue, setFormValue] = useState(initCompany);
  const [errors, setErrors] = useState<FormErrors>({});

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const rules = [
      { key: "name", required: true, maxLength: 200, label: "Name" },
      { key: "street", required: true, label: "Street" },
      { key: "number", required: true, label: "Number" },
      { key: "complement", maxLength: 16, label: "Complement" },
      { key: "district", required: true, label: "District" },
      { key: "city", required: true, label: "City" },
      { key: "state", required: true, label: "State" },
      { key: "zipcode", minLength: 8, required: true, label: "Zipcode" },
      { key: "zipcode", maxLength: 8, required: true, label: "Zipcode" },
      { key: "phone", minLength: 8, label: "Phone" },
      { key: "phone", maxLength: 11, label: "Phone" }
    ];
    validator(
      formValue,
      rules,
      (errors: any): any => {
        if (noErrors(errors)) {          
          postCompany(formValue).then(props.onAddCompany);
          return false;
        }
        setErrors(errors);
      }
    );
  };

  const postCompany = async (company: ICompany) => {
    var response = await companyService.postCompany(company);
    setFormValue(initCompany);
    return response;
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name == "zipcode") {
      addressService.getAddressByZipcode(Number(value)).then((response) => {
        console.log(response);
        setFormValue({ ...formValue, ["street"]: response.logradouro,
                                     ["district"]: response.bairro,
                                     ["city"]: response.localidade,
                                     ["state"]: response.uf });

      });
    }
  };

  return (
    <div className="default-form">
      <h1>Add Companies</h1>
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
          <label>Zipcode</label>
          <input
            type="text"
            placeholder="please input zipcode"
            name="zipcode"
            value={formValue.zipcode}
            onChange={onInputChange}
            onBlur={onInputBlur}
          />
          {errors["zipcode"] && errors["zipcode"].length > 0 && (
            <div className="form-error">{errors["zipcode"].join(",")}</div>
          )}
        </div>

        <div className="form-row">
          <label>Street</label>
          <input
            type="text"
            placeholder="please input street"
            name="street"
            value={formValue.street}
            onChange={onInputChange}
          />
          {errors["street"] && errors["street"].length > 0 && (
            <div className="form-error">{errors["street"].join(",")}</div>
          )}
        </div>
        <div className="form-row">
          <label>Number</label>
          <input
            type="text"
            placeholder="please input number"
            name="number"
            value={formValue.number}
            onChange={onInputChange}
          />
          {errors["number"] && errors["number"].length > 0 && (
            <div className="form-error">{errors["number"].join(",")}</div>
          )}
        </div>

        <div className="form-row">
          <label>Complement</label>
          <input
            type="text"
            placeholder="please input complement"
            name="complement"
            value={formValue.complement}
            onChange={onInputChange}
          />
          {errors["complement"] && errors["complement"].length > 0 && (
            <div className="form-error">{errors["complement"].join(",")}</div>
          )}
        </div>

        <div className="form-row">
          <label>District</label>
          <input
            type="text"
            placeholder="please input district"
            name="district"
            value={formValue.district}
            onChange={onInputChange}
          />
          {errors["district"] && errors["district"].length > 0 && (
            <div className="form-error">{errors["district"].join(",")}</div>
          )}
        </div>

        <div className="form-row">
          <label>City</label>
          <input
            type="text"
            placeholder="please input city"
            name="city"
            value={formValue.city}
            onChange={onInputChange}
          />
          {errors["city"] && errors["city"].length > 0 && (
            <div className="form-error">{errors["city"].join(",")}</div>
          )}
        </div>

        <div className="form-row">
          <label>State</label>
          <input
            type="text"
            placeholder="please input state"
            name="state"
            value={formValue.state}
            onChange={onInputChange}
          />
          {errors["state"] && errors["state"].length > 0 && (
            <div className="form-error">{errors["state"].join(",")}</div>
          )}
        </div>

        <div className="form-row">
          <label>Phone</label>
          <input
            type="text"
            placeholder="please input phone"
            name="phone"
            value={formValue.phone}
            onChange={onInputChange}
          />
          {errors["phone"] && errors["phone"].length > 0 && (
            <div className="form-error">{errors["phone"].join(",")}</div>
          )}
        </div>

        <div className="form-row">
          <button>Add new company</button>
        </div>
      </form>
    </div>
  );
};
export default AddCompanyForm;
