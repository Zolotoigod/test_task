//import { useState } from "react";
//import SexSelector, { Sex } from "../componnents/SexSelector";
import { Employee } from "../interfaces/employee";
import { createEmployee } from "../services/employeeApiWrapper";
//import { useNavigate } from "react-router-dom";
import { Errors } from "../interfaces/requests";
import EmployeeForm from "../componnents/EmployeeForm";

const emptyEmployee: Employee = {
    Id: '',
    Firstname: '',
    Lastname: '',
    Age: 0,
    Sex:'',
};

const emptyErrors: Errors = {
    Firstname: [],
    Lastname: [],
    Age: [],
    Sex: [],
};

function AddPage() {

    async function handleCreate(employee: Employee) {
        const result = await createEmployee(employee);
        return result;
    }

    return (
        <EmployeeForm
        initialEmployee={emptyEmployee}
        onSubmit={handleCreate}
        initialErrors={emptyErrors}
        />
    );
};

export default AddPage;