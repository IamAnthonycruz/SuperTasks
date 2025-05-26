import { store } from "@/shared/redux/store";
import { Tabs } from "expo-router";
import React from "react";
import { Provider } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
export default function RootLayout() {
  return (
    <Provider store={store}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#4f46e5",
          tabBarInactiveTintColor: "#a1a1aa",
          tabBarStyle: {
            height: 60,
            backgroundColor: "#fff",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            shadowColor: "#000",
            shadowOpacity: 0.05,
            shadowOffset: { width: 0, height: -3 },
            shadowRadius: 8,
            elevation: 5,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 5,
          },
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="todoList/index"
          options={{ title: "Todo List", href: null }}
        />
        <Tabs.Screen
          name="pomodoro/index"
          options={{ title: "Pomodoro", href: null }}
        />
      </Tabs>
    </Provider>
  );
}
