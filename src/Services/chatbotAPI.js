import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const aiChatApi = createApi({
  reducerPath: 'aiChatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta/models/',
  }),
  endpoints: (builder) => ({
    sendQuestionToGemini: builder.mutation({
      query: ({ prompt, imageBase64, systemPrompt }) => {
        const contents = [];

        const fullPrompt = systemPrompt
          ? `${systemPrompt}\n\nC?u h?i: ${prompt}`
          : prompt;

        const parts = [];

        if (fullPrompt) {
          parts.push({ text: fullPrompt });
        }

        if (imageBase64) {
          parts.push({
            inlineData: {
              mimeType: 'image/png',
              data: imageBase64,
            },
          });
        }

        contents.push({
          role: 'user',
          parts,
        });

        return {
          url: `gemini-1.5-flash:generateContent?key=AIzaSyA7eK_JDD66qao-mhayZELgDBlwLiIaMwU`,
          method: 'POST',
          body: {
            contents,
          },
        };
      }

    }),
  }),
});

export const { useSendQuestionToGeminiMutation } = aiChatApi;
