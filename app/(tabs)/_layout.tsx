import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: { display: "none" }, // Hide tab bar since we only have one screen
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "COS-Reader",
          tabBarIcon: ({ color }) => (
            <Ionicons name="card" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
