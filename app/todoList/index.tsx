import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "@/shared/api/todoApi";

import {
  addTodo,
  toggleTodo,
  deleteTodo,
} from "@/shared/redux/slices/todoSlice";

export default function TodoApp() {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const localTodos = useSelector((state: any) => state.todos);

  const { data: todosFromSupabase, isLoading } = useGetTodosQuery();
  const [addTodoToSupabase] = useAddTodoMutation();
  const [updateTodoInSupabase] = useUpdateTodoMutation();
  const [deleteTodoFromSupabase] = useDeleteTodoMutation();

  useEffect(() => {
    if (todosFromSupabase) {
      todosFromSupabase.forEach((todo) => {
        const exists = localTodos.find((t: any) => t.id === todo.id);
        if (!exists) {
          dispatch(
            addTodo({
              id: todo.id,
              title: todo.title,
              completed: todo.completed,
              synced: true,
            })
          );
        }
      });
    }
  }, [todosFromSupabase]);

  // Add new todo handler
  const handleAdd = async () => {
    if (!title.trim()) return;

    try {
      const response = await addTodoToSupabase({ title, completed: false });

      console.log("Add todo response:", response);

      if ("data" in response && response.data && response.data.length > 0) {
        const todo = response.data[0];
        dispatch(
          addTodo({
            id: todo.id,
            title: todo.title,
            completed: todo.completed,
            synced: true,
          })
        );
        setTitle("");
      } else if ("error" in response && response.error) {
        console.error("Error adding todo:", response.error);
      } else {
        console.error("Unexpected response adding todo:", response);
      }
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  // Toggle complete status
  const handleToggle = async (todo: any) => {
    dispatch(toggleTodo(todo.id));
    await updateTodoInSupabase({ id: todo.id, completed: !todo.completed });
  };

  // Delete todo
  const handleDelete = async (id: number) => {
    dispatch(deleteTodo(id));
    await deleteTodoFromSupabase(id);
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Enter a task"
        style={styles.input}
      />
      <Button title="Add" onPress={handleAdd} />

      {isLoading ? (
        <Text>Loading todos...</Text>
      ) : (
        <FlatList
          data={localTodos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => handleToggle(item)}
              onLongPress={() => handleDelete(item.id)}
            >
              <Text style={item.completed ? styles.completed : styles.text}>
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#333",
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
  item: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 6,
  },
  text: {
    fontSize: 16,
  },
  completed: {
    fontSize: 16,
    textDecorationLine: "line-through",
    color: "gray",
  },
});
