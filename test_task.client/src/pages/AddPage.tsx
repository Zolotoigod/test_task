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
    /*const [employee, setEmployee] = useState(emptyEmployee);
    const [errors, setErrors] = useState(emptyErros);

    const router = useNavigate();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        const newState: Employee = {
            ...employee,
            [name]: value,
        }

        setEmployee(newState);
    };

    function handleSexChange(value: string) {
        const newState: Employee = {
            ...employee,
            Sex: value,
        }

        setEmployee(newState);
    };

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const result = await createEmployee(employee);
        if (result.status === 200) {
            console.log('Created successeful!');
            setErrors(emptyErros);
            router('/');
            return;
        };

        if (result.status === 400) {
            console.log('Invalid parameters');
            setErrors(result.data.errors);
        };
    };

    return (
        <div>
            <form className='employeeForm' name='create' onSubmit={onSubmit}>
                <label className='inputLabel'>FIRST NAME
                    <input name='Firstname' placeholder='' type='text' value={employee.Firstname} onChange={handleChange} />
                    {errors.Firstname && (
                        errors.Firstname.map((message) => (<span className='error'>{message}</span>))
                    )}
                </label>
                <label className='inputLabel'>LAST NAME
                    <input name='Lastname' type='text' value={employee.Lastname} onChange={handleChange} />
                    {errors.Lastname && (
                        errors.Lastname.map((message) => (<span className='error'>{message}</span>))
                    )}
                </label>
                <label className='inputLabel'>AGE
                    <input name='Age' type='number' value={employee.Age} onChange={handleChange} />
                    {errors.Age && (
                        errors.Age.map((message) => (<span className='error'>{message}</span>))
                    )}
                </label>
                <label className='inputLabel'>SEX
                    <SexSelector selectedSex={employee.Sex as Sex} onChange={handleSexChange} />
                    {errors.Sex && (
                        errors.Sex.map((message) => (<span className='error'>{message}</span>))
                    )}
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>);*/
};

export default AddPage;