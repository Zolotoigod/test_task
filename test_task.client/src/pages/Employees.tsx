import { useEffect, useState } from "react";
import { EmployeeVM } from "../interfaces/employee";
import { getEmployees, removeEmployees } from "../services/employeeApiWrapper";
import { SortRule } from "../interfaces/requests";
import { useNavigate } from "react-router-dom";
import CheckboxExt from "../componnents/CheckboxExt";

function Employees() {

    const [employees, setEmployees] = useState<EmployeeVM[]>([]);
    const [filter, setFilter] = useState<string>();
    const [toDelete, setToDelete] = useState<string[]>([]);
    const router = useNavigate();

    async function LoadEmployees() {
        if (!filter?.length) {
            const date = await getEmployees({ SortRule: SortRule.asc, LastNameFilter: '' });
            setEmployees(date);
        } else {
            const date = await getEmployees({ SortRule: SortRule.asc, LastNameFilter: `LastNameFilter=${filter}&` });
            setEmployees(date);
        };
        
    };

    useEffect(() => {
        LoadEmployees();
    },[filter]);

    async function onDelete() {
        await removeEmployees(toDelete);
        console.log('deleted');
        LoadEmployees();
    };

    function onEdit(employee: EmployeeVM) {
        console.log('edit' + employee.id);
        router('/edit', { state: employee });
    };

    function onCheck(id: string) {
        if (!toDelete.find(item => item === id)) {
            toDelete.push(id);
            console.log('to delete ' + id);
        }
    };

    function onUncheck(id: string) {
        const newDelete = toDelete.filter(item => item !== id);
        setToDelete(newDelete);
        console.log('save ' + id);
    };

    function handleFilter(e: React.ChangeEvent<HTMLInputElement>) {
        setFilter(e.target.value);
    };

    return (
        <div>
            <label className='inputLabel'>Filter by last name
                <input name='filter' type='text' value={filter} onChange={handleFilter} />
            </label>
            <button onClick={() => router('/create')}>NEW</button>
            <button onClick={onDelete} >DELETE SELECTED</button>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Sex</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td><CheckboxExt onCheck={() => onCheck(employee.id)} onUncheck={() => onUncheck(employee.id)} /></td>
                            <td>{employee.firstname}</td>
                            <td>{employee.lastname}</td>
                            <td>{employee.age}</td>
                            <td>{employee.sex}</td>
                            <td><button className="svg-button" onClick={() => onEdit(employee)}/></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Employees;