import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "expo-router";

import { useGetTodosQuery } from "@/shared/api/todoApi";
import { addTodo } from "@/shared/redux/slices/todoSlice";

export default function HomeScreen() {
  const dispatch = useDispatch();

  // Fetch todos from Supabase via RTK Query
  const { data: todosFromSupabase, isLoading } = useGetTodosQuery();

  // Get local todos from Redux
  const todos = useSelector((state: any) => state.todos);
  const pomodoro = useSelector((state: any) => state.pomodoro);

  // Sync fetched todos into Redux state
  useEffect(() => {
    if (todosFromSupabase) {
      todosFromSupabase.forEach((todo) => {
        // Only add if not already in local Redux state (avoid duplicates)
        const exists = todos.find((t: any) => t.id === todo.id);
        if (!exists) {
          dispatch(
            addTodo({
              id: todo.id,
              title: todo.title, // Or .text if your slice uses text
              completed: todo.completed,
              synced: true,
            })
          );
        }
      });
    }
  }, [todosFromSupabase]);

  // Counts
  const incompleteTodos = todos.filter((todo: any) => !todo.completed);
  const completedCount = todos.length - incompleteTodos.length;

  // Active task
  const activeTask = todos.find(
    (todo: any) => todo.id === pomodoro.activeTaskId
  );

  // Format time
  const minutes = Math.floor(pomodoro.timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (pomodoro.timeLeft % 60).toString().padStart(2, "0");

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading tasks...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome Back!</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📋 To-Do Summary</Text>
        <Text>Total Tasks: {todos.length}</Text>
        <Text>Completed Tasks: {completedCount}</Text>
        <Link href="./todoList" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Go to To-Do List</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>⏱️ Pomodoro Timer</Text>
        <Text>Status: {pomodoro.isRunning ? "Running" : "Paused"}</Text>
        <Text>
          Time Left: {minutes}:{seconds}
        </Text>
        <Text>
          Active Task:{" "}
          {activeTask ? activeTask.title || activeTask.text : "None"}
        </Text>
        <Link href="./pomodoro" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Go to Pomodoro Timer</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: "#fff",
    gap: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#f2f2f2",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#4f46e5",
    padding: 10,
    marginTop: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
