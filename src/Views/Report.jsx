import NavBar from "./NavBar";
import React, { useMemo, useState, useEffect } from 'react';
import "../Styles/Report.scss"
import ReactApexChart from 'react-apexcharts';
import RatingTable from "./RatingTable";
import { jwtDecode } from 'jwt-decode';
import { useGetSummaryUserByDepartmentQuery, useGetSummaryTicketQuery } from '../Services/reportApi';
import { FaChartPie } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const Report = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const location = useLocation();
    const today = new Date();
    useEffect(() => {
        const today = new Date();
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
        firstDay.setHours(0, 0, 0, 0);
        const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        lastDay.setHours(0, 0, 0, 0);
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        setStartDate(formatDate(firstDay));
        setEndDate(formatDate(lastDay));
    }, []);
    const [user, setUser] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('user');
        if (token && storedUser) {
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                if (decodedToken.exp > currentTime) {
                    setUser(JSON.parse(storedUser));
                } else {
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('user');
                }
            } catch (err) {
                localStorage.removeItem('authToken');
                localStorage.removeItem('user');
            }
        }
    }, []);
    const { data: dataEmployee, isLoading, error, refetch: refetchdataEmployee } = useGetSummaryUserByDepartmentQuery(user?.departmentID);
    const { data: ticketData, isLoading: isLoadingdataTicket, error: errordataTicket, refetch: refetchticketData } = useGetSummaryTicketQuery({
        startDate: startDate,
        endDate: endDate,
        departmentId: user?.departmentID,
    });

    useEffect(() => {
        refetchdataEmployee()
        refetchticketData()
    }, [location.pathname, user?.departmentID, startDate, endDate]);
    const statusColorMap = {
        "Mới": "#FFA500",
        "Đang xử lý": "#008000",
        "Chờ xác nhận": "#0000FF",
        "Đã hủy": "#FF0000",
        "Hoàn thành": "#808080",
        "Cháy Deadline": "#FF4500"
    };
    const statusEmployeeColorMap = {
        "Active": "#008000",
        "InActive": "#FFA500"
    };


    const statusCounts = dataEmployee?.statusCounts ?? [];
    const series_employee = statusCounts?.map(item => item.userCount) ?? [];
    const labels_employee = statusCounts?.map(item => item.status) ?? [];
    const colors_employee = statusCounts?.map(item => statusEmployeeColorMap[item.status] || '#808080') ?? [];
    const chartEmployeeOptions = {
        chart: {
            type: 'donut',
        },
        labels: labels_employee,
        colors: colors_employee,
        legend: {
            position: 'right',
            offsetY: 0,
            offsetX: 10

        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };
    const { ticketSummary } = ticketData ?? [];

    const series = ticketSummary?.map(item => item.ticketCount) ?? [];
    const labels = ticketSummary?.map(item => item.status) ?? [];
    const colors = ticketSummary?.map(item => statusColorMap[item.status] || '#808080') ?? [];
    const chartOptions = useMemo(() => ({
        chart: { type: 'donut' },
        labels: labels,
        colors: colors,
        legend: {
            position: 'right',
            offsetY: 0,
            offsetX: 10,
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: { width: 200 },
                legend: { position: 'bottom' },
            },
        }],
    }), [labels, colors]);

    const chartSeries = useMemo(() => {
        return Array.isArray(series) ? [...series] : [];
    }, [series]);

    const hasEmployeeData = Array.isArray(series_employee) && series_employee.length > 0;
    const hasTicketData = Array.isArray(chartSeries) && chartSeries.length > 0;
    return (
        <NavBar title="Report" showHeaderLink={false} >
            <div className="report-main-container">
                <div className="main-top">
                    <div className="main-top-employee">
                        <div className="main-top-employee-title">
                            <p>
                                Employees
                            </p>
                        </div>
                        {hasEmployeeData ? (
                            <div>
                                <ReactApexChart className="ReactApexChart" options={chartEmployeeOptions} series={series_employee} type="donut" height={240} />
                                <p >Total Employees: {dataEmployee?.totalUsers}</p>
                            </div>
                        ) : (
                            <div className="no-data-message">No data yet</div>
                        )}
                    </div>
                    <div className="main-top-ticket">
                        <div className="main-top-ticket-title">
                            <p>
                                Tickets
                            </p>
                            <input
                                type="date"
                                id="StartDate"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                            <span>~</span>
                            <input
                                type="date"
                                id="EndDate"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                        {hasTicketData ? (
                            <div>
                                <ReactApexChart
                                    key={JSON.stringify(chartSeries)}
                                    className="ReactApexChart" options={chartOptions} series={chartSeries} type="donut" height={240} />
                                <p >Total tickets: {ticketData?.totalTicket}</p>
                            </div>
                        ) : (
                            <div className="no-data-message">No data yet</div>
                        )}

                    </div>
                </div>
                <div className="main-bottom">
                    < RatingTable />
                </div>
            </div>
        </NavBar>
    )
}
export default Report;