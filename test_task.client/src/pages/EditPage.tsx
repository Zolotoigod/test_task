import { useLocation, useNavigate } from "react-router-dom";
import { Employee, EmployeeVM } from "../interfaces/employee";
import { updateEmployee } from "../services/employeeApiWrapper";
import { Errors } from "../interfaces/requests";
import EmployeeForm from "../componnents/EmployeeForm";

const emptyErrors: Errors = {
    Firstname: [],
    Lastname: [],
    Age: [],
    Sex: [],
};

function EditPage() {
    const router = useNavigate();
    const location = useLocation();
    const employeeModel = location.state as EmployeeVM || {};
    const employeeToEdit: Employee = {
        Id: employeeModel.id,
        Firstname: employeeModel.firstname,
        Lastname: employeeModel.lastname,
        Age: employeeModel.age,
        Sex: employeeModel.sex,
    };

    async function handleUpdate(employee: Employee) {
        const result = await updateEmployee(employee);
        return result;
    }

    return (
        <div className='forms'>
            <EmployeeForm
                initialEmployee={employeeToEdit}
                onSubmit={handleUpdate}
                initialErrors={emptyErrors}
            />
            <button type='button' onClick={() => router('/')}>Return</button>
        </div>
    );
};

export default EditPage;