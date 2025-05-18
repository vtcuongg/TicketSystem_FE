import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
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
        getCategoriesByDepartment: builder.query({
            query: (departmentId) => `api/Category/by-department/${departmentId}`,
        }),
    }),
});

export const {
    useGetCategoriesByDepartmentQuery,
} = categoryApi;
