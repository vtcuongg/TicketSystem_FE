import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const reportApi = createApi({
    reducerPath: 'reportApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://vietcuong-001-site1.jtempurl.com/',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('authToken');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getSummaryUserByDepartment: builder.query({
            query: (departmentId) => `api/Report/SumaryUser?DepartmentId=${departmentId}`,
        }),
        getRatingReportByDepartment: builder.query({
            query: (departmentId) => `api/Report/RatingReport?DepartmentId=${departmentId}`,
        }),
        getSummaryTicket: builder.query({
            query: ({ startDate, endDate, departmentId }) =>
                `api/Report/SumaryTicket?startDate=${startDate}&endDate=${endDate}&DepartmentId=${departmentId}`,
        }),
    }),
});

export const { useGetRatingReportByDepartmentQuery, useGetSummaryUserByDepartmentQuery, useGetSummaryTicketQuery } = reportApi;

