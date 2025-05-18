import React, { useState, useMemo, useEffect } from "react";
import { useTable, useSortBy, useRowSelect } from "react-table";
import "../Styles/DepartmentTable.scss";
import avatar from "../assets/Images/avatar-df.png"
import { FaSearch } from 'react-icons/fa';

const DepartmentTable = ({ onRowSelect }) => {
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

    const data = React.useMemo(
        () => [
            {
                "departmentID": 15,
                "departmentName": "Các khoa chuyên ngành"
            },
            {
                "departmentID": 12,
                "departmentName": "Công đoàn"
            },
            {
                "departmentID": 13,
                "departmentName": "Đoàn Thanh niên, Hội SV"
            },
            {
                "departmentID": 1,
                "departmentName": "HC"
            },
            {
                "departmentID": 9,
                "departmentName": "Phòng Cơ sở Vật chất"
            },
            {
                "departmentID": 2,
                "departmentName": "Phòng Công tác Sinh viên"
            },
            {
                "departmentID": 4,
                "departmentName": "Phòng Đào tạo"
            },
            {
                "departmentID": 3,
                "departmentName": "Phòng Hành chính - Tổng hợp"
            },
            {
                "departmentID": 6,
                "departmentName": "Phòng Kế hoạch - Tài chính"
            },
            {
                "departmentID": 7,
                "departmentName": "Phòng Khảo thí & Đảm bảo CLGD"
            },
            {
                "departmentID": 5,
                "departmentName": "Phòng Kỹ thuật, IT"
            },
            {
                "departmentID": 8,
                "departmentName": "Phòng Thanh tra - Pháp chế"
            },
            {
                "departmentID": 14,
                "departmentName": "Tổ Công nghệ Thông tin"
            },
            {
                "departmentID": 10,
                "departmentName": "Trung tâm Hỗ trợ SV & Quan hệ DN"
            },
            {
                "departmentID": 11,
                "departmentName": "Trung tâm Tin học Bách khoa"
            }
        ]
        , []
    );
    // Xử lý filter dữ liệu
    const filteredData = React.useMemo(() => {
        if (!searchTerm) return data;

        return data.filter((department) => {
            const departmentName = department.departmentName?.toLowerCase().includes(searchTerm.toLowerCase());
            return departmentName;
        });
    }, [searchTerm, data]);
    // Tính toán số lượng trang
    const pageCount = Math.ceil(filteredData.length / pageSize);

    // Lấy dữ liệu cho trang hiện tại
    const currentPageData = React.useMemo(() => {
        const startIndex = currentPage * pageSize;
        return filteredData.slice(startIndex, startIndex + pageSize);
    }, [currentPage, pageSize, filteredData]);
    // Hàm xử lý thay đổi số lượng item trên trang
    const handlePageSizeChange = (event) => {
        setPageSize(Number(event.target.value));
        setCurrentPage(0); // Reset về trang đầu tiên khi thay đổi pageSize
    };

    // Hàm xử lý chuyển trang
    const gotoPage = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    // Hàm xử lý chuyển đến trang trước
    const previousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Hàm xử lý chuyển đến trang sau
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
                        Mã Phòng Ban
                    </div >
                ), accessor: "departmentID",
            },
            {
                Header: "Tên phòng ban", accessor: "departmentName",
                Cell: ({ value }) => (
                    <span className="single-line-cell">{value}</span>
                ),
                width: 1000
            },


        ],
        []
    );

    const tableInstance = useTable({
        columns, data: currentPageData,
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
                        placeholder="Tìm kiếm theo tên phòng ban"
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
