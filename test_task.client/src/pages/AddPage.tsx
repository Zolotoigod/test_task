import { Employee } from "../interfaces/employee";
import { createEmployee } from "../services/employeeApiWrapper";
import { Errors } from "../interfaces/requests";
import EmployeeForm from "../componnents/EmployeeForm";
import { useNavigate } from "react-router-dom";

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

    const router = useNavigate();

    async function handleCreate(employee: Employee) {
        const result = await createEmployee(employee);
        return result;
    }

    return (
        <div className = 'forms'>
            <EmployeeForm
                initialEmployee={emptyEmployee}
                onSubmit={handleCreate}
                initialErrors={emptyErrors}
            />
            <button type='button' onClick={() => router('/')}>Return</button>
        </div>
    );
};

export default AddPage;