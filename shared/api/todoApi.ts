import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Todo {
  id: string; // UUID from Supabase
  title: string;
  completed: boolean;
}

const SUPABASE_URL = "https://cczzcyrwfhbifqvrrivy.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjenpjeXJ3ZmhiaWZxdnJyaXZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyODE1NTAsImV4cCI6MjA2Mzg1NzU1MH0.FRPXHYCnkmQsGFWN29SP0GyJxoVCl4_GRuFxcb2yDCU"; // use env variables in production

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
