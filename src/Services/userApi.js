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
        addUser: builder.mutation({
            query: (body) => ({
                url: 'api/User',
                method: 'POST',
                body: body,
            }),
        }),
        getUserRoles: builder.query({
            query: () => 'api/Role',
        }),
        deleteUserById: builder.mutation({
            query: (idToDelete) => ({
                url: `api/User/DeleteById?id=${idToDelete}`,
                method: 'DELETE',
            }),
        }),
        getUsersById: builder.query({
            query: (Id) => `api/User/${Id}`,
        }),
        updateUser: builder.mutation({
            query: (body) => ({
                url: `api/User`,
                method: 'PUT',
                body,
            }),
        }),
        updateUserStatus: builder.mutation({
            query: ({ userId, newStatus }) => ({
                url: `api/User/update-status?userid=${userId}&newStatus=${newStatus}`,
                method: 'Patch',
            }),
        }),
        updateAvatar: builder.mutation({
            query: ({ avatarFile }) => {
                const formData = new FormData();
                formData.append('avatar', avatarFile);

                return {
                    url: `api/User/update-avatar`,
                    method: 'POST',
                    body: formData,
                };
            },
        }),
        changePassword: builder.mutation({
            query: ({ userId, currentPassword, newPassword, confirmPassword }) => ({
                url: `api/User/change-password?userid=${userId}&currentPass=${encodeURIComponent(currentPassword)}&newPass=${encodeURIComponent(newPassword)}&confirmPass=${encodeURIComponent(confirmPassword)}`,
                method: 'POST',
            }),
        }),
    }),
});

export const { useSignInMutation, useGetUsersByDepartmentQuery, useGetAllUsersQuery, useAddUserMutation,
    useGetUserRolesQuery, useDeleteUserByIdMutation, useGetUsersByIdQuery, useUpdateUserMutation, useUpdateUserStatusMutation,
    useUpdateAvatarMutation, useChangePasswordMutation
} = userApi;
