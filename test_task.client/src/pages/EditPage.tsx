import { useLocation } from "react-router-dom";
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
        <EmployeeForm
            initialEmployee={employeeToEdit}
            onSubmit={handleUpdate}
            initialErrors={emptyErrors}
        />
    );
};

export default EditPage;