import React, { useState, useMemo, useEffect } from "react";
import { useTable, useSortBy, useRowSelect } from "react-table";
import "../Styles/CategoryTable.scss";
import avatar from "../assets/Images/avatar-df.png"
import { FaSearch } from 'react-icons/fa';
import { useGetCategoriesByDepartmentQuery, useGetAllCategoriesQuery } from '../Services/categoryApi';
import { useGetDepartmentsQuery } from '../Services/departmentAPI';
import { useLocation } from 'react-router-dom';

const CategoryTable = ({ onRowSelect, reloadFlag }) => {
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
    const [department, setDepartment] = useState('');
    const { data: dataDepartment, isLoading, error } = useGetDepartmentsQuery()
    const { data: data, refetch } = useGetAllCategoriesQuery()
    const location = useLocation();
    useEffect(() => {
        refetch()
    }, [location.pathname]);
    useEffect(() => {
        refetch();
    }, [reloadFlag]);
    const filteredData = React.useMemo(() => {
        if (!data) return []
        return data?.data.filter((Category) => {
            const matchesSearch = searchTerm
                ? Category.categoryName?.toLowerCase().includes(searchTerm.toLowerCase())
                : true;

            const matchesDepartment = department
                ? Category.departmentID === parseInt(department, 10)
                : true;

            return matchesSearch && matchesDepartment;
        });
    }, [searchTerm, data?.data, department]);
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
                        Mã đề mục
                    </div >
                ), accessor: "categoryID",
            },
            {
                Header: "Tên đề mục", accessor: "categoryName",
                Cell: ({ value }) => (
                    <span className="single-line-cell">{value}</span>
                ),
                width: 1000
            },
            {
                Header: "Thuộc phòng ban ", accessor: "departmentName",
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
        getRowId: (row) => row.categoryID,
    }, useSortBy, useRowSelect);
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state: { selectedRowIds }, toggleAllRowsSelected } =
        tableInstance;
    useEffect(() => {
        if (onRowSelect && selectedRowIds) {
            const selectedIdsArray = rows
                .filter(row => selectedRowIds[row.id])
                .map(row => row.original.categoryID);
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
        <div className="Category-table-wrapper">
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
                    <div className="search-input-container">
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên phân loại"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                        <FaSearch className="search-icon" />
                    </div>
                    <div className="search-select-container">
                        <select
                            id="Department"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            required
                            className="search-select"
                        >
                            <option value="">Select a Department</option>
                            {dataDepartment?.data.map((option) => (
                                <option key={option.departmentID} value={option.departmentID}>
                                    {option.departmentName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className="Category-table-container">
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

export default CategoryTable;
