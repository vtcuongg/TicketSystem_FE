import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const departmentApi = createApi({
    reducerPath: 'departmentApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://localhost:7198/api/',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('authToken');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getDepartments: builder.query({
            query: () => 'Department',
        }),
    }),
});

export const { useGetDepartmentsQuery } = departmentApi;
