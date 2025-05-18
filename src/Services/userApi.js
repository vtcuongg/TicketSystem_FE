import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://localhost:7198/',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('authToken');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        signIn: builder.mutation({
            query: (body) => ({
                url: 'api/Account/SignIn',
                method: 'POST',
                body,
            }),
        }),
        getUsersByDepartment: builder.query({
            query: (departmentId) => `api/User/ByDepartment/${departmentId}`,
        }),
        getAllUsers: builder.query({
            query: () => 'api/User',
        }),
    }),
});

export const { useSignInMutation, useGetUsersByDepartmentQuery, useGetAllUsersQuery
} = userApi;
