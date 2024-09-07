import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SexSelector, { Sex } from './SexSelector';
import { Employee } from '../interfaces/employee';
import { Errors } from '../interfaces/requests';
import { AxiosResponse } from 'axios';

interface EmployeeFormProps {
    initialEmployee: Employee;
    onSubmit: (employee: Employee) => Promise<AxiosResponse>;
    initialErrors: Errors;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ initialEmployee, onSubmit, initialErrors }) => {
    const [employee, setEmployee] = useState<Employee>(initialEmployee);
    const [errors, setErrors] = useState<Errors>(initialErrors);
    const router = useNavigate();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setEmployee(prevEmployee => ({
            ...prevEmployee,
            [name]: value,
        }));
    }

    function handleSexChange(value: string) {
        setEmployee(prevEmployee => ({
            ...prevEmployee,
            Sex: value,
        }));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const result = await onSubmit(employee);

        if (result.status === 200) {
            console.log('Operation successful!');
            setErrors(initialErrors); // Reset errors on success
            router('/');
        } else if (result.status === 400) {
            console.log('Invalid parameters');
            setErrors(result.data.errors); // Set validation errors
        }
    }

    return (
        
        <form name='employeeForm' onSubmit={handleSubmit}>
            <div className='forms'>
                <label className='input-lable'>FIRST NAME
                    <input name='Firstname' placeholder='' type='text' value={employee.Firstname} onChange={handleChange} />
                    {errors.Firstname && errors.Firstname.map((message) => (<span className='error' key={message}>{message}</span>))}
                </label>
                <label className='input-lable'>LAST NAME
                    <input name='Lastname' type='text' value={employee.Lastname} onChange={handleChange} />
                    {errors.Lastname && errors.Lastname.map((message) => (<span className='error' key={message}>{message}</span>))}
                </label>
                <label className='input-lable'>AGE
                    <input name='Age' type='number' value={employee.Age} onChange={handleChange} />
                    {errors.Age && errors.Age.map((message) => (<span className='error' key={message}>{message}</span>))}
                </label>
                <label className='input-lable'>SEX
                    <SexSelector selectedSex={employee.Sex as Sex} onChange={handleSexChange} />
                    {errors.Sex && errors.Sex.map((message) => (<span className='error' key={message}>{message}</span>))}
                </label>
                <button className='submit' type="submit">Submit</button>
            </div>
            </form>
        
    );
};

export default EmployeeForm;