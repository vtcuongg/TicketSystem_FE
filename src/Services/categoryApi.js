import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const categoryApi = createApi({
    reducerPath: 'categoryApi',
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
        getCategoriesByDepartment: builder.query({
            query: (departmentId) => `api/Category/by-department/${departmentId}`,
        }),
        getAllCategories: builder.query({
            query: () => 'api/Category',
        }),
        addCategory: builder.mutation({
            query: (body) => ({
                url: 'api/Category',
                method: 'POST',
                body,
            }),
        }),
        updateCategory: builder.mutation({
            query: (body) => ({
                url: `api/Category`,
                method: 'PUT',
                body,
            }),
        }),
        getCategoryById: builder.query({
            query: (id) => `/api/Category/${id}`,
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `api/Category/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetCategoriesByDepartmentQuery, useGetAllCategoriesQuery, useAddCategoryMutation,
    useDeleteCategoryMutation, useUpdateCategoryMutation, useGetCategoryByIdQuery
} = categoryApi;
