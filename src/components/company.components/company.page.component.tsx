import React, { useEffect, useState } from 'react';

import { ICompany } from './company.interface';

import CompanyTable from "./company.table.component";
import AddCompanyForm from "./addCompany.form.component";
import EditCompanyForm from "./editCompany.form.component";

import companyService from '../../services/company.service';

import { initCompany } from "../../shared/constants";

const PageCompany: React.FunctionComponent = props => {
  const [companies, setCompanies] = useState<ICompany[]>([]);

  const [editCompany, setEditCompany] = useState(initCompany);
  const [editing, setEdit] = useState(false);

  useEffect(() => {
    getCompanies();
  }, []);

  const onAddCompany = (newCompany: ICompany) => {
    const id = companies.length + 1;
    setCompanies([...companies, { ...newCompany, id }]);
  };

  const onEditCompany = (currentCompany: ICompany) => {
    setEditCompany(currentCompany);
    setEdit(true);
  };

  const onUpdateCompany = (id: number, newCompany: ICompany) => {
    setEdit(false);
    setCompanies(companies.map(x => (x.id === id ? newCompany : x)));
  };

  const onDeleteCompany = (currentCompany: ICompany) => {
    var id = Number(currentCompany.id);
    deleteCompany(id);
  };

  const deleteCompany = async (id: number) => {
    await companyService.deleteCompany(id);
    getCompanies();
  }

  const getCompanies = async () => {
    var response = await companyService.getCompanies();
    setCompanies(response);
  }
  
  return (
      <div>
        {editing ? (
          <EditCompanyForm
            company={editCompany}
            onUpdateCompany={onUpdateCompany}
            setEdit={setEdit}
          />
        ) : (
          <AddCompanyForm onAddCompany={onAddCompany} />
        )}
        <CompanyTable
          companies={companies}
          onEdit={onEditCompany}
          onDelete={onDeleteCompany}
        />        
      </div>
  );
}

export default PageCompany;
