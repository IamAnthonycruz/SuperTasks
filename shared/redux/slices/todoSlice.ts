import { createSlice } from "@reduxjs/toolkit";

let id = 0;

const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state: any, action: any) => {
      state.push({
        id: ++id,
        text: action.payload,
        completed: false,
      });
    },
    toggleTodo: (state: any, action: any) => {
      const todo = state.find((todo: any) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state: any, action: any) => {
      return state.filter((todo: any) => todo.id !== action.payload);
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
