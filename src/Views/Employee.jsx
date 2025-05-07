import NavBar from "./NavBar";
import React, { useMemo } from 'react';
import { useTable, useSortBy, useRowSelect } from 'react-table';
import "../Styles/Employee.scss"
import EmployeeTable from "./EmployeeTable";
const Employee = () => {
    return (
        <NavBar title="Employee List " path="Employee"   >
            <div className="main-container">
                <div className="header-main">
                    <div className="header-main-left">
                        Customer List
                    </div>
                </div>
                <div className="Main-Employee">
                    <EmployeeTable />
                </div>
            </div>
        </NavBar>
    )
}
export default Employee;