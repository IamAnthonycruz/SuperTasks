import React, { useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import {
  start,
  pause,
  reset,
  tick,
  setActiveTask,
} from "@/shared/redux/slices/pomodoroSlice";

export default function PomodoroTimer() {
  const dispatch = useDispatch();

  const { timeLeft, isRunning, activeTaskId } = useSelector(
    (state: any) => state.pomodoro
  );
  const todos = useSelector((state: any) => state.todos);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(tick());
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const selectedTask = todos.find((todo: any) => todo.id === activeTaskId);

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{formatTime(timeLeft)}</Text>

      <Text style={styles.label}>Select a Task:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={activeTaskId}
          onValueChange={(itemValue: any) => dispatch(setActiveTask(itemValue))}
          style={styles.picker}
        >
          <Picker.Item label="-- Select --" value={null} />
          {todos.map((todo: any) => (
            <Picker.Item key={todo.id} label={todo.title} value={todo.id} />
          ))}
        </Picker>
      </View>

      {selectedTask && (
        <Text style={styles.taskText}>🔗 {selectedTask.title}</Text>
      )}

      <View style={styles.buttons}>
        <Button
          title={isRunning ? "Pause" : "Start"}
          onPress={() => dispatch(isRunning ? pause() : start())}
          disabled={!activeTaskId}
        />
        <Button title="Reset" onPress={() => dispatch(reset())} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: "center",
    flex: 1,
    backgroundColor: "#fff",
  },
  timer: {
    fontSize: 72,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  pickerContainer: {
    width: "80%",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  taskText: {
    fontSize: 16,
    marginVertical: 10,
    color: "#555",
  },
  buttons: {
    flexDirection: "row",
    gap: 10,
  },
});
