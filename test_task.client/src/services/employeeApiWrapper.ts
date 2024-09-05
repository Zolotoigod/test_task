import { Employee, EmployeeVM } from "../interfaces/employee";
import { ReadRequest } from "../interfaces/requests";
import axios from "axios";

const BASE_API = 'https://localhost:7164/api/employee/';

export async function getEmployees(request: ReadRequest) {

    const result = await axios.get(`${BASE_API}read?${request.LastNameFilter}OrderBy=${request.SortRule}`, {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (result.status !== 200) {
        throw new Error(`Failed to load employees: ${result.statusText}`);
    }

    return result.data as EmployeeVM[];
};

export async function createEmployee(request: Employee) {

    const result = await axios.post(`${BASE_API}create`, request, {
        headers: {
            'Content-Type': 'application/json',
        },
        validateStatus: function (status) {
            return status < 500;
        }
    });

    return result;
};

export async function updateEmployee(request: Employee) {
    const result = await axios.put(`${BASE_API}update`, request, {
        headers: {
            'Content-Type': 'application/json',
        },
        validateStatus: function (status) {
            return status < 500;
        }
    });

    return result;
};

export async function removeEmployees(request: string[]) {

    const result = await axios.delete(`${BASE_API}delete`, {
        headers: {
            'Content-Type': 'application/json',
        },
        data: { Guids: request }
    });

    if (result.status !== 200) {
        throw new Error(`Failed to remove employees: ${result.statusText}`);
    }
};