import React, { useState } from "react";
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
  addTodo,
  toggleTodo,
  deleteTodo,
} from "@/shared/redux/slices/todoSlice";

export default function TodoApp() {
  const [text, setText] = useState("");
  const todos = useSelector((state: any) => state.todos);
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (text.trim()) {
      dispatch(addTodo(text));
      setText("");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Enter a task"
        style={styles.input}
      />
      <Button title="Add" onPress={handleAdd} />

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => dispatch(toggleTodo(item.id))}
            onLongPress={() => dispatch(deleteTodo(item.id))}
          >
            <Text style={item.completed ? styles.completed : styles.text}>
              {item.text}
            </Text>
          </TouchableOpacity>
        )}
      />
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
