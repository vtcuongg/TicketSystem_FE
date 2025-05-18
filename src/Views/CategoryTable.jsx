import React, { useState, useMemo, useEffect } from "react";
import { useTable, useSortBy, useRowSelect } from "react-table";
import "../Styles/CategoryTable.scss";
import avatar from "../assets/Images/avatar-df.png"
import { FaSearch } from 'react-icons/fa';

const CategoryTable = ({ onRowSelect }) => {
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

    const dataDepartment = React.useMemo(
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
    const data = React.useMemo(
        () => [
            {
                "categoryID": 1,
                "categoryName": "Miễn giảm học phí",
                "departmentID": 1,
                "departmentName": "HC"
            },
            {
                "categoryID": 2,
                "categoryName": "Chính sách đãi ngộ",
                "departmentID": 1,
                "departmentName": "HC"
            },
            {
                "categoryID": 3,
                "categoryName": "Ký túc xá",
                "departmentID": 1,
                "departmentName": "HC"
            },
            {
                "categoryID": 4,
                "categoryName": "Bảo hiểm",
                "departmentID": 1,
                "departmentName": "HC"
            },
            {
                "categoryID": 5,
                "categoryName": "Cấp giấy tờ",
                "departmentID": 2,
                "departmentName": "Phòng Công tác Sinh viên"
            },
            {
                "categoryID": 6,
                "categoryName": "Nhân sự",
                "departmentID": 2,
                "departmentName": "Phòng Công tác Sinh viên"
            },
            {
                "categoryID": 7,
                "categoryName": "Học vụ",
                "departmentID": 3,
                "departmentName": "Phòng Hành chính - Tổng hợp"
            },
            {
                "categoryID": 8,
                "categoryName": "Xử lý lỗi hệ thống",
                "departmentID": 4,
                "departmentName": "Phòng Đào tạo"
            },
            {
                "categoryID": 9,
                "categoryName": "Hỗ trợ CNTT",
                "departmentID": 4,
                "departmentName": "Phòng Đào tạo"
            },
            {
                "categoryID": 10,
                "categoryName": "Học phí",
                "departmentID": 5,
                "departmentName": "Phòng Kỹ thuật, IT"
            },
            {
                "categoryID": 11,
                "categoryName": "Học bổng",
                "departmentID": 5,
                "departmentName": "Phòng Kỹ thuật, IT"
            },
            {
                "categoryID": 12,
                "categoryName": "Thu chi",
                "departmentID": 5,
                "departmentName": "Phòng Kỹ thuật, IT"
            },
            {
                "categoryID": 13,
                "categoryName": "Giám sát thi cử",
                "departmentID": 6,
                "departmentName": "Phòng Kế hoạch - Tài chính"
            },
            {
                "categoryID": 14,
                "categoryName": "Đánh giá chất lượng",
                "departmentID": 6,
                "departmentName": "Phòng Kế hoạch - Tài chính"
            },
            {
                "categoryID": 15,
                "categoryName": "Khiếu nại",
                "departmentID": 7,
                "departmentName": "Phòng Khảo thí & Đảm bảo CLGD"
            },
            {
                "categoryID": 16,
                "categoryName": "Tố cáo",
                "departmentID": 7,
                "departmentName": "Phòng Khảo thí & Đảm bảo CLGD"
            },
            {
                "categoryID": 17,
                "categoryName": "Giám sát nội quy",
                "departmentID": 7,
                "departmentName": "Phòng Khảo thí & Đảm bảo CLGD"
            },
            {
                "categoryID": 18,
                "categoryName": "Sửa chữa phòng học,Thiết bị giảng dạy",
                "departmentID": 8,
                "departmentName": "Phòng Thanh tra - Pháp chế"
            },
            {
                "categoryID": 19,
                "categoryName": "Việc làm",
                "departmentID": 9,
                "departmentName": "Phòng Cơ sở Vật chất"
            },
            {
                "categoryID": 20,
                "categoryName": "Kỹ năng mềm",
                "departmentID": 9,
                "departmentName": "Phòng Cơ sở Vật chất"
            },
            {
                "categoryID": 21,
                "categoryName": "Hỗ trợ phần mềm",
                "departmentID": 10,
                "departmentName": "Trung tâm Hỗ trợ SV & Quan hệ DN"
            },
            {
                "categoryID": 22,
                "categoryName": "Mạng nội bộ",
                "departmentID": 10,
                "departmentName": "Trung tâm Hỗ trợ SV & Quan hệ DN"
            },
            {
                "categoryID": 23,
                "categoryName": "Hỗ trợ đời sống cán bộ",
                "departmentID": 11,
                "departmentName": "Trung tâm Tin học Bách khoa"
            },
            {
                "categoryID": 24,
                "categoryName": "Hoạt động ngoại khóa",
                "departmentID": 12,
                "departmentName": "Công đoàn"
            },
            {
                "categoryID": 25,
                "categoryName": "Tình nguyện",
                "departmentID": 12,
                "departmentName": "Công đoàn"
            },
            {
                "categoryID": 26,
                "categoryName": "Câu lạc bộ",
                "departmentID": 12,
                "departmentName": "Công đoàn"
            },
            {
                "categoryID": 27,
                "categoryName": "Quản lý máy chủ",
                "departmentID": 13,
                "departmentName": "Đoàn Thanh niên, Hội SV"
            },
            {
                "categoryID": 28,
                "categoryName": "An toàn dữ liệu",
                "departmentID": 13,
                "departmentName": "Đoàn Thanh niên, Hội SV"
            },
            {
                "categoryID": 29,
                "categoryName": "Xác nhận học phần",
                "departmentID": 14,
                "departmentName": "Tổ Công nghệ Thông tin"
            },
            {
                "categoryID": 30,
                "categoryName": "Xét duyệt đề tài nghiên cứu",
                "departmentID": 14,
                "departmentName": "Tổ Công nghệ Thông tin"
            }
        ]
        , []
    );
    // Xử lý filter dữ liệu
    const filteredData = React.useMemo(() => {
        if (!searchTerm && !department) return data;

        return data.filter((Category) => {
            const matchesSearch = searchTerm
                ? Category.categoryName?.toLowerCase().includes(searchTerm.toLowerCase())
                : true;

            const matchesDepartment = department
                ? Category.departmentID === parseInt(department, 10)
                : true;

            return matchesSearch && matchesDepartment;
        });
    }, [searchTerm, data, department]);
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
        columns, data: currentPageData,
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
                            {dataDepartment.map((option) => (
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
