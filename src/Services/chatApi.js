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
        sendMessage: builder.mutation({
            query: ({ senderId, receiverId, content, attachments }) => {
                const formData = new FormData();
                formData.append('SenderId', senderId);
                formData.append('ReceiverId', receiverId);
                formData.append('Content', content);

                attachments.forEach((file, index) => {
                    formData.append('Attachments', file);
                });

                return {
                    url: `api/Chat`,
                    method: 'POST',
                    body: formData,
                };
            },
        }),
    }),
});

export const { useGetUserMessagesQuery, useGetMessagesBetweenUsersQuery, useMarkMessageAsReadMutation, useSendMessageMutation } = chatApi;
