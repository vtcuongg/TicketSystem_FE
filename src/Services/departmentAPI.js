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
        addDepartment: builder.mutation({
            query: (body) => ({
                url: 'Department',
                method: 'POST',
                body,
            }),
        }),
        getDepartmentById: builder.query({
            query: (id) => `Department/${id}`,
        }),
        deleteDepartment: builder.mutation({
            query: (id) => ({
                url: `Department/${id}`,
                method: 'DELETE',
            }),
        }),
        updateDepartment: builder.mutation({
            query: (body) => ({
                url: `Department`,
                method: 'PUT',
                body,
            }),
        }),
    }),
});

export const { useGetDepartmentsQuery, useAddDepartmentMutation, useDeleteDepartmentMutation,
    useGetDepartmentByIdQuery, useUpdateDepartmentMutation } = departmentApi;
