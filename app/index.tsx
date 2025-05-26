import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { Link } from "expo-router";

export default function HomeScreen() {
  const todos = useSelector((state: any) => state.todos);
  const incompleteTodos = todos.filter((todo: any) => !todo.completed);
  const pomodoro = useSelector((state: any) => state.pomodoro);
  const minutes = Math.floor(pomodoro.timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (pomodoro.timeLeft % 60).toString().padStart(2, "0");

  return (
    <View style={styles.container}>
      <Text style={styles.header}>👋 Welcome Back!</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📋 To-Do Summary</Text>
        <Text>Total Tasks: {todos.length}</Text>
        <Text>Completed Tasks: {todos.length - incompleteTodos.length}</Text>
        <Link href="./todoList" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Go to To-Do List</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>⏱️ Pomodoro Timer</Text>
        <Text>Status: {pomodoro.status}</Text>
        <Text>
          Time Left: {minutes}:{seconds}
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
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#10b981",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  actionText: {
    color: "#fff",
    fontWeight: "600",
  },
});
