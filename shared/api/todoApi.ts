import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { createClient } from "@supabase/supabase-js";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}
const SUPABASE_KEY = process.env.EXPO_PUBLIC_SUPABASE_KEY!;
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!;
export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${SUPABASE_URL}/rest/v1/`,
    prepareHeaders: (headers) => {
      headers.set("apikey", SUPABASE_KEY);
      headers.set("Authorization", `Bearer ${SUPABASE_KEY}`);
      headers.set("Content-Type", "application/json");
      headers.set("Prefer", "return=representation");
      return headers;
    },
  }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => ({
        url: "todos",
        method: "GET",
      }),
      providesTags: ["Todos"],
    }),

    addTodo: builder.mutation<Todo[], Partial<Todo>>({
      query: (todo) => ({
        url: "todos",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["Todos"],
    }),

    updateTodo: builder.mutation<Todo[], Partial<Todo> & { id: string }>({
      query: ({ id, ...patch }) => ({
        url: `todos?id=eq.${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Todos"],
    }),

    deleteTodo: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `todos?id=eq.${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
