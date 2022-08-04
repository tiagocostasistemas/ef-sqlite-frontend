import './App.css';
import React, { useEffect, useState } from 'react';

import { ICompany } from './components/company.components/company.interface';

import CompanyTable from "./components/company.components/company.table.component";
import AddCompanyForm from "./components/company.components/addCompany.form.component";
import EditCompanyForm from "./components/company.components/editCompany.form.component";

import companyService from './services/company.service';

import { initCompany } from "./shared/constants";
import PageEmploye from './components/employee.components/employee.page.component';
import PageCompany from './components/company.components/company.page.component';

function App() {
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
    <div className="App">
      <div>        
        <PageCompany></PageCompany>
        <PageEmploye></PageEmploye>
        {/* {editing ? (
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
        />         */}
      </div>
    </div>
  );
}

export default App;
