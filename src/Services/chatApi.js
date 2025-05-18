import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const chatApi = createApi({
    reducerPath: 'chatApi',
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
        getMessagesBetweenUsers: builder.query({
            query: ({ userId, otherUserId }) =>
                `api/Chat/messages?userId=${userId}&otherUserId=${otherUserId}`,
        }),
        getUserMessages: builder.query({
            query: (userId) => `api/Chat/users-Message/${userId}`,
        }),
        markMessageAsRead: builder.mutation({
            query: (messageId) => ({
                url: `api/Chat/mark-as-read/${messageId}`,
                method: 'PUT',
            }),
        }),
    }),
});

export const { useGetUserMessagesQuery, useGetMessagesBetweenUsersQuery, useMarkMessageAsReadMutation } = chatApi;
