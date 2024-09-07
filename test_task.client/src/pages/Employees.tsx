import { useEffect, useState } from "react";
import { EmployeeVM } from "../interfaces/employee";
import { getEmployees, removeEmployees } from "../services/employeeApiWrapper";
import { SortRule } from "../interfaces/requests";
import { useNavigate } from "react-router-dom";
import CheckboxExt from "../componnents/CheckboxExt";
import ConfrimMoadl from "../componnents/ConfrimModal";

function Employees() {

    const CONFRIM_DELETE = 'Delete selected items?';

    const [employees, setEmployees] = useState<EmployeeVM[]>([]);
    const [filter, setFilter] = useState<string>('');
    const [toDelete, setToDelete] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteDisable, setDeleteDisable] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const router = useNavigate();

    async function LoadEmployees() {

        setLoading(true);
        if (!filter?.length) {
            const date = await getEmployees({ SortRule: SortRule.asc, LastNameFilter: '' });
            setEmployees(date);
        } else {
            const date = await getEmployees({ SortRule: SortRule.asc, LastNameFilter: `LastNameFilter=${filter}&` });
            setEmployees(date);
        };
        setLoading(false);
    };

    useEffect(() => {
        LoadEmployees();
        return;
    }, [filter]);

    async function onDelete() {
        setModalOpen(true);
    };

    async function DeleteConfrim() {
        if (toDelete.length) {
            await removeEmployees(toDelete);
            console.log('deleted items' + toDelete.length);
            LoadEmployees();
        };
        setModalOpen(false);
    };

    function DeleteCancel() {
        setModalOpen(false);
    };

    function onEdit(employee: EmployeeVM) {
        console.log('edit' + employee.id);
        router('/edit', { state: employee });
    };

    function onCheck(id: string) {
        if (!toDelete.find(item => item === id)) {
            toDelete.push(id);
            setDeleteDisable(false);
            console.log('to delete ' + id);
        }
    };

    function onUncheck(id: string) {
        const newDelete = toDelete.filter(item => item !== id);
        setToDelete(newDelete);
        if (!newDelete.length) {
            setDeleteDisable(true);
        }
        console.log('save ' + id);
    };

    function handleFilter(e: React.ChangeEvent<HTMLInputElement>) {
        setFilter(e.target.value);
    };

    return (
        <div>
            <div className='panel'>
                <button type='button' onClick={() => router('/create')}>NEW</button>
                <label className='input-lable'>Filter by last name
                    <input name='filter' type='text' value={filter} onChange={e => handleFilter(e)} />
                </label>
                <button type='button' onClick={onDelete} disabled={deleteDisable}>DELETE SELECTED</button>
                <ConfrimMoadl isOpen={modalOpen} message={CONFRIM_DELETE} onCancel={DeleteCancel} onConfirm={DeleteConfrim} />
            </div>

            {loading ? (<div>...Loading</div>) : employees.length ? (
                <div className='employees'>
                    <table className='table-striped'>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Sex</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee) => (
                                <tr key={employee.id}>
                                    <td><CheckboxExt onCheck={() => onCheck(employee.id)} onUncheck={() => onUncheck(employee.id)} /></td>
                                    <td>{employee.firstname + ' ' + employee.lastname}</td>
                                    <td>{employee.age + ' years'}</td>
                                    <td>{employee.sex}</td>
                                    <td><button className="svg-button" onClick={() => onEdit(employee)} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>) : (
                <div>
                    <h2>Emloyees list is empty</h2>
                </div>)}
            
        </div>
    );
}

export default Employees;