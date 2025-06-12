import React, { useState, useMemo, useEffect } from "react";
import { useTable, useSortBy, useRowSelect } from "react-table";
import "../Styles/DepartmentTable.scss";
import avatar from "../assets/Images/avatar-df.png"
import { FaSearch } from 'react-icons/fa';
import { useGetDepartmentsQuery } from '../Services/departmentAPI';
import { useLocation } from 'react-router-dom';
const DepartmentTable = ({ onRowSelect, reloadFlag }) => {
    const IndeterminateCheckbox = React.forwardRef(
        ({ indeterminate, ...rest }, ref) => {
            const defaultRef = React.useRef()
            const resolvedRef = ref || defaultRef

            React.useEffect(() => {
                resolvedRef.current.indeterminate = indeterminate
            }, [resolvedRef, indeterminate])

            return (
                <>
                    <input className="checkbox" type="checkbox" ref={resolvedRef} {...rest} />
                </>
            )
        }
    )
    const [searchTerm, setSearchTerm] = useState("");
    const [pageSize, setPageSize] = useState(8);
    const [currentPage, setCurrentPage] = useState(0);
    const location = useLocation();

    const { data: data, isLoading, error, refetch } = useGetDepartmentsQuery()
    useEffect(() => {
        refetch()
    }, [location.pathname]);
    const filteredData = React.useMemo(() => {
        if (!data?.data) return [];

        return data?.data.filter((department) => {
            const departmentName = department.departmentName?.toLowerCase().includes(searchTerm.toLowerCase());
            return departmentName;
        });
    }, [searchTerm, data?.data]);
    useEffect(() => {
        refetch();
    }, [reloadFlag]);
    const pageCount = Math.ceil(filteredData?.length / pageSize);
    const currentPageData = React.useMemo(() => {
        const startIndex = currentPage * pageSize;
        return filteredData?.slice(startIndex, startIndex + pageSize);
    }, [currentPage, pageSize, filteredData]);
    const handlePageSizeChange = (event) => {
        setPageSize(Number(event.target.value));
        setCurrentPage(0);
    };

    const gotoPage = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const previousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextPage = () => {
        if (currentPage < pageCount - 1) {
            setCurrentPage(currentPage + 1);
        }
    };
    const columns = useMemo(
        () => [
            {
                id: 'selection',
                width: 1,
                Header: ({ getToggleAllRowsSelectedProps }) => (
                    <div>
                        <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                    </div>
                ),
                Cell: ({ row }) => (
                    <div>
                        <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                    </div>
                ),
            },
            {
                Header: () => (
                    <div>
                        Department ID
                    </div >
                ), accessor: "departmentID",
            },
            {
                Header: "Department Name", accessor: "departmentName",
                Cell: ({ value }) => (
                    <span className="single-line-cell">{value}</span>
                ),
                width: 1000
            },


        ],
        []
    );

    const tableInstance = useTable({
        columns, data: currentPageData ?? [],
        getRowId: (row) => row.departmentID,
    }, useSortBy, useRowSelect);
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state: { selectedRowIds }, toggleAllRowsSelected } =
        tableInstance;
    useEffect(() => {
        if (onRowSelect && selectedRowIds) {
            const selectedIdsArray = rows
                .filter(row => selectedRowIds[row.id])
                .map(row => row.original.departmentID);
            onRowSelect(selectedIdsArray);
        }
    }, [selectedRowIds]);
    const renderPageNumbers = useMemo(() => {
        const pageNumbers = [];
        for (let i = 0; i < pageCount; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => gotoPage(i)}
                    className={currentPage === i ? "active" : ""}
                >
                    {i + 1}
                </button>
            );
        }
        return pageNumbers;
    }, [currentPage, pageCount, gotoPage]);
    return (
        <div className="Department-table-wrapper">
            <div className="Table-Header">
                <div className="show-entries">
                    <span>Show</span>
                    <select value={pageSize} onChange={handlePageSizeChange}>
                        <option value={5}>5</option>
                        <option value={8}>8</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                    </select>
                    <span>entries</span>
                </div>
                <div className="Header-Search">
                    <input
                        type="text"
                        placeholder="Search by name department"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <FaSearch className="search-icon" />
                </div>
            </div>
            <div className="Department-table-container">
                <table {...getTableProps()} className="Department-table">
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}
                                        style={{ width: column.width ? column.width : 'auto', whiteSpace: "nowrap" }}
                                    >
                                        <span style={{ marginRight: "60px", display: "flex", flexDirection: "row" }}>
                                            {column.render("Header")}
                                            {column.id !== 'selection' && column.isSorted ? (
                                                column.isSortedDesc ? (
                                                    <span style={{ fontWeight: 'bold' }}> ▲</span>
                                                ) : (
                                                    <span style={{ fontWeight: 'bold' }}> ▼</span>
                                                )
                                            ) : (column.id !== 'selection' && (
                                                <>
                                                    {" "}
                                                    <span style={{ opacity: 0.5 }}>▼</span>
                                                    <span style={{ opacity: 0.5 }}>▲</span>
                                                </>
                                            )
                                            )}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => (
                                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {pageCount >= 1 && (
                <div className="pagination">
                    <div className="pagination-info">
                        Showing {currentPage * pageSize + 1} to{" "}
                        {Math.min((currentPage + 1) * pageSize, filteredData.length)} of{" "}
                        {filteredData.length} entries
                    </div>
                    <div className="pagination-buttons">
                        <button onClick={previousPage} disabled={currentPage === 0}>
                            Previous
                        </button>
                        {renderPageNumbers}
                        <button onClick={nextPage} disabled={currentPage === pageCount - 1}>
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DepartmentTable;
